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

function Maps(props) {

    const position = {lat: props.lat, lng: props.lng};
    const [open, setOpen] = useState(false);



    return (
        position.lat === null && position.lng === null ? <p>No has registrado tu ubicación</p> :
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