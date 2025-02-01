import { createBrowserRouter } from "react-router-dom";
import MenuSelect from "../pages/MenuSelect";
import MenuList from "@/pages/MenuList";
import SetSelection from "@/pages/SetSelection";
import OrderHistory from "../pages/OrderHistory";
import PointCollection from "../pages/PointCollection";
import FoodOffer from "../pages/FoodOffer";
import CardPayment from "../pages/CardPayment";
import PaymentSelect from "../pages/PaymentSelect";
import MainPage from "@/pages/MainPage";
import DiningSelection from "@/pages/DiningSelection";
import PaymentResult from "@/pages/PaymentResult";
import Voice from "@/component/voice/Voice";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />
    },
    {
        path: "/menus",
        element: <MenuList />
    },
    {
        path: "/set-choice/:itemId",
        element: <SetSelection />
    },
    {
        path: "/menu-select/:id",
        element: <MenuSelect />
    },
    {
        path: "dining-choice",
        element: <DiningSelection />
    },
    {
        path: "/order-history",
        element: <OrderHistory />
    },
    {
        path: "/point-collection",
        element: <PointCollection />
    },
    {
        path: "/food-offer",
        element: <FoodOffer />
    },
    {
        path: "/payment-select",
        element: <PaymentSelect />
    },
    {
        path: "/card-payment",
        element: <CardPayment />
    },
    {
        path: "/voice-test",
        element: <Voice />
    },
    {
        path: "/payment-result",
        element: <PaymentResult />
    }
]);

export default routes;
