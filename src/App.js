import './App.css';
import Header from './components/Header';
import PostContainer from './components/PostContainer';
import { Button, Container} from 'react-bootstrap';
import {useState} from "react";
import PostCreateModal from "./components/PostCreateModal";
import {FaPlus} from "react-icons/all";

function App() {

    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleShowModal = () => {
        setShowModal(true);
    }

    return (
        <div className='app'>
            <Header/>
            <PostCreateModal show={showModal} handleClose={handleCloseModal} />
                <Container fluid className='main-content'>
                    <div className='post-create-btn'>
                        <Button variant="primary" onClick={handleShowModal}>
                            Create Post
                            <FaPlus style={{'fontWeight': 'light', 'paddingLeft': '3px'}} />
                        </Button>
                    </div>
                    <div className='posts-container'>
                        <PostContainer />
                    </div>
                </Container>
        </div>
    );
}

export default App;
