import {useEffect, useState} from 'react';
import { Alert } from 'react-bootstrap';
import data from '../data.json';
import Post from './Post';

const PostContainer = () => {

    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // fetch('https://serverless-api.amooabeeb.workers.dev/posts')
        //     .then((res) => {
        //         console.log(res);
        //     }).catch((err) => {
        //         console.log(err);
        //         setError('An error occurred while fetching posts');
        //     })
        setPosts(data);
    }, [])

    if (error) {
        return (
            <Alert variant='danger'>
                { error }
            </Alert>
        )
    }
    return (
        <div className='posts-content'>
            {
                posts.map((post, key) => (
                    <Post {...post} key={key}/>
                ))
            }
        </div>
    )
}

export default PostContainer;
