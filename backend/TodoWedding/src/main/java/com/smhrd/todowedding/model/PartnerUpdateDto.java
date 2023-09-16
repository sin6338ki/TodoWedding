package com.smhrd.todowedding.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 업체 정보 수정 DTO
 * 작성자 : 신지영
 * 작성일 : 2023.09.16
 */

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class PartnerUpdateDto {
	private Long partnerSeq;
	private String partnerPw;
	private String partnerName;
	private String partnerRegistration;
	private String partnerTel;
	private String partnerLink;
	private String partnerManager;
	private String partnerManagerTel;
	private String partnerAddress;
}
