
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/header";
import Login from "./components/Login";
import Join from "./components/Member/Join";
import Delete from "./components/Member/Delete";
import Main from "./components/Main";
import Calendar from "./components/Calendar/Calendar";
import TodoList from "./components/TodoList/TodoList";
import Budget from "./components/Budget/Budget";
import Map from "./components/Map";
import AllMenu from "./components/AllMenu";
import WeddingReport from "./components/WeddingReports/WeddingReport";
import Footer from "./components/footer/footer";


function App() {

    return (
        <BrowserRouter>
        <div>
            <Header/>
            <Routes>
                <Route path="/" element={<Main/>}/>

                {/* 로그인 */}
                <Route path="/todowedding/login" element={<Login />} />
                <Route path="/todowedding/join" element={<Join />} />
                <Route path="/todowedding/delete" element={<Delete />} />

                {/* MainMenu */}
                <Route path="/todowedding/calendar" element={<Calendar/>}/>
                <Route path="/todowedding/todolist" element={<TodoList/>}/>
                <Route path="/todowedding/budget" element={<Budget/>}/>
                <Route path="/todowedding/map" element={<Map/>}/>

                {/* footer */}            
                <Route path="/todowedding/weddingreport" element={<WeddingReport/>}/>
                <Route path="/todowedding/weddingreport" element={<WeddingReport/>}/>
                <Route path="/todowedding/weddingreport" element={<WeddingReport/>}/>
            
            </Routes>
            <Footer/>
        </div>
        </BrowserRouter>
    );
}

export default App;
