
import './App.css'
import Header from './components/Header'
import Editor from './components/Editor'
import List from './components/List'
import { useMemo, useReducer, useRef } from 'react';
import { TodoDispatchContext, TodoStateContext } from './contexts/TodoContext';


//랜더링이 될때 다시 실행되지 않아도 되기에 함수 밖에 선언한다.
const mockData = [
  {id:0, isDone:false, content:"React study", date: new Date().getTime()},
  {id:1, isDone:false, content:"친구만나기", date: new Date().getTime()},
  {id:2, isDone:false, content:"낮잠자기", date: new Date().getTime()},
];

const reducer = (state, action)=>{
 //console.log(state)
 //console.log(action)

  switch(action.type){
      case "CREATE" : return [action.data, ...state];
      case "UPDATE" : return state.map(todo=> todo.id===action.targetId ? {...todo , isDone:!todo.isDone} : todo)
      case "DELETE" : return state.filter((todo)=>todo.id!==action.targetId)
      default : return state;
    }


}

function App() {
  //const [todos , setTodos] = useState(mockData);
    const [todos, dispatch] = useReducer(reducer , mockData);

  const idRef = useRef(3);

  //추가하기
  const onCreate = (content)=>{    
    dispatch({
      type:"CREATE",
      data : {id:idRef.current++ , isDone:false, content:content , date: new Date().getTime()}
    })
  };

  //수정하기
  const onUpdate = (targetId)=>{
     dispatch({
      type:"UPDATE",
      targetId 
    });
  };

  //삭제하기 
  const onDelete = (targetId)=>{
    dispatch({
      type:"DELETE",
      targetId 
    });
  };

  //const memoizedDispatch = useMemo(()=>{return {onCreate, onDelete, onUpdate}} , []);
  //const aa ={onCreate, onDelete, onUpdate};
  //const memoizedDispatch = useMemo(()=>aa , []);

  const memoizedDispatch = useMemo(()=> ({onCreate, onDelete, onUpdate}), []);

  return (
    <div className="App">
     <Header/>
     <TodoStateContext value={todos}>
        <TodoDispatchContext value={memoizedDispatch}>
          <Editor />
          <List />
        </TodoDispatchContext>
     </TodoStateContext>
    </div>
  )
}

export default App
