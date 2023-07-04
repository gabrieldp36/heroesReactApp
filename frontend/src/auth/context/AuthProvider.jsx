import { useReducer } from 'react';
import { AuthContext } from './AuthContext';
import { authReducer } from './authReducer';
import axios from 'axios';
import {simpleAlert } from '../../heroes/helpers/sweetAlert';
import { types } from '../types/types';
import setAxiosInterceptors from '../../axiosConfig';

setAxiosInterceptors();

const init = () => {
  return { logged: true }
};

export const AuthProvider =  ({ children }) => {
    
  const [ authState, dispatch ] = useReducer( authReducer, {}, init);

  const login = (data) => {
    axios.post(`http://localhost:3001/auth/login`, data)
    .then(({data:{token, usuario: user}}) => {
      const action = { type: types.login, payload: user }
      localStorage.setItem('token', token );
      dispatch(action);
    })
    .catch((error) => {
      console.log(error);
      simpleAlert('Ha ocurrido un error', error.response.data.error, 'error');
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    const action = { type: types.logout };
    dispatch(action);
  };

  const checkToken = async () => {
    if(!localStorage.getItem('token')){
      logout();
    } else {
      try {
        const response = await axios.get(`http://localhost:3001/auth/verificar`);
        const user = response.data;
        const action = { type: types.login, payload: user };
        dispatch(action);
      } catch (_) {
        logout();
      };
    };
  };
  
  return (
    <AuthContext.Provider value={{
      ...authState,
      // Metodos
      login,
      logout,
      checkToken,
    }}>
        { children }
    </AuthContext.Provider>
  );
}
