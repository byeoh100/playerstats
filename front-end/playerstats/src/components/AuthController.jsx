import React, { useState } from 'react';
import AuthPopup from './AuthPopup';

function AuthController() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <div className="App">
            <button onClick={openPopup} className="open-popup-btn">Open Login/Signup</button>
            {isPopupOpen && <AuthPopup onClose={closePopup} />}
        </div>
    );
}

export default AuthController;