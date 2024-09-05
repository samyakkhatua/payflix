import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { VideoPlayer } from "./_components/videoPlayer";

export default async function Home() {

  const session = await auth()

  if(!session){
    redirect("/api/auth/signin");
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <VideoPlayer />
    </main>
  );
}
