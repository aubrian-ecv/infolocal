import { useEffect, useState } from "react";

export const useGeoLoc = () => {
    const [loc, setLoc] = useState<GeolocationPosition | null>(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLoc(position)
        }, null, { enableHighAccuracy: true })
    }, []);

    return loc;
}