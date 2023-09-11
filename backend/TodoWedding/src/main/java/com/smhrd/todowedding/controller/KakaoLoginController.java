package com.smhrd.todowedding.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.smhrd.todowedding.model.KakaoProfile;
import com.smhrd.todowedding.model.Member;
import com.smhrd.todowedding.model.MemberResponseDto;
import com.smhrd.todowedding.model.OAuthToken;
import com.smhrd.todowedding.service.KakaoLoginService;
import com.smhrd.todowedding.service.MemberService;

/*
 * 카카오 로그인 컨트롤러
 * 작성 : 서유광
 * 일자 : 2023.09.05
 * 수정
 * 	- 전체 회원 정보 불러오기 기능 추가 (신지영, 2023.09.10)
 */


@CrossOrigin("http://localhost:3000")
@RestController
public class KakaoLoginController {
	
	@Autowired
	private KakaoLoginService kakaoLoginService;
	

	// 카카오 API 관련 서비스가 아니기 때문에 웹사이트 내에서 관리하는 MemberService 사용
	@Autowired
	private MemberService memberService;
	
	@GetMapping("/auth/kakao/callback")
	public Map<String,Object> kakaoCallback(String code) { 
		System.out.println("프론트에서 넘어온 카카오 코드값 : " + code);
		Map<String, Object> KakaoData = kakaoLoginService.getAccessToken(code);
		return KakaoData;
	}
	
	//전체 회원 조회 
	@GetMapping("/member")
	public List<MemberResponseDto> findAllMember() {
		return memberService.findAllMember();
	}
	
	@GetMapping("/member/delete")
	public int deleteMember(@RequestParam("member_seq") int member_seq) {
		System.out.println(member_seq);
		memberService.deleteMember(member_seq);
	     
		//String resultMessage = memberService.deleteMember(memberSeq);
//		if(resultMessage.equals("SUCCESS")) { 
//		    return ResponseEntity.ok("회원 정보 삭제 완료"); // 성공적으로 처리되면 200 OK 응답과 메시지 반환.
//		} else {  
//		    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("회원 정보 삭제 실패: " + resultMessage); // 실패하면 에러 메시지와 함께 500 Internal Server Error 응답 반환.
//	   }
		return 0;
	}
}
