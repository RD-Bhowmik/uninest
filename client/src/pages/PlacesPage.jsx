import { useEffect , useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesFormPage from "./PlacesFormPage";
import AccountNav from "../AccountNav";

export default function PlacesPage() {
    const {action} = useParams();
    useEffect(() =>{
        axios.get('/places').then((data) =>{
            setRedirectPlacesList(data);
        });
    }, []);
    
    // const { action } = useParams();
    // const [redirectPlacesList, setRedirectPlacesList] = useState(false);


    // if (redirectPlacesList && action!=='new' ) {
    //     return <Navigate to={'/account/places'} />;
    // }
    
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
                <div className="mt-4">
                    {PlacesFormPage.length >0 && PlacesFormPage.map(place => (
                        <div className="'flex gap-4 bg-gray-100 p-4 rounded-2xl">
                            <div className="w-32 h-32 bg-gray-300">
                                {place.photos.length >0 && (
                                    <img src={place.photos[0]} alt="" />
                                )}
                            </div>
                            <h2 className="text-xl">{place.title}</h2>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
