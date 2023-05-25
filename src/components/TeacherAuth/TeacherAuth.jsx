import React from "react";
import {Navigate} from "react-router-dom";
import MyForm from "../MyForm/MyForm";
import {detectLocalStorage, onChangeProperties, validateForm} from "../../Services/services";
import Alert from 'react-bootstrap/Alert';
import './teacherAuth.scss'

class TeacherAuth extends React.Component {
    constructor(props) {
        super(props);
        this.admin = props.admin
        this.onChangeProperties = onChangeProperties.bind(this)

        this.state = {
            form: {
                fname: '',
                lname: '',
                login: '',
                password: ''
            },
            auth: false,
            alert: false,
            emptyInput: ''
        }
    }

    postDataTeacher = (e, urlToAction = this.props.url + 'Teacher/Index', urlToPage = this.props.url + 'Teacher/TeacherPage/' +
                        this.state.form.login) => {
        e.preventDefault()
        if (validateForm(this.state.form)) {
            this.props.postData(e, urlToAction, urlToPage, this.state.form, 'accessTokenTeacher')
        } else {
            console.log("Поля не заполнены")
        }
    }

    componentDidMount() {
        detectLocalStorage('accessTokenTeacher', '/Authorization/DetectToken')
        if (localStorage.getItem('data')) this.setState({auth: true})
    }

    render() {
        return (
            this.state.auth ?
                <Navigate to={'/Teacher/TeacherPage/' + this.props.appState.teacherData['login']}/>
                    :
                <section className="authorization">
                    {this.props.text ?
                        <Alert key='danger' variant='danger' className='teacher__alert'>
                            {this.props.text}
                        </Alert> : ''
                    }
                    <h1>Авторизация</h1>
                    <MyForm admin={this.admin} onChangeProperties={this.onChangeProperties}
                            postData={this.postDataTeacher}/>
                </section>
        )
    }
}

export default TeacherAuth;