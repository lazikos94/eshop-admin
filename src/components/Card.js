import PropTypes from 'prop-types';

const Card = (props) => {
    return (
        <div className="card m-5 p-5" style={{ width: '20%' }} >
            <div className="card-image" style={{ cursor: ' pointer ' }} onClick={() => props.navigate(props.data._id)}>
                <figure className="image is-2by3">
                    <img src={props.data.primaryImg} alt="Placeholder image" />
                </figure>
            </div>
            <div className="card-content">
                <div className="media">
                    {/* <div className="media-left">
                        <figure className="image is-2by3">
                            <img src={props.data.primaryImg} alt="Placeholder image" />
                        </figure>
                    </div> */}
                    <div className="media-content">
                        <p className="title is-6">{props.data.name.gr}</p>
                        <p className="subtitle is-8">{props.data.price} €</p>
                    </div>
                </div>
                <div className="content">
                    {props.data.serialNumber}
                    <br />
                    {props.data.description.gr}

                </div>
            </div>
        </div>
    );
}

Card.propTypes = {
    name: PropTypes.string,
    price: PropTypes.number
}
export default Card;