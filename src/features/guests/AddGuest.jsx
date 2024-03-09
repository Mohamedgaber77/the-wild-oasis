import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateGuestForm from "./CreateGuestForm";

function AddGuest() {
  return (
    <div>
      <Modal>
        <Modal.Open opens={"guest-form"}>
          <Button>Add Guest</Button>
        </Modal.Open>
        <Modal.Window nameWindow={"guest-form"}>
          <CreateGuestForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddGuest;
