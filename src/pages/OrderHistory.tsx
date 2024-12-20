import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  getOrderInfo,
  setItemToOrderInfo,
  modifyItemFromOrderInfo,
  deleteItemFromOrderInfo,
} from "@/feat/order";
import { MenuItemWithCount } from "@/types/menu.interface";

const OrderHistory = () => {
  const navigate = useNavigate();
  const [orderItemData, setOrderItemData] = useState(
    getOrderInfo().orderItem || []
  );

  const modifyCount = (type: string, item: MenuItemWithCount) => {
    if (type === "increase") {
      setItemToOrderInfo(item);
    } else {
      modifyItemFromOrderInfo(item);
    }
    setOrderItemData(getOrderInfo().orderItem || []);
  };

  const resetMenu = (item: MenuItemWithCount) => {
    deleteItemFromOrderInfo(item);
    setOrderItemData(getOrderInfo().orderItem || []);
  };

  const openPointVerificationPage = () => {
    navigate("/point-collection");
  };

  const goToFoodOffer = () => {
    // const setResult = setItemToOrderInfo(state);
    // if (!setResult) {
    //   alert("예상치 못한 오류로 인해\n 첫화면으로 넘어갑니다");
    //   return navigate("/");
    // }

    if (orderItemData.length > 0) {
      navigate("/food-offer");
    } else {
      alert("장바구니가 비어있습니다.");
    }
  };

  const handleMenuList = () => {
    navigate("/menus");
  };

  return (
    <div className="max-w-[640px] content-center h-dvh flex flex-col px-4 py-6">
      <div className="flex justify-around">
        <h1 className="text-5xl font-bold mb-6">주문 내역 확인</h1>
        {/* <Button className="text-xl" onClick={handleMenuList}>
          처음으로
        </Button> */}
      </div>

      <div className="p-3 rounded-lg mb-4">
        {orderItemData.length === 0 && <div>주문한 메뉴가 없습니다.</div>}
        {orderItemData.map((item) => (
          <div key={item.id} className="flex justify-center items-center gap-2">
            <img
              src={item.image_url}
              alt="메뉴"
              className="w-36 h-36 object-cover"
            />
            <div className="w-[60%]">
              <p className="text-2xl font-bold">{item.name}</p>
              <p className="font-semibold text-2xl mb-2">{item.price}원</p>
              <div className="flex justify-center items-center gap-2">
                <button
                  onClick={() => modifyCount("decrease", item)}
                  disabled={item.count === 1}
                  className="w-8 h-8 flex items-center justify-center bg-white rounded-full border border-gray-300"
                >
                  -
                </button>
                <span>{item.count}</span>
                <button
                  onClick={() => modifyCount("increase", item)}
                  className="w-8 h-8 flex items-center justify-center bg-white rounded-full border border-gray-300"
                >
                  +
                </button>
                <Button
                  onClick={() => resetMenu(item)}
                  className="text-lg text-black ml-2 bg-mc_red px-4 py-2 rounded-md"
                >
                  취소
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white">
        <div className="flex justify-center gap-4">
          <div className="flex flex-col space-y-1">
            {/* <div className="bg-yellow-100 text-yellow-800 font-semibold text-lg rounded-md text-center absolute left-[33%] top-1 px-4">
                            결제 전 필수
                        </div> */}
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    onClick={openPointVerificationPage}
                    className="w-full px-10 py-8 bg-white text-black border text-xl border-gray-300"
                  >
                    포인트 받기
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top" className="z-50">
                  <p className="font-semibold text-lg rounded-md text-center px-4 py-2">
                    결제 전 필수
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button
              onClick={handleMenuList}
              className="w-full px-10 py-8 bg-white text-black border text-xl  border-gray-300"
            >
              더 추가하기
            </Button>
          </div>
          <Button
            onClick={goToFoodOffer}
            className="bg-yellow-400 hover:bg-yellow-500 text-black text-xl w-32 h-22"
          >
            주문완료
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
