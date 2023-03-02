import PropTypes from 'prop-types';

const Card = (props) => {
    return ( 
        <div className="card m-5 p-5" onClick={props.onClick}>
            <div className="card-image">
                <figure className="image is-128x128">
                <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image"/>
                </figure>
            </div>
            <div className="card-content">
                <div className="media">
                {/* <div className="media-left">
                    <figure className="image is-48x48">
                    <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image"/>
                    </figure>
                </div> */}
                <div className="media-content">
                    <p className="title is-4">{props.name}</p>
                    <p className="subtitle is-6">{props.price}</p>
                </div>
                </div>
            </div>
        </div>
     );
}

Card.propTypes={
    name:PropTypes.string,
    price:PropTypes.number
}
export default Card;