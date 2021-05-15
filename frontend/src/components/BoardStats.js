import React from 'react';
import AuthService from '../services/auth.service';

const BoardStats = () => {

    const currentUser = AuthService.getCurrentUser();

    return(
            <div>
                <h1>Statystyki użytkowników</h1>
                
            </div>
    );
};

export default BoardStats;