import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import {
  getBookingsAfterDate,
  getStaysAfterDate,
} from "../../services/apiBookings";
export function useRecent() {
  const [searchParams] = useSearchParams();
  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { data: recentBookings, isLoading: isRecentBookings } = useQuery({
    queryKey: ["bookings", `last-${numDays}`],
    queryFn: () => getBookingsAfterDate(queryDate),
  });
  const { data: staying, isLoading: isStaying } = useQuery({
    queryKey: ["staying", `last-${numDays}`],
    queryFn: () => getStaysAfterDate(queryDate),
  });
  const confirmedStays = staying?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );

  return {
    recentBookings,
    isRecentBookings,
    confirmedStays,
    isStaying,
    numDays,
  };
}
