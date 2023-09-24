import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import addTodo from "../../assets/images/icon/plus (1).png";
import { useSelector } from "react-redux";

// React-Toastify 알림창
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/*
 * CheckItemSeq에 저장된 항목별 체크리스트, Todo List에 추가
 * 작성자 : 서현록
 * 작성일 : 2023.09.12
 */

const CheckItemSeq = () => {
    const [items, setItems] = useState([]);
    const { checkItemSeq } = useParams();
    let location = useLocation();
    const [checkedItems, setCheckedItems] = useState([]);
    const navigate = useNavigate();

    //userSeq 받아오기
    const token = useSelector((state) => state.Auth.token);
    const userSeq = token ? token.userSeq : 0;

    useEffect(() => {
        console.log(location.state);
        fetchItems();
    }, [checkItemSeq]);

    // CheckItemSeq에 저장된 항목별 체크리스트 불러오기
    const fetchItems = async () => {
        try {
            const response = await axios.get(`http://3.36.116.165:8085/checkitem/${checkItemSeq}`);
            setItems(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Checklist items fetching error : ", error);
        }
    };

    //+ 버튼 누르면 Todo List에 추가
    const addToDo = async (item) => {
        // userSeq가 없으면 알림창 띄우고 함수 종료
        if (!userSeq) {
            alert("로그인 이후 서비스를 이용해주세요");
            return;
        }
        console.log("Todo List에 추가 내용 : ", item.checkitem_list_contents);
        const data = {
            todolistContents: item.checkitem_list_contents,
            memberSeq: userSeq,
        };
        try {
            const response = await axios.post("http://3.36.116.165:8085/todolist", data);
            console.log(response.data);

            // // 알림 메시지 표시
            // alert(`'${item.checkitem_list_contents}' 일정이 Todo List에 추가되었습니다.`);

            // 알림 메시지 표시
            toast.success(`'${item.checkitem_list_contents}' 일정이 Todo List에 추가되었습니다.`, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (error) {
            console.error("Error adding todo list item : ", error);
            toast.error("일정 추가에 실패했습니다.", {
                position: "top-right",
            });
        }
    };

    // Todo List 페이지로 이동
    const goToTodoListPage = () => {
        // userSeq가 없으면 알림창 띄우고 함수 종료
        if (!userSeq) {
            alert("로그인 이후 서비스를 이용해주세요");
            return;
        } else {
            navigate("/todowedding/todolist");
        }
    };

    return (
        <div>
            <ToastContainer />
            {location.state && (
                <div className="checkitemseq-intro">
                    <p>
                        {location.state.check_item_contents} 체크리스트를 알려드립니다! <br />
                        미완료 항목은 + 버튼을 눌러
                        <br></br>자신의 투두리스트에 추가할 수 있어요.
                    </p>
                </div>
            )}
            <div className="checkitemseq-item">
                {items.map((item, index) => (
                    <div key={index} style={{ display: "flex", alignItems: "center" }}>
                        <input type="checkbox" />
                        <p className="checkitemseq-content">{item.checkitem_list_contents}</p>
                        {!checkedItems.includes(item.checkitem_list_seq) && (
                            <button className="checkitemseq-plus">
                                <img src={addTodo} alt="addTodo" width="20px" onClick={() => addToDo(item)} />
                            </button>
                        )}
                    </div>
                ))}
            </div>
            <button className="checkitemseq-todo" onClick={goToTodoListPage}>
                Todo List 보러가기
            </button>
        </div>
    );
};

export default CheckItemSeq;
