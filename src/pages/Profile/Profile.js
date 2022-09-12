import { Routes, Route ,NavLink } from "react-router-dom";
import ProfileDetails from "./ProfileDetails/ProfileDetails";
import MyHotels from "./MyHotels/MyHotels";

export default function Profile(props) {
    return(
        <div className="card container">
            <div className="card-header">
                <h2>Moj profil</h2>
            </div>
            <div className="card-body">
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <NavLink end to="/profil" className="nav-link">Profil</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="hotele" className="nav-link">Hotele</NavLink>
                    </li>
                </ul>

                <div className="pt-4">
                    <Routes>
                        <Route path="*" element={<ProfileDetails />} />
                        <Route path="hotele" element={<MyHotels />} />
                    </Routes>
                    
                </div>

            </div>
        </div>
    )
}