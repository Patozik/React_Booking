import React, { Component } from 'react';
import Hotel from './Hotel/Hotel';
import styles from './Hotels.module.css';
import PropTypes from 'prop-types';

const propTypes = {
    hotels: PropTypes.array.isRequired
}

class Hotels extends Component {
    render() {
        return (
            <div className={`${styles.container} container`}>
                <h2 className={styles.title}>Oferty :</h2>
                {this.props.hotels.map(hotel => 
                    <Hotel 
                        key={hotel.id} {...hotel} 
                        theme={this.props.theme}/>
                )}
            </div>
        );
    }
}

Hotels.propTypes = propTypes;

export default Hotels;