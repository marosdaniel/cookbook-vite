import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAuthState } from '../../store/Auth';
import Login from './Login/';
import Register from './Register';
import { ENonProtectedRoutes } from '../../router/types';

const SigninPage = () => {
  const [isLogin, setIsLogin] = React.useState(true);
  const { isAuthenticated } = useAuthState();

  if (isAuthenticated) {
    return <Navigate to={ENonProtectedRoutes.HOME} />;
  }

  return <>{isLogin ? <Login setIsLogin={setIsLogin} /> : <Register setIsLogin={setIsLogin} />}</>;
};

export default SigninPage;
