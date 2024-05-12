import {useQuery} from "@tanstack/react-query";
import {instance} from "../../api";

const fetchRoomsDaysData = async (type: any) => {
    try {
        const { data } = await instance.get(`api/reservation/booked-days?type=${type}`);
        return data;
    } catch (error) {
        throw new Error('Failed to rooms and days');
    }
}

export const useRoomsDaysDataByQuery = (type: any) => {
    return useQuery({
        queryKey: ['roomsDays'],
        queryFn: () => fetchRoomsDaysData(type)
    })
}