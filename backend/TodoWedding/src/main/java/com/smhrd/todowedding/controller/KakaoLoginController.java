package com.smhrd.todowedding.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
 *  - 카카오톡 나에게 보내기 (예약) 기능 추가 (신지영, 202.09.12)
 */

@Slf4j
@CrossOrigin("http://localhost:3000")
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
	
	@GetMapping("/auth/kakao/callback")
	public Map<String,Object> kakaoCallback(String code) throws NoSuchFieldException, SecurityException, IOException, JsonProcessingException { 
		System.out.println("프론트에서 넘어온 카카오 코드값 : " + code);
		Map<String, Object> KakaoData = kakaoLoginService.getAccessToken(code);
		
		//토큰 정보 저장
		ObjectMapper mapper = new ObjectMapper();
		Object kakaoToken = KakaoData.get("kakaoAccess");
		Map<String, Object> tokenMap = mapper.readValue((String) kakaoToken, Map.class);
		accessToken = (String) tokenMap.get("access_token");
		log.info("accessToken : " + accessToken);
		return KakaoData;
	}
	
	// 전체 회원 조회 
	@GetMapping("/member")
	public List<MemberResponseDto> findAllMember() {
		return memberService.findAllMember();
	}
	
	
	// 회원 정보 전부 삭제
	@GetMapping("/member/delete")
	public ResponseEntity<String> deleteMember(@RequestParam("member_seq") int member_seq) {
		System.out.println(member_seq);
		String resultMessage = memberService.deleteMember(member_seq);

		if(resultMessage.equals("회원 정보 삭제 완료")) { 
		    return ResponseEntity.ok(resultMessage);
		} else {  
		    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(resultMessage); 
		}
	}
	
	//예약 실행
	@Scheduled(cron = "* 10 * * * *", zone = "Asia/Seoul")
	public void run() {

//		log.info("스케쥴러 실행 : " + accessToken);
		
		if(accessToken != null) {			
			log.info("accessToken : " + accessToken);
			kakaoMessageService.sendMessage(accessToken);
		}
	}

}
