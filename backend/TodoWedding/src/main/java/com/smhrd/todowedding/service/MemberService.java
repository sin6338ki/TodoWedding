package com.smhrd.todowedding.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smhrd.todowedding.mapper.KakaoLoginMapper;
import com.smhrd.todowedding.model.MemberResponseDto;

/*
 * 회원 정보 관련 service
 * 작성자 : 신지영
 * 작성일 : 2023.09.10
 */

@Service
public class MemberService {

	@Autowired
	private KakaoLoginMapper memberMapper;
	
	public List<MemberResponseDto> findAllMember(){
		List<MemberResponseDto> allMemberList = null;
		try {
			allMemberList = memberMapper.findAllMember();
		}catch(Exception e) {
			e.printStackTrace();
		}
		return allMemberList;
	}
}
