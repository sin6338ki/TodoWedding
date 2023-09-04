package com.smhrd.todowedding.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
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
	private MarryDateService service;
	
	//memberSeq에 대한 marryDate 등록하기
	@PostMapping(value="marrydate")
	public int addMarryDate(@RequestBody MarryDateDto marryDateDto) {
		
		log.info("client and backend communication success..... : " + marryDateDto.getMarryDt() + " , " + marryDateDto.getMemberSeq());
		return service.addMarryDate(marryDateDto);
	}
}
