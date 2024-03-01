import React, { useState, useEffect } from 'react';
import './Advertisement.css';

const Advertisements = () => {
  const [advertisementData, setAdvertisementData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/allposts');
        const data = await response.json();
        setAdvertisementData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching advertisement data:', error);
        setError('Error fetching advertisement data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Advertisements</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table className="advertisement-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Photo</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Amount</th>
              <th>Posted By</th>
            </tr>
          </thead>
          <tbody>
            {advertisementData.map((advertisement) => (
              <tr key={advertisement._id}>
                <td>{advertisement._id}</td>
                <td>{advertisement.body}</td>
                <td className="img-cell">
                <div className="grid-container">
                  {advertisement.photos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`Advertisement ${index + 1}`}
                      style={{ maxWidth: '100px', maxHeight: '100px' }}
                    />
                  ))}
                  </div>
                </td>
                <td>{new Date(advertisement.startDate).toLocaleDateString()}</td>
                <td>{new Date(advertisement.endDate).toLocaleDateString()}</td>
                <td>Rs{advertisement.amount}</td>
                <td>{`${advertisement.postedBy.firstname} ${advertisement.postedBy.lastname}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Advertisements;
