package com.smhrd.todowedding.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import com.smhrd.todowedding.model.MarryDate;
import com.smhrd.todowedding.model.MarryDateDto;

/*
 * 결혼식 디데이 설정 관련 mapper
 * 작성자 : 신지영
 * 작성일 : 2023.09.04
 */
@Mapper
public interface MarryDateMapper {
	
	//memberSeq에 대한 marryDate 등록하기
	@Insert("insert into tw_marrydate (marry_dt, member_seq) values (#{marryDt}, #{memberSeq})")
	public int addMarryDate(MarryDateDto marryDateDto);
	
	//memberSeq에 대한 marryDate 조회하기
	@Select("select * from tw_marrydate where member_seq=#{memberSeq}")
	public MarryDate findMarryDate(Long memberSeq);
}
