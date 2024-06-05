import React, { useState, useEffect } from "react";
import useUserContext from "../UserContext";
import "../css/addhouse.css";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { NavLink } from "react-router-dom";
import { toast } from "react-hot-toast";

const MyHouses = () => {
  const { currentUser } = useUserContext();
  const [houses, setHouses] = useState([]);
  const arrowIcon = new L.DivIcon({
    className: "leaflet-div-icon",
    html: `<div style="font-size:34px;"><i class="fa-solid fa-location-dot"></i></div>`,
    iconSize: [40, 40],
  });

  const deleteHouse = async (id) => {
    console.log(id);
    //pass alert before deleting
    const c = window.confirm("Are you sure you want to delete this post? ");
    if (c === true) {
      const res = await fetch("https://homehunt-b54g.onrender.com/house/delete/" + id, {
        method: "DELETE",
      });
      if (res.status === 200) {
        toast.success("House Details deleted successfully");
      }
    } else {
      toast.error("House Details not deleted");
    }
  };

  const fetchHouses = async () => {
    const res = await fetch(
      `https://homehunt-b54g.onrender.com/house/seller/${currentUser._id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.status === 200) {
      const data = await res.json();
      setHouses(data);
    }
  };

  useEffect(() => {
    fetchHouses();
  }, [deleteHouse]);

  const displayimage = (img) => {
    return (
      <img
        alt="house-img"
        height={260}
        width={210}
        className=""
        src={"https://homehunt-b54g.onrender.com/" + img}
      />
    );
  };

  return (
    <div className="home-bg">
      <div className="container pt-4">
        <h1 className="text-center mb-2 pb-1">My Houses</h1>
        <div className="row">
          {houses.map((house) => (
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-around">
                    <div>{displayimage(house.image)}</div>
                    <div>
                      <MapContainer
                        center={[house.location.lat, house.location.lng]}
                        zoom={13}
                        style={{ height: "260px", width: "210px" }}
                      >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Marker
                          position={[house.location.lat, house.location.lng]}
                          icon={arrowIcon}
                        />
                      </MapContainer>
                    </div>
                  </div>
                  <div className="px-4 mx-1 py-3 pb-1">
                    <h6 className="card-title">{house.locate}</h6>
                    <h6 className="card-text">
                      {house.houseNo} {house.place}
                    </h6>
                    <h6 className="card-text">Near {house.area}</h6>
                    <div className="d-flex">
                      <h6 className="card-text"> {house.bedrooms} BHK |</h6>
                      <h6 className="card-text mx-1">₹{house.rent} /month</h6>
                    </div>
                    <h6 className="mt-1">Owner Name: {house.username}</h6>
                  <h6>Email: {house.email}</h6>
                    <div className="d-flex">
                      <h6 className="card-text">
                        Contact Number: {house.phone}
                      </h6>
                      <div className="d-flex ms-auto">
                        <NavLink
                          to={`/edit/${house._id}`}
                          className="btn btn-secondary btn-sm "
                        >
                          Edit
                        </NavLink>
                        <button
                          className="btn btn-danger btn-sm mx-2"
                          onClick={() => deleteHouse(house._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyHouses;
