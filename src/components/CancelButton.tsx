import { Button } from "@/components/ui/button";

interface CancelButtonProps {
  handleOrderCancel: () => void;
  btnText: string;
}

const CancelButton = ({ handleOrderCancel, btnText }: CancelButtonProps) => {
  return (
    <Button
      variant="destructive"
      className="rounded-md p-4 w-48 h-20 text-xl"
      onClick={handleOrderCancel}
    >
      {btnText}
    </Button>
  );
};

export default CancelButton;
