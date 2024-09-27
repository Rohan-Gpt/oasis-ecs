import NewAppBar from "@/components/newAppBar";
import { NotionPage } from "@/components/notion-renderer";
import { currentUser, getSession } from "@/lib/getSession";
import { notion } from "@/lib/notion";
import { redirect } from "next/navigation";

async function getData(rootPageId: string) {
  return await notion.getPage(rootPageId);
}

export default async function GuidePage({
  params,
}: {
  params: { guide_id: string[] };
}) {
  const user = await currentUser();
  if (!user) return redirect("/auth/login");
  const guideId = params.guide_id.join("/"); // Combine if guide_id is an array
  const data = await getData(guideId);

  return (
    <div className="bg-black">
      <NewAppBar />
      <NotionPage recordMap={data} rootPageId={guideId} />
    </div>
  );
}
