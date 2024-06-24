"use client"

import { useGeoLoc } from "@/hooks/useGeoLoc"
import { useQuery } from "@tanstack/react-query";
import { Typography } from "../ui/typography";
import { Sun } from "lucide-react";
import { dateTz } from "@/lib/date/date-tz";

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
        <section className="p-4">
            <div className="p-4 bg-if_blue text-white rounded-md space-y-6">
                <Typography className="font-bold text-2xl">{meteoData.city.name}</Typography>
                <div className="flex flex-row gap-4">
                    <Typography className="font-bold text-2xl">{meteoData.forecast[0].temp2m}°C</Typography>
                    <MeteoWeatherIcon probarain={meteoData.forecast[0].probarain} />
                </div>
                <ul className="flex flex-row justify-between gap-8 overflow-x-auto scrollbar-hide lg:scrollbar-default">
                    {meteoData.forecast.map((forecast: any, index: number) => {
                        if (index === 0) return null;
                        return (
                            <li key={index} className="flex flex-col gap-1 items-center">
                                <Typography className="text-sm">{dateTz(forecast.datetime, "HH:mm", "Europe/Paris")}</Typography>
                                <MeteoWeatherIcon probarain={forecast.probarain} />
                                <Typography className="text-sm">{forecast.temp2m}°C</Typography>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </section>
    )
}

const MeteoWeatherIcon = (props: { probarain: number }) => {
    return <Sun className="text-if_yellow fill-if_yellow" size={30} />
}