package com.smhrd.todowedding.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
}
