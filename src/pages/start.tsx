import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type CustomerType = "regular" | "newbie";

const Start: React.FC = () => {
  const naviate = useNavigate();

  const navigateToDiningChoice = (type: CustomerType = "regular") => {
    localStorage.setItem("customerType", type);
    naviate("/dining-choice");
  };

  useEffect(() => {
    localStorage.removeItem("customerType");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div
        onClick={() => navigateToDiningChoice()}
        className="w-80 h-40 bg-green-100 rounded-lg flex items-center justify-center shadow-md"
      >
        <p className="text-lg font-medium text-gray-800">주문 시작하기</p>
      </div>
      {/* 로컬스토리지에 { isNewbie: true } 저장해두고 진행*/}
      <div
        onClick={() => navigateToDiningChoice("newbie")}
        className="w-60 h-40 bg-pink-100 rounded-3xl flex items-center justify-center mt-6 shadow-md"
      >
        <p className="text-center text-gray-800 text-base font-medium">
          키오스크가 처음이라면
          <br />
          저를 눌러주세요
        </p>
      </div>
    </div>
  );
};

export default Start;
