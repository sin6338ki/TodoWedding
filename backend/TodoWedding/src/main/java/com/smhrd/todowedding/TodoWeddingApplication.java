package com.smhrd.todowedding;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class TodoWeddingApplication {

	public static void main(String[] args) {
		SpringApplication.run(TodoWeddingApplication.class, args);
	}

}
