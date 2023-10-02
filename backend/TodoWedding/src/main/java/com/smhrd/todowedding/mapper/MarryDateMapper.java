package com.smhrd.todowedding.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.smhrd.todowedding.model.MarryDate;
import com.smhrd.todowedding.model.MarryDateDto;

/**
 * 결혼식 디데이 설정 관련 mapper
 * @author 신지영
 * @since 2023.09.04
 */

@Mapper
public interface MarryDateMapper {
	
	//memberSeq에 대한 marryDate 등록하기
	@Insert("insert into tw_marrydate (marry_dt, member_seq) values (#{marryDt}, #{memberSeq})")
	public int addMarryDate(MarryDateDto marryDateDto);
	
	//memberSeq에 대한 marryDate 조회하기
	@Select("select marry_dt from tw_marrydate where member_seq=#{memberSeq}")
	public String findMarryDate(Long memberSeq);
	
	// memberSeq에 대한 marryDate 수정하기
	@Update("UPDATE tw_marrydate SET marry_dt = #{marryDt} where member_seq = #{memberSeq}")
	public int updateMarryDate(MarryDateDto marrayDataDto);
	
}
