package com.smhrd.todowedding.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.json.simple.JSONObject;

import com.smhrd.todowedding.model.KakaoMapsDto;
import com.smhrd.todowedding.model.MemberResponseDto;
import com.smhrd.todowedding.model.PartnerDTO;
import com.smhrd.todowedding.model.PartnerResponseDto;
import com.smhrd.todowedding.model.PartnerUpdateDto;

/**
 * 기업회원 매퍼
 * @author 서유광
 * @since 2023.09.08
 * 
 * 수정
 *  - 전체 기업 불러오기 추가 (신지영, 2023.09.12)
 *  - 기업 회원 탈퇴 기능 추가 (신지영, 2023.09.15)
 *  - 기업 회원 정보 수정 기능 추가 (신지영, 2023.09.16)
 *  - 검색 기능 추가 (신지영, 2023.09.18)
 */

@Mapper
public interface PartnerMapper {
	
	// 로그인
    @Select("SELECT partner_seq, admin_yn, partner_name FROM tw_partner WHERE partner_id = #{partnerId} AND partner_pw = #{partnerPw}")
    public PartnerDTO partnerLogin(String partnerId,String partnerPw);
    
    // 회원가입
    @Insert("INSERT INTO tw_partner ( partner_id, partner_pw, partner_name, partner_registration, partner_tel, partner_link, partner_manager, partner_manager_tel, partner_address, partner_code ) VALUES( #{partner_id}, #{partner_pw}, #{partner_name}, #{partner_registration}, #{partner_tel}, #{partner_link}, #{partner_manager}, #{partner_manager_tel}, #{partner_address}, #{partner_code})")
    public void join(PartnerDTO partnerDTO);
    
    // 아이디 중복체크
    @Select("SELECT partner_id FROM tw_partner WHERE partner_id = #{partner_id}")
    public String uniqueId(String partner_id);
  
    //partner 정보 조회
    @Select("select partner_seq, partner_name, partner_address, partner_tel, partner_link from tw_partner where partner_seq=#{partnerSeq}")
    public PartnerResponseDto findPartnerInfo(Long partnerSeq);
    
    //업체 유형(parter_code)별 리스트 조회 
    @Select("select partner_seq, partner_name, partner_address, partner_tel, partner_link from tw_partner where partner_code=#{parnterCode}")
    public List<PartnerResponseDto> findPatnerByCode(String partnerCode);
    
    //중복 아이디 조회 
    @Select("select * from tw_partner where partner_id=#{partnerId}")
    public JSONObject checkedSameId(String partnerId);
    
    //기업 전체 정보 조회 
    @Select("select * from tw_partner")
    public List<JSONObject> findAllPartner();

    //기업 정보 카카오맵 으로 보내기
    @Select("SELECT partner_seq, partner_name, partner_address, partner_latitude, partner_longitude , partner_tel, partner_link, partner_code FROM tw_partner WHERE partner_latitude IS NOT NULL AND partner_longitude IS NOT NULL")
    public List<KakaoMapsDto> getLocations();
    
    //기업 회원 탈퇴 
    @Delete("delete from tw_partner where partner_seq=#{partnerSeq}")
    public int deletePartner(Long partnerSeq);

    //기업 회원 정보 수정
    @Update("update tw_partner set partner_pw=#{partnerPw}, partner_name=#{partnerName}, partner_registration=#{partnerRegistration}, partner_tel=#{partnerTel}, partner_link=#{partnerLink}, partner_manager=#{partnerManager}, partner_manager_tel=#{partnerManagerTel}, partner_address=#{partnerAddress} where partner_seq=#{partnerSeq}")
    public Long updatePartnerInfo(PartnerUpdateDto partnerUpdateDto);
    
    //partner 정보 조회 (관리자 페이지 전용)
    @Select("select partner_seq, partner_id, partner_pw, partner_name, partner_registration, partner_tel, partner_link, partner_manager, partner_manager_tel, partner_address from tw_partner where partner_seq=#{partnerSeq}")
    public PartnerResponseDto findPartnerInfoMore(Long partnerSeq);
    
    //Admin 계정 여부 판단 
    @Select("select * from tw_partner where partner_seq=#{partnerSeq} and admin_yn='Y'")
    public JSONObject isAdmin(Long partnerSeq);
    
	//검색 기능
	@Select("select partner_seq, partner_code, partner_id, partner_pw, partner_name, partner_registration, partner_tel, partner_link, partner_manager, partner_manager_tel, partner_address from tw_partner where partner_id like '%${keyword}%' or partner_name like '%${keyword}%'")
	public List<JSONObject> searchPartner(String keyword);//검색 기능 
    
}
