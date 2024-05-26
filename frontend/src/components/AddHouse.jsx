import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import '../css/addhouse.css';

const AddHouse = () => {
    const [selImage, setselImage] = useState('');

    const AddHouseSchema = Yup.object().shape({
        place: Yup.string().required('Required'),
        area: Yup.string().required('Required'),
        houseNo: Yup.string().required('Required'),
        bedrooms: Yup.number().required('Required'),
        bathrooms: Yup.number().required('Required'),
        hospitalNearby: Yup.string().required('Required'),
        rent: Yup.number().required('Required'),
    });

    const addHouseForm = useFormik({
        initialValues: {
            place: '',
            area: '',
            houseNo: '',
            bedrooms: '',
            bathrooms: '',
            hospitalNearby: '',
            rent: '',
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
                            <label htmlFor="place">Place</label>
                            <input className="form-control mb-2" type="text" name="place" onChange={addHouseForm.handleChange} value={addHouseForm.values.place} />
                            <label htmlFor="area">Area</label>
                            <input className="form-control mb-2" type="text" name="area" onChange={addHouseForm.handleChange} value={addHouseForm.values.area} />
                            <label htmlFor="houseNo">House Number</label>
                            <input className="form-control mb-2" type="text" name="houseNo" onChange={addHouseForm.handleChange} value={addHouseForm.values.houseNo} />
                            <label htmlFor="bedrooms">Number of Bedrooms</label>
                            <input className="form-control mb-2" type="number" name="bedrooms" onChange={addHouseForm.handleChange} value={addHouseForm.values.bedrooms} />
                            <label htmlFor="bathrooms">Number of Bathrooms</label>
                            <input className="form-control mb-2" type="number" name="bathrooms" onChange={addHouseForm.handleChange} value={addHouseForm.values.bathrooms} />
                            <label htmlFor="hospitalNearby">Hospital Nearby</label>
                            <input className="form-control mb-2" type="text" name="hospitalNearby" onChange={addHouseForm.handleChange} value={addHouseForm.values.hospitalNearby} />
                            <label htmlFor="rent">Rent</label>
                            <input className="form-control mb-2" type="number" name="rent" onChange={addHouseForm.handleChange} value={addHouseForm.values.rent} />
                            <label htmlFor="image">Image</label>
                            <input className="form-control mb-2" type="file" name="image" onChange={uploadFile} />
                            <button type='submit' className="btn btn-danger w-100  mt-2 mp-4 rounded-5">Add House</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddHouse;