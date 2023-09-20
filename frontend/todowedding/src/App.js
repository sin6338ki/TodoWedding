/* eslint-disable */

/**
 * 라우터 연결
 * 작성자 : 서현록, 양수진
 * 수정
 *  - 업체 전용 페이지 추가 (신지영, 2023.09.10)
 *  - 예산 관리 페이지 추가 (양수진, 2023.09.12)
 *  - 체크리스트 페이지 추가 (서현록, 2023.09.12)
 *  - 관리자 페이지 추가 (신지영, 2023.09.12)
 *  - 마이페이지(로그아웃, 회원탈퇴) 추가 (서현록, 2023.09.16)
 *  - 결혼예정일 페이지, 총 예산 페이지 추가 (서현록, 2023.09.18)
 */

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./tailwind.css";
import "./index.css";
import "./FullCalendar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MarginImage from "./assets/images/MarginImage.png"
import WebImage from "./assets/images/TodoWebImage.png";

import Header from "./components/Header/Header";
import BottomBar from "./components/BottomBar/BottomBar";
import Main from "./components/Main/Main";
import GuidePage from './components/Main/GuidePage';
import ADSlickSlider from "./components/Main/ADSlickSlider";

//Login
import Kakaologin from "./components/Login/Kakaologin";
import KakaologOut from "./components/Login/KakaologOut";
import Callback from "./components/Login/Callback";
import Mypage from "./components/Login/Mypage";

//일정관리
import Calendar from "./components/Calendar/Calendar";
import Schedule from "./components/Calendar/Schedule";
import UpdateSchedule from "./components/Calendar/UpdateSchedule";
import CalCallback from "./components/Calendar/CalCallback";

//체크리스트
import CheckItemList from "./components/CheckList/CheckItemList";
import CheckItemSeq from "./components/CheckList/CheckItemSeq";
import DayCheckList from "./components/CheckList/DayCheckList";
import DayCheckSeq from "./components/CheckList/DayCheckSeq";

//TodoList
import TodoList from "./components/TodoList/TodoList";

//Chatting
import Chatting from "./components/FindPartner/Chatting";
import ChattingRoom from "./components/FindPartner/ChattingRoom";

//업체 전용 관련
import Partner from "./components/PartnerPage/Partner";
import PartnerJoin from "./components/PartnerPage/PartnerJoin";
import PartnerLogin from "./components/PartnerPage/PartnerLogin";
import Kakao from "./components/Calendar/Kakao";

// 예산관리 관련
import BudgetApp from "./components/Budget/BudgetApp";

//관리자 페이지
import AdminIndex from "./components/AdminPage/Index";

//카카오 맵 관련
import Map from "./components/KakaoMaps/Map";
import PartnerInfo from "./components/PartnerPage/PartnerInfo";

//Admin
import AdminPartnerInfo from "./components/AdminPage/PartnerInfo";
import MarryDate from "./components/AddInfo/MarryDate";
import TotalBudget from "./components/AddInfo/TotalBudget";

function AppContent() {

    return (
        <div style={{backgroundColor: "#F8FAF9"}}>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div>
                    <Header />
                    <div className="body" id="Pretendard-Regular" style={{backgroundColor: "#ffffff"}}>
                        <Routes>
                            <Route path="/" element={<Main />} />
                            <Route path="/todowedding/guide/:id" element={<GuidePage/>} />
                            
                            {/* 로그인 */}
                            <Route path="/todowedding/login" element={<Kakaologin />} />
                            <Route path="/auth/kakao/callback" element={<Callback />} />
                            <Route path="/auth/kakao/logout" element={<KakaologOut />} />
                            <Route path="/todowedding/mypage" element={<Mypage />} />

                            {/* 결혼예정일, 총 예산 추가 */}
                            <Route path="/todowedding/marrydate" element={<MarryDate />} />
                            <Route path="/todowedding/member/total" element={<TotalBudget />} />

                            {/* 일정관리 */}
                            <Route path="/todowedding/calendar" element={<Calendar />} />
                            <Route path="/todowedding/schedule" element={<Schedule />} />
                            <Route path="/todowedding/schedule/:scheduleSeq" element={<UpdateSchedule />} />

                            {/* 체크리스트 */}
                            <Route path="/checkitem" element={<CheckItemList />} />
                            <Route path="/checkitem/:checkItemSeq" element={<CheckItemSeq />} />
                            <Route path="/daychecklist" element={<DayCheckList />} />
                            <Route path="/daychecklist/:checkdaySeqParams" element={<DayCheckSeq />} />

                            {/* Todo List */}
                            <Route path="/todowedding/todolist" element={<TodoList />} />

                            {/* 예산관리 */}
                            <Route path="/todowedding/budget" element={<BudgetApp />} />

                            {/* 업체찾기 */}
                            <Route path="/todowedding/map" element={<Map />} />

                            {/* 채팅목록 */}
                            <Route path="/todowedding/chatting/:partnerSeq" element={<Chatting />}></Route>

                            {/* 실제 채팅방 */}
                            <Route path="/todowedding/chat-room/:chatRoomSeq" element={<ChattingRoom />}></Route>

                            {/* 업체 전용 페이지 */}
                            <Route path="/todowedding/partner/login" element={<PartnerLogin />}></Route>
                            <Route path="/todowedding/partner" element={<Partner />}></Route>
                            <Route path="/todowedding/partner/join" element={<PartnerJoin />}></Route>
                            <Route path="/todowedding/partner/info" element={<PartnerInfo />}></Route>

                            {/* 카카오 캘린더 */}
                            <Route path="/kakaoCal" element={<Kakao />}></Route>
                            <Route path="/auth/kakaoCal/callback" element={<CalCallback />}></Route>

                            {/* 관리자 페이지 */}
                            <Route path="/todowedding/admin" element={<AdminIndex />}></Route>
                            <Route path="/todowedding/admin/partner" element={<AdminPartnerInfo />}></Route>
                        </Routes>
                    </div>
                    <BottomBar />
                </div>

                {/*웹 이미지 */}
                <div style={{ width: " 350px", backgroundColor: "#F8FAF9" , marginLeft: "25px" }}>
                    <img src={MarginImage} alt="margin-image" style={{height: "90px"}}/>
                    <div style={{paddingBottom: "20px"}}>
                        <ADSlickSlider />
                    </div>
                    <img src={WebImage} alt="web-image" />
                    <img src={MarginImage} alt="margin-image" style={{height: "190px"}}/>
                </div>
            </div>
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}

export default App;