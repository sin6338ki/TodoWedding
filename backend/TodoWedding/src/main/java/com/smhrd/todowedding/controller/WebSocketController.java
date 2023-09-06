package com.smhrd.todowedding.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

import com.smhrd.todowedding.model.Greeting;
import com.smhrd.todowedding.model.HelloMessage;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class WebSocketController {

//	@MessageMapping("/hello")
//	@SendTo("topic/greetings")
//	public Greeting greeting(HelloMessage message) throws Exception {
//		Thread.sleep(1000); // simulated delay
//		return new Greeting("Hello, " + HtmlUtils.htmlEscape(message.getChattingContents() + "!");
//	}
	
	@MessageMapping("/hello")
	public void greeting(HelloMessage message) throws Exception {
		Thread.sleep(1000); // simulated delay
		log.info("확인 : " + message.getChattingContents());
	}
}
