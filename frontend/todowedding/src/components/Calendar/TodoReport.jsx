import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";

const TodoReport = () => {
  const [todoListCount, setTodoListCount] = useState(null);

  //userSeq 받아오기
  const token = useSelector((state) => state.Auth.token);
  const userSeq = token?.userSeq;

  useEffect(() => {
    const fetchTodoListCount = async () => {
      try {
        const response = await axios.get(`http://localhost:8085/count-of-todolist/${userSeq}`);
        setTodoListCount(response.data);;
        console.log('TodoReport 결과 : ',response.data)
      } catch (error) {
        console.log('투두리스트 카운트 조회 에러 : ', error);
      }
    };

    fetchTodoListCount();
  }, [userSeq]);

  return (
    <div>
    {todoListCount !== null ? (
      <>
        <p>총 투두리스트 개수 : {todoListCount.count} 개</p>
        <p>완료 개수 : {todoListCount.todolist_completed}</p>
      </>
    ) : (
      <p>Loading...</p>
    )}
  </div>
  );
};

export default TodoReport;