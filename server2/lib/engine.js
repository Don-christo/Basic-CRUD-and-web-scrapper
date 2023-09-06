"use strict";
// import { IncomingMessage, ServerResponse } from "http";
// import puppeteer from "puppeteer";
// /*
// implement your server code here
// */
// export const getInfo = (req: IncomingMessage, res: ServerResponse) => {
//   let datas = "";
//   req.on("data", (chunk: string) => {
//     datas += chunk;
//   });
//   req.on("end", async () => {
//     let { url } = JSON.parse(datas);
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto(url);
//     //To extract the title
//     const title = await page.title();
//     // Extract the imageUrls
//     const imageItems = await page.$$("img");
//     const imageUrls = [];
//     for (let i = 0; i < imageItems.length; i++) {
//       const srcs = await page.evaluate((e) => e.src, imageItems[i]);
//       imageUrls.push(srcs);
//     }
//     // Extract the descriptions
//     const descriptionBody = await page.$('meta[name="description"]');
//     let description: string | null = null;
//     if (descriptionBody) {
//       description = await page.evaluate(
//         (el) => el.getAttribute("content"),
//         descriptionBody
//       );
//     }
//     await browser.close();
//     const finalResult = {
//       title: title,
//       imageUrls: imageUrls,
//       description: description,
//     };
//     res.writeHead(200, { "content-Type": "application/json" });
//     res.end(JSON.stringify(finalResult));
//   });
// };
