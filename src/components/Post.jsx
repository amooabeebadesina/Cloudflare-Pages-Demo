import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { FaThumbsDown, FaThumbsUp } from "react-icons/all";

const Post = (props) => {
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
                    <span className='post-card__stat'><FaThumbsUp color='#008800'/>{props.likes}</span>
                    <span className='post-card__stat'><FaThumbsDown color='#AB0101' />{props.dislikes}</span>
                </Card.Text>
            </Card.Footer>
        </Card>
    )
}

Post.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    likes: PropTypes.number,
    dislikes: PropTypes.number
}

Post.defaultProps = {
    likes: 0,
    dislikes: 0
}

export default Post;
