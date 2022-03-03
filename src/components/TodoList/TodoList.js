import React from "react";
import { useState } from "react";
import s from './TodoList.module.css'
import {Button} from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEdit, faLockOpen, faSave, faTrash, faLock} from '@fortawesome/free-solid-svg-icons'

function TodoList ({ todo, setTodo}) {

    const [edit, setEdit] = useState(null)
    const [value, setValue] = useState()

    function deleteTodo(id) {
        let newTodo = [...todo].filter(item => item.id!==id); //Если id не равно предидущему то задача удалится
        setTodo(newTodo) //передаем новое значение TODO
    }
    function statusTodo(id) {
        let newTodo = [...todo].filter(item => {
            // eslint-disable-next-line eqeqeq
            if(item.id == id) {
                item.status = !item.status
            }
            return item
        })
        setTodo(newTodo)
    }
    function editTodo (id, title) {
        setEdit(id)
        setValue(title)
    }
    function saveTodo (id) {
        let newTodo = [...todo].map( item => {
            if (item.id == id) {
                item.title = value;
            }
            return item
        })
        setTodo(newTodo)
        setEdit(null)
    }
    console.log(todo)
    return (
        <div>
            {
                todo.map( item => (
                    <div key={item.id} className={s.listItems}>
                        {
                            edit === item.id ? 
                                    <div>
                                        <input onChange={(e) => setValue(e.target.value)} value={value} />
                                    </div> 
                                    :
                                    <div className={item.status === false ? s.close : ""}>{item.title}</div>
                        }
                        {
                            edit === item.id ? 
                                    <div>
                                        <Button onClick={() => saveTodo(item.id)}> <FontAwesomeIcon icon={faSave}/> </Button>
                                    </div> :
                                    <div>
                                        <Button onClick={ () =>deleteTodo(item.id)}> <FontAwesomeIcon icon={faTrash}/> </Button>
                                        <Button onClick={ () =>editTodo(item.id, item.title)} className={s.btn}> <FontAwesomeIcon icon={faEdit}/> </Button>
                                        <Button onClick={ () =>statusTodo(item.id)} className={s.btn}>
                                            {
                                                item.status ? <FontAwesomeIcon icon={faLock}/> : <FontAwesomeIcon icon={faLockOpen}/> 
                                            }
                                        </Button>
                                    </div>
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default TodoList