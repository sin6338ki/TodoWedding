import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import addTodo from '../../assets/images/icon/plus (1).png'

// React-Toastify 알림창
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
 
  useEffect(() => {
    console.log(location.state);
    fetchItems();
  }, [checkItemSeq]);

// CheckItemSeq에 저장된 항목별 체크리스트 불러오기
  const fetchItems = async () => {
    try {
      const response = 
      await axios.get(`http://localhost:8085/checkitem/${checkItemSeq}`);
      setItems(response.data);
      console.log(response.data)
    } catch(error) {
      console.error('Checklist items fetching error : ', error);
    }
  };

  //+ 버튼 누르면 Todo List에 추가
const addToDo = async (item) => {
    console.log("Adding to ToDo List: ", item.checkitem_list_contents);
    const data = {
        todolistContents: item.checkitem_list_contents,
        memberSeq: 123456789, // 실제 멤버 ID로 교체
    };
    try {
        const response = await axios.post('http://localhost:8085/todolist', data);
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
        console.error('Error adding todo list item : ', error);
        toast.error("일정 추가에 실패했습니다.",{
            position:"top-right"
        });
    }
};

//     //checkbox에 체크하면 우측 +버튼 숨기기
//    const handleCheckChange = (itemId, isChecked) => {
//      setCheckedItems(prevCheckedItems => {
//       if (isChecked) {
//         return [...prevCheckedItems, itemId];
//       } else {
//         return prevCheckedItems.filter(id => id !== itemId);
//       }
//     });
//   };

// Todo List 페이지로 이동하는 함수
const goToTodoListPage = () => {
    navigate('/todowedding/todolist');
  };


  return (
    <div>
        <ToastContainer />
        {location.state && (
            <div className='checkitemseq-intro'>
                <p>{location.state.check_item_contents} 체크리스트를 알려드립니다! <br/>
                미완료 항목은 +버튼을 눌러 나의 Todo List에 추가할 수 있어요!
                </p>
            </div>
        )}
        <div className='checkitemseq-item'>
            {items.map((item, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                    <input type="checkbox"
                        // onChange={(e) => handleCheckChange(item.checkitem_list_seq, e.target.checked)}
                    />
                    <p className='checkitemseq-content'>{item.checkitem_list_contents}</p>
                    {!checkedItems.includes(item.checkitem_list_seq) && (
                        <button className='checkitemseq-plus'>
                            <img src={addTodo} alt="addTodo" width="25px" onClick={() => addToDo(item)} />
                        </button>
                    )}
                </div>
            ))}
        </div>
        <button className='checkitemseq-todo' onClick={goToTodoListPage}>Todo List 보러가기</button>
    </div>
  )
}
            

export default CheckItemSeq