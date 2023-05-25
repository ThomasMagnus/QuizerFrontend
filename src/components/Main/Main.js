import React, {Component} from "react";
import './main.scss'

class Main extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return(
            <main className="main">
                {
                    this.props.loader ?
                        <div className="layout">
                            <img src="/img/loader.gif" alt="preloader"/>
                        </div> :
                        ''
                }
                <div className="container">
                    {this.props.children}
                </div>
            </main>
        )
    }
}


export default Main
