import { useEffect,useState } from "react";
import axios from "axios"; 
import AccountNav from "../AccountNav";
import { useParams, Navigate } from "react-router-dom";
import Perks from "../Perks.jsx"; 
import PhotosUploader from "../PhotosUploader.jsx";
// import AccountNav from "../AccountNav";

export default function PlacesFormPage(){
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks,setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests,setMaxGuests] = useState(1);
    const [redirect,setRedirect] = useState(false);

    function inputHeader(text) {
        return (
            <h2 className="text-xl mt-4 flex "><b>{text}</b></h2>
        );
    }

    function inputDescription(text) {
        return (
            <p className="text-gray-500 text-sm">{text}</p>
        );
    }

    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        );
    }

    async function savePlace(ev){
        ev.preventDefault();
        const placeData ={
            title, address, addedPhotos, 
            description, perks, extraInfo, 
            checkIn, checkOut, maxGuests
        };
        if (id){
            await axios.put('/places',{
                id, ...placeData 
            });
            setRedirect(true);
        } else {
            await axios.post('/places',placeData);
            setRedirect(true);
        }
    }
    if (redirect) {
        return <Navigate to={'/account/places'} />
    }

    // async function addNewPlace(ev){
    //     ev.preventDefault();
    //     await axios.post('/places',{title, address, addedPhotos,
    //         description, perks,extraInfo,
    //         checkIn,checkOut,maxGuests
    //     });
    //     setRedirect(true);
    // }
    // if (redirect){
    //     return <Navigate to = {'/account/places'}/>
    // }


    return(
        <div>
            <AccountNav />
        <form onSubmit={savePlace}>
            {preInput('Title', 'Title should not be clickbaity or false')}

            <input type='text' 
                    value={title} 
                    onChange={ev => setTitle(ev.target.value)} 
                    placeholder="Title: 3 bed suite available near Brac" />

            {preInput('Address:', 'Provide full address with necessary landmarks')}

            <input type='text' 
                    value={address} 
                    onChange={ev => setAddress(ev.target.value)} 
                    placeholder="Address" />

            {preInput('Photos:', 'Make sure the pictures are not blurry')}
            <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>

            {preInput('Description:', 'Add details of the place')}

            <textarea value={description} 
                    onChange={ev => setDescription(ev.target.value)}/>
            {preInput('Perks','select all the perks of your place')}

            <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                <Perks selected={perks} onChange={setPerks}/>
            </div>
            
            {preInput('Extra Info:', 'Rules and regulations, etc.')}
            <textarea value={extraInfo} 
                    onChange={ev => setExtraInfo(ev.target.value)}/>

            {preInput('Check-In / Check-Out:', 'Time to enter / time to leave')}

            <div className="grid gap-2 sm:grid-cols-2">
                <div>
                    <h3 className="mt-2 -mb-1">Main Gate Opening Time:</h3>
                    <input type="text" 
                            value={checkIn} 
                            onChange={ev => setCheckIn(ev.target.value)} 
                            placeholder="9:00" />
                </div>
                <div>
                    <h3 className="mt-2 -mb-1">Main Gate Closing Time:</h3>
                    <input type="text" 
                        value={checkOut} 
                        onChange={ev => setCheckOut(ev.target.value)} 
                        placeholder="22:00" />
                </div>
                <div>
                    <h3 className="mt-2 -mb-1">Max number of guests</h3>
                    <input type="number" 
                        value={maxGuests}
                        onChange={ev => setMaxGuests(ev.target.value)}/>
                </div>
                <div>
                    <button type="submit" className="primary my-4">Save</button>
                </div>
            </div>
        </form>
    </div>
    );
}
