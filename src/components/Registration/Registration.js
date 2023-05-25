import React from "react";
import {Button, Form} from "react-bootstrap";
import {Link} from "react-router-dom";

class Registration extends React.Component {
    render() {
        return (
            <section className="registration">
                <h1>Регистрация</h1>
                <Form className="row-cols-1">
                    <Form.Group className="mb-2" controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="Введите имя" />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="Введите фамилию" />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Select id="disabledSelect">
                            <option>Выберете номер группы</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Пароль" />
                    </Form.Group>
                    <Button variant="primary" type="submit">Войти</Button>
                    <Link to="/">Авторизация</Link>
                </Form>
            </section>
        )
    }
}

export default Registration