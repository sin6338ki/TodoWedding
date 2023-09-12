import React, { useEffect, useState } from "react";
import axios from "axios";

/**
 * 업체찾기 페이지 (1:1 채팅방 이동, Kakao Maps API 사용, place 서비스 객체 사용)
 * 작성자 : 서유광
 * 작성일 : 2023.09.12 
 */

// Places 서비스 객체 -> Kakao Maps API에서 제공하는 Places 서비스 객체, 장소 검색과 관련된 여러 기능을 제공
/*
    Places 서비스 객체 사용해서 가져올수 있는 정보
        - address_name: 전체 주소
        - category_group_code: 카테고리 그룹 코드
        - category_group_name: 카테고리 그룹 이름
        - category_name: 카테고리 이름
        - distance: 중심 좌표부터의 거리 (미터 단위)
        - id: 장소 ID
        - phone: 전화번호
        - place_name: 장소 이름
        - place_url: 장소 상세 페이지 URL
        - road_address_name: 도로명 주소
        - x and y : 경도와 위도
*/

const Map = () => {
    
    const [dbPlaces, setDbPlaces] = useState([]); // DB에서 가져온 장소 정보를 저장
    const [searchedPlaces, setSearchedPlaces] = useState([]); // 검색된 장소 정보를 저장
    const [searchPlace, setSearchPlace] = useState(""); // 사용자가 입력한 검색어를 저장

// DB에서 장소 정보 가져오기
useEffect(() => {
    axios.get('http://localhost:8085/kakaomaps')
        .then(response => {
            // 응답 데이터 설정 (위도와 경도 정보를 가진 배열)
            console.log(response.data); // <-- 여기서 데이터 확인
            setDbPlaces(response.data.map(item => ({
                partner_seq: item.partner_seq,
                place_name: item.partner_name,
                address_name: item.partner_address,
                y: item.partner_latitude,
                x: item.partner_longitude,
                
            })));
        })
        .catch(error => {
            console.error('위도 경도 데이터 가져오는중에 에러 : ', error);
        });
}, []);

const searchPlaces = () => {
    // Places 서비스 객체 사용.
    var places = new kakao.maps.services.Places();

    // 키워드 검색의 결과를 처리할 콜백함수
    var callback = function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
            // 검색이 이루어지면 결과를 변수에 저장
            setSearchedPlaces(result);
        }
    };

    places.keywordSearch(searchPlace, callback);
}

// 지도 생성 및 마커 설정
useEffect(() => {
        
    const container = document.getElementById('KakaoMap'); // 지도를 담을 ID
    const options = { 
        center: new kakao.maps.LatLng(35.1595454, 126.8526012), // 광주 중심 좌표
        level: 8 // Level이 낮을 수록 확대, 높을 수록 축소
    };
    
    const map = new kakao.maps.Map(container, options); // 지도 생성

   let currentInfowindow; // 마커 클릭시 정보 창이 나오고, 한번더 클릭시 정보창을 닫게하기 위해 만든 변수

   const mapMarkers = placesArray =>
    placesArray.forEach(place => {
        // 각 장소에 대해 마커 위치 생성
        let markerPosition  = new kakao.maps.LatLng(place.y, place.x);

        // 마커 객체 생성, position설정 (문서)
        let marker = new kakao.maps.Marker({
            position : markerPosition
        });

        // 마커가 지도 위에 표시되도록 설정
        marker.setMap(map);

       // 장소에 대한 설명 표시

       var infowindowContent;
       
       if (placesArray === dbPlaces) { 
           infowindowContent =
           '<div style="overflow: auto;">' +
               `<h5>${place.place_name}</h5>` +
               `<p>${place.address_name}</p>` +
               `<a href="http://localhost:3000/todowedding/chatting?partnerSeq=${place.partner_seq}" style="float: right; margin-right: 10px; display:inline-block;padding:1px;background-color:#007bff;color:white;text-decoration:none;">1:1 상담</a>
            </div>`;
       } else {
           infowindowContent =
           '<div style="overflow: auto;">' +
               `<h5>${place.place_name}</h5>` +
               `<p>${place.address_name}</p>`
            '</div>';
       }
       
    var infowindow=new kakao.maps.InfoWindow({content:infowindowContent});

     // 마커에 클릭이벤트를 등록
     kakao.maps.event.addListener(marker,'click', makeOverListener(map, marker, infowindow));

  });
      
      function makeOverListener(map, marker, infowindow) {
        return function() {
          if (currentInfowindow) { 
             currentInfowindow.close();
          }
          
          if (currentInfowindow === infowindow) {  
             currentInfowindow = null; 
          } else {
             infowindow.open(map ,marker);  
             currentInfowindow = infowindow;
          }
       };
    }

     mapMarkers(dbPlaces);
     mapMarkers(searchedPlaces);

}, [dbPlaces, searchedPlaces]);


return (
    <div>
        <input type="text" placeholder="장소 검색" onChange={(e)=>setSearchPlace(e.target.value)} />
        <button onClick={searchPlaces}>검색</button>
        <div id="KakaoMap" style={{width: '500px', height: '700px'}}></div>
        <a href="http://localhost:3000/todowedding/chatting">채팅방 이동</a>
    </div>
);
};

export default Map;