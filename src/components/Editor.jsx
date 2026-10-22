import React, { useEffect } from 'react';
import "./Editor.css";
import { useState } from 'react';
import { useRef } from 'react';
import { TodoDispatchContext } from '../contexts/TodoContext';
import { use } from 'react';
const Editor = () => {
    const [content, setContent] = useState("");
    const contentRef = useRef();

    const {onCreate} = use(TodoDispatchContext);
   
    //mount될 때  커서 놓기
    useEffect(()=>{
        contentRef.current.focus();
    }, []);
    

    //추가하기 기능 
    const onSubmit = ()=>{
      if(content.trim()===""){
         contentRef.current.focus();
         return;
      }

      //부모(App.jsx)쪽에 있는 onCreate함수를 호출한다.
      onCreate(content);
      setContent("");
      contentRef.current.focus();
    }

    //키보드를 눌렀을때 enter이면 onSubmit()호출
    const onKeyDown = (e)=>{
        if(e.key==="Enter")
            onSubmit();
    }

    return (
        <div className="Editor">
            <input type="text" placeholder='새로운 todo' value={content} 
             onChange={(e)=>setContent(e.target.value)}  ref={contentRef}  onKeyDown={onKeyDown}/>
            <button onClick={onSubmit}>추가</button>
        </div>
    );
};

export default Editor;
