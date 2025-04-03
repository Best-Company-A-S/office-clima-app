import { ModalProvider } from "@/app/providers/ModalProvider";
import { TeamButtonsClient } from "./_components/TeamButtonsClient";
import { Toaster } from "sonner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Toaster position="top-center" />
      <ModalProvider />
      <main>{children}</main>
    </div>
  );
}
