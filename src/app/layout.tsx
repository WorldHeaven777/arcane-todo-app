import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-[var(--bg)] text-[var(--text-primary)]">
        <ReactQueryProvider>
          <div className="min-h-screen flex justify-center px-4 py-10">
            <div className="w-full max-w-3xl space-y-6">{children}</div>
          </div>
          <Toaster richColors closeButton position="top-center" />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
