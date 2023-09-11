package com.smhrd.todowedding.mapper;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;


/*
 * 카카오 로그인 성공후에 투두웨딩 웹에서 관리하는 매퍼
 * 작성 : 서유광
 * 일자 : 2023.09.08
 */


@Mapper
public interface MemberMapper {
	
	// 사용자 정보 전체 삭제
	
    public void deleteAllRelatedData(String memberSeq);

    @Delete(
        "DELETE FROM tw_chatroom WHERE member_seq = #{member_seq}"  
    )
	public void deleteMember(int member_seq);
//    
//    "DELETE FROM tw_todolist WHERE member_seq = #{member_seq}",
//    "DELETE FROM tw_schedule WHERE member_seq = #{member_seq}",
//    "DELETE FROM tw_income WHERE member_seq = #{member_seq}",
//    "DELETE FROM tw_budget WHERE member_seq = #{member_seq}",
//    "DELETE FROM tw_marrydate WHERE member_seq = #{member_seq}",
//    "DELETE FROM tw_member WHERE memberSeq = #{memberSeq}"  // 가장 마지막에 메인 회원 정보 삭제

}
