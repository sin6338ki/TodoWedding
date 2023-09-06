package com.smhrd.todowedding.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

import com.smhrd.todowedding.model.KakaoProfile;
import com.smhrd.todowedding.model.Member;

@Mapper
public interface KakaoLoginMapper {
	
	@Insert("INSERT INTO tw_member (nickname, e_mail, gender, age_range, member_kakao_id) values(#{nickname}, #{email}, #{gender}, #{ageRange}, #{memberKakaoId})")
    public int kakaoUserData(Member member);
}
