import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "СпектраМаяк — автоматизация диагностики РАС в 10 раз быстрее",
  description:
    "Помогает дефектологам, логопедам и психологам формировать заключения за 15 минут вместо 2-3 часов",
  keywords: [
    "диагностика РАС",
    "аутизм",
    "дефектолог",
    "логопед",
    "психолог",
    "M-CHAT-R",
    "ADOS-2",
    "VB-MAPP",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-wide">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-primary">СпектраМаяк</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#how-it-works"
              className="text-text-muted hover:text-text transition-colors"
            >
              Как это работает
            </a>
            <a
              href="#pricing"
              className="text-text-muted hover:text-text transition-colors"
            >
              Цены
            </a>
            <a
              href="#faq"
              className="text-text-muted hover:text-text transition-colors"
            >
              FAQ
            </a>
          </nav>

          {/* CTA Button */}
          <a href="#pricing" className="btn btn-primary text-sm px-4 py-2">
            Попробовать бесплатно
          </a>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-background-light border-t border-gray-200">
      <div className="container-wide py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <div className="text-text-muted text-sm">
            © 2026 СпектраМаяк. Все права защищены.
          </div>

          {/* Links */}
          <div className="flex space-x-6">
            <a
              href="/privacy"
              className="text-text-muted hover:text-text transition-colors text-sm"
            >
              Политика конфиденциальности
            </a>
            <a
              href="/terms"
              className="text-text-muted hover:text-text transition-colors text-sm"
            >
              Условия использования
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
