import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";

const StyledHead = styled.header`
  background-color: var(--color-grey-100);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-300);
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;
`;
function Header() {
  return (
    <StyledHead>
      <UserAvatar />
      <HeaderMenu />
    </StyledHead>
  );
}

export default Header;
