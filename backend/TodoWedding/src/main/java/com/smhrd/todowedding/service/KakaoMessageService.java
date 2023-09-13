package com.smhrd.todowedding.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.smhrd.todowedding.mapper.ChecklistMapper;
import com.smhrd.todowedding.mapper.MarryDateMapper;
import com.smhrd.todowedding.mapper.MemberMapper;
import com.smhrd.todowedding.mapper.ScheduleMapper;
import com.smhrd.todowedding.model.Schedule;

import lombok.extern.slf4j.Slf4j;

/*
 * 카카오 메시지 보내기 Service
 * 	- D-day 계산 메서드
 *  - 메시지 보내기 메서드
 * 작성자 : 신지영
 * 작성일 : 2023.09.12
 */

@Slf4j
@Service
public class KakaoMessageService {
	
	@Autowired
	private MarryDateMapper marryDateMapper;
	
	@Autowired
	private ChecklistMapper checklistMapper;
	
	@Autowired
	private MemberMapper memberMapper;
	
	@Autowired
	private ScheduleMapper scheduleMapper;
	
	//메시지 요청 URL
	String url = "https://kapi.kakao.com/v2/api/talk/memo/default/send";
	
	public String sendMessage(String accessToken, Long loginMemberSeq, List<String> message, Long dDay, String sendType) {
		//메시지 요청 보내기 
		RestTemplate restTemplate = new RestTemplate();
		HttpHeaders header = new HttpHeaders();
	    header.set("Content-Type", "application/x-www-form-urlencoded");
	    header.set("Authorization", "Bearer " + accessToken);

		// HttpBody 오브젝트 생성
		JSONObject linkObj = new JSONObject();
        linkObj.put("web_url", "http://localhost:3000");
        linkObj.put("mobile_web_url", "http://localhost:3000");
		
        //로그인 멤버 닉네임 조회
        String loginNickname = findNickname(loginMemberSeq);
        
        
        String oneLineMessage = "";
        
        if(sendType.equals("dDay")) {        	
        	//message 한 줄로 통합
        	oneLineMessage = "안녕하세요. " + loginNickname + "님!\n결혼식까지 " + dDay + "일 남으셨어요💏\n" + dDay + "일 남은 결혼식을 위한 \n결혼 준비 체크리스트를 확인해보세요😀\n\n";
        	for(String msg : message) {
        		oneLineMessage += "💌  " + msg + "\n";
        	}
        }else {
        	oneLineMessage = "안녕하세요. " + loginNickname + "님!\n결혼식까지 " + dDay + "일 남으셨어요💏\n\n\n결혼식 준비를 위한 일정 중 하루 남은 일정이 있어요😎";
        	for(String msg : message) {
        		oneLineMessage += "✅"+ msg + "\n";
        	}
        	oneLineMessage += "\n\n일정 확인하시고, 오늘도 행복한 하루 보내세요❤";
        }
        
        
        JSONObject template_object = new JSONObject();
        template_object.put("object_type", "text");
        template_object.put("text", oneLineMessage);
        template_object.put("link", linkObj);
        template_object.put("button_title", "TodoWedding 홈페이지로 이동하기");
        
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("template_object", template_object.toString());
		
		// HttpHeader와 HttpBody를 하나의 오브젝트에 담기
		HttpEntity<MultiValueMap<String, String>> kakaoMessageRequest = new HttpEntity<>(parameters, header);
		
		// Http요청하기 >> Post방식으로 - 그리고 response 변수의 응답 받음.
		ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST,
				kakaoMessageRequest, String.class);
		log.info("메시지 API 요청" + response.getBody());
		return response.getBody();
	}
	
	//d-day message 보내기
	public List<String> senddDayMessage(String accessToken, Long loginMemberSeq) throws Exception {
		List<String> message = new ArrayList<String>();
		
		Long dDay = dayCalculator(loginMemberSeq);
		log.info("dDay, {}", dDay);
				
		switch(dDay.toString()) {
		case "365":
			message = findMessage(100L);
//			sendDdayMessage(accessToken, loginMemberSeq, message, dDay);
			break;
		case "300":
			message = findMessage(101L);
//			sendDdayMessage(accessToken, loginMemberSeq, message, dDay);
			break;
		case "180":
			message = findMessage(102L);
//			sendDdayMessage(accessToken, loginMemberSeq, message, dDay);
			break;
		case "90":
			message = findMessage(103L);
//			sendDdayMessage(accessToken, loginMemberSeq, message, dDay);
			break;
		case "30":
			message = findMessage(104L);
//			sendDdayMessage(accessToken, loginMemberSeq, message, dDay);
			break;
		case "7":
			message = findMessage(105L);
//			sendDdayMessage(accessToken, loginMemberSeq, message, dDay);
			break;
		case "0":
			message.add("결혼식을 진심으로 축하드립니다!");
			message.add("평생 기억에 남을 멋진 결혼식이 되길 바라며,");
			message.add("따뜻한 마음으로 세월이 흘러도 서로를 더 아끼고 존중하면서 사랑하는 부부의 인연이 되기를 기원합니다.");
//			sendDdayMessage(accessToken, loginMemberSeq, message, dDay);
			break;
		default:
			break;
		}
		sendMessage(accessToken, loginMemberSeq, message, dDay, "dDay");
		return message;
	}
	
	//일정 하루 전 메시지 보내기
	public List<String> sendScheduleMessage(String accessToken, Long loginMemberSeq) throws Exception {
		List<String> message = new ArrayList<String>();
		List<JSONObject> scheduleList = scheduleMapper.findScheduleByMember(loginMemberSeq);
		log.info("scheduleList : {}", scheduleList.toString());
		
		Long dDay = dayCalculator(loginMemberSeq);
		log.info("dDay, {}", dDay);

		Date now = new Date();
		
		for(JSONObject scheduleItem : scheduleList) {
			String scheduleDate = (String)scheduleItem.get("schedule_start_dt");
			//string to date 변환
			Date scheduleDateFormat = new SimpleDateFormat("yyyy-MM-dd").parse(scheduleDate);
			Long diffDate = (scheduleDateFormat.getTime() - now.getTime()) / (1000 * 24 * 60 * 60) + 1;
			log.info("diffDate : {}", diffDate);
			
			if(diffDate == 1) {
				message.add((String)scheduleItem.get("schedule_contents"));
			}
			
			sendMessage(accessToken, loginMemberSeq, message, dDay, "schedule");
		}
		return message;
	}
	
	//memberSeq 조회
	public String findNickname(Long memberSeq) {
		return memberMapper.findNickname(memberSeq);
	}
	
	//message 지정
	public List<String> findMessage(Long ckeckdaySeq){
		return checklistMapper.findDayChecklistContentsOnly(ckeckdaySeq);
	}
	
	//D-day 계산 메서드 (출처 https://jamesdreaming.tistory.com/116)
	public Long dayCalculator(Long loginMemberSeq) throws Exception {
		String marryDate = marryDateMapper.findMarryDate(loginMemberSeq);
		Date now = new Date();
		Long diffDate = null;
		//D-day 계산
		try {
			//string to date 변환
			Date marryDateFormat = new SimpleDateFormat("yyyy-MM-dd").parse(marryDate);
			diffDate = (marryDateFormat.getTime() - now.getTime()) / (1000 * 24 * 60 * 60) + 1;
		}catch(ParseException e) {
			e.printStackTrace();
		}
		log.info("d-day 계산 결과 확인 : " + diffDate);
		return diffDate;
	}
}
