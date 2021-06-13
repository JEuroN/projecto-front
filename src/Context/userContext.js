import React, {useState, createContext} from 'react';

export const userContext = createContext();

const UserProvider = (props) => {

    const [session, setSession] = useState('');

    return(
        <userContext.Provider value={{session, setSession}}>
            {props.children}
        </userContext.Provider>
    )
}

export default UserProvider;