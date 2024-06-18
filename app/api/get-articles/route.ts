import { PrismaClient } from "@prisma/client";
import { XMLParser } from "fast-xml-parser";

export async function GET(request: Request) {

    const xmlData = await fetch('https://www.lavoixdunord.fr/sites/default/files/sitemaps/www_lavoixdunord_fr/sitemapnews-0.xml');
    const xmlText = await xmlData.text();   

    const parser = new XMLParser();
    let jsonObj = parser.parse(xmlText);

    // const prisma = new PrismaClient();
    // await prisma.article.deleteMany();
    // const importStatus = await prisma.article.createMany({
    //     data: jsonObj.urlset.url.map((articleData: any) => ({
    //         title: articleData["video:video"]["video:title"],
    //         content: articleData["video:video"]["video:description"],
    //         thumbnail: articleData["video:video"]["video:thumbnail_loc"],
    //         createdAt: new Date(articleData["video:video"]["video:publication_date"]),
    //         author: "15 Secondes"
    //     }))
    // })

    return new Response(JSON.stringify(jsonObj, null, 2), { status: 200 });
}