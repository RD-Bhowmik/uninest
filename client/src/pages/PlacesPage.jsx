import { Link, useParams } from "react-router-dom";
import PlacesFormPage from "./PlacesFormPage";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PlacesPage() {
    const { action } = useParams();
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        axios.get('/user-places')
            .then(({ data }) => setPlaces(data))
            .catch(err => console.error('Error fetching places:', err)); // Error handling for the request
    }, []);

    return (
        <div>
            <AccountNav />
            <div className="text-center">
                <Link className="inline-flex gap-2 bg-primary text-white py-2 px-8 rounded-full mt-8" to={'/account/places/new'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add new place
                </Link>
            </div>
            <div className="mt-4">
                {places.length > 0 && places.map(place => (
                    <Link to={'/account/places/' + place._id} key={place._id} className="flex cursor-pointer gap-5 bg-gray-200 p-4 rounded-2xl">
                        <div className="flex w-32 h-32 bg-gray-200 grow shrink-0">
                            {place.photos.length > 0 && (
                                <>
                                    {console.log('Image URL:', 'http://localhost:4000/' + place.photos[0])}
                                    <img
                                        className="object-cover"
                                        src={'http://localhost:4000/' + place.photos[0].replace(/\\/g, '/')} // Correct path normalization
                                        alt={place.title || 'Place image'} // Alt text for accessibility
                                    />
                                </>
                            )}
                        </div>
                        <div className="grow-0 shrink">
                            <h2 className="text-xl">{place.title}</h2>
                            <p className="text-sm mt-2">{place.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
            {action === 'new' && (
                <PlacesFormPage />      
            )}
        </div>
    );
}
