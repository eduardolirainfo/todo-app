import './App.css';
import { useEffect, useState } from 'react'
import {getTodos, saveTodo, deleteTodo } from "./service/todo-api-service.js"


function App() {
  const [todos, setTodos ] = useState([])
  const [description, setDescription] = useState("")

  useEffect(() => load(), [])

  const load = async ()=>{
    try {
      const resp = await getTodos()
      setTodos(resp)
    }catch (err){
      console.log(err)
      alert("Erro ao carregar todos!")
    }
  }

  const save = async () =>{
    if (description && description.trim()){
      try {
        const resp = await saveTodo(description)
        setTodos(resp)
        setDescription("")
      }catch (err){
        console.log(err.message())
        alert("Erro ao salvar todo!")
      }
    }else{
      alert("Descrição é obrigatória!")
    }
  }

  const remove = async (id) =>{
    try {
      const resp = await deleteTodo(id)
      setTodos(resp)
      alert("Todo "+id+" excluído com sucesso!")
     }catch (err){
      console.log(err.message())
      alert("Erro ao excluir todo!")
    }
  }
  return (
    <div className="App">
      <h1> Todos App</h1>
      <div className="field">
        <label className="label" htmlFor="description">Descrição:</label>
        <div className="control">
          <input className="input" type="text" id="description"  value={description} onChange={event => setDescription(event.target.value)}/>
          <div className="control">
            <button className="button is-primary " onClick={save}> Salvar</button>
          </div>
          {todos.map((todo) =>
            <div className="item">
              <span className="item-label">{todo.id} - {todo.description}</span>
              <button className="button is-primary" onClick={ () => remove(todo.id)}>Excluir</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


export default App;
