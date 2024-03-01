import React, { useState } from "react";

const Search = () => {
  const [type, setType] = useState('');
  const [area, setArea] = useState('');

  const handleChange = (event) => {
    console.log(event.target.value);
    setType(event.target.value);
  };
  const handleChangeArea = (event) => {
    console.log(event.target.value);
    setArea(event.target.value);
  };
  return (
    <div className="search-container p-3 mt-3" id="search" style={{backgroundColor: "#CDF5FD"}}>
    <div className="my-16 container" >
      <div className="mb-10 mt-10 text-center">
        <h1 className="text-gradient text-4xl font-bold">
          We Provide List of Hotels and Rents
        </h1>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-6 bg-white p-2 rounded-lg shadow-md d-flex gap-2">
          <div className="flex-grow-1">
            <div className="mb-3">
              <label htmlFor="type" className="form-label">Type</label>
              <select
                className="form-select"
                id="type"
                value={type}
                onChange={handleChange} 
              >
                <option value="" disabled>Select Type</option>
                <option value="Rent">Rent</option>
                <option value="Hotels">Hotels</option>
              </select>
            </div>
          </div>
          <div className="flex-grow-1">
            <div className="mb-3">
              <label htmlFor="area" className="form-label">Area</label>
              <select
                className="form-select"
                id="area"
                value={area}
                onChange={handleChangeArea}
              >
                <option value="" disabled>Select Area</option>
                <option value="patia">Patia</option>
                <option value="jayadev vihar">Jayadev Vihar</option>
              </select>
            </div>
          </div>
          <div className="col-md-3" style={{"marginTop":"31px"}}>
            <button className="btn btn-outline-primary w-100 "><i className="fa-solid fa-magnifying-glass fa-beat" style={{"color": "#00A9FF"}}></i> Search</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Search;
