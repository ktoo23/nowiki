import { Button } from "@/components/ui/button";

interface AddShoppingCartButtonProps {
    handleAddShoppingCart: () => void;
}

const AddShoppingCartButton = ({
    handleAddShoppingCart
}: AddShoppingCartButtonProps) => {
    return (
        <Button
            variant="default"
            className="rounded-md p-4 w-48 h-20 text-xl"
            onClick={handleAddShoppingCart}
        >
            장바구니에 넣기
        </Button>
    );
};

export default AddShoppingCartButton;
