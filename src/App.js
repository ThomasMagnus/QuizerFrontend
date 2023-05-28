import React, { Component } from 'react';
import Authorization from './components/Authorization/Authorization';
import AdminLayout from "./components/AdminPage/AdminLayout/AdminLayout";
import {Route, Routes} from "react-router-dom";
import UserPage from "./components/UserPage/UserPage";
import Main from "./components/Main/Main";
import TeacherPage from "./components/TeacherPage/TeacherPage";
import TeacherAuth from "./components/TeacherAuth/TeacherAuth";
import './app.scss'
import FirstPage from "./components/FirstPage/FirstPage";
import AddTask from "./components/AddTask/AddTask";
import ViewingTasks from './components/ViewingTasks/ViewingTasks';

export default class App extends Component {

    serverURL = 'http://localhost:5207/'

    state = {
        authorize: localStorage.getItem("accessToken" || 'accessAdminToken' || 'accessTokenTeacher') || '',
        userId: localStorage.getItem('userId') || '',
        teacherData: JSON.parse(localStorage.getItem('data')) || {},
        tokenWork: false,
        loader: false,
        statusText: ''
    }

    postData = async (e, urlToAction, urlToPage, state, tokenName) => {
        e.preventDefault()
        const data = JSON.stringify(state)
        this.setState({loader: true})
        await fetch(urlToAction, {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'https://localhost:5207',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) ' +
                    'Chrome/102.0.5005.167 YaBrowser/22.7.5.1027 Yowser/2.5 Safari/537.36',
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            else return response
        })
        .then(data => {
            try {
                if (data['text']) {
                    this.setState({loader: false})
                    this.setState({statusText: data['text']})

                    return
                }
                if (data[tokenName]) {
                    localStorage.setItem(tokenName, data[tokenName])
                    localStorage.setItem('userId', data['id'])
                    localStorage.setItem('data', JSON.stringify(data))
                    localStorage.setItem('props', JSON.stringify(data['props']))

                    this.setState({teacherData: data})
                    this.setState({tokenWork: true})
                    
                    fetch(urlToPage, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem(tokenName)}`
                        }
                    })
                        .then(response => {
                            this.setState({authorize: true})
                            document.location.reload()
                        })
                        .catch(e => {
                            this.setState({statusText: "Ошибка авторизации"})
                            this.setState({loader: true})
                        })
                } else {
                    this.setState({statusText: data})
                    this.setState({loader: false})
                }
            }catch (ex) {
                console.log(ex)
                this.setState({statusText: "Ошибка авторизации"})
                this.setState({loader: false})
            }
        })
    }

    render() {
        return (
            <Main loader={this.state.loader}>
                <Routes>
                    <Route path="/" element={<FirstPage/>}/>
                    <Route path="/authStudent" element={<Authorization url={this.serverURL} admin={false} postData={this.postData} appState={this.state} text={this.state.statusText}/>}/>
                    <Route path="/adm" element={<AdminLayout url={this.serverURL} admin={true} postData={this.postData} appState={this.state}/>}/>
                    <Route path="/teach" element={<TeacherAuth url={this.serverURL} admin={true} postData={this.postData} appState={this.state} text={this.state.statusText}/>}/>
                    <Route path="/UserPage/Index" element={<UserPage url={this.serverURL}/>}/>
                    <Route path={"/Teacher/TeacherPage/" + this.state.teacherData['login']} element={<TeacherPage appState={this.state} url={this.serverURL}/>}/>
                    <Route path={"/Teacher/AddTask"} element={<AddTask login={this.state.teacherData["login"]} url={this.serverURL}/>}/>
                    <Route path={"/Teacher/Preview"} element={<ViewingTasks url={this.serverURL}/>}/>
                </Routes>
            </Main>
        );
    }
}
