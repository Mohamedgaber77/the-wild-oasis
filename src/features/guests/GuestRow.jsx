import proptypes from "prop-types";
import { useGuests } from "./useGuests";
import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import { Flag } from "../../ui/Flag";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import { HiTrash } from "react-icons/hi2";
import ConfirmDelete from "../../ui/ConfirmDelete";
GuestRow.propTypes = {
  guest: proptypes.object,
};

const Guest = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const ID = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Nationality = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;
function GuestRow({ guest }) {
  const { isCreating, isDeleting, deletingGuest } = useGuests();
  const {
    id: guestId,
    fullName,
    email,
    nationality,
    nationalID,
    countryFlag,
  } = guest;
  if (isCreating || isDeleting) return <Spinner />;
  return (
    <Table.Row>
      <Flag src={countryFlag} alt={`Flag of ${nationality}`} />
      <Guest>{fullName}</Guest>
      <div>{email}</div>
      <Nationality>{nationality} </Nationality>
      <ID>{nationalID}</ID>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={guestId} />
            <Menus.List id={guestId}>
              <Modal.Open opens="delete-guest">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>
            <Modal.Window nameWindow={"delete-guest"}>
              <ConfirmDelete
                resourceName="guest"
                onConfirm={() => deletingGuest(guestId)}
                disabled={isDeleting}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default GuestRow;
