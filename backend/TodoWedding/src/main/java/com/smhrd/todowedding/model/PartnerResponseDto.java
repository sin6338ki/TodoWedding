package com.smhrd.todowedding.model;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/*
 * Partner info에 대한 responseDto
 * 작성자 : 신지영
 * 작성일 : 2023.09.10
 */

@NoArgsConstructor
@Getter
public class PartnerResponseDto {

	private Long partner_seq;
	private String partner_id;
	private String partner_pw;
	private String partner_name;
	private String partner_registration;
	private String partner_address;
	private String partner_tel;
	private String partner_link;
	private String partner_manager;
	private String partner_manager_tel;

	@Builder
	public PartnerResponseDto(Long partner_seq, String partner_name, String partner_address, String partner_tel,
			String partner_link) {
		this.partner_seq = partner_seq;
		this.partner_name = partner_name;
		this.partner_address = partner_address;
		this.partner_tel = partner_tel;
		this.partner_link = partner_link;
	}
	
	@Builder
	public PartnerResponseDto(Long partner_seq, String partner_id, String partner_pw, String partner_name, String partner_registration,
			String partner_address, String partner_tel, String partner_link, String partner_manager,
			String partner_manager_tel) {
		this.partner_seq = partner_seq;
		this.partner_id = partner_id;
		this.partner_pw = partner_pw;
		this.partner_name = partner_name;
		this.partner_registration = partner_registration;
		this.partner_address = partner_address;
		this.partner_tel = partner_tel;
		this.partner_link = partner_link;
		this.partner_manager = partner_manager;
		this.partner_manager_tel = partner_manager_tel;
	}
	

	
}
