import React, { useCallback, useState } from 'react'
import './App.css'
const App = () => {
  const [newTodo, setnewTodo] = useState('')
  const [todos, setTodos] = useState([])
  //useCallBack is used to define the function only once and not get defined again and again when the page rerenders
  //mostly it is used when we have big functions and take a lot of time to define otherwise no need
  const onnewTodoChange = useCallback((event) => {
    setnewTodo(event.target.value)
  }, [])

  const onSubmitHandler = useCallback(
    (event) => {
      event.preventDefault()
      if (!newTodo.trim()) return
      setTodos([
        ...todos,
        {
          id: todos.length ? todos[todos.length - 1].id + 1 : 0,
          content: newTodo,
          task: false,
        },
      ])
      // console.log(newTodo) //why such weird behaviour
      setnewTodo('')
    },
    [todos, newTodo],
  )

  //closure is basically a function returning another function and the inner function uses the values of outer function
  //javascript dont know whether the innervalues of a state values will change so we have to create a copy and set the item
  const addTask = useCallback(
    (todo, index) => (event) => {
      let changedTodos = [...todos]
      changedTodos.splice(index, 1, {
        ...todo,
        task: !todo.task,
      })
      setTodos(changedTodos)
    },
    [todos],
  )
  const removeTodo = useCallback(
    (deltodo) => (event) => {
      setTodos(todos.filter((todo) => todo !== deltodo))
    },
    [todos],
  )
  const markAllDone = useCallback(
    (event) => {
      let markall = todos.map((todo) => {
        return { ...todo, task: true }
      })
      setTodos(markall)
    },
    [todos],
  )
  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="newTodo">Enter Your newTodo:</label>
        <input
          id="newTodo"
          name="newTodo"
          value={newTodo}
          onChange={onnewTodoChange}
        />
        <button>Add</button>
      </form>
      <button onClick={markAllDone}>Mark all done</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={todo.id}>
            <input
              checked={todo.task}
              style={{ display: 'inline', width: '10%' }}
              type="checkbox"
              onChange={addTask(todo, index)}
            />
            <span className={todo.task ? 'done' : ''}>{todo.content}</span>
            <button onClick={removeTodo(todo)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
