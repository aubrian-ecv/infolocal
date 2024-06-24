"use client";
import { ReactComponent as PlayIcon } from "@/assets/icons/play.svg";
import { ReactComponent as HomeIcon } from "@/assets/icons/home.svg";
import { ReactComponent as SearchIcon } from "@/assets/icons/search.svg";

export type FooterProps = {
}

export const Footer = (props: FooterProps) => {
    return (
        <>
        <footer className="sticky bottom-0 w-full h-12 border-t border-if_lightgrey bg-if_blue mt-4">
            <nav className="w-full flex justify-between px-4 py-2 absolute inset-0">
                <a href="/" className="my-auto h-full"><HomeIcon className="h-auto w-full block relative top-1/2 -translate-y-1/2" aria-hidden="true" width={26} height={27}/></a>
                <a className="my-auto h-full"><SearchIcon className="h-auto w-full block relative top-1/2 -translate-y-1/2" aria-hidden="true" width={27} height={26}/></a>
                <a className="my-auto h-full"><PlayIcon className="h-auto w-full block relative top-1/2 -translate-y-1/2" aria-hidden="true" width={21} height={28}/></a>
                <a className="my-auto h-full"><div className="w-8 h-8 rounded-3xl bg-if_lightgrey"></div></a>
            </nav>
        </footer>
        </>
    )
}