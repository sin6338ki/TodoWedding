package com.smhrd.todowedding.model;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * 기업회원 정보
 * @author 서유광
 * @since 2023.09.08
 * 수정 
 * 	- 회원가입용, 회원확인용 Builder 추가
*/

@NoArgsConstructor
@Getter
@Setter
@ToString
public class PartnerDTO {
	private int partner_seq; // 업체 고유번호
	private String partner_id; // 업체 아이디
	private String partner_pw; // 업체 비밀번호
	private String partner_name;// 업체명
	private String partner_registration; //사업자 등록번호
	private String partner_tel; // 업체 전화번호
	private String partner_link; // 업체 홈페이지 링크
	private String partner_manager; // 업체 담당자
	private String partner_manager_tel; // 업체 담당자 번호
	private String partner_address; // 업체 주소
	private String partner_registration_dt; // 업체 등록일
	private String partner_code; // 구분코드
	private String admin_yn; // 관리자 구분
	private String partner_latitude; // 업체 위도
	private String partner_longitude; // 업체 경도
	
	@Builder
	PartnerDTO(String partner_id, String partner_pw){
		this.partner_id = partner_id;
		this.partner_pw = partner_pw;
	}

	@Builder
	public PartnerDTO(String partner_id, String partner_pw, String partner_name, String partner_registration,
			String partner_tel, String partner_link, String partner_manager, String partner_manager_tel,
			String partner_address, String partner_code) {
		this.partner_id = partner_id;
		this.partner_pw = partner_pw;
		this.partner_name = partner_name;
		this.partner_registration = partner_registration;
		this.partner_tel = partner_tel;
		this.partner_link = partner_link;
		this.partner_manager = partner_manager;
		this.partner_manager_tel = partner_manager_tel;
		this.partner_address = partner_address;
		this.partner_code = partner_code;
	}

}
