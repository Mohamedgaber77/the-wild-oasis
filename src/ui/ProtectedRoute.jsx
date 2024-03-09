import { useEffect } from "react";
import { useUser } from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
const FullPage = styled.div`
  height: 100vh;
  text-align: center;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;
function ProtectedRoute({ children }) {
  const { isAuthenticated, isCurUser } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated && !isCurUser) navigate("/login");
  }, [navigate, isAuthenticated, isCurUser]);
  if (isCurUser)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
