package com.smhrd.todowedding.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.todowedding.service.MemberService;

//회원관련 컨트롤러 - 회원가입, 로그인, 로그아웃, 회원탈퇴, 결혼일 추가 및 조회
@CrossOrigin("http://localhost:3000")
@RestController
public class MemberController {

	@Autowired
	private MemberService service;
}
