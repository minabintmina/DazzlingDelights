"use client";
import React, { useState } from 'react';
import { TextField, Box, Button, Modal, Typography } from '@mui/material';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import 'app/globals.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
import { UploadFirebase } from '../utils/UploadFirebase';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 730,
    maxHeight: 730,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    color: '#000',
    borderRadius: '20px',
    padding: '40px 30px 20px',
    textAlign: 'center',
};

function AjoutProd() {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [file, setFile] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [categorie, setCategorie] = useState("");
    const [price, setPrice] = useState("");
    const [images, setImages] = useState("");

    const handlesave = async (url) => {
        setImages(url);
        const cat = {
            title: title,
            description: description,
            categorie: categorie,
            price: price,
            images: url,
        };
        const res = await (await fetch('http://localhost:3001/api/articles', {
            method: 'POST',
            body: JSON.stringify(cat),
            headers: {
                'Content-Type': 'application/json'
            }
        })).json()
        console.log(res)
        if (res) {
            console.log('successfully inserted!')

            handleClose()
            setFile("")
            setTitle("");
            setDescription("");
            setCategorie("");
            setPrice("");
            setImages("");
        }
        else {
            console.log(res);
        }
    }
    const handleUpload = (event) => {
        event.preventDefault();

        console.log(file[0].file)
        resultHandleUpload(file[0].file, event);

    };
    const resultHandleUpload = async (file) => {

        try {

            const url = await UploadFirebase(file);
            console.log(url);

            handlesave(url)
        } catch (error) {
            console.log(error);
        }
    }
    const handleCategorieChange = (selectedCategorie) => {
        setCategorie(selectedCategorie);
    };
    return (
        <div>
            <Button type="button" className="text-black bg-white btn btn-primary" onClick={handleOpen}>
                Click Here To Add A Product
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add Product
                    </Typography>
                    <br />

                    <div className="mb-4">
                        <TextField variant="outlined" label="Title" onChange={e => setTitle(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <TextField variant="outlined" label="Description" onChange={e => setDescription(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <select
                            id="category-select"
                            value={categorie._id}
                            onChange={(e) => handleCategorieChange(e.target.value)}
                            className="px-2 py-1 rounded-lg border border-gray-700 bg-white focus:outline-none focus:ring focus:border-blue-300"
                        >
                            <option value="646c0bb310e19f6142665d44">Rings</option>
                            <option value="Necklaces">Necklaces</option>
                            <option value="Bracelets">Bracelets</option>
                            <option value="Earrings">Earrings</option>
                            <option value="Glasses">Glasses</option>
                            <option value="Anklets">Anklets</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <TextField variant="outlined" label="Price" onChange={e => setPrice(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <h6>Select an image</h6>
                        <br />
                        <center>
                            <div style={{ width: 150, height: 200 }}>
                                <FilePond
                                    files={file}
                                    allowMultiple={false}
                                    onupdatefiles={setFile}

                                />
                            </div>
                        </center>
                    </div>
                    <div className="mb-3">
                        <Button type="button" className="btn btn-danger"
                            onClick={(event) => handleUpload(event)}>Save</Button>
                        <Button type="button" className="btn btn-secondary"
                            onClick={handleClose}>Close</Button>
                    </div>

                </Box>
            </Modal>
        </div>
    )
}
export default AjoutProd