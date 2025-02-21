import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  getOrderInfo,
} from "@/feat/order";
import OrderItemInCart from "@/components/OrderItemInCart";

const OrderHistory = () => {
  const navigate = useNavigate();
  const [orderItemData, setOrderItemData] = useState(getOrderInfo().orderItem || []);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (orderItemData.length === 0) {
      return 
    }
    setTotalPrice(orderItemData.map(item => item.count*item.price).reduce((a, b) => a + b))
  },[orderItemData])


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
          <div key={item.id}>
            <OrderItemInCart item={item} setOrderItemCount={setOrderItemData} />
          </div>
        ))}
      </div>
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white">
        <div className="text-2xl font-bold text-gray-800 mb-5 text-center">
          <span>총 금액 : { totalPrice.toLocaleString() }원</span>
        </div>
        <div className="flex justify-center gap-4">
          <div className="flex flex-col space-y-1">
            <Button
              onClick={handleMenuList}
              className="w-full px-10 py-8 bg-white text-black border text-xl w-32 h-22 border-gray-300"
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
