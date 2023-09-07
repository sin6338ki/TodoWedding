package com.smhrd.todowedding.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.smhrd.todowedding.model.KakaoProfile;
import com.smhrd.todowedding.model.Member;


/*
 * 카카오에 로그인 매퍼
 * 작성 : 서유광
 * 일자 : 2023.09.06
 */

@Mapper
public interface KakaoLoginMapper {
	
	//카카오 로그인 사용자 정보 DB 저장 
	@Insert("INSERT INTO tw_member (nickname, e_mail, gender, age_range, member_kakao_id) values(#{nickname}, #{email}, #{gender}, #{ageRange}, #{memberKakaoId})")
    public int kakaoUserData(Member member);
	
	//카카오 로그인 사용자 ID값 중복 확인
	@Select("SELECT count(*) FROM tw_member where member_kakao_id=#{memberKakaoId}")
	public int kakaoIdCheck(Long memberKakaoId);
	
	//카카오Id를 사용해 사용자 seq값 가져오기
	@Select("SELECT member_seq FROM tw_member where member_kakao_id=#{memberKakaoId}")
	public Long kakaoseq(Long memberKakaoId);
}
