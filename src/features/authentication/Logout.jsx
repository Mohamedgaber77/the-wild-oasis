import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import Spinner from "../../ui/Spinner";
import { useLog } from "./useLog";

function Logout() {
  const { loggedout, isloggedout } = useLog();
  if (isloggedout) return <Spinner />;
  return (
    <ButtonIcon onClick={loggedout} disabled={isloggedout}>
      {!isloggedout ? <HiArrowRightOnRectangle /> : <Spinner />}
    </ButtonIcon>
  );
}

export default Logout;
