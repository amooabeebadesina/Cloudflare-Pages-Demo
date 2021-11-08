import './App.css';
import Header from './components/Header';
import PostContainer from './components/PostContainer';
import { Button, Container} from 'react-bootstrap';
import {useState} from "react";
import PostCreateModal from "./components/PostCreateModal";
import {FaPlus} from "react-icons/all";
import Toastr from "./components/Toast";

function App() {

    const [showModal, setShowModal] = useState(false);
    const [toastMessage, setToastMessage] = useState(null);
    const [toastType, setToastType] = useState(null);
    const [shouldRefetch, setShouldRefetch] = useState(true);

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleShowModal = () => {
        setShowModal(true);
        setShouldRefetch(false);
    }

    const handleShowToast = ({ type, message}) => {
        setToastType(type);
        setToastMessage(message);
    }

    return (
        <div className='app'>
            <Header/>
            <PostCreateModal show={showModal} handleClose={handleCloseModal} onShowToast={handleShowToast} onPostAdd={() => setShouldRefetch(true)} />
            <Container fluid className='main-content'>
                { toastMessage && (<Toastr bg={toastType} message={toastMessage} onClose={() => setToastMessage(null)} />)}
                <div className='post-create-btn'>
                    <Button variant="primary" onClick={handleShowModal}>
                        Create Post
                        <FaPlus style={{'fontWeight': 'light', 'paddingLeft': '3px'}} />
                    </Button>
                </div>
                <div className='posts-container'>
                    <PostContainer onShowToast={handleShowToast} refetchPosts={shouldRefetch} />
                </div>
            </Container>
        </div>
    );
}

export default App;
