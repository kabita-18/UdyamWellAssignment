import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../context/userContext';

const Home = () => {
    const [ currentUser, setCurrentUser ] = useContext(UserContext);
    const[name, setName]=useState("");
    useEffect(()=>{
        
        if(currentUser !== undefined){
            setName(currentUser.result.firstName);}
            else{
                setName("")
            }
    },[currentUser])
    return (
        <div>
            {name !== '' ? `Hello ${name}!` : "Click on User Icon to login"}
        </div>
    );
}

export default Home;
