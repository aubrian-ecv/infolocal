export type Campaign = {
    "campaign_token": string,
    "dev_only": boolean,
    "created_at": string,
    "name": string,
    "live": boolean,
    "from_api": boolean,
    "push_time": string,
    "messages": {
        "title": string,
        "body": string,
        "deeplink": string
    }[],
    "recurrence": {
        "end_date": string,
        "repeat_unit": "DAILY" | "WEEKLY" | "MONTHLY",
        "repeat_frequency": number
    } | null
}

export type CampaignStats = {
    "campaign_token": string,
    "detail": {
        "date": string,
        "sent": number,
        "sent_optins": number,
        "direct_open": number,
        "influenced_open": number,
        "reengaged": number,
        "errors": number
    }[]
}