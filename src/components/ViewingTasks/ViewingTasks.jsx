import React from "react";
import { Form, Button } from "react-bootstrap";
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
        subject: null,
        group: null
    }

    getTasks = async () => {
        console.log(this.state.group)
        console.log(this.state.subject)
        await getData(`${this.props.url}teacher/preview?groupName=${this.state.group}
                                &subjectName=${this.state.subject}
                                &teacherId=${this.state.teacherData.id}`)
            .then(response => console.log(response))
    }

    render() {
        return (
            <>
                <h1>Выложенные задания</h1>
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
            </>
        )
    }
}


export default ViewingTasks