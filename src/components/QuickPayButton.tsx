import { Button } from "@/components/ui/button";

interface QuickPayProps {
  handleViewOrderHistory: () => void;
}

const QuickPayButton = ({ handleViewOrderHistory }: QuickPayProps) => {
  return (
    <Button
      variant="secondary"
      className="bg-yellow-300 w-48 h-44 text-black hover:bg-yellow-400 text-xl"
      onClick={handleViewOrderHistory}
    >
      바로 결제하기
    </Button>
  );
};

export default QuickPayButton;
