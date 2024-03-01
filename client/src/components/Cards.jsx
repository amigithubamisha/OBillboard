import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Cards.css';

const Cards = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/allposts", {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.log(err));
  }, []);

  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className='container mt-4'>
      <div className="row">
        {Array.isArray(posts) && posts.map((post) => (
          <div key={post._id} className="col-md-4 mb-4">
            <div className="card h-100 shadow">
              <div className="card-body">
                {post.photos && post.photos.length > 0 ? (
                  <div className="image-container">
                    <Slider {...settings}>
                      {post.photos.map((photo, index) => (
                        <div key={index}>
                          <img
                            src={photo}
                            alt={`Post Image ${index + 1}`}
                            className="card-img-top"
                          />
                        </div>
                      ))}
                    </Slider>
                  </div>
                ) : (
                  <p>No images available</p>
                )}
                <p className="card-text">Category: {post.category}</p>
                <p className="card-text">Address: {post.address}</p>
                <p className="card-text">Details: {post.body}</p>            
              </div>
              <div className="card-footer">
                <small className="text-muted">Posted by {post.postedBy.firstname} {post.postedBy.lastname}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cards;
