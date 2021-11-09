import {useEffect, useState, useCallback} from 'react';
import Post from './Post';

const PostContainer = (props) => {

    const { refetchPosts, onShowToast } = props;

    const [posts, setPosts] = useState([]);
    const [likeStore, setLikeStore] = useState({});
    const [dislikeStore, setDislikeStore] = useState({});

    const handleError = useCallback(() => {
        onShowToast({ type: 'danger', message: 'Error fetching posts'});
    }, [])

    useEffect(() => {
        const likes = localStorage.getItem('likes') ? JSON.parse(localStorage.getItem('likes')) : {};
        const dislikes = localStorage.getItem('dislikes') ? JSON.parse(localStorage.getItem('dislikes')) : {};
        setLikeStore(likes);
        setDislikeStore(dislikes);
    }, []);

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

    const handleLikeUpdate = (id) => {
        const storage = {...likeStore, [id]: true};
        setLikeStore((prev) => ({...prev, [id]: true}));
        localStorage.setItem('likes', JSON.stringify(storage));
    }

    const handleDislikeUpdate = (id) => {
        const storage = {...dislikeStore, [id]: true};
        setDislikeStore((prev) => ({...prev, [id]: true}));
        localStorage.setItem('dislikes', JSON.stringify(storage));
    }

    return (
        <>
            <div className='posts-content'>
                {
                    posts.map((post, key) => (
                        <Post
                            {...post}
                            key={key}
                            likeStore={likeStore}
                            dislikeStore={dislikeStore}
                            onLikeUpdate={handleLikeUpdate}
                            onDislikeUpdate={handleDislikeUpdate}
                        />
                    ))
                }
            </div>
        </>
    )
}

export default PostContainer;
