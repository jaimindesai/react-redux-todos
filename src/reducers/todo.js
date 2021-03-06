import {getTodos, createTodos,updateTodo} from '../lib/todosServices'
import {showMessage} from './message'
const initState = {
     todos :[],
     currentTodo: '',
     message: ''
}
export const TODO_ADD = 'TODO_ADD'
export const TODOS_LOAD = 'TODOS_LOAD'
export const REPLACE_TODO = 'REPLACE_TODO'
export const CURRENT_UPDATE = 'CURRENT_UPDATE'
export const REMOVE_TODO = 'REMOVE_TODO'

export const updateCurrent = (val) => ({type:'CURRENT_UPDATE',payload:val})
export const addTodo = (todo) => ({type:TODO_ADD,payload:todo})
export const loadTodos = (todos) => ({type:'TODOS_LOAD',payload:todos})
export const replaceTodo = (todo) => ({type: REPLACE_TODO, payload: todo })

export const fetchTodos = () => {
    return (dispatch) => {
        dispatch(showMessage('Loading Todos..'))
        getTodos()
         .then(todos => dispatch(loadTodos(todos)))
    }
}

export const saveTodos = (name) => {
    return (dispatch) => {
        dispatch(showMessage('Saving Todos..'))
        createTodos(name)
          .then(res => dispatch(addTodo(res)))
    }
}

export const toggleTodo = (id) => {
  return (dispatch, getState) => {
  
    const {todos} = getState()
    console.log('todos..',todos)
    const todo = todos.find(t => t.id === id)
   
    const toggled = {...todo, isComplete: !todo.isComplete}
  
    updateTodo(toggled)
      .then(res => {
        dispatch(replaceTodo(res))
      
      })
  }
}
export default (state=initState,action) => {
    switch(action.type){
       case TODO_ADD:
         return {...state,todos:state.todos.concat(action.payload)}
       case TODOS_LOAD:
         return {...state,todos:action.payload}
        case CURRENT_UPDATE:
          return {...state,currentTodo:action.payload}
          case REPLACE_TODO:
          return {...state,
            todos: state.todos
              .map(t => t.id === action.payload.id ? action.payload : t)
          }
       default:
        return state
    }
}