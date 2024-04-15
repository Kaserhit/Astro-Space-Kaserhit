import { type Doc, type APISpaceXResponse } from "../types/api";

import { type APIRocketSpaceXResponse } from "../types/apiRocket";

export const getRocketbyId = async ({ id }: { id: string }) => {
  const res = await fetch(`https://api.spacexdata.com/v4/rockets/${id}`);
  const rocket = (await res.json()) as APIRocketSpaceXResponse;

  return rocket;
};

export const getLaunchById = async ({ id }: { id: string }) => {
  const res = await fetch(`https://api.spacexdata.com/v5/launches/${id}`);
  const launch = (await res.json()) as Doc;

  return launch;
};

export const getLastestLaunches = async (order: string) => {
  const res = await fetch("https://api.spacexdata.com/v5/launches/query", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: {},
      options: {
        sort: {
          flight_number: order,
          data_unix: "asc",
        },
        limit: 12,
      },
    }),
  });
  const { docs: launches } = (await res.json()) as APISpaceXResponse;

  return launches;
};
