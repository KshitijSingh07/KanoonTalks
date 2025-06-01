import React from "react";

const CourseCard = ({ title, description, image, link, price }) => {
  return (
    <div className="max-w-sm bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      <img className="w-full h-48 object-cover" src={image} alt={title} />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-1">{title}</h2>
        <p className="text-gray-600 text-sm mb-2">{description}</p>
        <p className="text-lg font-bold text-green-600 mb-4">₹{price}</p>
        <a
          href={link}
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          View Course
        </a>
      </div>
    </div>
  );
};

export default CourseCard;
