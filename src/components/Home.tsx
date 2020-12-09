import React, {useContext} from "react"
import {AuthContext} from "../auth/AuthProvider";


const Home = () => {
    const {currentUser} = useContext(AuthContext)
    return(
        <h1>HOME </h1>
    )
}

export default Home;