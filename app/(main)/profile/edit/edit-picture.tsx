"use client"

import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { editUserPicture } from "@/lib/server-actions/user.action"
import { User } from "@prisma/client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export type EditPictureProps = {
    user: User
}

export const EditPicture = (props: EditPictureProps) => {

    const router = useRouter();
    const { update } = useSession();

    const changePicture = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async () => {
            const file = input.files?.[0];
            if (!file) {
                return;
            }

            // Transform the file into a base64 string
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async () => {
                const base64 = reader.result as string;
                // Send the base64 string to the server
                const status = await editUserPicture(base64);

                if (status.success) {
                    await update({
                        ...props.user,
                        image: base64
                    })
                    toast.success("Photo de profil modifiée avec succès");
                    router.refresh();
                    return;
                }
                toast.error("Erreur lors de la modification de la photo de profil");
            }
        }
        input.click();
    }

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <Avatar className="size-20 border-2 border-if_blue">
                <AvatarImage
                    src={props.user.image ?? "https://github.com/shadcn.png"}
                />
            </Avatar>
            <Button variant="link" className="text-if_blue underline" onClick={changePicture}>
                Modifier la photo
            </Button>
        </div>
    )

}