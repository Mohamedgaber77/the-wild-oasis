import Empty from "../../ui/Empty";

import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import GuestRow from "./GuestRow";
import { useGuests } from "./useGuests";

function GuestsTable() {
  const { fetchingGuests, guests, count } = useGuests();
  if (fetchingGuests) return <Spinner />;
  if (count === undefined) return null;
  if (!guests.length) return <Empty resourceName="guests" />;

  return (
    <Menus>
      <Table columns={"0.6fr 1.8fr 2.2fr 1fr 1fr 1fr"}>
        <Table.Header>
          <div></div>
          <div>Name</div>
          <div>Email</div>
          <div>Nationality</div>
          <div>National ID</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={guests}
          render={(guest) => <GuestRow key={guest.id} guest={guest} />}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default GuestsTable;
