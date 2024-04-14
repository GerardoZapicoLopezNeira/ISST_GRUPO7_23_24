import React, { useEffect } from 'react'
import { useRef, useState } from 'react';
import { request } from '../helpers/axios_helper';
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow,
} from "@vis.gl/react-google-maps";
import credentials from '../helpers/credentials';

function MapsUser(props) {

    const position = { lat: props.lat, lng: props.lng };
    const [open, setOpen] = useState(false);


    const updatePosition = async (username, lat, lng) => {
        request("PUT", "/users/" + username + "/location", { lat, lng }).then(
            (response) => {
                console.log("Location updated successfully:", response.data);
                window.location.href = "/user";
            }).catch(
                (error) => {
                    console.error("Error updating location:", error.message);
                
                
                }
            );
    }

    const getPosition = async (event) => {
        event.preventDefault();
        try {
            const pos = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true });
            });
            const { latitude, longitude } = pos.coords;
            updatePosition(localStorage.getItem("username"), latitude, longitude);
        } catch (error) {
            console.error(error.message);
            alert("No se pudo obtener tu ubicación, por favor comprueba que no tienes desactivada la geolocalización en tu navegador")
        
        }
    };




    return (
        position.lat === null && position.lng === null ?
            <>
                <p>No has registrado tu ubicación</p>
                <button onClick={getPosition}>Registra tu ubicación</button>
            </>
            :
            <>
                        <APIProvider apiKey={credentials.mapsApiKey}>
                <div style={{ height: "100vh", width: "100%" }}>
                    <Map defaultZoom={15} defaultCenter={position} mapId={credentials.mapId}>
                        <AdvancedMarker position={position} onClick={() => setOpen(true)}>
                            <Pin
                                background={"grey"}
                                borderColor={"green"}
                                glyphColor={"purple"}
                            />
                        </AdvancedMarker>
                    </Map>
                </div>
            </APIProvider>
            <button onClick={getPosition}>Actualiza tu ubicación</button>
            </>

            
    )
}

export default MapsUser