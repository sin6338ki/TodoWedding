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

	
	public List<MemberResponseDto> findAllMember(){
		List<MemberResponseDto> allMemberList = null;
		try {
			allMemberList = memberMapper.findAllMember();
		}catch(Exception e) {
			e.printStackTrace();
		}
		return allMemberList;
	}

	// 회원 정보 전체 삭제
	public String deleteMember(int member_seq) {
		
		 try {	
			 	mapper.deleteMember(member_seq);
			 	mapper.deleteMarryDate(member_seq);
			 	mapper.deleteBudget(member_seq);
			 	mapper.deleteIncome(member_seq);
			 	mapper.deleteSchedule(member_seq);
	            mapper.deleteChatroom(member_seq);
	            mapper.deleteTodolist(member_seq);
	           
	            return "회원 정보 삭제 완료";
	        } catch (Exception e) { 
	        	return "회원 정보 삭제 실패: " + e.getMessage();
	        }
		}
	}

