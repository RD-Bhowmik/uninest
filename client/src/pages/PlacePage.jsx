import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PlacePage() {
    const { id } = useParams();
    const [place, setPlace] = useState(null);
    
    useEffect(() => {
        if (!id) {
            return; 
        }
        axios.get(`places/${id}`).then(response => {
            console.log(response.data); // Log the response data
            setPlace(response.data);
        }).catch(error => {
            console.error("There was an error fetching the place data!", error);
        });
    }, [id]);

    if (!place) return '';

    return (
        <div className="mt-4 bg-gray-100 -mx-8 px-8 py-8">
            <h1 className="text-3xl">{place.title}</h1>
            <a className="my-2 block font-semibold underline " target="_blank" href={'https://maps.google.com/?q='+place.address}>{place.address}</a>
            <div className="grid gap-2 grid-cols-[2fr_1fr]">
                <div>
                    {place.photos?.[0] && (
                        <div>
                            <img className="aspect-square object-cover" src={'http://localhost:4000/' + place.photos[0]} alt="" onError={(e) => console.error('Image failed to load:', e)} />
                        </div>
                        
                    )}
                </div>
                <div className="grid">
                    {place.photos?.[1] && (
                        <img className="aspect-square object-cover" src={'http://localhost:4000/' + place.photos[1]} alt="" onError={(e) => console.error('Image failed to load:', e)} />
                    )}
                    <div className="overflow-hidden">
                    {place.photos?.[2] && (
                        <img className="aspect-square object-cover relative top-2" src={'http://localhost:4000/' + place.photos[2]} alt="" onError={(e) => console.error('Image failed to load:', e)} />
                    )}
                    </div>
                    
                </div>
            </div>
        </div>
    );
}
