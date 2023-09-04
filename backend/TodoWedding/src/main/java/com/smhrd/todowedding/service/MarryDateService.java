package com.smhrd.todowedding.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smhrd.todowedding.mapper.MarryDateMapper;
import com.smhrd.todowedding.model.MarryDateDto;

import lombok.extern.slf4j.Slf4j;

/*
 * 결혼식 D-day 설정 관련 service - 등록, 조회
 * 작성자 : 신지영
 * 작성일 : 2023.09.04
 */
@Service
@Slf4j
public class MarryDateService {

	@Autowired
	private MarryDateMapper mapper;
	
	//memberSeq에 대한 marryDate 등록하기
	public int addMarryDate(MarryDateDto marryDateDto) {
		return mapper.addMarryDate(marryDateDto);
	}
}
