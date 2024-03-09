import styled from "styled-components";

import proptypes from "prop-types";
import { Flag } from "../../ui/Flag";
import { useNavigate } from "react-router-dom";

GuestListItem.propTypes = {
  guest: proptypes.object,
  onClick: proptypes.func,
};
const StyledGuestListItem = styled.li`
  display: grid;
  grid-template-columns: 2rem 1.5fr 1.5fr 1fr;
  gap: 0.8rem;
  align-items: center;
  padding: 0.6rem 1.6rem;
  transition: all 0.2s;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:hover {
    background-color: var(--color-grey-50);
    cursor: pointer;
  }
`;

const ID = styled.div`
  justify-self: right;
  font-size: 1.2rem;
  color: var(--color-grey-500);
`;

function GuestListItem({ guest }) {
  const navigate = useNavigate();
  const { id: guestId } = guest;

  return (
    <StyledGuestListItem
      onClick={() => navigate(`/guests/${guestId}`)}
      role="button">
      <Flag src={guest.countryFlag} alt={`Flag of ${guest.nationality}`} />
      <div>{guest.fullName}</div>
      <div>{guest.nationality}</div>
      <ID>ID: {guest.nationalID}</ID>
    </StyledGuestListItem>
  );
}

export default GuestListItem;
