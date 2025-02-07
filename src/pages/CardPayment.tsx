import { useNavigate } from "react-router-dom";
import CardPaymentImage from "../assets/image/card-payment.png";
import { Button } from "@/components/ui/button";
import { completeOrder } from "@/feat/order";
import useSpeechFeedback from "@/hooks/useSpeechFeedback";
import { usePaymentCostStore } from "@/store/paymentCostStore";

interface CustomWindow extends Window {
  IMP: any;
}

declare let window: CustomWindow;

const { IMP } = window;
IMP.init("imp01813062");

interface IMPProps {
  success: boolean;
  imp_uid: string;
  pay_method: string;
  merchant_uid: string;
  name: string;
  paid_amount: number;
  currency: "KRW";
  pg_provider: string;
  pg_type: string;
  pg_tid: string;
  apply_num: string;
  buyer_name: string;
  buyer_email: string;
  buyer_tel: string;
  buyer_addr: string;
  buyer_postcode: string;
  custom_data: null;
  status: string;
  paid_at: number;
  receipt_url: string;
  card_name: null;
  bank_name: null;
  card_quota: number;
  card_number: string;
}

const CardPayment = () => {
  const { price } = usePaymentCostStore();
  const { speak } = useSpeechFeedback();
  const naviate = useNavigate();

  const navigateToPaymentSelect = () => {
    naviate("/payment-select");
  };

  const navigateToPaymentResult = () => {
    const result = completeOrder();
    if (!result) {
      alert("주문에 오류가 발생했습니다");
    }
    IMP.request_pay(
      {
        pg: "kakaopay",
        pay_method: "card",
        merchant_uid: "merchant_" + new Date().getTime(),
        name: "주문명:결제테스트",
        amount: price,
        buyer_email: "",
      },
      function (response: IMPProps) {
        response.success
          ? speak("결제가 완료되었습니다.")
          : alert("결제에 실패했습니다.");
      },
    );

    naviate("/payment-result");
  };

  return (
    <section className="flex flex-col max-w-[640px] content-center h-dvh ">
      <div className="mt-[10%] h-[20%] content-center">
        <h1 className="text-4xl">결제를 진행해주세요</h1>
      </div>
      <div className="grow flex flex-col justify-center items-center">
        <div className="w-[70%]">
          <img src={CardPaymentImage} alt="카드 결제 안내 이미지" />
        </div>
        <div className="flex w-[50%] gap-5 m-auto">
          <Button
            variant="outline"
            className="w-[50%] h-10 mt-10 m-auto"
            onClick={navigateToPaymentSelect}
          >
            취소
          </Button>
          <Button
            variant="outline"
            className="w-[50%] h-10 mt-10 m-auto bg-mc_yellow"
            onClick={navigateToPaymentResult}
          >
            결제 완료
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CardPayment;
