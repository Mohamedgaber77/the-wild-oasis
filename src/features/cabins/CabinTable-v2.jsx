import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabin } from "./useCabin";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;
function CabinTable() {
  const { fetching, error, cabins } = useCabin();

  if (fetching) {
    return <Spinner />;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  if (!cabins) {
    return <p>No data</p>;
  }
  return (
    <Table role="table">
      <TableHeader role="row">
        <div>Image</div>
        <div>Cabin</div>
        <div>Capacity</div>
        {/* <div>Description</div> */}
        <div>Price</div>
        <div>discount</div>
        <div></div>
      </TableHeader>
      {cabins.map((cabin) => (
        <CabinRow key={cabin.id} cabin={cabin} />
      ))}
    </Table>
  );
}

export default CabinTable;
