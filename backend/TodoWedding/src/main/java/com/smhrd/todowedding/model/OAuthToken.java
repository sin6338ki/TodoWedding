package com.smhrd.todowedding.model;

import lombok.Data;

/**
 * 카카오 로그인 토큰 값 저장
 * @author 서유광
 * @since 2023.09.05
 */

@Data
public class OAuthToken {
	private String access_token;
	private String token_type;
	private String refresh_token;
	private int expires_in;
	private String scope;
	private int refresh_token_expires_in;
}
