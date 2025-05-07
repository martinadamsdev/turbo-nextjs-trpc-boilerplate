import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Manage your projects",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto py-8">
      {children}
    </div>
  );
} 