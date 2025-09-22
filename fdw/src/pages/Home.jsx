import React, { useContext, useState } from "react";
import Nav from "../component/Nav";
import Categories from "../Category";
import Card from "../component/Card";
import { food_items } from "../food";
import { dataContext } from "../context/UserContext";
import { RxCross2 } from "react-icons/rx";
import Card2 from "../component/Card2";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Home = () => {
  const { cate, setCate, input, showCard, setShowCard } =
    useContext(dataContext);
  const filter = (category) => {
    if (category == "All") {
      setCate(food_items);
    } else {
      const newList = food_items.filter(
        (item) => item.food_category === category
      );
      setCate(newList);
    }
  };

  const items = useSelector((state) => state.card);

  const subTotal = items.reduce(
    (total, item) => total + item.qty * item.price,
    0
  );

  const deliveryFee = 20;
  const taxes = (subTotal * 0.5) / 100;
  const total = Math.floor(subTotal + deliveryFee + taxes);
  return (
    <>
      <div className="bg-slate-200 w-full min-h-screen">
        <Nav></Nav>
        {input === "" ? (
          <div className="flex flex-wrap justify-center items-center gap-5 w-[100%]">
            {Categories.map((item, indx) => {
              return (
                <div
                  key={indx}
                  className=" w-[140px] h-[150px] flex-col items-start gap-5 p-5 justify-start text-[20px] font-semibold bg-white text-gray-600 rounded-md shadow-xl hover:bg-green-200 cursor-pointer transition-all duration-300"
                  onClick={(e) => filter(item.name)}
                >
                  {" "}
                  {item.icon}
                  {item.name}
                </div>
              );
            })}
          </div>
        ) : null}

        <div className="w-full flex flex-wrap gap-5 px-5 justify-center items-center pt-8 pb-8 ">
          {cate.length > 1 ? (
            <>
              {cate.map((item, indx) => (
                <Card
                  key={indx}
                  name={item.food_name}
                  image={item.food_image}
                  price={item.price}
                  id={item.id}
                  type={item.food_type}
                ></Card>
              ))}
            </>
          ) : (
            <>
              <div className="text-green-500 text-2xl">No Dish Found</div>
            </>
          )}
        </div>
        {showCard ? (
          <div className="w-full p-6 md:w-[40vw] h-[100%] fixed top-0 right-0 bg-white shadow-xl transition-all duration-1000 flex flex-col items-center overflow-auto">
            <header className=" w-[100%] flex justify-between items-center">
              <span className=" cursor-pointer text-green-400 text-[18px] font-semibold">
                Order items
              </span>
              <span className=" w-[30px] h-[30px] cursor-pointer text-green-400 text-[18px] font-semibold hover:text-gray-600">
                <RxCross2 onClick={() => setShowCard(false)} />
              </span>
            </header>
            {items.length > 0 ? (
              <>
                <div className="w-full mt-8 flex flex-col gap-5 ">
                  {items.map((items, indx) => (
                    <Card2
                      key={indx}
                      name={items.name}
                      price={items.price}
                      id={items.id}
                      image={items.image}
                      qty={items.qty}
                    ></Card2>
                  ))}
                </div>
                <div className="w-full border-t-2 border-b-2 border-gray-400 mt-7 flex flex-col gap-2 p-4">
                  <div className="w-full flex justify-between items-center ">
                    <span className="text-lg text-gray-600 font-semibold">
                      Subtotal
                    </span>
                    <span className="text-green-400 font-semibold text-md">
                      Rs {subTotal} /-
                    </span>
                  </div>
                  <div className="w-full flex justify-between items-center ">
                    <span className="text-lg text-gray-600 font-semibold">
                      DeliveryFee
                    </span>
                    <span className="text-green-400 font-semibold text-md">
                      Rs {deliveryFee} /-
                    </span>
                  </div>
                  <div className="w-full flex justify-between items-center ">
                    <span className="text-lg text-gray-600 font-semibold">
                      Taxes
                    </span>
                    <span className="text-green-400 font-semibold text-md">
                      Rs {taxes} /-
                    </span>
                  </div>
                </div>

                <div>
                  <div className="w-full flex justify-between items-center p-8  ">
                    <span className="text-2xl text-gray-600 font-semibold">
                      Total
                    </span>
                    <span className="text-green-400 font-semibold text-2xl p-2">
                      Rs {total} /-
                    </span>
                  </div>
                </div>
                <button
                  className="w-[80%] p-3 bg-green-500 rounded-lg text-white hover:bg-green-400 transition-all duration-400 cursor-pointer"
                  onClick={() => toast.success("Order has been Placed")}
                >
                  Place Order
                </button>
              </>
            ) : (
              <>
                <div className="text-center text-2xl text-green-500 font-semibold pt-10">
                  Empty Card
                </div>
              </>
            )}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Home;
