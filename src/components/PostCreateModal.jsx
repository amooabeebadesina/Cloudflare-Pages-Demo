import {useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import PropTypes from "prop-types";

const PostCreateModal = (props) => {

    const { show, handleClose } = props;

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            setValidated(false);
        } else {
            setValidated(true);
        }
    };


    return (
        <Modal show={show} onHide={handleClose} size='lg' centered>
            <Modal.Header closeButton>
                <Modal.Title>Add New Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Title of the post" required />
                        <Form.Control.Feedback type="invalid">Title is required</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Content</Form.Label>
                        <Form.Control as="textarea" rows={10} required/>
                        <Form.Control.Feedback type="invalid">Content is required</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Post As</Form.Label>
                        <Form.Control type="text" placeholder="john_doe" required />
                        <Form.Control.Feedback type="invalid">Username is required</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group style={{'textAlign': 'center'}}>
                        <Button variant="primary" type="submit" disabled={!validated}>
                            Submit
                        </Button>
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default PostCreateModal;

PostCreateModal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired
}
