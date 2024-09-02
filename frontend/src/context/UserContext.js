import {createContext} from 'react';
import useAuth from '../hooks/useAuth';

const Context = createContext();

function UserProvider({children}) {
    const {authenticating, register} = useAuth();

    return (
        <Context.Provider value={{authenticating, register}}>
            {children}
        </Context.Provider>
    );
}

export { Context, UserProvider};