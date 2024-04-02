import React, { useEffect } from 'react'
import { getAuthToken, request, setAuthHeader } from '../helpers/axios_helper';



function MyTools() {
    
    const myTools = async (id_user) => {
        request("GET", "/getMyHerramientas", id_user).then(
            (response) => {
                console.log(response.data);
                
            }).catch(
                (error) => {
                    console.log(error);
                }
            );
    }


    useEffect(() => {
        const id_user = localStorage.getItem("userId");
        myTools(id_user);
    }, []);


  return (
    <div>
        <h1>My Tools</h1>
        <p>Here you can manage your tools</p>
        
    </div>
  )
}

export default MyTools