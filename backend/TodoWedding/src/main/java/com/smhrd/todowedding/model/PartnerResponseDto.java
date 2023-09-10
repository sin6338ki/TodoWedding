package com.smhrd.todowedding.model;

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
	private String partner_name;
	private String partner_address;
	private String partner_tel;
	private String partner_link;
	
}
