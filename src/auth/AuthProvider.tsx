import React, {useState, useEffect} from "react";
import * as H from 'history';
import {auth} from "../firebase/index";


const AuthContext = React.createContext({});

const AuthProvider: React.FC = ({children}) => {
    const [currentUser, setCurrentUser] = useState<null | object>(null);

    //signup関数
    const signup = async (email: string, password: string, history: H.History) => {
        try {
            await auth.createUserWithEmailAndPassword(email, password);
            auth.onAuthStateChanged(user => setCurrentUser(user));
            history.push("/");
        } catch (error) {
            alert(error);
        }
    };

    //login関数
    const login = async (email:string,password:string,history:H.History) => {
        try {
            await auth.signInWithEmailAndPassword(email,password);
            auth.onAuthStateChanged(user => setCurrentUser(user));
            history.push("/");
        }catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        auth.onAuthStateChanged(setCurrentUser);
    },[])

    return (
        <AuthContext.Provider value = {{signup,login,currentUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthProvider, AuthContext}