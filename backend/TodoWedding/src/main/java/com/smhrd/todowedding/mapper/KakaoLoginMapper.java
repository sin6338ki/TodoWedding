package com.smhrd.todowedding.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.smhrd.todowedding.model.KakaoProfile;
import com.smhrd.todowedding.model.Member;
import com.smhrd.todowedding.model.MemberResponseDto;


/*
 * 카카오에 로그인 매퍼
 * 작성 : 서유광
 * 일자 : 2023.09.06
 * 수정
 * 	- 전체 회원 정보 조회 추가 (신지영, 2023.09.10)
 *  - 회원 검색 기능 추가 (신지영, 2023.09.18)
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
	
	//전체 회원정보 조회 
	@Select("select member_seq, nickname, e_mail, gender, age_range from tw_member")
	public List<MemberResponseDto> findAllMember();
	
	//검색 기능
	@Select("select member_seq, nickname, e_mail, gender, age_range from tw_member where nickname like '%${keyword}%' or e_mail like '%${keyword}%'")
	public List<MemberResponseDto> searchMember(String keyword);
}
