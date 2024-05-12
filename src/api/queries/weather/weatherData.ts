import {instance} from "../../meteoblue.api";
import {useQuery} from "@tanstack/react-query";

const fetchWeatherData = async () => {
    try {
        const { data } = await instance.get('');
        return data;
    } catch (error) {
        throw new Error('Failed to weather');
    }
}

export const useWeatherDataByQuery = () => {
    return useQuery({
        queryKey: ['weather'],
        queryFn: fetchWeatherData
    })
}