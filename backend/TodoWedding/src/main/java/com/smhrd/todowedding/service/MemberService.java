package com.smhrd.todowedding.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smhrd.todowedding.mapper.MemberMapper;
import com.smhrd.todowedding.model.Member;

import lombok.extern.slf4j.Slf4j;

/*
 * 카카오 로그인 성공후에 투두웨딩 웹에서 관리하는 서비스
 * 작성 : 서유광
 * 일자 : 2023.09.08
 */


//카카오 API 관련 서비스가 아니기 때문에 웹사이트 내에서 관리하는 MemberService 생성 

@Slf4j
@Service
public class MemberService {
	
private final MemberMapper memberMapper;
	
	@Autowired
	public MemberService(MemberMapper mapper) {
		this.memberMapper = mapper;
	}

	public String deleteMember(String memberSeq) {
		try {
			memberMapper.deleteAllRelatedData(memberSeq);
			return "SUCCESS"; // 성공적으로 처리되면 'SUCCESS' 반환.
		} catch (Exception e) { 
		    // 예외 처리: 실패하면 에러 메시지 반환.
		    return e.getMessage(); 
	   }
	}

	public void deleteMember(int member_seq) {
		memberMapper.deleteMember(member_seq);
		
	}
	
	
}
