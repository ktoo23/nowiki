import React from "react";
import { useNavigate } from "react-router-dom";
import { setOrderInfo } from "../feat/order";

const DiningChoice: React.FC = () => {
  const naviate = useNavigate();

  const confirmDiningType = (dineType: boolean) => {
    setOrderInfo("isTakeOut", dineType);
    naviate("/menus");
  };

  return (
    <div className="flex flex-col items-center justify-center h-500 bg-gray-50 p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">
        식사 장소를 <br /> 선택해주세요
      </h1>
      <div className="flex gap-4">
        <button
          className="bg-purple-200 text-gray-800 font-medium py-3 px-6 rounded-full shadow-md hover:bg-purple-300 focus:outline-none"
          onClick={() => confirmDiningType(false)}
        >
          매장 식사
        </button>
        <button
          className="bg-purple-200 text-gray-800 font-medium py-3 px-6 rounded-full shadow-md hover:bg-purple-300 focus:outline-none"
          onClick={() => confirmDiningType(true)}
        >
          포장
        </button>
      </div>
    </div>
  );
};

export default DiningChoice;
