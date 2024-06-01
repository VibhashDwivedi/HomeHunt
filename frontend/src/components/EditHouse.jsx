import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useUserContext from "../UserContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const EditHouse = () => {
  const { id } = useParams();
  const { currentUser } = useUserContext();
  const [house, setHouse] = useState([]);
  const [selImage, setselImage] = useState(house.image);
  const navigate = useNavigate();

  const fetchHouse = async () => {
    const res = await fetch(`http://localhost:5000/house/getbyid/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      const data = await res.json();
      setHouse(data);
    }
  };

  useEffect(() => {
    fetchHouse();
  }, []);

  const EditHouseSchema = Yup.object().shape({
    locate: Yup.string().required("Required"),
    place: Yup.string().required("Required"),
    area: Yup.string().required("Required"),
    houseNo: Yup.string().required("Required"),
    bedrooms: Yup.number().required("Required"),
    phone: Yup.string()
      .required("Required")
      .min(10, "Too Short!")
      .max(10, "Too Long!")
      .matches(/^[0-9]+$/, "Must be only digits"),
    rent: Yup.number().required("Required"),
  });

  const editHouseForm = useFormik({
    enableReinitialize: true,

    initialValues: {
      locate: house.locate,
      place: house.place,
      area: house.area,
      houseNo: house.houseNo,
      bedrooms: house.bedrooms,
      phone: house.phone,
      rent: house.rent,
      UserId: currentUser._id,
    },
    onSubmit: async (values) => {
      values.image = selImage;
      console.log(values);
      const res = await fetch("http://localhost:5000/house/edit/" + id, {
        method: "PUT",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res.status);
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "House edited successfully !!",
        });
        navigate("/myhouses");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error in editing house !!",
        });
      }
    },
    validationSchema: EditHouseSchema,
  });

  const uploadFile = async (e) => {
    let file = e.target.files[0];
    setselImage(file.name);
    const fd = new FormData();
    fd.append("myfile", file);
    const res = await fetch("http://localhost:5000/util/uploadfile", {
      method: "POST",
      body: fd,
    });

    console.log(res.status);
  };

  return (
    <div className="home-bg">
      <div className="d-flex justify-content-center  vh-90">
        <div className="card w-40 shadow-lg mt-3 mb-5">
          <div className="card-body p-4 px-5 rounded-5">
            <h1 className="text-center mb-2 pb-1">Edit House</h1>
            <form onSubmit={editHouseForm.handleSubmit}>
              <div className="form-group">
                <label htmlFor="locate">Location</label>
                <input
                  type="text"
                  className="form-control"
                  id="locate"
                  name="locate"
                  value={editHouseForm.values.locate}
                  onChange={editHouseForm.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="place">Place</label>
                <input
                  type="text"
                  className="form-control"
                  id="place"
                  name="place"
                  value={editHouseForm.values.place}
                  onChange={editHouseForm.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="area">Area</label>
                <input
                  type="text"
                  className="form-control"
                  id="area"
                  name="area"
                  value={editHouseForm.values.area}
                  onChange={editHouseForm.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="houseNo">House Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="houseNo"
                  name="houseNo"
                  value={editHouseForm.values.houseNo}
                  onChange={editHouseForm.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="bedrooms">BHK Type</label>
                <input
                  type="number"
                  className="form-control"
                  id="bedrooms"
                  name="bedrooms"
                  value={editHouseForm.values.bedrooms}
                  onChange={editHouseForm.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={editHouseForm.values.phone}
                  onChange={editHouseForm.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="rent">Rent</label>
                <input
                  type="number"
                  className="form-control"
                  id="rent"
                  name="rent"
                  value={editHouseForm.values.rent}
                  onChange={editHouseForm.handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="image">Image</label>
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  name="image"
                  onChange={uploadFile}
                />
              </div>
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-primary mt-3">
                  Edit House
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditHouse;
