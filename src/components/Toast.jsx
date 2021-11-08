import {Toast, ToastContainer} from "react-bootstrap";

const Toastr = (props) => {
    return (
        <ToastContainer position='top-end'>
            <Toast className="d-inline-block m-1" onClose={props.onClose} bg={props.bg} show={props.show} delay={3500} autohide>
                <Toast.Body className='text-white'>
                    {props.message}
                </Toast.Body>
            </Toast>
        </ToastContainer>
    )
}

export default Toastr;
