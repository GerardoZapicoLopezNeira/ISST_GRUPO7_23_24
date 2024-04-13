import React, { useEffect } from 'react'
import { useRef, useState } from 'react';
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow,
} from "@vis.gl/react-google-maps";
import credentials from '../helpers/credentials';

function Maps() {

    const defaultPosition = { lat: 0, lng: 0 };
    const position = localStorage.getItem("lat") && localStorage.getItem("lng") ? { lat: parseFloat(localStorage.getItem("lat")), lng: parseFloat(localStorage.getItem("lng")) } : defaultPosition;
    const [open, setOpen] = useState(false);



    return (
        position.lat === 0 && position.lng === 0 ? <></> :
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
    )
}

export default Maps