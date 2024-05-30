import React, { useState, useEffect } from 'react';

const SellerHouses = () => {
    const [houses, setHouses] = useState([]);

    

    const fetchHouses = async () => {
        // Get the current seller's ID from the session
        const sellerId = sessionStorage.getItem('sellerId');

        const res = await fetch(`http://localhost:5000/house/getall`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (res.ok) {
            const data = await res.json();
            setHouses(data);
        }
        
    }
    useEffect(() => {
        fetchHouses();
    }, []);

    const displayimage = (img) => {
        
       
      return <img alt="house-img"  height={220} 
      className="card-img-top"  src={"http://localhost:5000/"+img} />
         }

         const displayHouses = () => {
            return houses.map((house) => (
                <div key={house._id} className="col-md-4">
                    <div className="card">
                    <div className="card-body">
                    <div className='' >{displayimage(house.image)}</div>
                        <h6 className="card-title">Address: {house.place}</h6>
                        <p className="card-text">{house.area}</p>
                        <p className="card-text">{house.houseNo}</p>
                        <p className="card-text">{house.bedrooms}</p>
                        <p className="card-text">{house.hospitalNearby}</p>
                        <p className="card-text">{house.rent}</p>


                    </div>
                    </div>
                </div>
            ));
        }
        
        
       

    return (

        <div>
        <div className="container   my-3 ">
          <div className="position-reative">
          <p className='display-2 text-center fw-bold text-black  pt-3 pb-2'>Houses on Rent</p>
          
               </div>
          </div>
      

                  <div className='container'    >
       <div className='row mt-3' > {displayHouses()}</div>
        </div>
        </div>
    );
}

export default SellerHouses;