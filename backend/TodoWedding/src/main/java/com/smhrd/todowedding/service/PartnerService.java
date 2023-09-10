package com.smhrd.todowedding.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smhrd.todowedding.mapper.PartnerMapper;
import com.smhrd.todowedding.model.PartnerDTO;
import com.smhrd.todowedding.model.PartnerResponseDto;

import lombok.extern.slf4j.Slf4j;


/*
 * 업체 및 관리자 관련 컨트롤러 
 * 작성 : 서유광
 * 일자 : 2023.09.08
 * 수정 
 * 	- 전체 partner 불러오기, partnerInfo 조회 기능 추가 (신지영, 2023.09.10)
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
		System.out.println("foundPartner " + foundPartner);

		if (foundPartner == null) {
			// 아이디가 일치하는 파트너가 없는 경우
			Map<String, Object> result = new HashMap<>();
			result.put("message", "회원정보가 일치하지 않습니다.");
			return result;
		}

		Map<String, Object> partnerInfo = new HashMap<>();
		partnerInfo.put("partner_seq", String.valueOf(foundPartner.getPartner_seq()));
		partnerInfo.put("admin_yn", foundPartner.getAdmin_yn());

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
}