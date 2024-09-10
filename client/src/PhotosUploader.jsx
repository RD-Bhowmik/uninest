import { useState } from "react";
import axios from "axios";

export default function PhotosUploader({ addedPhotos, onChange }) {
    const [photoLink, setPhotoLink] = useState('');

    async function addPhotoByLink(ev) {
        ev.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/upload-by-link', { link: photoLink });
            console.log('Response from server:', response);
            const { data: filename } = response;
            onChange(prev => {
                return [...prev, filename];
            });
            setPhotoLink('');
        } catch (error) {
            console.error('Error uploading photo by link:', error);
        }
    }

    async function uploadPhoto(ev) {
        const files = ev.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i]);
        }
        try {
            const response = await axios.post('http://localhost:4000/upload', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            const { data: filenames } = response;
            onChange(prev => {
                return [...prev, ...filenames];
            });
        } catch (error) {
            console.error('Error uploading photos:', error);
        }
    }

    return (
        <>
            <div className="flex gap-2">
                <input value={photoLink}
                    onChange={ev => setPhotoLink(ev.target.value)}
                    type="text" placeholder="add using links" />
                <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl"> Add&nbsp;photo</button>
            </div>

            <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {addedPhotos.length > 0 && addedPhotos.map(link => (
                    <div className="h-32 flex" key={link}>
                        <img className="rounded-2xl w-full object-cover" src={'http://localhost:4000/uploads/' + link} alt="Uploaded" />
                    </div>
                ))}
                <label className="h-32 cursor-pointer text-primary border-primary flex items-center gap-1 border bg-transparent rounded-2xl text-2xl justify-center text-gray-600">
                    <input type="file"
                        multiple className="hidden"
                        onChange={uploadPhoto} />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                    </svg>
                    UPLOAD
                </label>
            </div>
        </>
    );
}
