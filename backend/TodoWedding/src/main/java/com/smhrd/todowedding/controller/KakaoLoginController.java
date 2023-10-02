package com.smhrd.todowedding.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.smhrd.todowedding.model.MemberResponseDto;
import com.smhrd.todowedding.service.KakaoLoginService;
import com.smhrd.todowedding.service.KakaoMessageService;
import com.smhrd.todowedding.service.MemberService;

import lombok.extern.slf4j.Slf4j;

/*
 * 카카오 로그인 컨트롤러
 * 작성 : 서유광
 * 일자 : 2023.09.05
 * 수정
 * 	- 전체 회원 정보 불러오기 기능 추가 (신지영, 2023.09.10)
 *  - 카카오톡 나에게 보내기 (예약) 기능 추가 (신지영, 2023.09.12)
 *  - D-day, 일정 알람 메시지 보내기 기능 추가 (신지영, 2023.09.13)
 */

@Slf4j
@CrossOrigin(origins = {"http://localhost:3000", "http://172.30.1.9:3000", "http://3.36.116.165:3000"})
@RestController
public class KakaoLoginController {
	
	@Autowired
	private KakaoLoginService kakaoLoginService;
	
	@Autowired
	private KakaoMessageService kakaoMessageService;
	
	// 카카오 API 관련 서비스가 아니기 때문에 웹사이트 내에서 관리하는 MemberService 사용
	@Autowired
	private MemberService memberService;
	
	//토큰 정보 저장
	private static String accessToken = null;
	private static Long loginMemberSeq = 0L;
	
	@GetMapping("/auth/kakao/callback")
	public Map<String,Object> kakaoCallback(String code) throws NoSuchFieldException, SecurityException, IOException, JsonProcessingException { 
		log.info("프론트에서 넘어온 카카오 코드값 : " + code);
		Map<String, Object> KakaoData = kakaoLoginService.getAccessToken(code);
		
		//토큰 정보 저장
		ObjectMapper mapper = new ObjectMapper();
		Object kakaoToken = KakaoData.get("kakaoAccess");
		Map<String, Object> tokenMap = mapper.readValue((String) kakaoToken, Map.class);
		accessToken = (String) tokenMap.get("access_token");
		loginMemberSeq = (Long) KakaoData.get("userseq");
		log.info("accessToken : " + accessToken);
		return KakaoData;
	}
	
	
	// 리프레시 토큰 검증 로직
    // 검증에 성공하면 새로운 액세스 토큰 발급
	@PostMapping("/member/refresh")
	public ResponseEntity<Map<String, Object>> refreshAccessToken(@RequestBody Map<String, Object> payload) {
	    String refreshToken = (String) payload.get("refreshToken");
	    
	    String newAccessToken = kakaoLoginService.refreshAccessToken(refreshToken);
	    log.info("새로운 카카오 access 토큰 : " + newAccessToken);
	    Map<String, Object> response = new HashMap<>();
	    response.put("accessToken", newAccessToken);
	    
	    return ResponseEntity.ok(response);
	}
	
	
	// 전체 회원 조회 
	@GetMapping("/member")
	public List<MemberResponseDto> findAllMember() {
		return memberService.findAllMember();
	}
	
	
	// 회원 정보 전부 삭제
	@DeleteMapping("/member/delete")
	public ResponseEntity<String> deleteMember(@RequestParam("member_seq") int member_seq) {
	    log.info("삭제할 회원 시퀀스 확인 "+member_seq);
	    String resultMessage = memberService.deleteMember(member_seq);

	    if(resultMessage.equals("회원 정보 삭제 완료")) { 
	        return ResponseEntity.ok(resultMessage);
	    } else {  
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(resultMessage); 
	    }
	}
	
	//예약 메시지 보내기 - D-day 안내 메시지
	@Scheduled(cron = "0 0 10 * * *", zone = "Asia/Seoul")
//	@Scheduled(cron = "15 * * * * *", zone = "Asia/Seoul")
	public void dDayMessageSendRun() throws Exception {

		log.info("d-day 메시지 보내기 스케쥴러 실행 : {}", accessToken);
		
		if(accessToken != null) {			
			log.info("accessToken : {}", accessToken);
			kakaoMessageService.senddDayMessage(accessToken, loginMemberSeq);
		}
	}
	
	//예약 메시지 보내기 - 하루 남은, 당일 일정 안내 메시지
    	@Scheduled(cron = "10 0 10 * * *", zone = "Asia/Seoul")
	// 10초 마다 메세지 오게 설정하는 코드가 아래 코드여서 아래꺼 124번 풀고 동영상찍기  
//	@Scheduled(cron = "10 * * * * *", zone = "Asia/Seoul")
	public void ScheduleMessageSendRun() throws Exception {
		log.info("하루 남은 일정 알림 메시지 보내기 스케쥴러 실행 : {}", accessToken);
		
		if(accessToken != null) {			
			log.info("accessToken : {}", accessToken);
			kakaoMessageService.sendScheduleMessage(accessToken, loginMemberSeq);
		}
	}

}
