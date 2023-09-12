import React, { useEffect, useState } from "react";

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
    
    // 검색어 저장
    const [searchPlace, setSearchPlace] = useState("");
    
    // 검색 결과를 저장
    const [places, setPlaces] = useState([]);

    const searchPlaces = () => {
        // Places 서비스 객체 사용.
        var places = new kakao.maps.services.Places();

        // 키워드 검색의 결과를 처리할 콜백함수
        var callback = function(result, status) {
            if (status === kakao.maps.services.Status.OK) {
                // 검색이 이루어지면 결과를 변수에 저장
                setPlaces(result);
            }
        };

        places.keywordSearch(searchPlace, callback);
    }

    useEffect(() => {
        
        const container = document.getElementById('KakaoMap'); // 지도를 담을 ID
        const options = { 
            center: new kakao.maps.LatLng(35.1595454, 126.8526012), // 광주 중심 좌표
            level: 3 // Level이 낮을 수록 확대, 높을 수록 축소
        };
        
        const map = new kakao.maps.Map(container, options); // 지도 생성
    
       let currentInfowindow; // 마커 클릭시 정보 창이 나오고, 한번더 클릭시 정보창을 닫게하기 위해 만든 변수
    
       for (let i=0; i<places.length; i++) {
            // 각 장소에 대해 마커 위치 생성
           let markerPosition  = new kakao.maps.LatLng(places[i].y, places[i].x);

           // 마커 객체 생성, position설정 (문서)
           let marker = new kakao.maps.Marker({
               position : markerPosition
           });
    
           // 마커가 지도 위에 표시되도록 설정
           marker.setMap(map);
    
          // 장소에 대한 설명 표시 가져올수 있는 정보는 위 설명
          var infowindowContent =
              '<div style="padding:5px;">' +
              `<h5>${places[i].place_name}</h5>` +
              `<p>${places[i].address_name}</p>` +
              `<p>Latitude: ${places[i].y}</p>`  +  // 위도
              `<p>Longitude: ${places[i].x}</p>` +  // 경도
              "</div>";
            
          var infowindow=new kakao.maps.InfoWindow({content:infowindowContent});
    
          // 마커에 클릭이벤트를 등록
          kakao.maps.event.addListener(marker,'click', makeOverListener(map, marker, infowindow));
       }
       
       function makeOverListener(map, marker, infowindow) {
         return function() {
             if (currentInfowindow) { // 만약 이미 열려 있는 infowindow(정보창)이 있다면 닫기
                currentInfowindow.close();
             }
             
             if (currentInfowindow === infowindow) {  
                currentInfowindow = null; // 마커가 클릭 이벤트 발생 시 그 정보창을 닫고 currentInfowindow 값 null로 설정
             } else {
                infowindow.open(map ,marker);  // 다른 마커를 클릭하면 해당 마커의 정보창 열고
                currentInfowindow = infowindow;  // 현재 열린 정보창 갱신
             }
         };
      }
    
    }, [places]);

   return (
    <div>
        <input type="text" placeholder="장소 검색" onChange={(e)=>setSearchPlace(e.target.value)} />
        <button onClick={searchPlaces}>검색</button>
        <div id="KakaoMap" style={{width: '500px', height: '400px'}}></div>
        <a href="http://localhost:3000/todowedding/chatting">채팅방 이동</a>
    </div>
);
};

export default Map;