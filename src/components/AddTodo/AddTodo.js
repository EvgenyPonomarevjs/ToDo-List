import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import {Row, Col, Button, FormControl} from "react-bootstrap"
import s from './AddTodoForm.module.css'

function AddTodo ({todo, setTodo}) {
    const [value, setValue] = useState('')
    function seveTodo () {
        setTodo(
            [...todo, {
                id: uuidv4(),
                title: value,
                status: true
            }]
        )
        setValue('')
    }
    return (
        <Row>
            <Col className={s.AddTodoForm}>
                <FormControl placeholder="Введите задачу" value={value} onChange={ (e) => setValue(e.target.value)}/>
                <Button onClick={seveTodo} className={s.btn}>Сохранить</Button>
            </Col>
        </Row>

    )
}

export default AddTodo