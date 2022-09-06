import React, { PureComponent } from 'react';
import Hotel from './Hotel/Hotel';
import styles from './Hotels.module.css';
import PropTypes from 'prop-types';

const propTypes = {
    hotels: PropTypes.array.isRequired
}

class Hotels extends PureComponent {

    render() {
        return (
            <div className={`${styles.container} container`}>
                <h2 className={styles.title}>Oferty :</h2>
                {this.props.hotels.map(hotel => 
                    <Hotel 
                        key={hotel.id} {...hotel}/>
                )}
            </div>
        );
    }
}

Hotels.propTypes = propTypes;

export default Hotels;