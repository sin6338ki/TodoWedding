package com.smhrd.todowedding;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

/**
 * STOMP 웹소켓 적용 Config
 * @author 신지영
 * @since 2023.09.06
 */

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

	@Override
	public void configureMessageBroker(MessageBrokerRegistry config) {
		config.enableSimpleBroker("/sub"); // 해당 경로를 구독하는 클라이언트에게 메세지 전달
		config.setApplicationDestinationPrefixes("/pub"); //클라이언트에서 send 요청 처리
	}
	
	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry) {
		registry.addEndpoint("/stomp-chat").setAllowedOriginPatterns("*");
	}
}
