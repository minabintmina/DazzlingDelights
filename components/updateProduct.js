"use client";
import React, { useState, useEffect } from 'react';
import { TextField, Box, Button, Modal, Typography } from '@mui/material';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)
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
function UpdateProduct(props) {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [id, setId] = useState();
    const [file, setFile] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [categorie, setCategorie] = useState("");
    const [price, setPrice] = useState("");
    const [images, setImages] = useState("");


    useEffect(() => {
        setId(props.articles._id);
        setTitle(props.articles.title);
        setDescription(props.articles.description);
        setCategorie(props.articles.categorie);
        setPrice(props.articles.price);
        setImages(props.articles.images);
    }, []);

    const handlesave = async (url) => {
        setImages(url);
        const cat = {
            title: title,
            description: description,
            categorie: categorie,
            price: price,
            images: url,
        };
        const res = await (await
            fetch('http://localhost:3001/api/articles/' + id, {
                method: 'PUT',
                body: JSON.stringify(cat),
                headers: {
                    'Content-Type': 'application/json'
                }
            })).json()
        if (res) {
            console.log('successfully updated!')

            handleClose()

        }
        else {
            console.log(res);
        }
    }


    const handleUpload = (event) => {
        event.preventDefault();
        if (!file) {
            const url = images;
            handlesave(url);
        }
        else {
            console.log(file[0].file)
            resultHandleUpload(file[0].file);
        }
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
        <>
            <span onClick={handleOpen}
                style={{ cursor: 'pointer' }}>
                <NoteAltOutlinedIcon color='success' />
            </span>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Update Product
                    </Typography>
                    <hr />
                    <div className="mb-4">
                        <TextField variant="outlined" label="Title" value={title} onChange={e => setTitle(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <TextField variant="outlined" label="Description" value={description} onChange={e => setDescription(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <select
                            id="categorie-select"
                            value={categorie}
                            onChange={(e) => handleCategorieChange(e.target.value)}
                            className="px-2 py-1 rounded-lg border border-gray-700 bg-white focus:outline-none focus:ring focus:border-blue-300"
                        >
                            <option value="Rings">Rings</option>
                            <option value="Necklaces">Necklaces</option>
                            <option value="Bracelets">Bracelets</option>
                            <option value="Earrings">Earrings</option>
                            <option value="Glasses">Glasses</option>
                            <option value="Anklets">Anklets</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <TextField variant="outlined" label="Price" value={price} onChange={e => setPrice(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <h6>Selet new image</h6>
                        <center>
                            <div style={{ width: 200, height: 250 }}>
                                <FilePond
                                    files={file}
                                    allowMultiple={false}
                                    onupdatefiles={setFile}
                                    labelIdle='<span class="filepond--label-action">Browse One</span>'
                                />
                            </div>
                        </center>
                    </div>
                    <hr />
                    <div className="mb-3">
                        <Button type="button" className="btn btn-success"
                            onClick={(event) => handleUpload(event)}>Update</Button>
                        <Button type="button" className="btn btn-secondary"
                            onClick={handleClose}>Close</Button>
                    </div>

                </Box>
            </Modal>
        </>
    )
}
export default UpdateProduct