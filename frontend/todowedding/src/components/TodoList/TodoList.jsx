import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Todo from "./Todo";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/*

Todolist (추가/삭제/전체조회:완료), (완료-미완료 개수조회 /수정 :기능수정)
작성자 : 양수진
작성일 : 2023.09.08 */


const style = {
    bg: `bg-gradient-to-r from-[#F9FAFB] to-[#F9FAFB]`,
    container: `max-w-[500px] w-full m-auto rounded-md  p-4`,
    heading: `text-3xl font-bold text-center text-greay-800 p-2`,
    form: `flex justify-between`,
    input: `border p-2 w-full text-xl`,
    button: `border p-4 ml-2 bg-purple-500 text-slate-100`,
    count: `text-center p-2`,
};


//  // 투두 전체-진행-미진행 조회
//  const [completedCnt, setCompletedCnt] = useState();
//  const [unCompletedCnt, setUnCompletedCnt] = useState();

const TodoList = () => {

//userSeq 받아오기
const token = useSelector((state) => state.Auth.token);
const memberSeq = token.userSeq;

const [todos, setTodos] = useState([]);
const [input, setInput] = useState("");
const [isChecked, setIsChecked] = useState();


// useEffect를 사용하여 컴포넌트가 마운트 됐을 때 API 호출 실행
// useEffect(() => {
//     // 비동기 함수 선언
//     const fetchTodos = async () => {
//       try {
//         // API 호출 
//         const response = await axios.get(`http://localhost:8085/todolist/${memberSeq}`);        // 이렇게 적는게 맞는지 확인 
        
//         // API 응답에서 투두리스트 데이터 추출 및 상태 설정
//         setTodos(response.data);
//       } catch (error) {
//         console.error('Failed to fetch todos', error);
//       }
//     };

//     // 비동기 함수 실행
//     fetchTodos();
//   }, []);  // 빈 배열([])은 컴포넌트가 마운트 됐을 때만 실행하라는 의미

// 2.전체 투두리스트 조회
useEffect(() => {
    const fetchDataAndCout = async () => {
        await fetchData();
        await cntTodoList(); //수정
    };

    fetchDataAndCout();
}, [input]);


// 버튼 활성화 
const [activeButton, setActiveButton] = useState("")     

 //캘린더 버튼 클릭 시 이동
 const nav = useNavigate();
 const calendarOnclick = () => {
    nav("/todowedding/calendar");
    setActiveButton("Calendar")
};

//투두리스트 클릭 시 이동
const todoOnclick = () => {
    nav("/todowedding/todolist");
    setActiveButton("Todolist")
};

//예산관리 클릭 시 이동
const budgetOnclick = () => {
    nav("/todowedding/budget");
    setActiveButton("Budget")
};


// GET : axios.get(url)
// POST : axios.post(url, data)
// PUT : axios.put(url, data)
// DELETE : axios.delete(url)

// axios 구조 : axios.get('url')
// .then((res)=>{
//       console.log("response : ", res.data);
//       어떤식 데이터를 받는지 확인 후 내가 뭘 필요하는가를 생각해본 뒤 프론트(화면 혹은 변수로 지정)
// }).catch((err)=>{
//       console.log("error : ", err)
// })

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

    

    //backend axios통신
    // await axios
    //     .post("http://localhost:8085/todolist", data)
    //     .then((res) => {
    //         console.log("response : ", res);
    //         fetchData();
    //     })
    //     .catch((err) => {
    //         console.log("error", err);
    //     });
};



// 3. 투두리스트 체크했을 때 실행되는 메서드 ---> (현재 Todo.jsx에 넣어둠)
const toggleComplete = async (todo) => {
    console.log("check_실행", todo);
    const data = {
        todolistCompleted: isChecked,
        todolistSeq: todo.todolistSeq,
        memberSeq: todo.memberSeq,
    };
    try {
        await axios.put(`http://localhost:8085/todolist/check`, data); //`http://localhost:8085/todolist/${memberSeq}/${todo.todolistSeq}`, data
        console.log("성공 checked ");
    } catch (err) {
        console.error("Error checked: ", err);
    }
};

// 삭제 실행 메서드 변경 코드
const deleteTodo = async (todolistSeq) => {
    try {
        console.log("투두리스트 삭제 실행, todolistSeq : ", todolistSeq);
        const response = await axios.delete(`http://localhost:8085/todolist/${todolistSeq}`);
        console.log("deleteTodolist 삭제성공 response : ", response.data);
        // 화면에서 삭제 시각적인 효과 적용
        response.data === 1 &&
            setTodos((prevTodos) => prevTodos.filter((todo) => todo.todolistSeq !== todolistSeq));
    } catch (err) {
        console.error("delete 삭제 error : ", err);
    }
};

