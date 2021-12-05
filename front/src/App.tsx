import { useEffect, useState } from "react";

import {ITodo} from "./interfaces";
import TodoItem from "./TodoItem";
import api from "./services/api";

export default function App() {
  const [input, setInput] = useState<string>('');

  const [todos, setTodos] = useState<Array<ITodo>>([]);

  useEffect(() => {
    async function fetchTodos(){
      const { data } = await api.get('https://jsonplaceholder.typicode.com/todos');

      setTodos(data.map((item: any) => ({id: item.id, title: item.title})));
    }

    fetchTodos();
  },[]);

  function onAdd(){
    setTodos(state => [...state, {id: state[state.length - 1].id + 1, title: input}]);

    setInput('');
  }

  function onRemove(id: number){
    setTodos(state => state.filter(item => item.id !== id));
  }

  return (
    <section>
      <h1>Todos</h1>
      <div>
        <input value={input} onChange={e => setInput(e.target.value)}/>
        <button onClick={onAdd}>Add</button>
      </div>
      <ul>
        {todos.map(item => 
          <TodoItem key={item.id} item={item} onRemove={onRemove} />
        )}
      </ul>
    </section>
  );
}

