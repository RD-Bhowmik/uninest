import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../Perks";
import axios from "axios";

export default function PlacesPage() {
    const { action } = useParams();
    const [tittle, setTittle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuest, setMaxGuest] = useState(1);


    function inputHeader(text) {
        return (
            <h2 className="text-xl mt-4 flex "><b>{text}</b> </h2>
        );
    }

    function inputDescription(text) {
        return (
            <p className="text-gray-500 text-sm ">{text}</p>
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

    async function addPhotoByLink(ev) {
        ev.preventDefault();
        const { data: filename } = await axios.post('/upload-by-link', { link: photoLink });
        setAddedPhotos(prev => {
            return [...prev, filename];
        });
        setPhotoLink('');
    }
    function uploadPhoto(ev){
        const files = ev.target.files;
        const data = new FormData();
        for (let i= 0; i < files.length; i++){
            data.append("photos",files[i])
        }
        axios.post("/upload", data,{
            headers:{"Content-type" :"multipart/form-data"}
        }).then(response =>{
            const{data:filenames} = response; 
            setAddedPhotos(prev => {
            return [...prev, ...filenames];
        });
        })
    }

    return (
        <div>
            {action !== 'new' && (
                <div className="text-center">
                    <Link className="inline-flex gap-2 bg-primary text-white py-2 px-8 rounded-full mt-8" to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>Add new place
                    </Link>
                </div>
            )}
            {action === 'new' && (
                <div>
                    <form>
                        {preInput('Title', 'Tittle Should not be Clickbaity or False')}
                        <input type='text' value={tittle} onChange={ev => setTittle(ev.target.value)} placeholder="Tittle: 3 bed Suit Available Near Brac" />
                        {preInput('Address :', 'Provide Full Address with necessary landmarks')}
                        <input type='text' value={address} onChange={ev => setAddress(ev.target.value)} placeholder="Address" />
                        {preInput('Photos :', 'Make Sure the pictures are not Blurry')}
                        <div className="flex gap-2">
                            <input value={photoLink}
                                onChange={ev => setPhotoLink(ev.target.value)}
                                type="text" placeholder="Link of your photos" />
                            <button onClick={addPhotoByLink} className="text-white bg-primary bg-color-300 px-3 rounded-2xl">Add&nbsp;Photos</button>
                        </div>
                        <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            {addedPhotos.length > 0 && addedPhotos.map(link => (
                                <div>
                                    <img className="rounded-2xl" src={'http://localhost:4000/uploads/' + link} />
                                </div>
                            ))}
                            <label className="text-primary border-primary cursor-pointer flex items-center gap-1 border bg-transparent rounded-2xl p-4 text-xl justify-center">
                                <input type="file" multiple className="hidden" onChange={uploadPhoto}/>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                                </svg>
                                UPLOAD
                            </label>
                        </div>
                        {preInput('Description :', 'Add details of the Place')}
                        <textarea value={description} onChange={ev => setDescription(ev.target.value)} className="w-full border my-1 py-2 px-3 rounded-2xl" />
                        {preInput('Perks :', 'Select the perks of your places')}
                        <div className="grid mt-2 grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-2">
                            <Perks selected={perks} onChange={setPerks} />
                        </div>
                        {preInput('Extra Info :', 'Rules and regulation, etc ')}
                        <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} className="w-full border my-1 py-2 px-3 rounded-2xl" />
                        {preInput('Check-In / Check-Out / Max Person :', 'time to enter/ time to leave / max persons to stay ')}
                        <div className="grid gap-2 sm:grid-cols-3">
                            <div>
                                <h3 className="mt-2 -mb-1">Check In time:</h3>
                                <input type="text" 
                                    value={checkIn} 
                                    onChange={ev => setCheckIn(ev.target.value)} 
                                    placeholder="9:00" />
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Check Out time:</h3>
                                <input type="text" 
                                    value={checkOut} 
                                    onChange={ev => setCheckOut(ev.target.value)} 
                                    placeholder="22:00" />
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Max Num of People:</h3>
                                <input type="number" 
                                    value={maxGuest} 
                                    onChange={ev => setMaxGuest(ev.target.value)} />
                            </div>
                            <div>
                                <button className="primary my-4">Save</button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}