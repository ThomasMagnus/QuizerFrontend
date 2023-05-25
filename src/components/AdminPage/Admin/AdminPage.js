import React, {Component} from 'react'
import {Navigate} from "react-router-dom";
import {Row, Col, Button, Container, ListGroup, Placeholder, Stack} from "react-bootstrap";
import {getPage, detectLocalStorage} from "../../../Services/services";
import './adminPage.scss'

class AdminPage extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props)
    }

    state = {
        data: {},
    }

    componentDidMount() {
        getPage("http://localhost:5276/AdminPage/Index", 'accessAdminToken')
            .then(data => {
                console.log(data)
            })

        if (sessionStorage.getItem('data')) {
            const data = JSON.parse(sessionStorage.getItem('data'))
            this.setState({'data': data})
        }
    }

    render() {
        return (
            <>
                {detectLocalStorage('accessAdminToken') ?
                    <>
                        <Container>
                            <Row>
                                <Col>
                                    <h1>Личный кабинет</h1>
                                    <p className="admin__name">Преподаватель: <span>{this.state.data['username']}</span>
                                    </p>
                                </Col>
                                <Col>
                                    <div className="admin__info">
                                        <p><Button variant="primary">Опубликовать задание</Button></p>
                                        <Button variant="primary" onClick={this.logOut}>Выйти</Button>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                        <Container>
                            <Row>
                                <Col>
                                    <h3>Ваши предметы:</h3>
                                    <div className="admin__overview overflow-auto">
                                        <ListGroup className='mb-3'>
                                            <ListGroup.Item action variant="light">
                                                <Placeholder animation="glow">
                                                    <Placeholder xs={6}/>
                                                </Placeholder>
                                            </ListGroup.Item>
                                            <ListGroup.Item action variant="light">Dapibus ac facilisis
                                                in</ListGroup.Item>
                                            <ListGroup.Item action variant="light">Morbi leo risus</ListGroup.Item>
                                            <ListGroup.Item action variant="light">Porta ac consectetur
                                                ac</ListGroup.Item>
                                            <ListGroup.Item action variant="light">Vestibulum at eros</ListGroup.Item>
                                            <ListGroup.Item action variant="light">Dapibus ac facilisis
                                                in</ListGroup.Item>
                                            <ListGroup.Item action variant="light">Morbi leo risus</ListGroup.Item>
                                            <ListGroup.Item action variant="light">Porta ac consectetur
                                                ac</ListGroup.Item>
                                            <ListGroup.Item action variant="light">Vestibulum at eros</ListGroup.Item>
                                        </ListGroup>
                                    </div>
                                    <Button variant="primary" className='mt-3'>Добавить</Button>
                                </Col>
                                <Col>
                                    <h3>Ваши группы:</h3>
                                    <div className="admin__overview overflow-auto">
                                        <ListGroup className='mb-3'>
                                            <ListGroup.Item action variant="light">
                                                <Placeholder animation="glow">
                                                    <Placeholder xs={6}/>
                                                </Placeholder>
                                            </ListGroup.Item>
                                            <ListGroup.Item action variant="light">Dapibus ac facilisis
                                                in</ListGroup.Item>
                                            <ListGroup.Item action variant="light">Morbi leo risus</ListGroup.Item>
                                            <ListGroup.Item action variant="light">Porta ac consectetur
                                                ac</ListGroup.Item>
                                            <ListGroup.Item action variant="light">Vestibulum at eros</ListGroup.Item>
                                            <ListGroup.Item action variant="light">Dapibus ac facilisis
                                                in</ListGroup.Item>
                                            <ListGroup.Item action variant="light">Morbi leo risus</ListGroup.Item>
                                            <ListGroup.Item action variant="light">Porta ac consectetur
                                                ac</ListGroup.Item>
                                            <ListGroup.Item action variant="light">Vestibulum at eros</ListGroup.Item>
                                        </ListGroup>
                                    </div>
                                    <Stack direction='horizontal' className='mt-3'>
                                        <Button className="ms-auto" variant="primary">Добавить</Button>
                                    </Stack>
                                </Col>
                            </Row>
                        </Container>
                    </>
                    : <Navigate to={'/'}/>}
            </>
        )
    }
}

export default AdminPage