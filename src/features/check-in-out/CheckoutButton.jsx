import Button from "../../ui/Button";
import propTypes from "prop-types";
import { useCheckin } from "./useCheckin";
CheckoutButton.propTypes = {
  id: propTypes.number,
};
function CheckoutButton({ id }) {
  const { checkout, isCheckout } = useCheckin();
  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkout(id)}
      disabled={isCheckout}>
      Check out
    </Button>
  );
}

export default CheckoutButton;
