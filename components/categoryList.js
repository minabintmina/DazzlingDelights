import React from "react";

const CategoryList = ({ categories, onSelectCategory }) => {
  return (
    <div className="flex justify-center my-4">
      {categories?.map((category) => (
        <div
          key={category?._id}
          className="mx-2 px-4 py-2 bg-white text-black rounded-md cursor-pointer hover:bg-gray-300"
          onClick={() => onSelectCategory(category?.name)}
        >
          {category?.name}
        </div>
      ))}
      <div
        className="mx-2 px-4 py-2 bg-white text-black rounded-md cursor-pointer hover:bg-gray-300"
        onClick={() => onSelectCategory("")}
      >
        View All
      </div>
    </div>
  );
};

export default CategoryList;
