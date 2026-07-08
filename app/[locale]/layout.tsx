import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

const krasar = localFont({
  src: [
    { path: "../../public/fonts/Krasar-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/Krasar-Medium.ttf", weight: "500", style: "normal" },
    { path: "../../public/fonts/Krasar-Bold.ttf", weight: "700", style: "normal" },
  ],
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "km")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <div lang={locale} className={locale === "km" ? krasar.className : ""}>
      <NextIntlClientProvider messages={messages}>
        {children}
      </NextIntlClientProvider>
    </div>
  );
}
