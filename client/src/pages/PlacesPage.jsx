import { useState } from "react";
import {Link, useParams} from "react-router-dom";

export default function PlacesPage() {
    const {action} = useParams();
    const [tittle, setTittle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setParks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkin, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuuest, setMaxGuest] = useState(1);
    

    return (
        <div>
        {action !== 'new' &&(
            <div className="text-center">
                <Link className="inline-flex gap-2 bg-primary text-white py-2 px-8 rounded-full mt-8" to={'/account/places/new'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                     <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>Add new place
                </Link>
            </div>
        )}
        {action === 'new' &&(
            <div> 
                <form>
                    <h2 className="text-xl mt-4 flex "><b> Tittle :</b> </h2>
                    <p className="text-gray-500 text-sm ">Tittle Should not be Clickbaity </p>
                    <input type='text' placeholder="Tittle: 3 bed Suit Available Near Brac" />
                    <h2 className="text-xl mt-4 flex "><b>Address :</b></h2>
                    <p className="text-gray-500 text-sm ">Provide Full Address with necessary landmarks</p>
                    <input type='text' placeholder="Address"/>
                    <h2 className="text-xl mt-4 flex "><b>Photos :</b></h2>
                    <p className="text-gray-500 text-sm ">Make Sure the pictures are not Blurry</p>
                    <div className="flex gap-2">
                        <input type="text" placeholder="Link of your photos"/>
                        <button className=" text-white bg-primary bg-color-300 px-3 rounded-2xl">Add&nbsp;Photos</button>
                    </div>
                    <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                        <button className="text-primary border-primary justified-center flex gap-1 border bg-transparent rounded-2xl p-8 text-xl text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                            </svg>
                            UPLOAD
                        </button>
                    </div>
                    <h2 className="text-xl mt-4 flex "><b>Description :</b> </h2>
                    <p className="text-gray-500 text-sm ">Add details of the Place </p>
                    <textarea className="w-full border my-1 py-2 px-3 rounded-2xl"/>
                    <h2 className="text-xl mt-4 flex "><b>Perks :</b> </h2>
                    <p className="text-gray-500 text-sm ">Select the perks of your places</p>
                    <div className="grid mt-2 grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-2">
                        <label className=" border border-primary p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                            <input type="checkbox"/>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
                                </svg>
                            <span>Free Wifi</span>
                        </label>
                        <label className="border border-primary p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                            <input type="checkbox"/>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                                </svg>
                            <span>Maid</span>
                        </label>
                        <label className=" border border-primary p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                            <input type="checkbox"/>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                            </svg>
                            <span>Laundry</span>
                        </label>
                        <label className="border border-primary p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                            <input type="checkbox"/>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 17.25v-.228a4.5 4.5 0 0 0-.12-1.03l-2.268-9.64a3.375 3.375 0 0 0-3.285-2.602H7.923a3.375 3.375 0 0 0-3.285 2.602l-2.268 9.64a4.5 4.5 0 0 0-.12 1.03v.228m19.5 0a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3m19.5 0a3 3 0 0 0-3-3H5.25a3 3 0 0 0-3 3m16.5 0h.008v.008h-.008v-.008Zm-3 0h.008v.008h-.008v-.008Z" />
                            </svg>
                            <span>Food Service</span>
                        </label>
                        <label className=" border border-primary p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                        <input type="checkbox"/>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                            </svg>
                            <span>Parking</span>
                        </label>
                        <label className="border border-primary p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                            <input type="checkbox"/>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                </svg>
                            <span>Guests</span>
                        </label>
                        <label className=" border border-primary p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                            <input type="checkbox"/>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" />
                                </svg>
                            <span>Pets</span>
                        </label>
                    </div>
                    <h2 className="text-xl mt-4 flex "><b> Extra Info :</b> </h2>
                    <p className="text-gray-500 text-sm ">Rules and regulation, etc </p>
                    <textarea className="w-full border my-1 py-2 px-3 rounded-2xl"/>
                    <h2 className="text-xl mt-4 flex "><b> Check-In / Check-Out / Max Person :</b> </h2>
                    <p className="text-gray-500 text-sm ">time to enter/ time to leave / max persons to stay  </p>
                    <div className="grid gap-2 sm:grid:cols-3">
                        <div>
                        <h3 className="mt-2 -mb-1">Check In time:</h3>
                            <input type="text"/>
                        </div>
                        <div>
                        <h3 className="mt-2 -mb-1">Check Out time:</h3>
                            <input type="text"/>
                        </div>
                        <div>
                        <h3 className="mt-2 -mb-1">Max Num of People:</h3>
                            <input type="text"/>
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