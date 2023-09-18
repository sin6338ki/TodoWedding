package com.smhrd.todowedding.mapper;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;


/*
 * 카카오 로그인 성공후에 투두웨딩 웹에서 관리하는 매퍼
 * 작성 : 서유광
 * 일자 : 2023.09.08
 * 수정
 * 	- memberSeq로 닉네임 조회
 */


@Mapper
public interface MemberMapper {
	
	// 해당 seq 회원 정보 삭제
	@Delete("DELETE FROM tw_chatroom WHERE member_seq = #{member_seq}")
    public void deleteChatroom(int member_seq);
	// 해당 seq 회원 정보 삭제
    @Delete("DELETE FROM tw_todolist WHERE member_seq = #{member_seq}")
    public void deleteTodolist(int member_seq);
    // 해당 seq 회원 정보 삭제
    @Delete("DELETE FROM tw_schedule WHERE member_seq = #{member_seq}")
    public void deleteSchedule(int member_seq);
    // 해당 seq 회원 정보 삭제
    @Delete("DELETE FROM tw_income WHERE member_seq = #{member_seq}")
    public void deleteIncome(int member_seq);
    // 해당 seq 회원 정보 삭제
    @Delete("DELETE FROM tw_budget WHERE member_seq = #{member_seq}")
    public void deleteBudget(int member_seq);
    // 해당 seq 회원 정보 삭제
    @Delete("DELETE FROM tw_marrydate WHERE member_seq = #{member_seq}")
    public void deleteMarryDate(int member_seq);
    // 해당 seq 회원 정보 삭제
    @Delete("DELETE FROM tw_member WHERE member_seq = #{member_seq}")
    public void deleteMember(int member_seq);
    
    //Seq로 닉네임 조회
    @Select("select nickname from tw_member where member_seq=#{memberSeq}")
    public String findNickname(Long member_seq);
}
