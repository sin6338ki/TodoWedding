package com.smhrd.todowedding.controller;

import java.util.List;
import java.util.Map;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.todowedding.model.KakaoMapsDto;
import com.smhrd.todowedding.model.MemberResponseDto;
import com.smhrd.todowedding.model.PartnerDTO;
import com.smhrd.todowedding.model.PartnerResponseDto;
import com.smhrd.todowedding.model.PartnerUpdateDto;
import com.smhrd.todowedding.service.PartnerService;

import lombok.extern.slf4j.Slf4j;


/* 업체 및 관리자 관련 컨트롤러 
 * 작성 : 서유광
 * 일자 : 2023.09.08
 * 수정 
 * 	- 기업 전체 조회 기능 추가 (신지영, 2023.09.12)
 *  - 기업 회웥탈퇴, 중복 아이디 체크, 1개 업체 정보 조회 기능 추가 (신지영, 2023.09.15)
 *  - 기업 회원 정보 수정 기능 추가 (신지영, 2023.09.16)
 *  - 관리자 여부 판단 조회 기능, 검색 기능 추가 (신지영, 2023.09.18)
 */

@Slf4j
@CrossOrigin(origins = {"http://172.30.1.7:3000", "http://localhost:3000"})
@RestController
public class PartnerController {

	@Autowired
	private PartnerService partnerService;

	// 기업회원 로그인
	@PostMapping("/partner/login")
	public ResponseEntity<?> partnerLogin(@RequestBody PartnerDTO partner) {

		Map<String, Object> loginResult = partnerService.partnerlogin(partner);

		if (loginResult.containsKey("message")) {
			return new ResponseEntity<>(loginResult.get("message"), HttpStatus.UNAUTHORIZED);
		} else {
			return new ResponseEntity<>(loginResult, HttpStatus.OK);
		}
	}
	
	// 기업회원 회원가입
	@PostMapping("/partner/join")
	public ResponseEntity<String> partnerJoin(@RequestBody PartnerDTO partner) {
		
		String result = partnerService.partnerJoin(partner);
		
		if ("SUCCESS".equals(result)) {
		      return ResponseEntity.ok("회원가입 완료");
		    } else if ("DUPLICATE_ID".equals(result)) {
		      return ResponseEntity.status(HttpStatus.CONFLICT).body("아이디가 중복");
		    } else {
		      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("회원가입 실패");
		   }	
	}

	//전체 기업 조회 
	@GetMapping("/partner")
	public List<JSONObject> findAllPartner(){
		return partnerService.findAllPartner();
	}
	
	//기업 회원 탈퇴 
	@DeleteMapping(value="partner/{partnerSeq}")
	public ResponseEntity<?> deletePartner(@PathVariable Long partnerSeq){
		String deletePartnerResult = partnerService.deletePartner(partnerSeq);
		return new ResponseEntity<>(deletePartnerResult, HttpStatus.OK);
		
	}
	
	// 카카오맵에 표시할 업체 데이터 프론트로 보내기 (위치 정보)
    @GetMapping("/kakaomaps")
    public ResponseEntity<List<KakaoMapsDto>> getLocations() {
        List<KakaoMapsDto> locations = partnerService.getLocations();
        return new ResponseEntity<>(locations, HttpStatus.OK);
   }
    
    //중복 아이디 체크 
    @GetMapping(value="partner/check-id")
    public ResponseEntity<?> checkId(@RequestParam("partnerId") String partnerId){
    	int checkIDResult = partnerService.checkedSameId(partnerId);
    	return new ResponseEntity<>(checkIDResult, HttpStatus.OK);
    }
    
    //업체 정보 조회 
    @GetMapping(value="partner/{partnerSeq}")
    public ResponseEntity<?> findPartnerInfo(@PathVariable(name="partnerSeq") Long partnerSeq){
    	PartnerResponseDto partnerInfo = partnerService.findPartnerInfo(partnerSeq);
    	return new ResponseEntity<PartnerResponseDto>(partnerInfo, HttpStatus.OK);
    }
    
    //업체 정보 수정 
    @PutMapping(value="partner")
    public ResponseEntity<?> updatePartnerInfo(@RequestBody PartnerUpdateDto partnerUpdateDto){
    	Long updatePartnerInfo = partnerService.updatePartnerInfo(partnerUpdateDto);
    	return new ResponseEntity<Long>(updatePartnerInfo, HttpStatus.OK);
    }
    
    //전체 업체 정보 조회 (파트너 전용 페이지)
    @GetMapping(value="partner/info/{partnerSeq}")
    public PartnerResponseDto findPartnerInfoMore(@PathVariable(name="partnerSeq") Long partnerSeq) {
    	log.info("전체 업체 정보 조회 실행.....");
    	return partnerService.findPartnerInfoMore(partnerSeq);
    }
    
    //관리자 여부 판단 - admin 계정이 맞으면 Y, 아니면 N return
    @GetMapping(value="admin/{partnerSeq}")
    public String isAdmin(@PathVariable(name="partnerSeq") Long partnerSeq) {
    	return partnerService.isAdmin(partnerSeq);
    }
    
	//회원 검색
	@GetMapping(value="admin/partner")
	public List<PartnerResponseDto> searchPartner(@RequestParam("keyword") String keyword){
		log.info("keyword : {}", keyword);
		return partnerService.searchPartner(keyword);
	}
}
