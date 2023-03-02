import PropTypes from 'prop-types';

const Button = (props) => {
        return(
            <button
                id={props.id}
                className={`button ${props.className}`}
                type={props.type}
                onClick={props.onClick}
            >
                {props.name}
            </button>
        )  
}
Button.propTypes={
    id:PropTypes.string,
    className:PropTypes.string,
    onClick:PropTypes.func,
    name:PropTypes.string,
    type:PropTypes.string,

}
export default Button;