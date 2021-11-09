import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { FaThumbsDown, FaThumbsUp } from "react-icons/all";
import {useState} from "react";

const Post = (props) => {

    const { id, likeStore, dislikeStore, onLikeUpdate, onDislikeUpdate } = props;

    const [ likes, setLikes ] = useState(props.likes);
    const [ dislikes, setDislikes ] = useState(props.dislikes);

    const handlePostUpdate = (data) => {
        return fetch(`${process.env.REACT_APP_API_BASE_URL}/posts/${id}`, {
            method: 'POST',
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                return true;
            })
            .catch((error) => {
                return false;
            });
    }

    const canLike = () => !likeStore.hasOwnProperty(id);

    const canDislike = () => !dislikeStore.hasOwnProperty(id);

    const onClickLike = async () => {
        const updateLikes = await handlePostUpdate({ likes: likes + 1});
        if (updateLikes) {
            setLikes((prev) => prev + 1);
            onLikeUpdate(id);
        }
    }

    const onClickDislike = async () => {
        const updatedisLikes = await handlePostUpdate({ dislikes: dislikes + 1});
        if (updatedisLikes) {
            setDislikes((prev) => prev + 1);
            onDislikeUpdate(id);
        }
    }

    return (
        <Card className='post-card'>
            <Card.Header>
                <Card.Title>{props.title}</Card.Title>
            </Card.Header>
            <Card.Body>
                <Card.Text>{ props.content}</Card.Text>
            </Card.Body>
            <Card.Footer className='post-card__footer'>
                <Card.Text className='post-card__author'>{props.username}</Card.Text>
                <Card.Text className='post-card__stats'>
                    <button className='post-card__stat' disabled={!canLike()} onClick={onClickLike}>
                        <FaThumbsUp color='#008800'/>{likes}
                    </button>
                    <button className='post-card__stat' disabled={!canDislike()} onClick={onClickDislike}>
                        <FaThumbsDown color='#AB0101'/>{dislikes}
                    </button>
                </Card.Text>
            </Card.Footer>
        </Card>
    )
}

Post.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    likes: PropTypes.number,
    dislikes: PropTypes.number,
    likeStore: PropTypes.object,
    dislikeStore: PropTypes.object,
    onLikeUpdate: PropTypes.func,
    onDislikeUpdate: PropTypes.func
}

Post.defaultProps = {
    likes: 0,
    dislikes: 0,
    likeStore: {},
    dislikeStore: {}
}

export default Post;
