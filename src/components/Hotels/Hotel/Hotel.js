import React from 'react';
import styles from './Hotel.module.css';
import img from '../../../assets/images/hotel.jpg';
import PropTypes from 'prop-types';

const propTypes = {
    name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
};

function Hotel(props) {
    return (
        <div className={`card ${styles.hotel}`}>
            <div className="card-body">
                <div className="row">
                    <div className="col-4">
                        <img
                            src={img}
                            alt="Hotel"
                            className="img-fluid img-thumbnail" />
                    </div>
                    <div className="col-8">
                        <div className="row">
                            <div className="col">
                                <p className={styles.title}>{props.name}</p>
                                <span className="badge bg-info text-dark">{props.city}</span>
                            </div>
                            <div className="col text-end">
                                <h5>
                                    Ocena: {props.rating}
                                    <a href="#" className={`btn btn-${props.theme} mx-2 px-5`}>Pokaż</a>
                                </h5>
                            </div>
                        </div>
                    </div>

                    <div className="col-12">
                        <p className={styles.description}>{props.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

Hotel.propTypes = propTypes;

export default Hotel;