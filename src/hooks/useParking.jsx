import { useContext } from "react";
import ParkingContext from "../context/ParkingProvider";

const useParking = () =>{
    return useContext(ParkingContext)
}

export default useParking;