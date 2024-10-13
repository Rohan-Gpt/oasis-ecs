// app/actions.ts
"use server";

import redis from "@/lib/redis"; // Import the Redis client
import { revalidatePath } from "next/cache"; // Optional: To manage cache revalidation

// Define a server action that fetches data and caches it
export async function getCachedData() {
  // Try fetching cached data from Redis
  const cachedData = await redis.get("cached-key");

  if (cachedData) {
    console.log("Serving from cache");
    return JSON.parse(cachedData);
  }

  // If no cached data, fetch fresh data (e.g., from a database or external API)
  const freshData = { name: "John Doe", age: 30 }; // Replace this with actual data-fetching logic

  // Cache the fresh data in Redis with an expiration (optional)
  await redis.set("cached-key", JSON.stringify(freshData), "EX", 60 * 60); // Cache for 1 hour

  console.log("Serving fresh data and caching");
  return freshData;
}

// Optional: Add another action to invalidate cache and trigger re-fetching
export async function clearCache() {
  await redis.del("cached-key"); // Delete cached data
  revalidatePath("/"); // Revalidate cache (if using ISR or SSG pages)
}
