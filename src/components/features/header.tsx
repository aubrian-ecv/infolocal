"use client";
import { ReactComponent as BurgerIcon } from "@/assets/icons/burger.svg";
import { ReactComponent as BellIcon } from "@/assets/icons/bell.svg";
import { ReactComponent as PinIcon } from "@/assets/icons/pin.svg";
import { Button } from "../ui/button";
import { useGeoLoc } from "@/hooks/useGeoLoc";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export type HeaderProps = {
}

export const Header = (props: HeaderProps) => {

    const loc = useGeoLoc();
    const { data } = useQuery({queryKey: ["meteo", loc?.coords],}) as UseQueryResult<any>;

    return (
        <header className="w-full bg-if_blue h-14 border-b-2 border-if_lightgrey sticky top-0 z-50">
            <nav className="flex flex-row gap-4 w-full px-4 py-2">
                <img src='/static/img/infolocal-small-white.svg'/>
                <Button variant={"blue_outline"} className="ml-auto">{data?.city ? data.city.name : "Ma localité"} <PinIcon className="ml-2" aria-hidden="true" width={18} height={22}/></Button>
                <a className="my-auto h-full"><BellIcon className="h-full w-auto" aria-hidden="true" width={26} height={28}/></a>
            </nav>
        </header>
    )
}