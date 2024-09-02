import {createContext} from 'react';
import useAuth from '../hooks/useAuth';

const Context = createContext();

function UserProvider({children}) {
    const {authenticating, register, logout} = useAuth();

    return (
        <Context.Provider value={{authenticating, register, logout}}>
            {children}
        </Context.Provider>
    );
}

export { Context, UserProvider};