package com.smhrd.todowedding.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smhrd.todowedding.mapper.KakaoLoginMapper;
import com.smhrd.todowedding.model.MemberResponseDto;

import com.smhrd.todowedding.mapper.MemberMapper;
import com.smhrd.todowedding.model.Member;

import lombok.extern.slf4j.Slf4j;


/*
 * 카카오 로그인 성공후에 투두웨딩 웹에서 관리하는 서비스
 * 작성 : 서유광
 * 일자 : 2023.09.08
 */

/*
 * 회원 정보 관련 service
 * 작성자 : 신지영
 * 작성일 : 2023.09.10
 */

@Service
public class MemberService {

	@Autowired
	private KakaoLoginMapper memberMapper;
	
	@Autowired
	private MemberMapper mapper;
//	public MemberService(MemberMapper mapper) {
//		this.memberMapper = mapper;
//	}
	
	public List<MemberResponseDto> findAllMember(){
		List<MemberResponseDto> allMemberList = null;
		try {
			allMemberList = memberMapper.findAllMember();
		}catch(Exception e) {
			e.printStackTrace();
		}
		return allMemberList;
	}


	public String deleteMember(String memberSeq) {
		try {
			mapper.deleteAllRelatedData(memberSeq);
			return "SUCCESS"; // 성공적으로 처리되면 'SUCCESS' 반환.
		} catch (Exception e) { 
		    // 예외 처리: 실패하면 에러 메시지 반환.
		    return e.getMessage(); 
	   }
	}

	public void deleteMember(int member_seq) {
		mapper.deleteMember(member_seq);
	}
}
