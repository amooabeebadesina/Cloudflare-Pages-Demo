import {useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import PropTypes from "prop-types";

const PostCreateModal = (props) => {

    const { show, handleClose, onShowToast, onPostAdd } = props;

    const [validated, setValidated] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [username, setUsername] = useState('');

    const isFormValid = () => {
        return !(!title || !content || !username);
    }

    const clearForm = () => {
        setTitle('');
        setContent('');
        setContent('');
    }

    const handleChange = (e) => {
        const { name, value } = e.currentTarget;
        switch (name) {
            case 'title':
                setTitle(value);
                break;
            case 'content':
                setContent(value);
                break;
            default:
                setUsername(value);
                break;
        }
        if (isFormValid()) {
            setValidated(true);
        } else {
            setValidated(false);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const data = { title, username, content };
        if (validated) {
            fetch(`${process.env.REACT_APP_API_BASE_URL}/posts`, {
                method: 'POST',
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(data => {
                    onShowToast({ type: 'success', message: 'Post added successfully'});
                    onPostAdd();
                    clearForm();
                    handleClose();
                })
                .catch((error) => {
                    onShowToast({ type: 'danger', message: 'Error adding post'});
                });
        }
    };


    return (
        <Modal show={show} onHide={handleClose} size='lg' centered>
            <Modal.Header closeButton>
                <Modal.Title>Add New Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" name="title" placeholder="Title of the post" value={title} onChange={handleChange} required />
                        <Form.Control.Feedback type="invalid">Title is required</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Content</Form.Label>
                        <Form.Control as="textarea" name="content" rows={10} value={content} onChange={handleChange} required/>
                        <Form.Control.Feedback type="invalid">Content is required</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Post As</Form.Label>
                        <Form.Control type="text" name="username" placeholder="john_doe" value={username} onChange={handleChange} required />
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
