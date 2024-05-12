import Home from "../pages/Home/Home";
import Reservation from "../pages/Reservation/Reservation";
import Payment from "../pages/Payment/Payment";

export const RouteNames = {
  HOME: "/",
  RESERVATION: "/api/reservation/check",
  PAYMENT: "/api/reservation/prebooking-step",
};

export const publicRoutes = [
  {
    path: RouteNames.HOME,
    element: Home,
  },
  {
    path: RouteNames.RESERVATION,
    element: Reservation,
  },
  {
    path: RouteNames.PAYMENT,
    element: Payment,
  },
];
