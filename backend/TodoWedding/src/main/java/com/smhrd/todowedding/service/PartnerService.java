package com.smhrd.todowedding.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smhrd.todowedding.mapper.PartnerMapper;
import com.smhrd.todowedding.model.KakaoMapsDto;
import com.smhrd.todowedding.model.PartnerDTO;
import com.smhrd.todowedding.model.PartnerResponseDto;
import com.smhrd.todowedding.model.PartnerUpdateDto;

import lombok.extern.slf4j.Slf4j;


/*
 * 업체 및 관리자 관련 컨트롤러 
 * 작성 : 서유광
 * 일자 : 2023.09.08
 * 수정 
 * 	- 전체 partner 불러오기, partnerInfo 조회 기능 추가 (신지영, 2023.09.10, 12)
 *  - 로그인시 조회 항목에 partner_name 추가 (신지영, 2023.09.10)
 *  - 기업 회원 삭제 기능 추가 (신지영, 2023.09.15)
 *  - partner info 수정 기능 추가 (신지영, 2023.09.16)
 */

@Slf4j
@Service
public class PartnerService {

	@Autowired
	private PartnerMapper partnerMapper;

	// 로그인 기능
	public Map<String, Object> partnerlogin(PartnerDTO partner) {
		String partnerId = partner.getPartner_id();
		String partnerPw = partner.getPartner_pw();
//        System.out.println("사용자 아이디 "+partnerId);
//        System.out.println("사용자 패스워드 "+partnerId);

		// 입력 받은 아이디로 데이터베이스에서 파트너 정보를 조회
		PartnerDTO foundPartner = partnerMapper.partnerLogin(partnerId, partnerPw);
		log.info("foundPartner " + foundPartner);

		if (foundPartner == null) {
			// 아이디가 일치하는 파트너가 없는 경우
			Map<String, Object> result = new HashMap<>();
			result.put("message", "회원정보가 일치하지 않습니다.");
			return result;
		}

		Map<String, Object> partnerInfo = new HashMap<>();
		partnerInfo.put("partner_seq", String.valueOf(foundPartner.getPartner_seq()));
		partnerInfo.put("admin_yn", foundPartner.getAdmin_yn());
		partnerInfo.put("partner_name", foundPartner.getPartner_name());

		return partnerInfo;

	}

	// 회원가입 기능
	public String partnerJoin(PartnerDTO partner) {

		// 아이디 중복 체크
		String existingId = partnerMapper.uniqueId(partner.getPartner_id());
		if (existingId != null) {
			return "DUPLICATE_ID"; // 중복된 아이디가 이미 존재하는 경우
		}

		try {
			partnerMapper.join(partner);
			return "SUCCESS"; // 회원가입 성공
		} catch (Exception e) {
			return "FAILURE"; // 회원가입 실패
		}
	}
	
	//partenrSeq에 대한 partner 정보 조회 
	public PartnerResponseDto findPartnerInfo(Long partnerSeq) {
		PartnerResponseDto partnerInfo = null;
		try {
			partnerInfo = partnerMapper.findPartnerInfo(partnerSeq);
		}catch(Exception e) {
			e.printStackTrace();
		}
		return partnerInfo;
	}
	
	//partner code별 리스트 조회 
	public List<PartnerResponseDto> findPatnerByCode(String partnerCode){
		List<PartnerResponseDto> partnerList = null;
		try {
			partnerList = partnerMapper.findPatnerByCode(partnerCode);
		}catch(Exception e) {
			e.printStackTrace();
		}
		return partnerList;
	}
	
	//중복 아이디 확인
	public int checkedSameId(String partnerId) {
		int checkedSameIdResult = -1;
		try {
			
			if(partnerMapper.checkedSameId(partnerId) == null) {
				checkedSameIdResult = 1;
			}else {
				checkedSameIdResult = 0;
			}
			
		}catch(Exception e) {
			e.printStackTrace();
		}
		return checkedSameIdResult;
	}
	
	//전체 기업 조회 
	public List<JSONObject> findAllPartner(){
		List<JSONObject> partnerList = null;
		try {
			partnerList = partnerMapper.findAllPartner();
		}catch(Exception e) {
			e.printStackTrace();
		}
		return partnerList;
	}
	
	// DB정보 카카오맵 보내기
	public List<KakaoMapsDto> getLocations() {
        return partnerMapper.getLocations();
    }
	
	//기업 회원 정보 삭제 
	public String deletePartner(Long partnerSeq) {
		String deletePartnerResult = "";
		try {
			if(partnerMapper.deletePartner(partnerSeq) > 0) {				
				deletePartnerResult = "success";
			}else {
				deletePartnerResult = "db error";
			}
		}catch(Exception e) {
			deletePartnerResult = "backend error";
			e.printStackTrace();
		}
		return deletePartnerResult;
	}
	
	//기업 회원 정보 수정 
	public Long updatePartnerInfo(PartnerUpdateDto partnerUpdateDto) {
		Long updatePartnerResult = -1L;
		try {
			if(partnerMapper.updatePartnerInfo(partnerUpdateDto) > 0) {				
				updatePartnerResult = 1L;
			}else {
				updatePartnerResult = 0L;
			}
		}catch(Exception e) {
			updatePartnerResult = -1L;
			e.printStackTrace();
		}
		return updatePartnerResult;
	}
	
	//업체 전용 페이지용 업체 정보 조회 
	public PartnerResponseDto findPartnerInfoMore(Long partnerSeq) {
		PartnerResponseDto partnerInfo = null;
		try {
			partnerInfo = partnerMapper.findPartnerInfoMore(partnerSeq);
		}catch(Exception e) {
			e.printStackTrace();
		}
		return partnerInfo;
	}
}