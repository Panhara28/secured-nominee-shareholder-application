import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "km"] as const,
  defaultLocale: "en",
});
