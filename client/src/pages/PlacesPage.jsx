import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesFormPage from "./PlacesFormPage";

export default function PlacesPage() {
    const { action } = useParams();
    const [redirectPlacesList, setRedirectPlacesList] = useState(false);


    if (redirectPlacesList && action!=='new' ) {
        return <Navigate to={'/account/places'} />;
    }

    return (
        <div>
            {action !== 'new' && (
                <div className="text-center">
                    <Link className="inline-flex gap-2 bg-primary text-white py-2 px-8 rounded-full mt-8" to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add new place
                    </Link>
                </div>
            )}
            {action === 'new' && (
                <PlacesFormPage/>
            )}
        </div>
    );
}
