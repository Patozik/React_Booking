
import { useContext } from "react";
import ThemeContext from "../../context/themeContext";

function Footer (props) {
    const theme = useContext(ThemeContext);
    
    return (
                <div className={`text-center m-3 text-${theme.color}`}>
                    Noclegi - Ozimina Patryk - 2022
                </div>
    )
};

export default Footer;