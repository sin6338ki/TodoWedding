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

/*
 * 회원 관련 컨트롤러
 * 작성 : 신지영
 * 일자 : 2023.09.18
 */

@Slf4j
@CrossOrigin(origins = {"http://localhost:3000", "http://172.30.1.7:3000", "http://3.36.116.165:3000"})
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
