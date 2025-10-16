import React, { use } from 'react';
import { AuthContext } from '../context/AuthContext';

const useAuth = () => {

    const authData = use(AuthContext);

    return authData;
};

export default useAuth;