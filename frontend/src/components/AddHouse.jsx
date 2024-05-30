import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import '../css/addhouse.css';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';




const AddHouse = () => {
    const [selImage, setselImage] = useState('');
    const arrowIcon = new L.DivIcon({
        className: 'leaflet-div-icon',
        html: `<div style="font-size:34px;"><i class="fa-solid fa-location-dot"></i></div>`,
        iconSize: [40, 40]
    });

    const LocationPicker = ({ setLocation }) => {
        const map = useMapEvents({
            click: (e) => {
                setLocation(e.latlng);
            },
        });
    
        return null;
    };

    const AddHouseSchema = Yup.object().shape({
        place: Yup.string().required('Required'),
        area: Yup.string().required('Required'),
        houseNo: Yup.string().required('Required'),
        bedrooms: Yup.number().required('Required'),
        hospitalNearby: Yup.string().required('Required'),
        rent: Yup.number().required('Required'),
    });

    const addHouseForm = useFormik({
        initialValues: {
            place: '',
            area: '',
            houseNo: '',
            bedrooms: '',
            hospitalNearby: '',
            rent: '',
            location: { lat: 26.840416572803626, lng: 80.91287702322008   },
        },
        onSubmit: async (values) => {
            values.image = selImage;
            console.log(values);
            const res = await fetch("http://localhost:5000/house/add", {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            console.log(res.status);
            if (res.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Thank You',
                    text: 'House added successfully'
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops',
                    text: 'Some error occurred'
                });
            }
        },
        validationSchema: AddHouseSchema
    });

    const uploadFile = async (e) => {
        let file = e.target.files[0];
        setselImage(file.name);
        const fd = new FormData();
        fd.append('myfile', file);
        const res = await fetch('http://localhost:5000/util/uploadfile', {
            method: 'POST',
            body: fd
        });

        console.log(res.status);
    }

    return (
        <div className='home-bg'>
            <div className='d-flex justify-content-center  vh-90'>
                <div className="card w-40 shadow-lg mt-3 mb-5">
                    <div className="card-body p-4 px-5 rounded-5">
                        <h3 className="text-center mb-4 ">Add New House</h3>
                        <form onSubmit={addHouseForm.handleSubmit}>
                            <label htmlFor="place">Address</label>
                            <p className='error-label'>{addHouseForm.touched.place? addHouseForm.errors.place :'' }</p>
                            <input className="form-control mb-2" type="text" name="place" onChange={addHouseForm.handleChange} value={addHouseForm.values.place} />
                            <label htmlFor="area">Landmark</label>
                            <p className='error-label'>{addHouseForm.touched.area? addHouseForm.errors.area :'' }</p>
                            <input className="form-control mb-2" type="text" name="area" onChange={addHouseForm.handleChange} value={addHouseForm.values.area} />
                            <label htmlFor="houseNo">House Number</label>
                            <p className='error-label'>{addHouseForm.touched.houseNo? addHouseForm.errors.houseNo :'' }</p>
                            <input className="form-control mb-2" type="text" name="houseNo" onChange={addHouseForm.handleChange} value={addHouseForm.values.houseNo} />
                            <label htmlFor="bedrooms">BHK Type</label>
                            <p className='error-label'>{addHouseForm.touched.bedrooms? addHouseForm.errors.bedrooms :'' }</p>
<select className="form-control mb-2" name="bedrooms" onChange={addHouseForm.handleChange} value={addHouseForm.values.bedrooms}>
    <option value="">Select</option>
    <option value="1">1 BHK</option>
    <option value="2">2 BHK</option>
    <option value="3">3 BHK</option>
    <option value="4">4 BHK</option>
    <option value="5">5 BHK</option>
</select>
                           
                            <label htmlFor="hospitalNearby">Hospital Nearby</label>
                            <p className='error-label'>{addHouseForm.touched.hospitalNearby? addHouseForm.errors.hospitalNearby :'' }</p>
                            <input className="form-control mb-2" type="text" name="hospitalNearby" onChange={addHouseForm.handleChange} value={addHouseForm.values.hospitalNearby} />
                            <label htmlFor="rent">Rent</label>
                            <p className='error-label'>{addHouseForm.touched.rent? addHouseForm.errors.rent :'' }</p>
                            <input className="form-control mb-2" type="number" name="rent" onChange={addHouseForm.handleChange} value={addHouseForm.values.rent} />
                            <label htmlFor="image">Image</label>
                            <input className="form-control mb-2" type="file" name="image" onChange={uploadFile} />
                            <MapContainer center={addHouseForm.values.location} zoom={13} style={{ height: "300px", width: "500px" }}>
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    <LocationPicker setLocation={(location) => addHouseForm.setFieldValue('location', location)} />
    {addHouseForm.values.location && <Marker position={addHouseForm.values.location} icon={arrowIcon} />}
</MapContainer>
                            <button type='submit' className="btn btn-danger w-100  mt-2 mp-4 rounded-5">Add House</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddHouse;