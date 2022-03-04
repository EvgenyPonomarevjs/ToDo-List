import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import {Row, Col, Button, FormControl} from "react-bootstrap"
import { randomColor} from 'randomcolor'
import s from './AddTodoForm.module.css'

function AddTodo ({todo, setTodo}) {
    // const [validation, setValidation] = useState("")
    // const [inputCheck, setinputCheck] = useState(false)
    // const [inputError, setinputError] = useState("Поля ввода не может быть пустым")

    // function validForm () {
        
    // }

    const [value, setValue] = useState('')
    function saveTodo () {
        if(value) {
            setTodo(
                [...todo, {
                    id: uuidv4(),
                    title: value,
                    status: true, 
                    color: randomColor({
                        luminosity: 'light'
                    })
                }]
            )
        } else {
            alert("Введите значение в поле ввода!!!")
        }    
        setValue('')
    }
    return (
        <Row>
            <Col className={s.AddTodoForm}>
                <FormControl placeholder="Введите задачу" value={value} onChange={ (e) => setValue(e.target.value)}/>
                <Button onClick={saveTodo} className={s.btn}>Сохранить</Button>
            </Col>
        </Row>

    )
}

export default AddTodo