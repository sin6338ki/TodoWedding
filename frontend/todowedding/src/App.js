import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import BottomBar from "./components/BottomBar/BottomBar";
//import Login from "./components/Login/Login";
import Kakaologin from "./components/Login/Kakaologin";
import Callback from "./components/Login/Callback";
import Join from "./components/Member/Join";
import Delete from "./components/Member/Delete";
import Main from "./components/Main";
import Calendar from "./components/Calendar/Calendar";
import TodoList from "./components/TodoList/TodoList";
import Budget from "./components/Budget/Budget";
import Map from "./components/Map";
import WeddingReport from "./components/WeddingReports/WeddingReport";
import Chatting from "./components/FindPartner/Chatting";
import ChattingRoom from "./components/FindPartner/ChattingRoom";
import "./tailwind.css";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WebImage from "./assets/images/web_image.png"

function App() {
    return (
        <BrowserRouter>
            <div style={{display:'flex', justifyContent:'center'}}>
            <div>
                <Header />
                <div className="body" id="Pretendard-Regular">
                <Routes>
                    <Route path="/" element={<Main />} />
                     
                    {/* 로그인 */}
                    <Route path="/todowedding/login" element={<Kakaologin />} />
                    <Route path='/auth/kakao/callback' element={<Callback />} />
                    <Route path="/todowedding/join" element={<Join />} />
                    <Route path="/todowedding/delete" element={<Delete />} />

                    {/* MainMenu */}
                    <Route path="/todowedding/calendar" element={<Calendar />} />
                    <Route path="/todowedding/todolist" element={<TodoList />} />
                    <Route path="/todowedding/budget" element={<Budget />} />
                    <Route path="/todowedding/map" element={<Map />} />

                    {/* 업체찾기 */}
                    
                    {/* 채팅목록 */}
                    <Route path="/todowedding/chatting" element={<Chatting />}></Route>
                    {/* 실제 채팅방 */}
                    <Route path="todowedding/chat-room" element={<ChattingRoom />}></Route>

                    {/*웨딩리포트 */}
                    <Route path="/todowedding/weddingreport" element={<WeddingReport />} />
                   
                </Routes>
                </div>
                <BottomBar/ >
            </div>
            
            {/*웹 페이지 */}
            <div style={{height:"100%"}}>
                <img src={WebImage} alt="web-image"/>
            </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
