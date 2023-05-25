import React from "react";
import {Navigate} from "react-router-dom";
import './AdminLayout.scss'
import MyForm from "../../MyForm/MyForm";
import {detectLocalStorage, onChangeProperties} from "../../../Services/services";

class AdminLayout extends React.Component {
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
            }
        }
    }

    postDataAdmin = (e, urlToAction = 'http://localhost:5276/Admin/Index', urlToPage = 'http://localhost:5276/AdminPage/Index') => {
        this.props.postData(e, urlToAction, urlToPage, this.state.form, 'accessAdminToken')
    }

    render() {
        return (
            detectLocalStorage('accessAdminToken') ? <Navigate to={'/AdminPage/Index/' + this.props.appState.userId}/> :
                <section className="authorization">
                    <h1>Авторизация админа</h1>
                    <MyForm admin={this.admin} onChangeProperties={this.onChangeProperties}
                            postData={this.postDataAdmin}/>
                </section>
        )
    }
}

export default AdminLayout;