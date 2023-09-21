package com.smhrd.todowedding.controller;

import java.sql.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.smhrd.todowedding.model.MarryDateDto;
import com.smhrd.todowedding.service.KakaoMessageService;
import com.smhrd.todowedding.service.MarryDateService;
import lombok.extern.slf4j.Slf4j;

/*
 * 결혼식 D-day 컨트롤러 - 등록, 조회
 * 작성 : 신지영
 * 일자 : 2023.09.04
 */

@Slf4j
@CrossOrigin(origins = {"http://localhost:3000", "http://172.30.1.7:3000"})
@RestController
public class MarryDateController {

	@Autowired
	private MarryDateService marryDateService;
	
	@Autowired
	private KakaoMessageService kakaoMessageService;
	
	//memberSeq에 대한 marryDate 등록하기
	@PostMapping(value="marrydate")
	public int addMarryDate(@RequestBody MarryDateDto marryDateDto) {
		
		log.info("addMarryDate - client and backend communication success..... : " + marryDateDto.getMarryDt() + " , " + marryDateDto.getMemberSeq());
		//성공시 1 return
		return marryDateService.addMarryDate(marryDateDto);
	}
	
	//memberSeq에 대한 marryDate 조회하기 
	@GetMapping(value="marrydate/{memberSeq}")
	public String findMarryDate(@PathVariable(name="memberSeq") Long memberSeq) {
		log.info("findMarryDate - communication success..... : " + memberSeq);
		//성공시 결혼식 날짜 String으로 return
		return marryDateService.findMarryDate(memberSeq);
	}
	
	//memberSeq에 대한 결혼식 D-day 조회하기 
	@GetMapping(value="marry-d-day/{memberSeq}")
	public Long findDday(@PathVariable(name="memberSeq") Long memberSeq) throws Exception {
		return kakaoMessageService.dayCalculator(memberSeq);
	}
	
	//memberSeq에 대한 marryDate 수정하기 09.18 결혼 일정 수정 추가 : 유광
	@PostMapping(value="marrydate/update")
	public String updateMarryDate(@RequestBody MarryDateDto marryDateDto) {
	    return marryDateService.marryDateUpdate(marryDateDto);
	}
}
