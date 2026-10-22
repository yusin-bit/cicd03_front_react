import React, { useMemo } from 'react';
import TodoItem from './TodoItem';
import "./List.css"
import { useState } from 'react';
import { useContext } from 'react';
import { TodoStateContext } from '../contexts/TodoContext';
const List = () => {
    const [search, setSearch] = useState("");

    const todos  = useContext(TodoStateContext);

    const getFilterData = ()=>{
        //console.log(1)
        if(search==="") return todos;


       return todos.filter((todo)=>todo.content.toLowerCase().includes(search.toLowerCase()))
      
    }

    const filterTodos = getFilterData();// List 컴포넌트가 리랜더링 될때마다 호출된다(search state변경될때..)

    //연산작업하기 
    /* const getAnalyedData = ()=>{
        console.log("getAnalyedData call....");

        const totalCount = todos.length;
        const doneCount = todos.filter(todo=>todo.isDone).length;
        const notDoneCount = totalCount - doneCount;

        return {totalCount:totalCount , doneCount:doneCount , notDoneCount};
     }

     const {totalCount , doneCount , notDoneCount} = getAnalyedData();*/
    ///////////////////////////////////////////////////////////////////////////////
     //위 getAnalyedData 코드를 useMemo를 이용해보자 
     const {totalCount , doneCount , notDoneCount} = useMemo(()=>{
        console.log("useMemo call....");

        const totalCount = todos.length;
        const doneCount = todos.filter(todo=>todo.isDone).length;
        const notDoneCount = totalCount - doneCount;

        return {totalCount:totalCount , doneCount:doneCount , notDoneCount};
     } , [todos]);


    return (
        <div className="List">
            <h4>Todo List 🌱</h4>
            <div>
               <div>totalCount : {totalCount}</div>
               <div>doneCount : {doneCount}</div>
               <div>notDoneCount : {notDoneCount}</div>
            </div>

            <input placeholder='검색어를 입력해주세요.' value={search} onChange={(e)=>setSearch(e.target.value)} />
            <div className="todos_wrapper">
                {
                   // todos.map((todo)=>{
                    filterTodos.map((todo)=>{
                    //   return <TodoItem key={todo.id} {...todo} />
                   // return <TodoItem key={todo.id}  id={todo.id}  isDone={todo.isDone}/>
                   //return <TodoItem key={todo.id}   todo={{ id:todo.id ,isDone : todo.isDone}}>
                   //return <TodoItem key={todo.id}   todo={{...todo}}/>
                   return <TodoItem key={todo.id}   {...todo} />
                    })
                }
            </div>
        
        </div>
    );
};

export default List;
