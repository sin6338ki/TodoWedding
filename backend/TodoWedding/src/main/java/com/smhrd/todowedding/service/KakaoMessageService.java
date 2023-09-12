package com.smhrd.todowedding.service;

import org.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import lombok.extern.slf4j.Slf4j;

/*
 * 카카오 메시지 보내기 Service
 * 작성자 : 신지영
 * 작성일 : 2023.09.12
 */
@Slf4j
@Service
public class KakaoMessageService {
	
	//메시지 요청 URL
	String url = "https://kapi.kakao.com/v2/api/talk/memo/default/send";
	
	public String sendMessage(String accessToken) {
		//메시지 요청 보내기 
		RestTemplate restTemplate = new RestTemplate();
		HttpHeaders header = new HttpHeaders();
	    header.set("Content-Type", "application/x-www-form-urlencoded");
	    header.set("Authorization", "Bearer " + accessToken);

		// HttpBody 오브젝트 생성
		JSONObject linkObj = new JSONObject();
        linkObj.put("web_url", "");
        linkObj.put("mobile_web_url", "");
		
        JSONObject template_object = new JSONObject();
        template_object.put("object_type", "text");
        template_object.put("text", "테스트 메시지입니다.");
        template_object.put("link", linkObj);
        template_object.put("button_title", "바로가기");
        
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("template_object", template_object.toString());
		
		// HttpHeader와 HttpBody를 하나의 오브젝트에 담기
		HttpEntity<MultiValueMap<String, String>> kakaoMessageRequest = new HttpEntity<>(parameters, header);
		
		// Http 요청하기 - Post방식으로 - 그리고 response 변수의 응답 받음.
		ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST,
				kakaoMessageRequest, String.class);
		log.info("메시지 API 요청" + response.getBody());
		return response.getBody();
	}
	

}
