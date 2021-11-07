import {useEffect, useState} from 'react';
import { Alert } from 'react-bootstrap';


const PostContainer = () => {

    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://serverless-api.amooabeeb.workers.dev/posts')
            .then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
                setError('An error occurred while fetching posts');
            })
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

        </div>
    )
}

export default PostContainer;
