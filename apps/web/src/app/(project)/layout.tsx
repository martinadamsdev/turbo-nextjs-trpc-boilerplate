import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Project management dashboard",
};

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
} 