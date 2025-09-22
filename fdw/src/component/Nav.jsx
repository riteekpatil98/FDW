import React, { useContext, useEffect } from "react";
import { MdFastfood } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { FiShoppingBag } from "react-icons/fi";
import { dataContext } from "../context/UserContext";
import { food_items } from "../food";
import { useSelector } from "react-redux";

const Nav = () => {
  const { input, setInput, cat, setCate, setShowCard } =
    useContext(dataContext);
  useEffect(() => {
    const filterItem = food_items.filter((item) =>
      item.food_name.toLowerCase().includes(input.toLowerCase())
    );
    setCate(filterItem);
  }, [input]);

  const items = useSelector((state) => state.card);
  console.log(items);
  return (
    <>
      <div className="w-full h-[100px] flex justify-between items-center px-5  md:px-8">
        <div className="w-[60px] h-[60px] bg-white flex justify-center items-center rounded-md shadow-xl">
          <MdFastfood className="w-[30px] h-[60px] text-green-500" />
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="w-[45%] h-[60px] bg-white flex items-center px-5 gap-5 rounded-md shadow-md md:w-[70%]"
        >
          <IoSearch className="text-green-500 w-[20px] h-[20px] text-[18px] " />
          <input
            type="text"
            name=""
            id=""
            placeholder="Search Item..."
            className="w-[100%] outline-none text-[15px] md:text-[18px]"
            onChange={(e) => {
              setInput(e.target.value);
            }}
            value={input}
          />
        </form>
        <div
          onClick={() => setShowCard(true)}
          className=" relative shadow-xl w-[60px] h-[60px] bg-white flex justify-center items-center rounded-md"
        >
          <span className="absolute top-0 right-2 text-green-500 font-bold text-[18px]">
            {items.length}
          </span>
          <FiShoppingBag className=" w-[30px] h-[60px] text-green-500 cursor-pointer" />
        </div>
      </div>
    </>
  );
};

export default Nav;
