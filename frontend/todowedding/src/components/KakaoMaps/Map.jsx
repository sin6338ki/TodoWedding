import React, { useEffect, useState } from "react";
import axios from "axios";
import StudioMarker from "../../assets/images/icon/studiomaker.png";
import WeddingHallMarker from "../../assets/images/icon/hollmaker.png";
import BasicMarker from "../../assets/images/icon/basicmaker.png";
import "../../assets/KakaoMaps_Css/KakaoMaps.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

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
    const nav = useNavigate();

    const [dbPlaces, setDbPlaces] = useState([]); // DB에서 가져온 장소 정보를 저장
    const [searchedPlaces, setSearchedPlaces] = useState([]); // 검색된 장소 정보를 저장
    const [searchPlace, setSearchPlace] = useState(""); // 사용자가 입력한 검색어를 저장
    const [currentCategory, setCurrentCategory] = useState("웨딩홀_스튜디오"); // 선택된 카테고리 상태 관리

    //userSeq 받아오기
    const token = useSelector((state) => state.Auth.token);
    const userSeq = token ? token.userSeq : 0;

    //로그인 전이면(userSeq가 0일 때) 다시 메인페이지로
    useEffect(() => {
        if (!userSeq) {
            nav("/");
        }
    }, [userSeq, nav]);

    const changeMarker = (type) => {
        setCurrentCategory(type);
        if (type === "웨딩홀_스튜디오") {
            setSearchedPlaces([]); // 검색 결과 초기화
        }
    };

    // DB에서 장소 정보 가져오기
    useEffect(() => {
        axios
            .get("http://localhost:8085/kakaomaps")
            .then((response) => {
                // 응답 데이터 설정 (위도와 경도 정보를 가진 배열)
                console.log("DB에서 가져온 데이터", response.data); // <-- 여기서 데이터 확인
                setDbPlaces(
                    response.data.map((item) => ({
                        /* 받아온 정보
                        item.partner_seq -> 업체 고유번호
                        item.partner_name -> 업체 이름
                        item.partner_address -> 업체 주소
                        item.partner_latitude -> 위도
                        item.partner_longitude -> 경도
                        item.partner_link -> 홈페이지 링크
                        item.partner_tel -> 업체 전화번호
                        item.partner_code -> 업체 구분코드 ex) 웨딩홀, 스튜디오
                    */
                        partner_seq: item.partner_seq,
                        place_name: item.partner_name,
                        address_name: item.partner_address,
                        y: item.partner_latitude,
                        x: item.partner_longitude,
                        partner_code: item.partner_code,
                        partner_tel: item.partner_tel,
                        partner_link: item.partner_link,
                    }))
                );
            })
            .catch((error) => {
                console.error("위도 경도 데이터 가져오는중에 에러 : ", error);
            });
    }, []);

    const searchPlaces = () => {
        // Places 서비스 객체 사용.
        var places = new kakao.maps.services.Places();

        // 키워드 검색의 결과를 처리할 콜백함수
        var callback = function (result, status) {
            if (status === kakao.maps.services.Status.OK) {
                // 검색이 이루어지면 결과를 변수에 저장
                setSearchedPlaces(result);
            } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
                // 검색 결과가 없는 경우
                alert("입력하신 검색어가 존재하지 않습니다.");
            } else if (searchPlace.trim() === "") {
                // 빈 문자열을 입력한 경우
                alert("검색어를 입력해 주세요.");
            } else {
                // 그 외의 오류 상황
                alert("검색 중 오류가 발생했습니다.");
            }
        };

        places.keywordSearch(searchPlace, callback);
    };

    // 지도 생성 및 마커 설정
    useEffect(() => {
        const container = document.getElementById("KakaoMap"); // 지도를 담을 ID
        const options = {
            center: new kakao.maps.LatLng(35.1595454, 126.8526012), // 광주 중심 좌표
            level: 8, // Level이 낮을 수록 확대, 높을 수록 축소
        };

        const map = new kakao.maps.Map(container, options); // 지도 생성

        // 각각의 marker와 overlay를 짝지어 저장할 객체
        let markerInfo = {};

        const mapMarkers = (placesArray) =>
            placesArray.forEach((place) => {
                // 각 장소에 대해 마커 위치 생성
                let markerPosition = new kakao.maps.LatLng(place.y, place.x);

                // 웨딩홀과 스투디오 검색결과 이미지 저장 변수
                let markerImageSrc;

                if (place.partner_code === "웨딩홀") {
                    markerImageSrc = WeddingHallMarker;
                } else if (place.partner_code === "스튜디오") {
                    markerImageSrc = StudioMarker;
                } else {
                    // 기본 마커 이미지 경로 (이미지가 없을 경우 빈 문자열로 설정)
                    markerImageSrc = BasicMarker;
                }

                let imageSize = new kakao.maps.Size(52, 50);
                let imageOption = { offset: new kakao.maps.Point(27, 69) };

                // 마커 이미지 설정 (빈 문자열이 아닌 경우에만 사용)
                let markerImage = markerImageSrc
                    ? new kakao.maps.MarkerImage(markerImageSrc, imageSize, imageOption)
                    : null;

                // 이미지 마커
                let marker = new kakao.maps.Marker({
                    position: markerPosition,
                    image: markerImage,
                });

                marker.setMap(map);

                var phone = place.phone ? place.phone : "전화번호 없음";

                // 커스텀 오버레이에 표출될 내용
                var content;
                if (place.partner_code === "웨딩홀") {
                    content = `
                    <div class="map_wrap">
                        <div class="map_info">
                            <div class="map_weddinghall">
                                ${place.place_name}
                                <button id="map_closeBtn">✖</button>
                            </div>
                            <div class="map_body">
                                <div class="map_desc">
                                    <div class="map_ellipsis">${place.address_name}</div>
                                    <div class="map_jibun ellipsis">${place.partner_tel}</div>

                                     <div class="button_container"> 
                    <a href="${place.partner_link}" target="_blank"class="map_link">홈페이지</a>
                    <a href="/todowedding/chatting/${place.partner_seq}">
                        <button class="consult_button">1:1 상담</button> 
                    </a>            
                </div>
            </div>
        </div>
    </div>`;
                } else if (place.partner_code === "스튜디오") {
                    content = `
                    <div class="map_wrap">
                        <div class="map_info">
                            <div class="map_studio">
                                ${place.place_name}
                                <button id="map_closeBtn">✖</button>
                            </div>
                            <div class="map_body">
                                <div class="map_desc">
                                    <div class="map_ellipsis">${place.address_name}</div>
                                    <div class="map_jibun ellipsis">${place.partner_tel}</div>
                                    <div class="button_container"> 
                    <a href="${place.partner_link}" target="_blank"class="map_link">홈페이지</a>
                    <a href="/todowedding/chatting/${place.partner_seq}">
                        <button class="wedding_button">1:1 상담</button> 
                    </a>            
                </div>
            </div>
        </div>
    </div>`;
                } else {
                    content = `
                    <div class="map_wrap">
                        <div class="map_info">
                            <div class="map_default">
                                ${place.place_name}
                                <button id="map_closeBtn">✖</button>
                            </div>
                            <div class="map_body">
                                <div class="map_desc">
                                    <div class="map_ellipsis">${place.address_name}</div>
                                    <div class="map_jibun ellipsis">${phone}</div>
                                    <div><a href="${place.place_url}" target="_blank"class="map_link">홈페이지</a></div>
                                </div>
                            </div>
                        </div>
                    </div>`;
                }

                // yAnchor 값 조정: 기본 마커일 경우와 그렇지 않은 경우를 분리해서 처리
                let yAnchorValue;
                if (!markerImageSrc) {
                    yAnchorValue = 2;
                } else {
                    yAnchorValue = 1;
                }

                var customOverlay = new kakao.maps.CustomOverlay({
                    map: place.partner_seq === 101 ? map : null, // partner_seq가 101인 경우에만 초기에 오버레이를 보여줌
                    position: markerPosition,
                    content: content,
                    yAnchor: yAnchorValue,
                });

                // x버튼 클릭시 정보창 닫기
                document.addEventListener("click", function (e) {
                    if (e.target.id === "map_closeBtn") {
                        if (markerInfo.currentOverlay) {
                            markerInfo.currentOverlay.setMap(null);
                        }
                        markerInfo.currentMarker = null;
                        markerInfo.currentOverlay = null;
                    }
                });

                // 마커를 클릭하면 해당 커스텀 오버레이가 표시되거나 사라지게 함
                kakao.maps.event.addListener(marker, "click", function () {
                    // 만약 이전에 열었던 overlay가 있다면 그것을 먼저 닫음
                    if (markerInfo.currentMarker && markerInfo.currentOverlay) {
                        markerInfo.currentOverlay.setMap(null);

                        // 같은 마커를 두 번 클릭한 경우 overlay만 닫고 함수 종료
                        if (marker === markerInfo.currentMarker) {
                            markerInfo.currentMarker = null;
                            markerInfo.currentOverlay = null;
                            return;
                        }
                    }

                    // 새롭게 클릭한 경우 overlay 표시 및 현재 사용중인 marker와 overlay 갱신
                    customOverlay.setMap(map);

                    // 현재 사용중인 Marker 및 Overlay 갱신
                    markerInfo.currentMarker = marker;
                    markerInfo.currentOverlay = customOverlay;
                });
            });

        let filteredDbPlaces = dbPlaces;
        let filteredSearchedPlaces = searchedPlaces;

        if (currentCategory !== "웨딩홀_스튜디오") {
            filteredDbPlaces = dbPlaces.filter((place) => place.partner_code === currentCategory);
            filteredSearchedPlaces = searchedPlaces.filter((place) => place.partner_code === currentCategory);
        }

        mapMarkers(filteredDbPlaces);
        mapMarkers(filteredSearchedPlaces);
    }, [dbPlaces, searchedPlaces, currentCategory]);

    return (
        <div>
            <div>
                <div className="map_btn_container">
                    <button className="select_all" onClick={() => changeMarker("웨딩홀_스튜디오")}>
                        전체
                    </button>
                    <button className="select_weddinghall" onClick={() => changeMarker("웨딩홀")}>
                        웨딩홀
                    </button>
                    <button className="select_studio" onClick={() => changeMarker("스튜디오")}>
                        스튜디오
                    </button>
                    <input
                        type="text"
                        className="input_map_place"
                        placeholder="검색어 입력"
                        onChange={(e) => setSearchPlace(e.target.value)}
                    />
                    <button className="input_map_place_btn" onClick={searchPlaces}>
                        검색
                    </button>
                </div>
            </div>

            <div
                id="KakaoMap"
                className="Kakao_Conainer"
                style={{ width: "560px", height: "732px", marginTop: "2px", position: "fixed"}}
            ></div>
            {/* <a href="http://localhost:3000/todowedding/chatting">채팅방 이동</a> */}
        </div>
    );
};

export default Map;