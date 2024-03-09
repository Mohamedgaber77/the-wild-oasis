import styled from "styled-components";
import { useRecent } from "./useRecent";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import { useCabin } from "../cabins/useCabin";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 48rem auto;
  gap: 2.4rem;
`;
function DashboardLayout() {
  const {
    recentBookings,
    confirmedStays,
    isRecentBookings,
    isStaying,
    numDays,
  } = useRecent();

  const { cabins, fetching } = useCabin();
  if (isRecentBookings || isStaying || fetching) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        booking={recentBookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinsCount={cabins.length}
      />
      <TodayActivity />
      <DurationChart stays={confirmedStays} numDays={numDays} />
      <SalesChart bookings={recentBookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
