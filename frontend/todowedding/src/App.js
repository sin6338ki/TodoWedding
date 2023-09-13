/* eslint-disable */

/**
 * 라우터 연결
 * 작성자 : 서현록, 양수진
 * 수정
 *  - 업체 전용 페이지 추가 (신지영, 2023.09.10)
 */

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import BottomBar from "./components/BottomBar/BottomBar";
import Kakaologin from "./components/Login/Kakaologin";
import KakaologOut from "./components/Login/KakaologOut";
import Callback from "./components/Login/Callback";
import Join from "./components/Member/Join";
import Delete from "./components/Member/Delete";
import Main from "./components/Main";
import Calendar from "./components/Calendar/Calendar";
import CheckItemList from "./components/CheckList/CheckItemList";
import CheckItemSeq from "./components/CheckList/CheckItemSeq"
import DayCheckList from "./components/CheckList/DayCheckList"
import DayCheckSeq from "./components/CheckList/DayCheckSeq"
import UpdateSchedule from './components/Calendar/UpdateSchedule';
import Schedule from "./components/Calendar/Schedule";
import TodoList from "./components/TodoList/TodoList";
import Budget from "./components/Budget/Budget";
import Map from "./components/Map";
import WeddingReport from "./components/WeddingReports/WeddingReport";
import Chatting from "./components/FindPartner/Chatting";
import ChattingRoom from "./components/FindPartner/ChattingRoom";
import "./tailwind.css";
import "./index.css";
import "./calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WebImage from "./assets/images/web_image.png";

//업체 전용 관련
import Partner from "./components/PartnerPage/Partner";
import PartnerJoin from "./components/PartnerPage/PartnerJoin";
import PartnerLogin from "./components/PartnerPage/PartnerLogin";

function App() {
    return (
        <BrowserRouter>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div>
                    <Header />
                    <div className="body" id="Pretendard-Regular">
                        <Routes>
                            <Route path="/" element={<Main />} />
                            {/* 로그인 */}
                            <Route path="/todowedding/login" element={<Kakaologin />} />
                            <Route path="/auth/kakao/callback" element={<Callback />} />
                            <Route path="/auth/kakao/logout" element={<KakaologOut />} />
                            <Route path="/todowedding/join" element={<Join />} />
                            <Route path="/todowedding/delete" element={<Delete />} />
                            
                            {/* 일정관리 */}
                            <Route path="/todowedding/calendar" element={<Calendar />} />
                            <Route path="/todowedding/schedule" element={<Schedule />} />
                            <Route path="/todowedding/schedule/:scheduleSeq" element={<UpdateSchedule />} />
                            {/* 체크리스트 */}
                            <Route path="/checkitem" element={<CheckItemList />} />
                            <Route path="/checkitem/:checkItemSeq" element={<CheckItemSeq />} />
                            <Route path="/daychecklist" element={<DayCheckList />} />
                            <Route path="/daychecklist:checkdaySeq" element={<DayCheckSeq />} />
                            
                            {/* Todo List */}
                            <Route path="/todowedding/todolist" element={<TodoList />} />
                            {/* 예산관리 */}
                            <Route path="/todowedding/budget" element={<Budget />} />
                            
                            {/*웨딩리포트 */}
                            <Route path="/todowedding/weddingreport" element={<WeddingReport />} />
                            
                            {/* 업체찾기 */}
                            <Route path="/todowedding/map" element={<Map />} />
                            {/* 채팅목록 */}
                            <Route path="/todowedding/chatting" element={<Chatting />}></Route>
                            {/* 실제 채팅방 */}
                            <Route path="todowedding/chat-room/:chatRoomSeq" element={<ChattingRoom />}></Route>
                            {/* 업체 전용 페이지 */}
                            <Route path="/todowedding/partner/login" element={<PartnerLogin />}></Route>
                            <Route path="/todowedding/partner" element={<Partner />}></Route>
                            <Route path="/todowedding/partner/join" element={<PartnerJoin />}></Route>
                        </Routes>
                    </div>
                    <BottomBar />
                </div>

                {/*웹 페이지 */}
                <div style={{ height: "100%" }}>
                    <img src={WebImage} alt="web-image" />
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
