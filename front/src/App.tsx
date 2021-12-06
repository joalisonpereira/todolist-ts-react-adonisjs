import { useCallback, useEffect, useState } from "react";

import {ITodo} from "./interfaces";
import TodoItem from "./TodoItem";
import api from "./services/api";

export default function App() {
  const [input, setInput] = useState<string>('');

  const [todos, setTodos] = useState<Array<ITodo>>([]);

  const fetchTodos = useCallback(async (): Promise<void> => {
    const { data } = await api.get('/todos');

    setTodos(data.map((item: any) => ({id: item.id, title: item.title})));
  },[]);

  useEffect(() => {
    fetchTodos();
  },[fetchTodos]);

  async function onAdd(): Promise<void>{
    await api.post('/todos', { title: input });
    
    setInput('');

    fetchTodos();
  }

  async function onRemove(id: number): Promise<void>{
    await api.delete(`/todos/${id}`);

    fetchTodos();
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

