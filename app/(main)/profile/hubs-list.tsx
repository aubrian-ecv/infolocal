import { HubCard } from "@/components/features/hubs/hub-card";
import { getUserHubs } from "@/lib/server-actions/hub.action"
import { Hub, User } from "@prisma/client";

export type HubsListProps = {

}

export const HubsList = async (props: HubsListProps) => {

    const hubs = await getUserHubs() as (Hub & { users: User[] })[];
    console.log(hubs);
    

    return (
        <ul className="space-y-6">
            {
                hubs.map((hub) => (
                    <HubCard
                        key={hub.id}
                        hub={hub}
                    />
                ))
            }
        </ul>
    )
}