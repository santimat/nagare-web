import { ActionError } from "astro:actions";
import { Redis } from "@upstash/redis";
// @upstash/ratelimit is commonJS only, so we need to import it this way
import pkgRateLimit from "@upstash/ratelimit";
const { Ratelimit } = pkgRateLimit;

const redisClient = new Redis({
  url: import.meta.env.KV_REST_API_URL,
  token: import.meta.env.KV_REST_API_TOKEN,
});

const ratelimit = new Ratelimit({
  redis: redisClient,
  limiter: Ratelimit.slidingWindow(5, "30 m"),
  analytics: true,
  prefix: "@upstash/ratelimit",
});

export const checkRateLimit = async (identifier: string) => {
  const { success } = await ratelimit.limit(identifier);

  if (!success) {
    throw new ActionError({
      code: "TOO_MANY_REQUESTS",
      message: "You have exceeded the maximum number of requests. Please try again later.",
    });
  }
};
