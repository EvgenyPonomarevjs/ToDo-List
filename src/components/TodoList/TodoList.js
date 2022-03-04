import React, { useEffect } from "react";
import { useState } from "react";
import s from './TodoList.module.css'
import {Button, ButtonGroup, Row, Col} from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEdit, faLockOpen, faSave, faTrash, faLock} from '@fortawesome/free-solid-svg-icons'

function TodoList ({ todo, setTodo}) {
    const [isEdit, setEdit] = useState(false)
    const [value, setValue] = useState("")
    const [filtered, setFiltered] = useState(todo)

    useEffect(()=> {
        setFiltered(todo)
    },[todo])

    function todofilter(status) {
        if(status === 'all') {
            setFiltered(todo)
        }else{
            let newTodo =[...todo].filter(item => item.status === status)
            setFiltered(newTodo)
        }
    }

    function deleteTodo(id) {
        let newTodo = [...todo].filter(item => item.id!==id); //Если id не равно предыдущему то задача удалится
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
        if(title) {
            setEdit(id)
            setValue(title)  
        } else {
            alert("Введите значение в поле ввода")  
        } 
    }
    function saveTodo (id) {
        let newTodo = [...todo].map( item => {
            if (item.id === id) {
                item.title = value;
            }
            return item
        })
        setTodo(newTodo)
        setEdit(false)
        
    }
    // console.log(todo)
    return (
        <div>
            <Row>
                <Col className={s.filter}>
                    <ButtonGroup aria-label="Basic example" className={s.filterBtn}>
                        <Button variant="secondary" onClick={() => todofilter('all')}>Все</Button>
                        <Button variant="secondary" onClick={() => todofilter(true)}>Открытые</Button>
                        <Button variant="secondary" onClick={() => todofilter(false)}>Закрытые</Button>
                </ButtonGroup>
                </Col>
            </Row>

            {
                filtered.map( item => (
                    <div key={item.id} className={s.listItems}>
                        {
                            isEdit === item.id ? 
                                    <div>
                                        <input onChange={(e) => setValue(e.target.value)} value={value} />
                                    </div> 
                                    :
                                    <div className={item.status === false ? s.close : ""}  style={{
                                        backgroundColor: item.color,     
                                        width: '100%',
                                        maxWidth: '350px',
                                        maxHeight: '250px',
                                        wordBreak: 'break-all',
                                        flexFlow: 'row-wrap'
                                    }}>{item.title}</div>
                        }
                        {
                            isEdit === item.id ? 
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