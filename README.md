# TodoWedding (팀명: 플딩)
![서비스-소개-003](https://github.com/2023-SMHRD-SW-Fullstack-1/TodoWedding/assets/130349912/14f0a2ed-1e17-49c4-911f-3a0b7d31d3c5)

## 1. 프로젝트 개요
* 과제명 : 캘린더, 메시지, 지도 API와 웹소켓을 활용한 일정 맞춤형 결혼 준비 가이드 모바일 웹 플랫폼
* 프로젝트 기간 : 2023.08.24 ~ 2023.10.06
* 프로젝트 설명 : 복잡하고 까다로운 결혼 준비를 쉽고, 체계적으로 관리할 수 있도록 돕는 결혼 준비 일정 및 예산 관리 플랫폼

## 2. 시연영상
https://www.youtube.com/watch?v=ZtA-vr4f5VE

## 3. 사용언어 및 도구
![image](https://github.com/2023-SMHRD-SW-Fullstack-1/TodoWedding/assets/130349912/91ca8d97-3ed7-4ff8-b911-71a6ac4821dc)

## 4. 시스템 아키텍쳐
![image](https://github.com/sin6338ki/TodoWedding/assets/130349912/9cc746d6-5f3a-48db-a44c-d3acf2e8a05b)


## 5. 맡은 역할
  * 프로젝트 팀장, 프로젝트 총괄 및 결과 발표
  * 데이터베이스 설계
  * **AWS 배포**
  * GitHub 협업 관리
  * 카카오 메시지 API 및 Spring Boot Scheduling Tasks 활용 **오늘 일정/하루 남은 일정에 대한 알림 메시지 전송** 기능
    & D-day 조회하여 특정 D-day가 됐을 때 해당 D-day에 대한 체크리스트를 전송하는 **자동 체크리스트 전송** 기능 구현
  * **웨딩 체크리스트 백엔드** 기능 구현
  * **웨딩 캘린더 백엔드** 기능 구현
  * **웨딩 투두리스트 백엔드** 기능 구현
  * **1:1 상담(채팅) 기능 WebSocket(STOMP)를 활용**하여 **프론트엔드(React) 및 백엔드(SpringBoot)** 기능 구현
    (채팅방 생성, 채팅방 구독, 입장메시지, 퇴장메시지, 메시지 전송)
  * **업체 전용 페이지** 업체 정보 수정, 채팅방 리스트 **프론트엔드 & 백엔드** 구현
  * **관리자 페이지** 대시보드, 업체 리스트, 회원 리스트 조회, 검색 수정 **프론트엔드 & 백엔드** 구현
  * Redux를 통한 회원 정보 상태 관리 기능 구현

### 일정 알림 기능 구현 내용
![image](https://github.com/sin6338ki/TodoWedding/assets/130349912/3cf6c81f-b0ae-4f92-a932-00ec1edd0d98)
![image](https://github.com/sin6338ki/TodoWedding/assets/130349912/23658e3a-8909-41d0-92bc-5808ffae83fd)
![image](https://github.com/sin6338ki/TodoWedding/assets/130349912/5066403c-0a07-4500-b4c7-3443bd96f9e4)

### 채팅방 구현 내용
![image](https://github.com/sin6338ki/TodoWedding/assets/130349912/2661fb77-a98c-4263-81b2-152a89579638)
![image](https://github.com/sin6338ki/TodoWedding/assets/130349912/0eee20a8-1503-4068-b01b-cffa49db7524)

### AWS 배포 내용
![image](https://github.com/sin6338ki/TodoWedding/assets/130349912/8fdd369a-7d87-4712-b4c3-e0b25e3af763)


## 8. 트러블슈팅
### 8-1) AWS 배포 관련 트러블슈팅
  ![image](https://github.com/2023-SMHRD-SW-Fullstack-1/TodoWedding/assets/130349912/bcf67b6c-a2c9-45e4-a162-7ced8fb41c0f)

### 8-2) 카카오 톡캘린더 일정 추가 요청 에러 관련
  * 카카오 톡캘린더 www-form-urlencoded 타입으로 요청 받음 > qs 라이브러리 활용하여 event 객체를 해당 타입으로 변환하였으나 지속적으로 에러 발생
  * 중첩된 객체는 라이브러리를 통해 json 문자열로 변환하고, 다시 qs 라이브러리를 활용해 event 객체를 www-form-urlencoded 타입으로 변환하여 요청함으로써 문제 해결
  ![image](https://github.com/2023-SMHRD-SW-Fullstack-1/TodoWedding/assets/130349912/6c2b75b8-6b6a-43a6-b7c1-9c71c615eaf1)
![image](https://github.com/2023-SMHRD-SW-Fullstack-1/TodoWedding/assets/130349912/6927602f-1ae6-476d-b8b3-ddf2d7232c17)
