import { prisma } from "@/lib/prisma";
import { XMLParser } from "fast-xml-parser";

export async function GET(request: Request) {
  const r = request.url;
  const xmlData = await fetch(
    "https://www.lavoixdunord.fr/sites/default/files/sitemaps/www_lavoixdunord_fr/sitemapnews-0.xml"
  );
  const xmlText = await xmlData.text();

  const parser = new XMLParser();
  let jsonObj = parser.parse(xmlText);

  if (!jsonObj.urlset.url)
    return new Response(JSON.stringify("There was an error", null, 2), {
      status: 500,
    });

  // await prisma.$queryRaw`TRUNCATE TABLE Article;`;
  const importStatus = await prisma.article.createMany({
    data: jsonObj.urlset.url
      .filter(
        (articleData: any) =>
          articleData["image:image"]?.["image:loc"] &&
          articleData["image:image"]?.["image:caption"]
      )
      .map((articleData: any) => ({
        title: articleData["news:news"]["news:title"],
        content: articleData["loc"],
        publicationDate: articleData["news:news"]["news:publication_date"],
        imageUrl: articleData["image:image"]["image:loc"],
        imageCaption: articleData["image:image"]["image:caption"] + "",
        keywords: articleData["news:news"]?.["news:keywords"] ?? "",
        author: articleData["news:news"]?.["news:publication"]["news:name"] ?? "",
      })),
  });

  return new Response(JSON.stringify(importStatus, null, 2), { status: 200 });
}
