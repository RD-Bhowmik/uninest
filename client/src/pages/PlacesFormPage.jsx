import { useState } from "react";
import axios from "axios"; 
import AccountNav from "../AccountNav";
import { useParams, Navigate } from "react-router-dom";
import Perks from "../Perks.jsx"; 

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
    const [redirect, setRedirect] = useState(false);
    const [photoLink, setPhotoLink] = useState(''); // Add this line


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

    async function addPhotoByLink(ev){
    ev.preventDefault();
    try {
        const response = await axios.post('http://localhost:4000/upload-by-link', { link: photoLink });
        console.log('Response from server:', response);
        const { data: filename } = response;
        setAddedPhotos(prev => {
            return [...prev, filename];
        });
        setPhotoLink('');
    } catch (error) {
        console.error('Error uploading photo by link:', error);
    }
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


    function uploadPhoto(ev) {
        const files = ev.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i]);
        }
        axios.post('/upload', data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(response => {
            const { data:filenames} = response;
            setAddedPhotos(prev => {
                return [...prev, ...filenames];
            });
            
        })
    }

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
            <div className="flex gap-2">
                <input value={photoLink} 
                        onChange={ev => setPhotoLink(ev.target.value)} 
                        type="text" placeholder="add using links"/>
                <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl"> Add&nbsp;photo</button>
            </div>
            
            <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {addedPhotos.length > 0 && addedPhotos.map(link => (
                    <div className="h-35 flex">
                        
                    <img className="rounded-2xl " src={'http://localhost:4000/uploads/' + link} alt="Uploaded" />
                    </div>
                ))}
                {/* <button className="flex gap-1 justify-center border bg-transparent rounded-2xl  "></button> */}
                <label className="cursor-pointer text-primary border-primary flex items-center gap-1 border bg-transparent rounded-2xl text-2xl justify-center text-gray-600">

                    <input type="file" 
                            multiple className="hidden" 
                            onChange={uploadPhoto} />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                    </svg>
                    UPLOAD
                </label>
            </div>

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
