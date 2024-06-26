import { auth } from "@/lib/auth/helper";
import type { PageParams } from "@/types/next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { EditPicture } from "./edit-picture";
import { prisma } from "@/lib/prisma";
import { EditUserForm } from "./edit-user-form";
import { Typography } from "@/components/ui/typography";

export default async function RoutePage(props: PageParams<{}>) {

    const userSession = await auth();
    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(userSession?.id as unknown as string)
        }
    })

    if (!user) {
        redirect('/auth/signin')
    }

    return (
        <main className="px-5 my-4 space-y-5">
            <Link href="/profile" className="flex flex-row gap-2"><ArrowLeft />Retour</Link>
            <EditPicture user={user} />
            <EditUserForm user={user} />

            <Typography variant="h3">
                Paramètres du compte
            </Typography>

            <ul className="space-y-2">
                <li>
                    <Link href="#" className="text-if_blue underline underline-offset-4">
                        Vos choix pour les données personnelles
                    </Link>
                </li>
                <li>
                    <Link href="#" className="text-if_blue underline underline-offset-4">
                        Changer de mot de passe
                    </Link>
                </li>
                <li>
                    <Link href="#" className="text-if_blue underline underline-offset-4">
                        Supprimer le compte
                    </Link>
                </li>
            </ul>
        </main>
    )
}