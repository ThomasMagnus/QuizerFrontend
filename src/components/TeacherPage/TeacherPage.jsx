import React, {Component} from 'react'
import {Link, Navigate} from "react-router-dom";
import {Row, Col, Button, Container, ListGroup, Placeholder, Stack, CloseButton, Modal, Form} from "react-bootstrap";
import {getData, getPage} from "../../Services/services";
import './TeacherPage.scss'
import MyVerticallyCenteredModal from "./Modal/Modal";
import {postDataValue} from "../../Services/services";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";


class TeacherPage extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props)
    }

    state = {
        data: JSON.parse(localStorage.getItem('data')),
        props: JSON.parse(localStorage.getItem('props')) || null,
        auth: !!localStorage.getItem('data'),
        tokenWork: false,
        modal: false,
        modalData: {
            subject: '',
            group: ''
        },
        changeProps: false,
        propsForm: {
            teacherId: JSON.parse(localStorage.getItem('userId')),
            subject: '',
            groups: []
        },
        subjectsList: localStorage.getItem("subjects") || []
    }

    groupRef = React.createRef()
    addBtn = React.createRef()
    formRef = React.createRef()

    componentDidMount() {

        // this.detectAuth()
        //     .then(response => {
        //         if (response.status === 200) {
        //             this.setState({tokenWork: true})
        //         } else {
        //             localStorage.clear()
        //             document.location = '/'
        //         }
        //     })

        this.getSubjects()
    }

    hideInputPlus = () => {
        const inputsPlus = this.formRef.current.querySelectorAll('.addGroupInput')
        const inputsGroups = this.formRef.current.querySelectorAll('.groupsName')

        for (let i = 0; i < inputsPlus.length; i++) {
            inputsPlus[i].classList.add('addGroupInputDisplayNone')
        }

        for (let i = 0; i < inputsGroups.length; i++) {

            if (inputsGroups[i].nextSibling.textContent === '-') inputsGroups[i].nextSibling.remove()

            const span = document.createElement('span')
            span.classList.add('groupAction', 'minus')
            span.textContent = '-'
            span.addEventListener('click', this.deleteGroupInput)
            inputsGroups[i].after(span)
        }
    }

    showInputPlus = () => {
        const inputsPlus = this.formRef.current.querySelectorAll('.addGroupInput')
        inputsPlus[inputsPlus.length - 1].classList.remove('addGroupInputDisplayNone')
        inputsPlus[inputsPlus.length - 1].addEventListener('click', this.addGroupInput)
    }

    addGroupInput = () => {
        const inputsPlus = this.formRef.current.querySelectorAll('.group')
        this.hideInputPlus()
        let p = document.createElement('p')
        p.classList.add('group')
        p.innerHTML = `
            <input placeholder="Введите название группы" type="text" class="mt-2 mb-0 form-control groupsName" name="group">
            <span class="groupAction addGroupInput">+</span>
        `
        inputsPlus[inputsPlus.length - 1].after(p)
        this.showInputPlus()
    }

    deleteGroupInput = (e) => {
        const target = e.target
        target.parentElement.remove()
    }

    deleteGroupInputs = () => {
        const form = this.formRef.current
        const inputElems = form.querySelectorAll('.group')

        for (let i = 0; i < inputElems.length - 1; i++) inputElems[1].remove()

        inputElems[0].querySelector('.addGroupInput').classList.remove('addGroupInputDisplayNone')
    }

    detectAuth = async () => {
        return await fetch(this.props.url + 'Authorization/DetectToken', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessTokenTeacher')}`,
                'Content-type': 'application/json'
            },
        })
    }

    logOut(e) {
        e.preventDefault()
        localStorage.clear()
        document.location = '/teach'
    }

    showHideModal = (e) => {
        const target = e.target
        if (!target.classList.contains('.admin__close')) {
            if (this.state.modal) {
                this.setState({modal: false})
            } else {
                this.setState({
                    modalData: {
                        ...this.state.modalData,
                        subject: target.textContent
                    }
                })
            }
        }
    }

    deleteProps = async (e, deleteURL) => {
        const target = e.target
        let parentElem = undefined

        if (target.tagName === 'path') {
            parentElem = target.parentElement.parentElement
        } else if (target.tagName === 'svg') {
            parentElem = target.parentElement
        }
        const data = JSON.stringify({
            'subjectName': deleteURL === 'teacher/deleteSubject' ? parentElem.dataset.value : parentElem.dataset.subject,
            'groupName': parentElem.dataset.value,
            'userId': localStorage.getItem('userId')
        })
        console.log(data)
        await postDataValue(`${this.props.url}${deleteURL}`, data, 'DELETE')
            .then(response => {
                localStorage.setItem('props', JSON.stringify(response))
                this.setState({props: response})
            })
    }

    getValuesProps = (e) => {
        const target = e.target

        this.setState({
            propsForm: {
                ...this.state.propsForm,
                subject: target.name === "subject" ? target.value : this.state.propsForm.subject,
            }
        })
        console.log(this.state.propsForm)
    }

    addWorkData = async () => {
        this.getGroupsArray()
        const data = JSON.stringify(this.state.propsForm)
        await postDataValue(`${this.props.url}teacher/addWork`, data, 'POST')
            .then(response => {
                console.log(response['statusCode'])
                if (response['statusCode'] === 200) {
                    this.setState({props: response['message']})
                    localStorage.setItem('props', JSON.stringify(response['message']))
                    this.setState({
                        propsForm: {
                            ...this.state.propsForm,
                            subject: '',
                            groups: []
                        }
                    })
                    this.formRef.current.reset()
                    this.deleteGroupInputs()
                } else {
                    console.log(response['message'])
                }
            })
    }

    getGroupsArray = () => {
        this.setState({groupsForm:
                    {
                        ...this.state.propsForm,
                        groups: this.state.propsForm.groups = []
                    }
            })
        const groupsInputs = this.formRef.current.querySelectorAll("input[name$='group']")
        for (let item of groupsInputs) {
            this.setState({groupsForm:
                    {
                        ...this.state.propsForm,
                        groups: this.state.propsForm.groups.push(item.value)
                    }
            })
        }
        console.log(this.state.propsForm)
    }

    changeProps = () => this.setState({changeProps: !this.state.changeProps})

    getSubjects = async () => {
        await getData(`${this.props.url}teacher/subjects`)
            .then(response => {
                localStorage.setItem('subjectsList', JSON.stringify(response))
            })
    }

    render() {
        return (
            <>
                {this.state.auth ?
                    <>
                        <MyVerticallyCenteredModal
                            show={this.state.modal}
                            onHide={this.showHideModal}
                            subject={this.state.modalData.subject}/>
                        <Container>
                            <Row>
                                <Col>
                                    <h1>Личный кабинет</h1>
                                    <p className="admin__name">Преподаватель: <span>{this.props.appState.teacherData['username']}</span>
                                    </p>
                                </Col>
                                <Col>
                                    <div className="admin__info">
                                        <Link to={'/Teacher/AddTask'}><Button variant="primary" className="w-10">Опубликовать
                                            задание</Button></Link>
                                        <Button variant="primary" onClick={this.logOut}
                                                className="admin__btn-exit">Выйти</Button>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                        <Container>
                            <Row>
                                <Col>
                                    <h3>Ваши предметы:</h3>
                                    <div>
                                        <ListGroup as="ol" numbered>
                                            {
                                                this.state.props ?
                                                    Object.keys(this.state.props).map((item, i) => (
                                                        <ListGroup.Item
                                                            as="li"
                                                            className="d-flex justify-content-between align-items-start mb-1"
                                                            key={i}
                                                            data-value={item}
                                                        >
                                                            <div className="ms-2 me-auto">
                                                                <div className="fw-bold">{item}</div>
                                                                {this.state.props[item].map((elem, index) =>
                                                                    <p className='mb-0 mr-2' key={index}
                                                                       data-value={elem} data-subject={item}>{elem}
                                                                        {this.state.changeProps ?
                                                                            <FontAwesomeIcon icon={faXmark}
                                                                                             className="close-button"
                                                                                             onClick={e => this.deleteProps(e, 'teacher/deleteGroup')}/>
                                                                            : ''}
                                                                    </p>)
                                                                }
                                                            </div>
                                                            {this.state.changeProps ?
                                                                <FontAwesomeIcon icon={faXmark} className="close-button"
                                                                                 onClick={
                                                                                     (e) => this.deleteProps(e, 'teacher/deleteSubject')}/> : ''
                                                            }
                                                        </ListGroup.Item>
                                                    )) :
                                                    <ListGroup.Item action variant="light">
                                                        <Placeholder animation="glow">
                                                            <Placeholder xs={6}/>
                                                        </Placeholder>
                                                    </ListGroup.Item>
                                            }
                                        </ListGroup>
                                    </div>
                                    <Button variant="primary" className='mt-3'
                                            onClick={this.changeProps}>{this.state.changeProps ? 'Сохранить' : 'Изменить'}</Button>
                                </Col>
                                <Col>
                                    <h3>Добавить нагрузку</h3>
                                    <Form ref={this.formRef}>
                                        <Form.Control type="text" placeholder="Введите название предмета" name="subject"
                                                      onInput={this.getValuesProps}/>
                                        <p className="group" ref={this.groupRef}>
                                            <Form.Control type="text" placeholder="Введите название группы"
                                                          className='mt-2 groupsName' name="group"/>
                                            <span className="groupAction addGroupInput" onClick={this.addGroupInput}>+</span>
                                        </p>
                                        <Button ref={this.addBtn} variant="primary" className='mt-3'
                                                onClick={this.addWorkData}>Добавить</Button>
                                    </Form>
                                </Col>
                            </Row>
                        </Container>
                    </>
                    : <Navigate to={'/teach'}/>}
            </>
        )
    }
}

export default TeacherPage