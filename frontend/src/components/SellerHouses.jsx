import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import "../css/addhouse.css";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Swal from "sweetalert2";
import useUserContext from "../UserContext";
import { toast } from "react-hot-toast";
import emailjs from 'emailjs-com';

const SellerHouses = () => {
  const { loggedIn, showContactDetails, setShowContactDetails, currentUser } = useUserContext();
  const navigate = useNavigate();
  const [houses, setHouses] = useState([]);
  const [search, setSearch] = useState([]);
  const [clickedHouseId, setClickedHouseId] = useState(null);
  const [locationFilter, setLocationFilter] = useState("");
  const [bhkFilter, setBhkFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const ITEMS_PER_PAGE = 2;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(houses.length / ITEMS_PER_PAGE);

  const handleNext = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  };

  const handlePrevious = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  };

  const currentHouses = houses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  
  const  sendEmail= (toName, toEmail, fromfName, fromLname, fromEmail, address ) => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: `You are about to send an email to ${toName} with your details .`,
      
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, send it!'
    }).then((result) => {
      if (result.isConfirmed) {
    emailjs.send(process.env.REACT_APP_EMAILJS_SERVICE_ID, process.env.REACT_APP_EMAILJS_TEMPLATE_ID, {
      to_name: toName,
      to_email: toEmail,
      from_name: fromfName+" "+fromLname,
      from_email: fromEmail,
      message: `Hello, I am ${fromfName+" "+fromLname} and I am interested in renting your property located at ${address}. Please contact me to discuss further details. ${fromEmail} `,
    }, process.env.REACT_APP_EMAILJS_USER_ID)
      .then(() => {
         console.log('SUCCESS!');
         toast.success('Email Sent Successfully');
      }, (err) => {
         console.log('FAILED...', err);
          toast.error('Email Failed to Send');
      });
    }
  });
  }

  const handleHideContactDetails = () => {
    setShowContactDetails(false);
    setClickedHouseId(null);
  };

  const handleButtonClick = (id) => {
    if (loggedIn) {
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
    const res = await fetch(`https://homehunt-b54g.onrender.com/house/getall`, {
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
  }, [locationFilter, bhkFilter, priceFilter, currentPage]);

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
        src={"https://homehunt-b54g.onrender.com/" + img}
      />
    );
  };

  const displayHouses = () => {
    return currentHouses.map((house) => (
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
              <p className="card-text">
                {house.houseNo} {house.place}
              </p>
              <div className="d-flex" style={{marginTop:'-10px'}}>
              <p className="card-text">Near {house.area}</p>
              
                <p className="text-secondary ms-auto"> {house.bedrooms} BHK |</p>
                <p className="text-secondary ms-2">₹{house.rent}/month</p>
              </div>
              {showContactDetails && clickedHouseId === house._id ? (
                <button
                className="btn btn-danger btn-sm rounded-0"
                onClick={() => handleHideContactDetails()}
                style={{marginTop:'-10px'}}
              >
                Hide Contact Details
              </button>):(

              <button
                className="btn btn-info btn-sm rounded-0"
                onClick={() => handleButtonClick(house._id)}
                style={{marginTop:'-10px'}}
              >
                Show Contact Details
              </button>)
  }
              {showContactDetails && clickedHouseId === house._id && (
                <div>
                  <p className="mt-1">Owner Name: {house.username}</p>
                  <div className="d-flex" style={{marginTop:'-10px'}}>
                  <p className="" >Contact Number: {house.phone}</p>
                  <a className="ms-auto" href={`https://wa.me/+91${house.phone}?text=${encodeURIComponent(`Hello, I am  interested in renting your property located at ${house.place}. `)}`} target="_blank">
                  <i class="fa-brands fa-whatsapp fa-beat fa-xl "  style={{color:'#03e26f'}} title="Message on Whatsapp"></i>
</a>
</div>
                  <div className="d-flex" style={{marginTop:'-10px'}}>
                  <p>Email: {house.email}</p>
                  <div className=" ms-auto" onClick={() =>sendEmail(house.username, house.email, currentUser.firstName,currentUser.lastName, currentUser.email, house.place)}>
                  <i class="fa-sharp fa-solid fa-paper-plane fa-lg fa-beat" style={{color:'#0a0123'}} title="Send mail" ></i>
                  </div>

                  </div>
                 
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
      <div className="d-flex justify-content-center pb-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`pagination-dot ${
              index + 1 === currentPage ? "active" : ""
            }`}
            onClick={() => setCurrentPage(index + 1)}
          />
        ))}
      </div>
      <div className="d-flex justify-content-center pb-5">
        <button
          className="btn btn-info"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          <i class="fa-solid fa-chevron-left fa-2xl"></i>
        </button>
        <button
          className="btn btn-info mx-2 "
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          <i class="fa-solid fa-chevron-right fa-2xl"></i>
        </button>
      </div>
    </div>
  );
};

export default SellerHouses;
