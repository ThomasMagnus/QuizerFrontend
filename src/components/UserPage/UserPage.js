import React from 'react';
import "./UserPage.scss";
import {Navigate} from "react-router-dom";
import {getPage, detectLocalStorage} from "../../Services/services";
import {Button} from "react-bootstrap";
import MyVerticallyCenteredModal from "../Modal/Modal";

class UserPage extends React.Component {

    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    state = {
        subjects: [],
        userProps: JSON.parse(localStorage.getItem("data")) || {},
        tasks: [],
        fileDates: [],
        modal: false,
        getResponse: false,
        tasksByDates: [],
    }

    subjectsRef = React.createRef()
    spinnerRef = React.createRef()

    getTasks = async (e) => {
        const target = e.target
        
        if (target.tagName === 'LI') {
            
            for (let item of this.subjectsRef.current.children){
                item.classList.remove("activeSubject")
            }

            target.classList.add("activeSubject")
            let groupId = this.state.userProps.groupId

            this.response = await fetch(this.props.url + `UserPage/GetTasks?subjectId=${target.dataset.id}&groupId=${groupId}`,)
                .then(response => {
                    this.setState({getResponse: true})
                    return response.json()
                })
                .then(data => {
                    this.setState({tasks: data})
                    let uniqueMassDates = new Set()
                    let resultMass = []
                    data.forEach(item => {
                        uniqueMassDates.add(new Date(item.putdate).toLocaleDateString())
                    })
                    console.log(uniqueMassDates)
                    let tasksMassByDates = []
                    uniqueMassDates.forEach(item => {
                        // console.log(item)
                        let mass = data.filter(elem => new Date(elem.putdate).toLocaleDateString() === item)
                        let tasksData = {}
                        tasksData[item] = mass
                        tasksMassByDates.push(tasksData)
                        // resultMass.push(mass)
                    })
                    this.setState({tasksByDates: tasksMassByDates})

                    // console.log(this.state.tasksByDates)
                    this.state.tasksByDates.forEach(item => {
                        let key = Object.keys(item)[0]
                        item[key].forEach(elem => {
                            console.log(elem)
                        })

                    })
                    // console.log(this.state.tasks)

                    this.setState({fileDates: uniqueMassDates})
                    this.setState({tasks: resultMass})
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    logOut = () => {
        localStorage.clear()
        return document.location = '/'
    }

    showModal = () => {
        this.setState({modal: true})
    }

    getUserProp = async () => {
        this.response = await fetch('http://localhost:5276/UserPage/GetUserProps', {
            method: 'POST',
            body: JSON.stringify({'userId': localStorage.getItem('userId')}),
            headers: {
                'Content-type': 'application/json',
            }
        })
    
        if (this.response.status === 200) {
            return await this.response.json()
        }
    
        console.log(this.response.statusText)
    }

    async componentDidMount() {
        await getPage(this.props.url + "UserPage/GetSubjects", 'accessToken')
            .then(data => this.setState({subjects: data}))
    }

    render() {
        return (
            <>
                {
                    detectLocalStorage('accessToken') ?
                        <div className="user">
                            <MyVerticallyCenteredModal
                                show={this.state.modal}/>
                            <div className="user__info">
                                <div className="user__info-container">
                                    <p>Пользователь: <span>{this.state.userProps['username']}</span></p>
                                    <p>Группа: <span>{this.state.userProps['group'] ? this.state.userProps['group'].toUpperCase() : ''}</span></p>
                                    <Button variant="primary" onClick={this.logOut}>Выйти</Button>
                                </div>
                            </div>

                            <div className="user__toolBar">
                                <nav className="user__nav">
                                    <ul className="user__list p-0" ref={this.subjectsRef} onClick={this.getTasks}>
                                        {this.state.subjects.length !== 0 ? this.state.subjects.map((item, i) =>
                                                <li className="user__item" data-id={item.id} key={i}>
                                                    {item.name}
                                                </li>
                                            )
                                         : <div className='img'>
                                                <img src="img/spinner.gif" alt="спиннер"/>
                                            </div>}
                                    </ul>
                                    <Button>Изменить</Button>
                                </nav>
                                <div className="user__material">
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
                                                                {/*<li>*/}
                                                                {/*    <a href="/" download className="loadLink">*/}
                                                                {/*        <span className="img">*/}
                                                                {/*            <img src="img/doc.png" alt="Задание"/>*/}
                                                                {/*        </span>*/}
                                                                {/*        <span>Название файла</span>*/}
                                                                {/*    </a>*/}
                                                                {/*</li>*/}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                )
                                            }) :
                                                    <div className='img'>
                                                        {this.state.getResponse ? <img src="img/spinner.gif" alt="спиннер"/> : ""}
                                                    </div>
                                    }
                                </div>
                            </div>
                        </div>
                    : <Navigate to={"/"}/>
                }
            </>
        )
    }
}

export default UserPage;