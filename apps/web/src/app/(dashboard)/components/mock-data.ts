//Info: The following data is used for the sidebar navigation and Cmd K bar.
export const navItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: "dashboard",
    isActive: false,
    shortcut: ["d", "d"],
    items: [], // Empty array as there are no child items for Dashboard
  },
  {
    title: "Projects",
    url: "/projects",
    icon: "product",
    isActive: false,
    shortcut: ["d", "d"],
    items: [], // Empty array as there are no child items for Dashboard
  },
] as const;
