//import { useState } from "react";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
//import CabinTable from "./CabinTable";
//import { PropTypes } from "prop-types";

function NewCabin() {
  // const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>New cabin</Button>
        </Modal.Open>
        <Modal.Window nameWindow="cabin-form">
          <CreateCabinForm />
        </Modal.Window>

        {/*<Modal.Open opens="cabin-table">
          <Button>Show Table</Button>
        </Modal.Open>
  <Modal.Window nameWindow="cabin-table">
          <CabinTable />
        </Modal.Window>*/}
      </Modal>
    </div>
  );
}
/*

<div>
      <Button onClick={() => setOpenModal((open) => !open)}>New cabin</Button>
      {openModal && (
        <Modal onClose={() => setOpenModal(false)}>
          <CreateCabinForm onClose={() => setOpenModal(false)} />
        </Modal>
      )}
    </div>

*/
export default NewCabin;
