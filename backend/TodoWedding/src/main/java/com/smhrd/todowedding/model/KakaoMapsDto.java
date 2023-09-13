package com.smhrd.todowedding.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/*
 * 카카오맵에 표시할 마커 관련 DTO
 * 작성자 : 서유광
 * 작성일 : 2023.09.12
 */

@NoArgsConstructor
@Getter
@Setter
@ToString
public class KakaoMapsDto {
	private int partner_seq; // 업체 고유번호
	private String partner_name;// 업체명
	private String partner_address; // 업체 주소
	private String partner_latitude; // 업체 위도
	private String partner_longitude; // 업체 경도
}
