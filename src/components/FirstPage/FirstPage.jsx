import React from "react";
import {Button, Stack} from "react-bootstrap";
import './firstPage.scss'
import {Link} from "react-router-dom";

class FirstPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className="col-md-5 mx-auto">
                    <Stack gap={2} className="flex-column justify-content-md-center vh-100">
                        <div className="firstPage__wrapper p-4">
                            <Stack gap={2}>
                                <p className="firstPage__title">Вы:</p>
                                <Link to={'/authStudent'}><Button variant="primary" className="w-100">Студент</Button></Link>
                                <Link to={'/teach'}><Button variant="primary" className="w-100">Преподаватель</Button></Link>
                            </Stack>
                        </div>
                    </Stack>
            </section>
        )
    }
}

export default FirstPage