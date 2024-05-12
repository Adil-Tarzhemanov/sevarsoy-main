import axios from "axios";

export const instance = axios.create({
  // baseURL: `https://my.meteoblue.com/packages/basic-day?apikey=QRZ2PkOBblWHfrnd&lat=41.5255&lon=70.0208&asl=1647&format=json&forecast_days=7`
  baseURL:
    "https://my.meteoblue.com/packages/basic-1h_basic-day_current?apikey=QRZ2PkOBblWHfrnd&lat=41.5255&lon=70.0208&asl=1647&format=json&forecast_days=7",
  // baseURL:
  //   "https://my.meteoblue.com/packages/basic-1h_basic-day?apikey=QRZ2PkOBblWHfrnd&lat=41.5255&lon=70.0208&asl=1647&format=json",
});
