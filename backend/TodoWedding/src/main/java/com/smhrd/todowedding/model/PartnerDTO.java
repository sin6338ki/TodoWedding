package com.smhrd.todowedding.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/*
 * 기업회원 정보
 * 작성자 : 서유광
 * 작성일 : 2023.09.08
*/

@AllArgsConstructor
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

}
