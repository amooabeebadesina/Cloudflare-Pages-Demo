import {useEffect, useState, useCallback} from 'react';
import Post from './Post';

const PostContainer = (props) => {

    const { refetchPosts, onShowToast } = props;

    const [posts, setPosts] = useState([]);

    const handleError = useCallback(() => {
        onShowToast({ type: 'danger', message: 'Error fetching posts'});
    }, [])

    useEffect(() => {
        if (refetchPosts) {
            fetch(`${process.env.REACT_APP_API_BASE_URL}/posts`)
                .then((res) => res.json()
                ).then((data) => {
                setPosts(data);
            }).catch((err) => {
                handleError();
            });
        }
    }, [refetchPosts, handleError]);

    return (
        <>
            <div className='posts-content'>
                {
                    posts.map((post, key) => (
                        <Post {...post} key={key}/>
                    ))
                }
            </div>
        </>
    )
}

export default PostContainer;
