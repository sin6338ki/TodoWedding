package com.smhrd.todowedding.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smhrd.todowedding.mapper.MarryDateMapper;
import com.smhrd.todowedding.model.MarryDateDto;

import lombok.extern.slf4j.Slf4j;

/**
 * 결혼식 D-day 설정 관련 service - 등록, 조회
 * @author 신지영
 * @since 2023.09.04
 */

@Slf4j
@Service
public class MarryDateService {

	@Autowired
	private MarryDateMapper marryDateMapper;
	
	//memberSeq에 대한 marryDate 등록하기
	public int addMarryDate(MarryDateDto marryDateDto) {    
		int addMarryDateResult = -1;
		try {
			if( marryDateMapper.addMarryDate(marryDateDto) > 0) {
				addMarryDateResult = 1;
			}
		}catch(Exception e) {
			addMarryDateResult = 0;
		}
		return addMarryDateResult;
	}
	
	//memberSeq에 대한 marryDate 조회하기
	public String findMarryDate(Long memberSeq) {
		String marryDate = "";
		try {
			marryDate = marryDateMapper.findMarryDate(memberSeq);
		}catch(Exception e) {
			marryDate = "fail";
		}
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
