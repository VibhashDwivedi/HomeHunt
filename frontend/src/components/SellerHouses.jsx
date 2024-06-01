import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import "../css/addhouse.css";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Swal from "sweetalert2";
import useUserContext from "../UserContext";

const SellerHouses = () => {
  const { buyer, showContactDetails, setShowContactDetails } = useUserContext();
  const navigate = useNavigate();
  const [houses, setHouses] = useState([]);
  const [search, setSearch] = useState([]);
  const [clickedHouseId, setClickedHouseId] = useState(null);
  const [locationFilter, setLocationFilter] = useState("");
  const [bhkFilter, setBhkFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  const handleButtonClick = (id) => {
    if (buyer) {
      setShowContactDetails(true);
      setClickedHouseId(id);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: "Please login to view contact details",
        showCancelButton: true,
        confirmButtonText: "Go to Login",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login"); // Navigate to login page
        }
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

    if (res.status === 200) {
      const data = await res.json();
      setHouses(data);
      setSearch(data);
    }
  };
  useEffect(() => {
    fetchHouses();
  }, []);

  const displayFilteredHouses = () => {
    setHouses(
      search.filter((house) => {
        const matchesLocation = house.locate
          .toLowerCase()
          .includes(locationFilter.toLowerCase());
        const matchesBhk =
          house.bedrooms === Number(bhkFilter) || bhkFilter === "";
        const matchesPrice =
          priceFilter === "" ||
          (priceFilter === "<3000" && house.rent <= 3000) ||
          (priceFilter === "3000-5000" &&
            house.rent > 3000 &&
            house.rent <= 5000) ||
          (priceFilter === "5000-10000" &&
            house.rent > 5000 &&
            house.rent <= 10000) ||
          (priceFilter === "10000-15000" &&
            house.rent > 10000 &&
            house.rent <= 15000) ||
          (priceFilter === "15000-20000" &&
            house.rent > 15000 &&
            house.rent <= 20000);
        return matchesLocation && matchesBhk && matchesPrice;
      })
    );
  };

  useEffect(() => {
    displayFilteredHouses();
  }, [locationFilter, bhkFilter, priceFilter]);

  const searchByLocation = (e) => {
    setLocationFilter(e.target.value);
  };

  const searchByBhkType = (e) => {
    setBhkFilter(e.target.value);
  };

  const searchByPrice = (e) => {
    setPriceFilter(e.target.value);
  };

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
              <h6 className="card-title">{house.locate}</h6>
              <h6 className="card-text">{house.houseNo} {house.place}</h6>
              <h6 className="card-text">Near {house.area}</h6>
              <div className="d-flex">
                <h6 className="card-text"> {house.bedrooms} BHK |</h6>
                <h6 className="card-text mx-1">₹{house.rent} /month</h6>
              </div>

              <button
                className="btn btn-info"
                onClick={() => handleButtonClick(house._id)}
              >
                Show Contact Details
              </button>
              {showContactDetails && clickedHouseId === house._id && (
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
          <p className="display-2 text-center fw-bold text-black  pt-3 ">
            Search Houses
          </p>
          {/* make a input field */}
          <div className="d-flex justify-content-center">
            <div className="input-group mb-3 w-75">
              <input
                type="text"
                className="form-control rounded-5"
                placeholder="Search by location"
                onChange={searchByLocation}
                style={{ width: "250px" }}
              />
              <select
                className="form-select rounded-5 ms-2"
                onChange={searchByBhkType} // Update bhkType when select changes
              >
                <option value="">All BHK Types</option>
                <option value="1">1 BHK</option>
                <option value="2">2 BHK</option>
                <option value="3">3 BHK</option>
                <option value="4">4 BHK</option>
                <option value="5">5 BHK</option>
              </select>
              <select
                className="form-select rounded-5 ms-2"
                onChange={searchByPrice} //
              >
                <option value="">All Prices</option>
                <option value="<3000">Up to 3000</option>
                <option value="<3000-5000">3000 - 5000</option>
                <option value="5000-10000">5000 - 10000</option>
                <option value="10000-15000">10000 - 15000</option>
                <option value="15000-20000">15000 - 20000</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row mt-3"> {displayHouses()}</div>
      </div>
    </div>
  );
};

export default SellerHouses;
