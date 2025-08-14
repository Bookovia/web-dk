import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import wkx from 'wkx';
const containerStyle = {
  width: '100%',
  height: '400px',
};

interface GarageMapProps {
  locationHex: string;
  businessName?: string;
}

export const GarageMap: React.FC<GarageMapProps> = ({ locationHex, businessName }) => {

      const buffer = Buffer.from(locationHex, 'hex');
    const geometry = wkx.Geometry.parse(buffer);
   if (geometry instanceof wkx.Point) {
  const { x: lat, y:  lng } = geometry;

  const center = { lat, lng };

   return (
    <LoadScript googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY!}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={20}  mapTypeId="satellite" 
      options={{
    tilt: 45,
    mapTypeControl: true,
    streetViewControl: true,
  }}
      
      >
        <Marker position={center} title={businessName} />
      </GoogleMap>
    </LoadScript>
  );


} else {
  return null
}

};

interface AddressMapProps {
  address: string;
}


// export const AddressMap: React.FC<AddressMapProps> = ({ address }) => {
//   const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

//   useEffect(() => {
//     const geocodeAddress = async () => {
//       const geocoder = new google.maps.Geocoder();
//       geocoder.geocode({ address }, (results, status) => {
//         if (status === 'OK' && results && results[0]) {
//           const location = results[0].geometry.location;
//           setCoords({ lat: location.lat(), lng: location.lng() });
//         } else {
//           console.error('Geocode failed: ' + status);
//         }
//       });
//     };

//     if (window.google && address) {
//       geocodeAddress();
//     }
//   }, [address]);
//   console.log({address})

//   return (
//     <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
//       {coords && (
//         <GoogleMap mapContainerStyle={containerStyle} center={coords} zoom={15}>
//           <Marker position={coords} />
//         </GoogleMap>
//       )}
//     </LoadScript>
//   );
// };

