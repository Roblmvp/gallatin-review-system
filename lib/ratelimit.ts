import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

const isConfigured = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN;

const redis = isConfigured
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null;

export const rateLimiters = {
  auth: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(5, "1 m"),
        prefix: "ratelimit:auth",
      })
    : null,
  api: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(30, "1 m"),
        prefix: "ratelimit:api",
      })
    : null,
  tracking: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(60, "1 m"),
        prefix: "ratelimit:tracking",
      })
    : null,
  passwordReset: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(3, "1 h"),
        prefix: "ratelimit:pwreset",
      })
    : null,
};

export function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";
  return ip;
}

export async function checkRateLimit(
  request: NextRequest,
  limiterType: keyof typeof rateLimiters = "api"
): Promise<{ success: boolean; response?: NextResponse }> {
  const limiter = rateLimiters[limiterType];

  if (!limiter) {
    return { success: true };
  }

  const ip = getClientIP(request);
  const { success, limit, reset, remaining } = await limiter.limit(ip);

  if (!success) {
    return {
      success: false,
      response: NextResponse.json(
        {
          error: "Too many requests. Please try again later.",
          retryAfter: Math.ceil((reset - Date.now()) / 1000),
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": remaining.toString(),
            "X-RateLimit-Reset": reset.toString(),
            "Retry-After": Math.ceil((reset - Date.now()) / 1000).toString(),
          },
        }
      ),
    };
  }

  return { success: true };
}
