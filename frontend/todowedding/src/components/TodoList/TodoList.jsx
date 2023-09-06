import React, {useState, useEffect} from 'react'
import {AiOutlinePlus} from 'react-icons/ai'
import Todo from './Todo'
import {db} from '../../firebase'
import {query, collection, onSnapshot, updateDoc , doc, addDoc, deleteDoc} from 'firebase/firestore'
import { Link } from 'react-router-dom';


const style = {
   bg: `p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
   container : `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
   heading : `text-3xl font-bold text-center text-greay-800 p-2`,
   form : `flex justify-between` , 
   input : `border p-2 w-full text-xl`,
   button : `border p-4 ml-2 bg-purple-500 text-slate-100`,
   count : `text-center p-2`
}

const TodoList = () => {
  const [todos, setTodos] = useState([])
  const [input , setInput] = useState('')
  

  // Create todo (투두생성)
 const createTodo = async (e) =>{
  e.preventDefault(e)
   if(input === '') {
    alert ('please enter a valid todo')
    return
   }
   await addDoc(collection(db, 'todos'), {
    text : input,
    completed : false,
   })
   setInput('')
 }



  // Read todo from firebase (임시DB)
 useEffect(()=>{
const q = query(collection(db, 'todos'))
const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
   let todosArr = []
   QuerySnapshot.forEach((doc) =>{
    todosArr.push({...doc.data(), id: doc.id})
   })
   setTodos(todosArr)
})
return () => unsubscribe()
 },[])

  // update todo in firebase 
  const toggleComplete = async (todo) => {
   await updateDoc(doc(db, 'todos', todo.id), {
    completed : !todo.completed
   })
  }
  // delete todo (삭제하기 기능)
 const deleteTodo = async (id) =>{
   await deleteDoc(doc(db, 'todos', id))
 }



  return (

     
  
   
     





    
    <div className={style.bg}>
       <div className={style.container}>


       <Link to="todowedding/calendar">
      <span>일정관리</span>
      </Link>
      <Link to="todowedding/todolist">  
      <span>투두리스트</span>
      </Link>
      <Link to="todowedding/budget"> 
        <span>예산관리</span>
      </Link>    
      {todos.length < 1 ? null : <p className={style.count}> {`You have ${todos.length} todos`}</p> } 
        <h3 className={style.heading}>Todo List😎</h3>
        
        <ul>
          {todos.map((todo, index)=>(
                  <Todo 
                  key={index} 
                  todo={todo} 
                  toggleComplete={toggleComplete} 
                  deleteTodo={deleteTodo} 
                  />
          ))}
      
        </ul>
       
         <form onSubmit={createTodo} className={style.form}>
           <input 
           value={input}
           onChange={(e) => setInput(e.target.value)} 
           className={style.input} 
           type="text" 
           placeholder='내용을 기입하세요'
           />
           <button className={style.button}>
            <AiOutlinePlus size={30} />
           </button>                                      
        </form>
       </div>
    </div>
  );
}

export default TodoList