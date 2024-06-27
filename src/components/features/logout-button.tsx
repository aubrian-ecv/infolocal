"use client"

import { signOutAction } from "@/lib/server-actions/user.action"
import { Button } from "../ui/button"

export const LogoutButton = () => {
    return (
        <Button variant={"destructive"} className="ml-auto" onClick={() => signOutAction()}>
            Déconnexion
        </Button>
    )
}