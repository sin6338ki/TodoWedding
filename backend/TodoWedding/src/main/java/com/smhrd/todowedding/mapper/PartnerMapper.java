package com.smhrd.todowedding.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.smhrd.todowedding.model.PartnerDTO;



/*
 * 기업회원 매퍼
 * 작성 : 서유광
 * 일자 : 2023.09.08
 */

@Mapper
public interface PartnerMapper {
	
	// 로그인
    @Select("SELECT partner_seq, admin_yn FROM tw_partner WHERE partner_id = #{partnerId} AND partner_pw = #{partnerPw}")
    public PartnerDTO partnerLogin(String partnerId,String partnerPw);
    
    // 회원가입
    @Insert("INSERT INTO tw_partner ( partner_id, partner_pw, partner_name, partner_registration, partner_tel, partner_link, partner_manager, partner_manager_tel, partner_address, partner_code ) VALUES( #{partner_id}, #{partner_pw}, #{partner_name}, #{partner_registration}, #{partner_tel}, #{partner_link}, #{partner_manager}, #{partner_manager_tel}, #{partner_address}, #{partner_code})")
    public void join(PartnerDTO partnerDTO);
    
    // 아이디 중복체크
    @Select("SELECT partner_id FROM tw_partner WHERE partner_id = #{partner_id}")
    public String uniqueId(String partner_id);
  
    
}
