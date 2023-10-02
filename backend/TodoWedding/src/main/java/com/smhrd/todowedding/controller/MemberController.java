package com.smhrd.todowedding.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.todowedding.model.MemberResponseDto;
import com.smhrd.todowedding.service.MemberService;

import lombok.extern.slf4j.Slf4j;

/**
 * 회원 관련 컨트롤러
 * @author 신지영
 * @since 2023.09.18
 */

@Slf4j
@RestController
public class MemberController {
	
	@Autowired
	private MemberService memberService;
	
	//회원 검색
	@GetMapping(value="admin/member")
	public List<MemberResponseDto> searchMember(@RequestParam("keyword") String keyword){
		log.info("keyword : {}", keyword);
		return memberService.searchMember(keyword);
	}

}
