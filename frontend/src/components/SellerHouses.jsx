import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "../css/addhouse.css";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Swal from "sweetalert2";
import useUserContext from '../UserContext';

const SellerHouses = () => {
    const { buyer,  showContactDetails, setShowContactDetails } = useUserContext();
  const [houses, setHouses] = useState([]);
  const [clickedHouseId, setClickedHouseId] = useState(null);
  
  
  const handleButtonClick = (id) => {
    if ( buyer) {
        setShowContactDetails(true);
        setClickedHouseId(id); 
          }    
    else {
        Swal.fire({
            icon: "error",
            title: "Oops",
            text: "Please login to view contact details",
        });
    }
};

  const arrowIcon = new L.DivIcon({
    className: "leaflet-div-icon",
    html: `<div style="font-size:34px;"><i class="fa-solid fa-location-dot"></i></div>`,
    iconSize: [40, 40],
  });

  const fetchHouses = async () => {

    const res = await fetch(`http://localhost:5000/house/getall`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const data = await res.json();
      setHouses(data);
    }
  };
  useEffect(() => {
    fetchHouses();
  }, []);

  const displayimage = (img) => {
    return (
      <img
        alt="house-img"
        height={260}
        width={210}
        className=""
        src={"http://localhost:5000/" + img}
      />
    );
  };

  const displayHouses = () => {
    return houses.map((house) => (
      <div key={house._id} className="col-md-6">
        <div className="card mb-4">
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
              <h6 className="card-title">Location: {house.locate}</h6>
              <h6 className="card-text">Address: {house.place}</h6>
              <h6 className="card-text">Landmark: {house.area}</h6>
              <h6 className="card-text">House Number: {house.houseNo}</h6>
              <h6 className="card-text">BHK Type: {house.bedrooms}</h6>
              <h6 className="card-text">Rent: {house.rent} /month</h6>
              <button className="btn btn-info" onClick={() =>handleButtonClick(house._id)}>Show Contact Details</button>
                {showContactDetails && clickedHouseId === house._id  && (
                    <div>
                        <h6 className="mt-1">Contact Number: {house.phone}</h6>
                    </div>
                )}
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="home-bg">
      <div className="container  mt-0  my-3 ">
        <div className="position-reative">
          <p className="display-2 text-center fw-bold text-black  pt-3 pb-2">
            Houses on Rent
          </p>
        </div>
      </div>

      <div className="container">
        <div className="row mt-3"> {displayHouses()}</div>
      </div>
    </div>
  );
};

export default SellerHouses;
