'use client'
import { useState } from "react"

export const ProfileClient = () => {
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState('https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg');
    const [fileName, setFileName] = useState('');

    const handleUpload = (e:any) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setFileName(file.name);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    return (
        <div className="pl-5 pr-5 lg:pl-[15rem] lg:pr-[15rem] pt-5">
            <div className="border rounded-lg shadow-lg bg-gray-800 text-white">
                <div className="border-b p-4 md:p-10">
                    <h2 className="font-semibold text-lg md:text-xl">Profile</h2>
                    <p className="text-sm text-gray-400">Manage settings for your Cal.com profile</p>
                </div>
                <div className="flex-col space-y-5 p-4 md:p-10">
                    <div>
                        <label className="block mb-2 font-medium">Profile Photo</label>

                        {/* Hidden File Input */}
                        <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleUpload} 
                            id="profile_photo" 
                            style={{ display: 'none' }} 
                        />

                        {/* Custom Upload Button */}
                        <label 
                            htmlFor="profile_photo" 
                            className="cursor-pointer inline-block px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 rounded-lg">
                            Upload Image
                        </label>

                        {/* Show file name after uploading */}
                        {fileName && <p className="mt-2 text-sm text-gray-400">{fileName}</p>}

                        {/* Image Preview */}
                        {previewImage && (
                            <img 
                                src={previewImage} 
                                alt="Profile Preview" 
                                className="mt-4 h-24 w-24 object-cover rounded-full border-2 border-blue-600"
                            />
                        )}
                    </div>

                    <div className="space-y-3">
                            <label className="block mb-2 font-medium">Fullname</label>
                        <input 
                            type="text" 
                            placeholder="Username" 
                            className="block w-full px-3 py-2 border rounded-lg bg-gray-700 text-white" 
                        />
                        <label className="block mb-2 font-medium">Username</label>
                        <input 
                            type="text" 
                            placeholder="Username" 
                            className="block w-full px-3 py-2 border rounded-lg bg-gray-700 text-white" 
                        />
                        <label className="block mb-2 font-medium">Gender</label>
                        <input 
                            type="text" 
                            placeholder="Username" 
                            className="block w-full px-3 py-2 border rounded-lg bg-gray-700 text-white" 
                        />
                    </div>
                    {/* Address part starts here */}
                    <div>
                        <label className="block mb-2 font-medium">Address 1</label>
                        {/* Placeholder for map location part */}
                        <input 
                            type="text" 
                            placeholder="Enter Address" 
                            className="block w-full px-3 py-2 border rounded-lg bg-gray-700 text-white"
                        />
                        
                    </div>
                </div>
            </div>
        </div>
    );
};
