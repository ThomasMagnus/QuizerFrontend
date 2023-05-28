import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { TeacherHelper } from "../../Services/helpers";
import { getData } from "../../Services/services";

class ViewingTasks extends React.Component {

    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props)
        this.teacherHelper = new TeacherHelper(this)
    }

    state = {
        teacherData: JSON.parse(localStorage.getItem("props")) || null,
        data: JSON.parse(localStorage.getItem("data")) || null,
        subject: null,
        group: null,
        tasks: [],
        fileDates: [],
        tasksByDates: []
    }

    getTasks = async () => {
        await getData(`${this.props.url}teacher/preview?groupName=${this.state.group}
                                &subjectName=${this.state.subject}
                                &teacherId=${this.state.data.id}`)
            .then(data => {
                this.teacherHelper.getTasks(data);
            })
    }

    render() {
        return (
            <section className="preview">
                <h1>Выложенные задания</h1>
                <Row>
                    <Col>
                        <Form ref={this.formRef}>
                            <Form.Select aria-label="Default select example" name='subjectName' onChange={(e) => this.teacherHelper.getSubjects(e)}>
                                <option>Выберете предмет:</option>
                                {this.state.teacherData ?
                                    Object.keys(this.state.teacherData).map((item, i) => (
                                        <option value={item} key={i} >{item}</option>
                                    ))
                                    :
                                    ""
                                }
                            </Form.Select>
                            <Form.Select className="mt-3" aria-label="Default select example" name='groupName' onChange={(e) => this.teacherHelper.getGroup(e)}>
                                <option>Выберете группу:</option>
                                {
                                    this.state.subject !== null && Object.keys(this.state.teacherData).includes(this.state.subject) ?
                                        this.state.teacherData[this.state.subject].map((item, i) => (
                                            <option value={item} key={i}>{item}</option>
                                        )) : ''
                                }
                            </Form.Select>
                            <Button ref={this.addBtn} variant="primary" className='mt-3' onClick={this.getTasks}>Посмотреть</Button>
                        </Form>
                    </Col>
                    <Col>
                        <div className="preview__files">
                        {
                            this.state.tasksByDates.length !== 0 ?
                                this.state.tasksByDates.map((item, index) => {
                                    return (
                                        <div className="user__files" key={index}>
                                            <div className="date">
                                                <p>{Object.keys(item)[0]}</p>
                                            </div>
                                            <div className="file">
                                                <ul className="user__fileList">
                                                    {
                                                        item[Object.keys(item)[0]].map((elem, key) =>
                                                            <li key={key} className="user__fileItem">
                                                                <a href={elem.filepath.trim()} download className="loadLink">
                                                                    <span className="img">
                                                                        <img src="img/doc.png" alt="Задание"/>
                                                                    </span>
                                                                    <span title={elem.filename} className="fileTitle">{
                                                                        elem.filename.length > 15 ? elem.filename.substring(0, 15) + '...' : elem.filename
                                                                    }</span>
                                                                </a>
                                                            </li>
                                                        )
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    )
                                }) : "Ничего не найдено!"
                            }
                        </div>
                    </Col>
                </Row>
            </section>
        )
    }
}


export default ViewingTasks