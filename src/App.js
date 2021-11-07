import './App.css';
import Header from './components/Header';
import PostContainer from './components/PostContainer';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <div className='app'>
        <Header/>
        <div className='posts-container'>
            <Container>
                <PostContainer />
            </Container>
        </div>
    </div>
  );
}

export default App;
