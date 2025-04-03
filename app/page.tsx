import { auth } from "@/auth";
import LoginPage from "@/components/auth/loginPage";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (session) {
    redirect("/dashboard");
  }
  return <LoginPage />;
}
