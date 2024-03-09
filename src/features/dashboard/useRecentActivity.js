import { useQuery } from "@tanstack/react-query";
import {
  getStaysTodayActivity,
  recentActivity,
} from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";

export function useRecentActivity() {
  const [searchParams] = useSearchParams();
  const numDays = !searchParams.get("last")
    ? 1
    : Number(searchParams.get("last"));
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { data: recentActivities, isLoading: isRecentActivities } = useQuery({
    queryKey: ["recentActivity", `last-${numDays}`],
    queryFn: () => recentActivity(queryDate),
  });
  const recentBooking = recentActivities?.filter(
    (recent) => recent.status !== "checked-out"
  );

  const { data: bookingActivities, isLoading: isActivities } = useQuery({
    queryKey: ["today-activity"],
    queryFn: getStaysTodayActivity,
  });

  return {
    recentBooking,
    isRecentActivities,
    bookingActivities,
    isActivities,
  };
}
