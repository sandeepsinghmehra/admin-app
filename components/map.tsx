"use client";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from "leaflet";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Convert StaticImageData to URL string
const iconUrl = icon.src;
const shadowUrl = iconShadow.src;
let DefaultIcon = L.icon({
    iconUrl: iconUrl,
    shadowUrl: shadowUrl
});

L.Marker.prototype.options.icon = DefaultIcon;

const Map:React.FC<any> = ({mapData}) => {

    return (
        <MapContainer style={{height: '400px', width: '100%'}} center={[29.555012,79.340990]} zoom={14} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {mapData.map((country:any) => (
              <Marker key={country.countryInfo._id} position={[country.countryInfo.lat, country.countryInfo.long]}>
                <Popup>
                  <div>
                    <p>Address: {country.address}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
        </MapContainer>
    )
}
// Disable server-side rendering for this component
// Map.ssr = false;
export default Map;