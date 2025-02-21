import { Button } from "@/components/ui/button";
import { getOrderInfo } from "@/feat/order";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CartButton = () => {
  const navigate = useNavigate();

  const [orderItems] = useState(getOrderInfo().orderItem || []);

  return (
    <div className="flex items-center gap-1">
      <Button variant="outline" onClick={() => navigate("/order-history")}>
        장바구니
      </Button>
        {
          orderItems.length ? 
            <p className="w-4 h-4 text-white bg-red-500 text-xs rounded-full">
              {orderItems.map(item => item.count).reduce((a, b) => a + b)}
            </p>
            :
          ""
        }
    </div>
  );
};

export default CartButton;
