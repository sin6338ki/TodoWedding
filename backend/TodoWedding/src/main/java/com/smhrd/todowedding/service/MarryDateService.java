package com.smhrd.todowedding.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smhrd.todowedding.controller.MarryDateController;
import com.smhrd.todowedding.mapper.MarryDateMapper;
import com.smhrd.todowedding.model.MarryDate;
import com.smhrd.todowedding.model.MarryDateDto;

import lombok.extern.slf4j.Slf4j;

/*
 * 결혼식 D-day 설정 관련 service - 등록, 조회
 * 작성자 : 신지영
 * 작성일 : 2023.09.04
 */

@Slf4j
@Service
public class MarryDateService {

	@Autowired
	private MarryDateMapper marryDateMapper;
	
	//memberSeq에 대한 marryDate 등록하기
	public int addMarryDate(MarryDateDto marryDateDto) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
		
		return marryDateMapper.addMarryDate(marryDateDto);
	}
	
	//memberSeq에 대한 marryDate 조회하기
	public String findMarryDate(Long memberSeq) {
		String marryDate = marryDateMapper.findMarryDate(memberSeq);
		return marryDate;
	}
	
	//memberSeq에 대한 marrDate 수정 추가 09.09 유광
	public String marryDateUpdate(MarryDateDto marryDateDto) {
	    int result = marryDateMapper.updateMarryDate(marryDateDto);
	    log.info("dto 넘어온 값"+marryDateDto);
	    
	    log.info("매퍼에서 넘어온 값"+result);
	    if(result > 0){
	        return "결혼 예정일 수정 완료";
	    } else {
	        return "입력된 결혼 예정일이 없거나 실패";
	    }
	}
	
}
