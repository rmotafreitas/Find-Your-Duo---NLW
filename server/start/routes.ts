/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";
import { PrismaClient } from "@prisma/client";
import { convertHourToMinutes } from "./utils/convertHourSTRToMins";
import { convertMinutesToHour } from "./utils/convertMinutesToHourSTR";
const prisma = new PrismaClient();

Route.get("/games", async ({ request }) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
      ads: {
        include: {
          days: true,
        },
      },
    },
  });
  return games.map((game) => {
    return {
      ...game,
      bannerURL: `${request.protocol()}://${request.host()}/uploads/games/${
        game.bannerURL
      }`,
    };
  });
});

Route.get("/games/:id/ads", async ({ params }) => {
  const gameId = +params.id;
  const ads = await prisma.ad.findMany({
    where: {
      gameId,
    },
    select: {
      id: true,
      name: true,
      yearsOfExperience: true,
      discord: false,
      hoursStart: true,
      hoursEnd: true,
      useVoiceChannel: true,
      createdAt: true,
      game: true,
      days: {
        select: {
          day: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return ads.map((ad) => {
    return {
      ...ad,
      hoursEnd: convertMinutesToHour(ad.hoursEnd),
      hoursStart: convertMinutesToHour(ad.hoursStart),
      days: ad.days.map(({ day }) => {
        return day;
      }),
    };
  });
});

Route.get("/ads/:id/discord", async ({ params }) => {
  const id = +params.id;
  const ad = await prisma.ad.findUniqueOrThrow({
    where: {
      id,
    },
    select: {
      discord: true,
    },
  });
  return ad;
});

Route.post("/games/:id/ads", async ({ request, params }) => {
  const gameId = +params.id;
  const body = request.body();

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsOfExperience: body.yearsOfExperience,
      discord: body.discord,
      days: {
        create: body.days.map((day: number) => {
          return {
            day,
          };
        }),
      },
      hoursStart: convertHourToMinutes(body.hoursStart),
      hoursEnd: convertHourToMinutes(body.hoursEnd),
      useVoiceChannel: body.useVoiceChannel,
    },
  });

  return ad;
});
