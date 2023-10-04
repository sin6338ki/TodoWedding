import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Todo from "./Todo";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import addBtn from "../../assets/images/icon/plus (1).png";

/*

Todolist (추가/삭제/전체조회:완료), (완료-미완료 개수조회 /수정 :기능수정)
작성자 : 양수진
작성일 : 2023.09.08 */

const style = {
    container: `max-w-[500px] w-full m-auto rounded-md  p-4 mt-100`,
    heading: `pt-3 text-3xl font-bold text-center text-gray-800`,
    form: `flex justify-between mt-[50px] mx-[22px] h-[45px]`,
    input: `border p-2 w-full h-[50px] text-m rounded-lg mr-1 text-center`,
    button: `w-[45px] h-[6]`,
    count: `text-center px-7 py-2 box-content bg-violet-300 rounded-full text-sm`,
};



const TodoList = () => {
    
    const nav = useNavigate();
    const token = useSelector((state) => state.Auth.token);
    const memberSeq = token ? token.userSeq : 0;

   
    useEffect(() => {
        if (!memberSeq) {
            nav("/");
        }
    }, [memberSeq, nav]);
    

    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState("");
    const [isChecked, setIsChecked] = useState();

    // 2.전체 투두리스트 조회
    useEffect(() => {
        const fetchDataAndCout = async () => {
            await fetchData();
            await cntTodoList(); 
        };

        fetchDataAndCout();
    }, [input]);

 
    // 1.투두리스트 추가 메서드
    const createTodo = async (e) => {
        e.preventDefault(e);
        console.log("실행", input);
        if (input === "") {
            alert("내용을 입력해주세요");
            return;
        }

        // boot에서 쓰는 dto참조해서 가져오기
        const data = {
            todolistContents: input,
            memberSeq: memberSeq,
        };

        // try~catch (추가작성 09.15)
        try {
            const response = await axios.post("http://localhost:8085/todolist", data);
            console.log("response : ", response);

            // 서버로부터 반환된 새로운 투두 데이터
            const newTodo = response.data;

            // 기존의 투두 리스트 배열(todos)에 새로운 투두 데이터(newTodo)를 추가하여 업데이트
            setTodos((prevTodos) => [...prevTodos, newTodo]);

            // 입력 필드 초기화
            setInput("");
        } catch (err) {
            console.log("error", err);
        }
    };

   
    // 삭제 실행 메서드 변경 코드
    const deleteTodo = async (todolistSeq) => {
        try {
            // console.log("투두리스트 삭제 실행, todolistSeq : ", todolistSeq);
            const response = await axios.delete(`http://localhost:8085/todolist/${todolistSeq}`);
            // console.log("deleteTodolist 삭제성공 response : ", response.data);
            // 화면에서 삭제 시각적인 효과 적용
            if (response.data === 1) {
                setTodos((prevTodos) => prevTodos.filter((todo) => todo.todolistSeq !== todolistSeq));
                cntTodoList();
            }
        } catch (err) {
            console.error("delete 삭제 error : ", err);
        }
    };

    //전체 투두리스트 조회 메서드
    const fetchData = async () => {
        // fetchData 수정(09.15)
        try {
            const res = await axios.get(`http://localhost:8085/todolist/${memberSeq}`);
            // console.log("findallTodolist 조회 response : ", res.data);
            setTodos(res.data);
        } catch (error) {
            console.error("Error", error);
        }
    };

    //완료, 미완료 건수 조회하기

    const [completedCnt, setCompletedCnt] = useState();
    const [unCompletedCnt, setUnCompletedCnt] = useState();

    const cntTodoList = async () => {
        try {
            const res = await axios.get(`http://localhost:8085/count-of-todolist/${memberSeq}`);
            // console.log("cntTodoList response", res.data);
            // console.log("cntTodoList response length", res.data.length);
          

            /**
             * count를 불러왔을 때 배열의 크기가 1인 경우 => 전체가 진행이거나 전체가 완료인 상태
             * => 첫번째 값(0번 인덱스)가 N ==> 모두 진행인 상태 ==> 완료를 0, 진행을 배열[0] 값으로
             * => 첫번째 값(0번 인덱스)가 Y ==> 모두 완료인 상태 ==> 진행을 0, 완료를 배열[0] 값으로
             *
             * count를 불러왔을 때 배열의 크기가 2인경우 => 진행, 완료 둘다 있는 상태
             * 기존 대로
             */
            if (res.data.length == 1) {
                if (res.data[0].todolist_completed === "N") {
                    setCompletedCnt(0);
                    setUnCompletedCnt(res.data[0].count);
                } else if (res.data[0].todolist_completed === "Y") {
                    setUnCompletedCnt(0);
                    setCompletedCnt(res.data[0].count);
                }
            } else {
                setUnCompletedCnt(res.data[0].count);
                setCompletedCnt(res.data[1].count);
            }
        } catch (err) {
            // console.log("cntTodoList err : ", err);
        }
    };

    //하나의 투두리스트 항목에 대하여 변화가 있을 때 (체크하거나 미체크했을 때)
    //count 조회 메서드 실행
    const [changeCheck, setChangeCheck] = useState(false);
    useEffect(() => {
        cntTodoList();
    }, [changeCheck]);

    return (
        //html
        <div>
            <div>
                <div className="checkitem-intro">
                    나만의 웨딩 투두리스트를 등록하고
                    <br />
                    원하는 웨딩 일정을 캘린더에 추가해보세요!
                </div>

                {/* 투두리스트 조회 (전체_진행_완료)  */}
                <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                    className="mt-[25px] mx-[5%] mb-[25px]"
                >
                    {todos.length < 1 ? null : (
                        <span className={style.count}> {`전체 : ${unCompletedCnt + completedCnt}건`}</span>
                    )}
                    {todos.length < 1 ? null : <span className={style.count}> {`진행 : ${unCompletedCnt}건`}</span>}
                    {todos.length < 1 ? null : <span className={style.count}> {`완료 : ${completedCnt}건`}</span>}
                </div>

                {/* <h3 className={style.heading}>Todo List</h3> */}
                <form onSubmit={createTodo} className={style.form} style={{ marginTop: "20px", marginBottom: "-20Px" }}>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className={style.input}
                        type="text"
                        placeholder="투두리스트를 입력하세요"
                    />
                    <button className={style.button}>
                        {/* <AiOutlinePlus size={30} /> */}
                        <img src={addBtn} style={{ width: "35px", margin: "10%" }} />
                    </button>
                </form>
                <div className="mt-[60px] mb-10">
                    {todos.map((todolistContents) => (
                        <Todo
                            // key 값 수정 (09.25 >> 삭제 수정)
                            key={todolistContents.todolistSeq}
                            setChangeCheck={setChangeCheck}
                            changeCheck={changeCheck}
                            todolistContents={todolistContents}
                            toggleComplete={() => toggleComplete(todolistContents.todolistSeq)}
                            deleteTodo={() => deleteTodo(todolistContents.todolistSeq)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
export default TodoList;