import { MenuItemWithCount } from "@/types/menu.interface";
import { Button } from "@/components/ui/button";
import { modifyItemFromOrderInfo, setItemToOrderInfo, getOrderInfo, deleteItemFromOrderInfo } from "@/feat/order";
import { useState } from "react";

type OrderItemInCartProps = {
  item: MenuItemWithCount
  setOrderItemCount: (items: MenuItemWithCount[]) => boolean | void
}

const OrderItemInCart = ({ item, setOrderItemCount }: OrderItemInCartProps) => {
  const [itemCost, setItemCost] = useState(item.price * item.count);

  const modifyCount = (type: string, item: MenuItemWithCount) => {
    if (type === "increase") {
      setItemToOrderInfo(item);
      setItemCost(item.price * (item.count + 1))
    } else {
      modifyItemFromOrderInfo(item);
      setItemCost(item.price * (item.count - 1))
    }

    setOrderItemCount(getOrderInfo().orderItem || []);

  };

  const resetMenu = (item: MenuItemWithCount) => {
    deleteItemFromOrderInfo(item);
    setOrderItemCount(getOrderInfo().orderItem || []);
  };

  return (
    <div key={item.id} className="flex justify-center items-center gap-2">
      <img
        src={item.image_url}
        alt="메뉴"
        className="w-36 h-36 object-cover"
      />
      <div className="w-[60%]">
        <p className="text-2xl font-bold">{item.name}</p>
        <p className="font-semibold text-2xl mb-2">{itemCost.toLocaleString()}원</p>
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
  )
}

export default OrderItemInCart