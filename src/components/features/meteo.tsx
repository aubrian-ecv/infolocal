"use client"

import { useGeoLoc } from "@/hooks/useGeoLoc"
import { useQuery } from "@tanstack/react-query";
import { Typography } from "../ui/typography";
import { dateTz } from "@/lib/date/date-tz";
import { ReactComponent as DayIcon } from "@/assets/icons/animated/weather/day.svg";
import { ReactComponent as CloudyDayIcon } from "@/assets/icons/animated/weather/cloudy-day-1.svg";
import { ReactComponent as Cloudy } from "@/assets/icons/animated/weather/cloudy.svg";

export type MeteoProps = {

}

export const Meteo = (props: MeteoProps) => {

    const loc = useGeoLoc();

    const { data: meteoData } = useQuery({
        queryKey: ["meteo", loc?.coords],
        queryFn: async () => {
            if (!loc) return null;
            const response = await fetch(`https://api.meteo-concept.com/api/forecast/nextHours?latlng=${loc?.coords.latitude},${loc?.coords.longitude}&hourly=true&token=${process.env.NEXT_PUBLIC_METEOCONCEPT_TOKEN}`)
            return response.json()
        },
        refetchOnMount: false
    })

    if (!meteoData) return null;


    return (
        <section>
            <div className="p-4 bg-if_blue text-white rounded-md">
                <Typography className="font-bold text-2xl">{meteoData.city.name}</Typography>
                <div className="flex flex-row items-center gap-4">
                    <Typography className="font-bold text-2xl">{meteoData.forecast[0].temp2m}°C</Typography>
                    <MeteoWeatherIcon weather={meteoData.forecast[0].weather} />
                </div>
                <ul className="flex flex-row justify-between gap-8 overflow-x-auto scrollbar-hide lg:scrollbar-default">
                    {meteoData.forecast.map((forecast: any, index: number) => {
                        if (index === 0) return null;
                        return (
                            <li key={index} className="flex flex-col gap-1 items-center">
                                <Typography className="text-sm">{dateTz(forecast.datetime, "HH:mm", "Europe/Paris") as string}</Typography>
                                <MeteoWeatherIcon weather={forecast.weather} />
                                <Typography className="text-sm">{forecast.temp2m}°C</Typography>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </section>
    )
}

const MeteoWeatherIcon = (props: { weather: number }) => {

    if (props.weather === 0) return <DayIcon />
    if (props.weather === 1) return <CloudyDayIcon />
    if (props.weather === 3) return <Cloudy />

    return props.weather
}