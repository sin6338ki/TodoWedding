package com.smhrd.todowedding.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import lombok.RequiredArgsConstructor;

/*
 * 웹소켓 사용을 위한 Config 파일
 * 작성자 : 신지영
 * 작성일 : 2023.09.05
 */
@Configuration
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
	
	@Override
	public void configureMessageBroker(MessageBrokerRegistry registry) {
		//해당 파라미터의 접두사가 붙은 목적지(구독자)에 메시지 전송
		registry.enableSimpleBroker("/sub");
		//전역적인 주소 접두사 지정하기 싫으면 ("/") 사용
		//도착 경로에 대한 prefix 설정
		registry.setApplicationDestinationPrefixes("/pub");
	}
	
	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry) {
		//"websocket" 라는 엔드포인트 등록
		registry
				.addEndpoint("/websocket")
				.setAllowedOriginPatterns("*")
				.addInterceptors()
				//fallback - client가 sockJS로 개발되었을 때 필요 
				.withSockJS();
	}
}
