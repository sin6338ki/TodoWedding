package com.smhrd.todowedding.service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.smhrd.todowedding.mapper.KakaoLoginMapper;
import com.smhrd.todowedding.model.KakaoProfile;
import com.smhrd.todowedding.model.Member;
import com.smhrd.todowedding.model.OAuthToken;

import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;

/*
 * KakaoLogin 서비스
 * 작성자 : 서유광
 * 작성일 : 2023.09.06
 */

@Slf4j
@Service
public class KakaoLoginService {

	@Autowired
	private KakaoLoginMapper kakaoLoginMapper;
	
	private static OAuthToken oauthToken = null;

	public Map<String, Object> getAccessToken(String code) {
		log.info("서비스에서 받은 카카오 코드값: " + code);

		RestTemplate rt = new RestTemplate();

		// HttpHeader 오브젝트 생성
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

		// HttpBody 오브젝트 생성
		MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
		params.add("grant_type", "authorization_code");
		params.add("client_id", "05e6f6ac6b8cd6cf3b1ec2a9ca6542de");
//		params.add("redirect_uri", "http://localhost:3000/auth/kakao/callback");
		params.add("redirect_uri", "http://172.30.1.7:3000/auth/kakao/callback");
		params.add("code", code);
		

		// HttpHeader와 HttpBody를 하나의 오브젝트에 담기
		HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(params, headers);

		// Http 요청하기 - Post방식으로 - 그리고 response 변수의 응답 받음.
		ResponseEntity<String> response = rt.exchange("https://kauth.kakao.com/oauth/token", HttpMethod.POST,
				kakaoTokenRequest, String.class);
		log.info("토큰 요청 완료" + response.getBody());

		ObjectMapper objectMapper = new ObjectMapper();
//		OAuthToken oauthToken = null;
		try {
			oauthToken = objectMapper.readValue(response.getBody(), OAuthToken.class);
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}

		log.info("카카오 엑세스 토큰 : " + oauthToken.getAccess_token());
		log.info("카카오 리프레스 토근 : " + oauthToken.getRefresh_token());

		RestTemplate rt2 = new RestTemplate();

		// HttpHeader 오브젝트 생성
		HttpHeaders headers2 = new HttpHeaders();
		headers2.add("Authorization", " Bearer " + oauthToken.getAccess_token());
		headers2.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

		// HttpHeader와 HttpBody를 하나의 오브젝트에 담기
		HttpEntity<MultiValueMap<String, String>> kakaoProfileRequest2 = new HttpEntity<>(headers2);

		// Http 요청하기 - Post방식으로 - 그리고 response 변수의 응답 받음.
		ResponseEntity<String> response2 = rt2.exchange("https://kapi.kakao.com/v2/user/me", HttpMethod.POST,
				kakaoProfileRequest2, String.class);

		log.info("회원정보 조회" + response2.getBody());

		ObjectMapper objectMapper2 = new ObjectMapper();
		KakaoProfile kakaoProfile = null;
		
		try {
		kakaoProfile = objectMapper2.readValue(response2.getBody(), KakaoProfile.class);
		
		} catch (JsonMappingException e) {
			e.printStackTrace();

		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		
		
		log.info("닉네임 : " + kakaoProfile.getProperties().nickname);
		log.info("카카오 이메일 : " + kakaoProfile.getKakao_account().email);
		log.info("성별 : " + kakaoProfile.getKakao_account().getGender());
		log.info("나이 : " + kakaoProfile.getKakao_account().age_range);
		log.info("카카오 아이디(번호) : " + kakaoProfile.getId());
		
		String nickname = kakaoProfile.getProperties().nickname;
		String email = kakaoProfile.getKakao_account().email;
		String gender = kakaoProfile.getKakao_account().getGender();
		String ageRange = kakaoProfile.getKakao_account().age_range;
		Long memberKakaoId = kakaoProfile.getId();
		
		int idCheck = kakaoLoginMapper.kakaoIdCheck(memberKakaoId);
		log.info("아이디 중복 리턴"+idCheck);
		
		// memberKakaoId 중복 확인후 DB 저장
		if(idCheck > 0) {
			log.info(" db저장 안함 "+idCheck);
		}else {
			log.info("새로운 카카오 정보-> db저장 ");
			Member member = new Member(nickname, email, gender, ageRange, memberKakaoId);
			 // DB에 저장하기 위해 매퍼 메서드 호출
			kakaoLoginMapper.kakaoUserData(member);
		}
		
		
		// 해당 사용자의 seq, nickname 보내기
		Map<String, Object> KakaoData = new HashMap<>();
		
		// 사용자 seq값 매퍼에서 가져오기
		Long Seq = kakaoLoginMapper.kakaoseq(memberKakaoId);
		
		KakaoData.put("userseq",Seq);
		KakaoData.put("userNick",nickname);
		KakaoData.put("kakaoAccess",response.getBody());
		
		return KakaoData; 
	}	
}


