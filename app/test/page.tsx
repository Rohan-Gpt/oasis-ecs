// app/page.tsx (or any server component)

import { getCachedData } from "@/actions/test";

export default async function Home() {
  const data = await getCachedData(); // This will use the Redis cache if available

  return (
    <div>
      <h1>Cached Data</h1>
      <p>Name: {data.name}</p>
      <p>Age: {data.age}</p>
    </div>
  );
}
