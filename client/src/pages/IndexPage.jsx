import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import Image from "../Image.jsx"; // Commented out for troubleshooting

export default function IndexPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get('/places').then(response => {
      console.log(response.data); // Log the response data
      setPlaces(response.data);
    });
  }, []);

  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
      {places.length > 0 && places.map(place => (
        <Link to={'/account/places/' + place._id} key={place._id}> {/* Added key prop */}
          <div className="bg-gray-500 mb-2 rounded-2xl flex">
            {place.photos?.[0] && (
              <>
                {console.log('http://localhost:4000/' + place.photos[0])} {/* Log the image URL */}
                <img className="rounded-2xl object-cover aspect-square" src={'http://localhost:4000/' + place.photos[0]} alt="photo"/> 
              </>
            )}
          </div>
          <h2 className="font-bold">{place.address}</h2>
          <h3 className="text-sm text-gray-500">{place.title}</h3>
          <div className="mt-1">
            <span className="font-bold">${place.price}</span> per night
          </div>
        </Link>
      ))}
    </div>
  );
}
