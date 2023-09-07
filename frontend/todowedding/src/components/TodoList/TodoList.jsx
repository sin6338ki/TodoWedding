import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Todo from "./Todo";
import { Link } from "react-router-dom";
import axios from "axios";

const style = {
    bg: `bg-gradient-to-r from-[#F9FAFB] to-[#F9FAFB]`,
    container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
    heading: `text-3xl font-bold text-center text-greay-800 p-2`,
    form: `flex justify-between`,
    input: `border p-2 w-full text-xl`,
    button: `border p-4 ml-2 bg-purple-500 text-slate-100`,
    count: `text-center p-2`,
};

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState("");
    const [isChecked, setIsChecked] = useState("");

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
            alert("please enter a valid todo");
            return;
        }

        // boot에서 쓰는 dto참조해서 가져오기
        const data = {
            todolistContents: input,
            memberSeq: 123456789,
        };

        //backend axios통신
       await axios
            .post("http://localhost:8085/todolist", data)
            .then((res) => {
                console.log("response : ", res);
                fetchData();
            })
            .catch((err) => {
                console.log("error", err);
            });
    };

    // 2.전체 투두리스트 조회
    useEffect(() => {
        fetchData();
    }, []);

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

    //  4. const deleteTodo = async (id) =>{
    //    await deleteDoc(doc(db, 'todos', id))
    //  }

    // 4. 투두리스트 삭제 실행 메서드
    //  const deleteTodo = async (id) => {                      //
    //   try {
    //     const data = await axios.delete(`http://localhost:8085/todolist/123456789/100345720715870279`)     //`http://localhost:8085/todolist/${memberSeq}/${todolistSeq}`
    //     .then((res) =>{
    //        console.log("deleteTodolist 삭제성공 response : ", res.data);
    //     }).catch((err) =>{
    //       console.log("delete 삭제 error : ", err)
    //     })
    //   } catch (err) {
    //     console.error("deleteTodolist: ", err);
    //   }
    // }

    // 삭제 실행 메서드 변경 코드
    const deleteTodo = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8085/todolist/123456789/${id}`);
            console.log("deleteTodolist 삭제성공 response : ", response.data);
            // 화면에서 삭제 시각적인 효과 적용
            setTodos((prevTodos) => prevTodos.filter((todo) => todo.todolistSeq !== id));
        } catch (err) {
            console.error("delete 삭제 error : ", err);
        }
    };

    //전체 투두리스트 조회 메서드
    const fetchData = async () => {
        try {
            const response = await axios
                .get(`http://localhost:8085/todolist/123456789`) //`http://localhost:8085/todolist/${memberSeq}`
                .then((res) => {
                    console.log("findallTodolist 조회 response : ", res.data);
                    setTodos(res.data);
                })
                .catch((err) => {
                    console.log("findallTodolist 조회 error : ", err);
                });
        } catch (error) {
            console.error("Error", error);
        }
    };

    return (
        //html
        <div className={style.bg}>
            <div className={style.container}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Link to="todowedding/calendar" style={{ marginRight: "30px" }}>
                        <span>Calendar</span>
                    </Link>
                    <Link to="todowedding/todolist" style={{ marginRight: "30px" }}>
                        <span>TodoList</span>
                    </Link>
                    <Link to="todowedding/budget" style={{ marginRight: "30px" }}>
                        <span>Budget</span>
                    </Link>
                </div>

                {/* 투두리스트 갯수 (전체_진행_완료)  */}
                {todos.length < 1 ? null : <p className={style.count}> {`전체 : ${todos.length}`}</p>}

                <h3 className={style.heading}>Todo List😎</h3>
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
                            todolistContents={todolistContents}
                            toggleComplete={toggleComplete} // 투두체크 props처리 문제
                            deleteTodo={() => deleteTodo(todolistContents.todolistSeq)} // 투두삭제 props처리 문제
                        />
                    ))}
                </ul>
            </div>
        </div>
    );

export default TodoList;
