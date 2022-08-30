import React from 'react';
import styles from './Hotel.module.css';
import img from '../../../assets/images/hotel.jpg';

function Hotel() {
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
                                <p className={styles.title}>Hotel</p>
                                <span className="badge bg-info text-dark">Warszawa</span>
                            </div>
                            <div className="col text-end">
                                <h5>
                                    Ocena: 8.3
                                    <a href="#" className="btn btn-primary mx-2 px-5">Pokaż</a>
                                </h5>
                            </div>
                        </div>
                    </div>

                    <div className="col-12">
                        <p className={styles.description}>Mieszkanie o powierzchni 59,12 m2 (2-poziomowe) zlokalizowane w Rzeszowie ul. Aleja Generała Władysława Sikorskiego. Mieszkanie usytuowane jest na 3 piętrze, 3 piętrowego bloku. Do mieszkania należy komórka lokatorska, duży balkon. Nieruchomość jest w pełni umeblowane, posiada klimatyzacje oraz wyposażone jest w sprzęt AGD.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hotel;