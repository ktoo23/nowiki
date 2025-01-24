import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CartButton = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center">
      <Button variant="outline" onClick={() => navigate("/order-history")}>
        장바구니
      </Button>
    </div>
  );
};

export default CartButton;
