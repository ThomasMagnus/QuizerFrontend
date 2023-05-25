import {Button, Modal} from "react-bootstrap";
import React from "react";

class MyVerticallyCenteredModal extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        onHide: true
    }

    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {this.props.subject}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Группы:</h4>
                    <p>
                        Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                        consectetur ac, vestibulum at eros.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default MyVerticallyCenteredModal