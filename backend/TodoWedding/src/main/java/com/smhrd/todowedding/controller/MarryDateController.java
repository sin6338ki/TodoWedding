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
import com.smhrd.todowedding.service.MarryDateService;
import lombok.extern.slf4j.Slf4j;

/*
 * 결혼식 D-day 컨트롤러 - 등록, 조회
 * 작성 : 신지영
 * 일자 : 2023.09.04
 */
@Slf4j
@CrossOrigin("http://localhost:3000")
@RestController
public class MarryDateController {

	@Autowired
	private MarryDateService marryDateService;
	
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
}
