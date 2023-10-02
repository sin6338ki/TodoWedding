package com.smhrd.todowedding;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * cors 설정을 위한 config
 * @author 신지영
 * @since 2023.10.02
 */

@Configuration
@EnableWebMvc
public class TodoWeddingConfig implements WebMvcConfigurer {

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
        .allowedOrigins("http://localhost:3000", "http://172.30.1.9:3000", "http://15.165.15.107:3000")
        .allowedMethods("GET","POST", "PUT", "DELETE", "OPTIONS")
        .allowedHeaders("*");
	}
}
