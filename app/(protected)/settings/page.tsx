import { getSession } from "@/lib/getSession";

export default async function Settings() {
  const session = await getSession();
  const user = session?.user;
  return <div>{JSON.stringify(session)}</div>;
}
