import React, { useContext } from 'react';
import styles from './Hotel.module.css';
import img from '../../../assets/images/hotel.jpg';
import PropTypes from 'prop-types';
import ThemeContext from '../../../context/themeContext';
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router-dom';

const propTypes = {
    name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
};

function Hotel(props) {
    const theme = useContext(ThemeContext);
    const [auth] = useAuth();

    const clickHandler = () => {
        if (props.onOpen) {
            props.onOpen(props)
        };
    };

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
                                    Ocena: {props.rating || "Brak ocen"}
                                    <Link onClick={clickHandler} to={`/hotele/${props.id}`} className={`btn btn-${theme.color} mx-2 px-5`}>
                                            Pokaż
                                    </Link>
                                </h5>
                            </div>
                        </div>
                    </div>

                    <div className="col-12">
                        <p className={styles.description}>{props.description}</p>
                    </div>
                    {auth
                        ? <p className="mt-2">Dostępność : {props.rooms} pokoje</p>
                        : <p className="mt-2">Dostępność : Zaloguj się aby sprawdzić</p>
                    }
                </div>
            </div>
        </div>
    );
}

Hotel.propTypes = propTypes;

export default Hotel;