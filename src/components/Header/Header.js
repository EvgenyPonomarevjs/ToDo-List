import React from 'react'
import s from './Header.module.css'
import {Row, Col} from "react-bootstrap"
function App() {
    return (
        <Row>
            <Col>
                <div className={s.root}>Создай свой список задач</div>
            </Col>
        </Row>

    );
}

export default App;