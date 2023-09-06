import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/header";
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
import Footer from "./components/footer/footer";
import Chatting from "./components/FindPartner/Chatting";
import ChattingRoom from "./components/FindPartner/ChattingRoom";
import "./tailwind.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    return (
        <BrowserRouter>
            <div>
                <Header />
                <Routes>
                    <Route path="/" element={<Main />} />

                    {/* 로그인 */}
                    <Route path="/todowedding/login" element={<Kakaologin />} />
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
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
