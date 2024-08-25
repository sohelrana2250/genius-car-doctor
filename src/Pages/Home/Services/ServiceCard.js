import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ service }) => {
    const { _id, img, price, title, description
         } = service;
    return (
        <div className="card card-compact w-full  bg-base-100 shadow-xl">
            <figure><img src={img} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title font-serif">{title}</h2>
                <p className='text-xl text-orange-600 font-serif'>Price: {price} tk</p>
                <p>{description.slice(0,100) + " ..."}</p>
                <div className="card-actions justify-end">
                    <Link to={`/checkout/${_id}`}>
                        <button className="btn btn-primary btn-sm">Checkout</button>
                    </Link>
                    <Link to={`/more_details/${_id}`}>
                        <button className="btn btn-primary btn-sm">More Details</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;