//전체 투두리스트 조회 메서드
const fetchData = async () => { // fetchData 수정(09.15)
    try {
        const res = await axios.get(`http://localhost:8085/todolist/${memberSeq}`); 
        console.log("findallTodolist 조회 response : ", res.data);
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
        console.log("cntTodoList response", res.data);
        console.log("cntTodoList response length", res.data.length);
        // setUnCompletedCnt(res.data[0].count)
        // setCompletedCnt(res.data[1].count) 

        /**
         * count를 불러왔을 때 배열의 크기가 1인 경우 => 전체가 진행이거나 전체가 완료인 상태
         * => 첫번째 값(0번 인덱스)가 N ==> 모두 진행인 상태 ==> 완료를 0, 진행을 배열[0] 값으로
         * => 첫번째 값(0번 인덱스)가 Y ==> 모두 완료인 상태 ==> 진행을 0, 완료를 배열[0] 값으로
         * 
         * count를 불러왔을 때 배열의 크기가 2인경우 => 진행, 완료 둘다 있는 상태 
         * 기존 대로 
         */
        if(res.data.length == 1){
            if(res.data[0].todolist_completed === "N"){
                setCompletedCnt(0)
                setUnCompletedCnt(res.data[0].count)
            }else if(res.data[0].todolist_completed === "Y"){
                setUnCompletedCnt(0)
                setCompletedCnt(res.data[0].count)
            }
        }else{
            setUnCompletedCnt(res.data[0].count)
            setCompletedCnt(res.data[1].count)
        }

    } catch (err) {
        console.log("cntTodoList err : ", err);
    }
};

//하나의 투두리스트 항목에 대하여 변화가 있을 때 (체크하거나 미체크했을 때) 
//count 조회 메서드 실행
const [changeCheck, setChangeCheck] = useState(false)
useEffect(()=>{
    cntTodoList();
}, [changeCheck])


return (
    //html
    <div>
        <div className={style.container}>
            <div style={{ display: "flex", justifyContent: "center" }}>
                
                <button onClick={calendarOnclick} style={{ marginRight: "30px" , fontWeight: activeButton === "Calendar" ? "700" : "normal"}}>
                   Calendar
                   {activeButton === "Calendar" && <line y1="0.5" x2={74} y2="0.5" stroke="black" />}
                </button>
                <button onClick={todoOnclick} style={{ marginRight: "30px", fontWeight: activeButton === "Todolist" ? "700" : "normal"}}>
                   Todolist
                   {activeButton === 'Todolist' && (
                    <svg height="10" width="100">
                    <line x1="0" y1="0" x2="100" y2="0" style={{ stroke: 'black', strokeWidth: '2' }} />
                    </svg>
                    )}
                </button>
                <button onClick={budgetOnclick} style={{ marginRight: "30px" , fontWeight: activeButton === 'Budget' ? '700' : 'normal'}}>
                   Budget
                   {activeButton === 'Budget' && <line y1='0.5' x2={74} y2='0.5' stroke='black'/>}
                </button>

             
            </div>

            {/* 투두리스트 조회 (전체_진행_완료)  */}
            <div style={{ display: "flex", justifyContent: "center" }}>
                {todos.length < 1 ? null : (
                    <span className={style.count}> {`전체 : ${unCompletedCnt + completedCnt}`}</span>
                )}
                {todos.length < 1 ? null : <span className={style.count}> {`진행 : ${unCompletedCnt}`}</span>}
                {todos.length < 1 ? null : <span className={style.count}> {`완료 : ${completedCnt}`}</span>}
            </div>

            <h3 className={style.heading}>Todo List</h3>
            <form onSubmit={createTodo} className={style.form}>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className={style.input}
                    type="text"
                    placeholder="내용을 기입하세요"
                />
                <button className={style.button}>
                    <AiOutlinePlus size={30} />
                </button>
            </form>
            <ul>
                {todos.map((todolistContents, index) => (
                    <Todo
                        key={index}
                        setChangeCheck={setChangeCheck}
                        changeCheck={changeCheck}
                        todolistContents={todolistContents}
                        toggleComplete={() => toggleComplete(todolistContents)}
                        deleteTodo={() => deleteTodo(todolistContents.todolistSeq)}
                        // toggleComplete={toggleComplete} 
                        // deleteTodo={deleteTodo}
                    />
                ))}
            </ul>
        </div>
    </div>
);
};
export default TodoList; 