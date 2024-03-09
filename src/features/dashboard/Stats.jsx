import Stat from "./Stat";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import propTypes from "prop-types";
import { formatCurrency } from "../../utils/helpers";
Stats.propTypes = {
  numDays: propTypes.number,
  booking: propTypes.array,
  confirmedStays: propTypes.array,
  cabinsCount: propTypes.number,
};
function Stats({ numDays, booking, confirmedStays, cabinsCount }) {
  const numBookings = booking.length;
  const sales = booking.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const checkins = confirmedStays.length;
  const rateStay =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (cabinsCount * numDays);
  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color={"green"}
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title={"Check ins"}
        color={"indigo"}
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title={"occupancy rate"}
        color={"yellow"}
        icon={<HiOutlineChartBar />}
        value={Math.round(rateStay * 100) + "%"}
      />
    </>
  );
}

export default Stats;
