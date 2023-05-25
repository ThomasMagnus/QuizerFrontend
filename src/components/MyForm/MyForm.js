import React, {Component} from "react";
import { Button, Form } from "react-bootstrap";
import {Link} from "react-router-dom";
import './myForm.scss'

class MyForm extends Component{
    constructor(props) {
        super(props)
        this.admin = props.admin
        this.myref = React.createRef()
        this.select = React.createRef()

    }

    validData = (e) => {
        e.preventDefault()
        const inputs = this.myref.current.querySelectorAll("input")
        inputs.forEach(item => {
            item.style.border = ""
            if (item.nextSibling) item.nextSibling.remove()
            if (item.value.trim() === "") {
                item.style.border = "2px solid red"
                item.after(this.createErrorStyle())
                return
            }
        })
        if (this.select.current && this.select.current.value === 'Выберете номер группы') {
            this.select.current.style.border = ""
            if (this.select.current.nextSibling) this.select.current.nextSibling.remove()
            this.select.current.style.border = "2px solid red"
            this.select.current.after(this.createErrorStyle())
            return
        }
        this.props.postData(e)
    }

    createErrorStyle = () => {
        let div = document.createElement('div')
        div.classList = 'error'
        div.innerText = '*Поле обязательно для ввода'
        return div
    }

    render() {
        return (
            <Form className="row-cols-1" ref={this.myref}>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                    <Form.Control type="text" name="lastname" placeholder="Введите фамилию" onInput={this.props.onChangeProperties}/>
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                    <Form.Control type="text" name="firstname" placeholder="Введите имя" onInput={this.props.onChangeProperties}/>
                </Form.Group>
                {!this.admin ?
                    <>
                    <Form.Group className="mb-2" controlId="formBasicEmail">
                        <Form.Control type="text" name="patronymic" placeholder="Введите отчество" onInput={this.props.onChangeProperties}/>
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Select ref={this.select} id="disabledSelect" name="group" onChange={this.props.onChangeProperties}>
                            <option>Выберете номер группы</option>
                            {this.props.groups.map((item, i) =>
                                <option value={item[0]} key={i} data-id={item[1]} name="option">{item[0].toUpperCase()}</option>
                            )}
                        </Form.Select>
                    </Form.Group>
                    </>
                :
                    <Form.Group className="mb-2" controlId="formBasicEmail">
                        <Form.Control type="text" name="login" placeholder="Введите логин" onInput={this.props.onChangeProperties}/>
                    </Form.Group>
                }
                <Form.Group className="mb-2" controlId="formBasicPassword">
                    <Form.Control type="password" name="password" placeholder="Пароль" onInput={this.props.onChangeProperties}/>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={e => this.validData(e)}>Войти</Button>
                <Link to='/' className='d-block w-100'>
                    <Button className='w-100 mt-1'>Назад</Button>
                </Link>
            </Form>
        );
    }
}

export default MyForm