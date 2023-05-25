import React from 'react'
import {Button, Form} from "react-bootstrap";
import './addTask.scss'
import {Link} from "react-router-dom";
import './addTask.scss'
import {postDataValue} from '../../Services/services'

class AddTask extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    state = {
        teacherData: JSON.parse(localStorage.getItem("props")) || null,
        group: null,
        subject: null,
        file: null
    }

    formRef = React.createRef()
    fileRef = React.createRef()

    getGroup = (e) => {
        const target = e.target
        this.setState({group: target.value})
        // if (Object.keys(this.state.teacherData).includes(target.value)) this.setState({group: target.value})
        // else this.setState({group: null})
        
        console.log(this.state)
    }

    getSubjects = (e) => {
        const target = e.target
        this.setState({subject: target.value})
        console.log(this.state)
    }

    getFile = (e) => {
        const target = e.target
        this.setState({file: target.files[0]})
        console.log(this.state)
    }

    getValidate = () => !!(this.state.group && this.state.subject && this.state.file);

    sendFile = async (e) => {
        e.preventDefault()
        
        const formData = new FormData()
        formData.append('groupName', this.state.group)
        formData.append('subjectName', this.state.subject)
        formData.append('file', this.state.file)
        
        console.log(formData)

        await fetch(`${this.props.url}fileSave/save`, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            console.log(response)
        })
    }

    render() {
        return (
            <>
                <h1>Выложить задание</h1>
                <Form className='form' ref={this.formRef}>
                    <Form.Select aria-label="Default select example" name='subjectName' onChange={(e) => this.getSubjects(e)}>
                        <option>Выберете предмет:</option>
                        {this.state.teacherData ? 
                            Object.keys(this.state.teacherData).map((item, i) => (
                                <option value={item} key={i} >{item}</option>
                            ))
                            :
                            ""
                        }
                    </Form.Select>
                    <Form.Select aria-label="Default select example" name='groupName' onChange={(e) => this.getGroup(e)}>
                        <option>Выберете группу:</option>
                        {
                            this.state.subject !== null && Object.keys(this.state.teacherData).includes(this.state.subject) ?
                                this.state.teacherData[this.state.subject].map((item, i) => (
                                    <option value={item} key={i}>{item}</option>
                                )) : ''
                        }
                    </Form.Select>
                    <Form.Group controlId="formFile" className="mb-3" name="file" >
                        <Form.Control type="file" onChange={(e) => this.getFile(e)} ref={this.fileRef}/>
                    </Form.Group>
                    <div className="btnGroup">
                        <Button disabled={!this.getValidate()} onClick={e => this.sendFile(e)}>Выложить</Button>
                        <Link className='canselBtn' to={'/Teacher/TeacherPage/' + this.props.login}>
                            <Button>Отмена</Button>
                        </Link>
                    </div>
                </Form>
            </>
        )
    }
}

export default AddTask
