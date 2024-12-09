import { useLocation, useNavigate, useParams } from "react-router-dom";
import AddShoppingCartButton from "@/component/AddShoppingCartButton";
import QuickPayButton from "@/component/QuickPayButton";
import CancelButton from "@/component/CancelButton";
import TooltipWrapper from "@/components/tooltip/TooltipWrapper";
import { menu_items } from "../assets/data/menu.json";

import { setItemToOrderInfo } from "@/feat/order";
import { Button } from "@/components/ui/button";

const MenuSelect = () => {
    const navigate = useNavigate();
    const params = useParams();
    const { state } = useLocation();
    const menuData = state?.menu;

    const [menu] = menu_items.filter((item) => item.id === params.id);

    const handleAddShoppingCart = () => {
        if (!setItemToOrderInfo(menu)) {
            alert("예상치 못한 오류로 인해\n 첫화면으로 넘어갑니다");
            return navigate('/');
        };
        alert("장바구니에 추가되었습니다.");
    };

    const handleViewOrderHistory = () => {
        navigate("/order-history", { state: menuData });
    };

    const handleOrderCancel = () => {
        navigate("/menus");
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <section className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <header className="text-center mb-8">
                    <p className="text-2xl mb-2">{menuData.name}</p>
                    <p className="text-2xl text-primary">
                        <span className="font-bold">{menuData.price}</span>원
                    </p>
                </header>

                <div className="flex justify-center">
                    <div>
                        <img
                            src={menuData.image_url}
                            alt="메인 메뉴"
                            className="w-48 h-48 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                        />
                        <Button variant="outline" className="mt-3">
                            변경하기
                        </Button>
                    </div>
                </div>

                <div className="mb-8">
                    <TooltipWrapper />
                </div>

                <div className="flex flex-col md:flex-row sm:flex-col sm:items-center justify-center gap-4">
                    <div className="flex flex-col gap-3">
                        <AddShoppingCartButton
                            handleAddShoppingCart={handleAddShoppingCart}
                        />
                        <CancelButton handleOrderCancel={handleOrderCancel} />
                    </div>

                    <QuickPayButton
                        handleViewOrderHistory={handleViewOrderHistory}
                    />
                </div>
            </section>
        </div>
    );
};

export default MenuSelect;
