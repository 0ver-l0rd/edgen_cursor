"use client"
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider, GoogleOneTap } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const inter = Outfit({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [currentTheme, setCurrentTheme] = useState('default');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('knoq-theme');
    if (savedTheme) {
      setCurrentTheme(savedTheme);
      document.documentElement.className = savedTheme;
    }

    const googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { 
          pageLanguage: "en",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false
        },
        "google_translate_element"
      );
    };

    const addGoogleTranslateScript = () => {
      const script = document.createElement("script");
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    };

    addGoogleTranslateScript();
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  const changeTheme = (theme) => {
    setCurrentTheme(theme);
    document.documentElement.className = theme;
    localStorage.setItem('knoq-theme', theme);
  };

  if (!mounted) {
    return null;
  }

  return (
    <ClerkProvider>
      <html lang="en">
        <GoogleOneTap />
        <head>
          <link rel="icon" href="/logo.png" sizes="any" />
          <title>Knoq Learning Platform</title>
        </head>
        <body className={inter.className}>
          {/* Enhanced Language Changer */}
          <div className="google-translate-container">
            <div
              id="google_translate_element"
              style={{ 
                minWidth: '120px',
                minHeight: '40px'
              }}
            ></div>
          </div>

          {/* Theme Switcher */}
          <div className="theme-switcher">
            <div 
              className={`theme-option theme-blue ${currentTheme === 'default' ? 'active' : ''}`}
              onClick={() => changeTheme('default')}
              title="Blue Theme"
            ></div>
            <div 
              className={`theme-option theme-purple ${currentTheme === 'theme-purple' ? 'active' : ''}`}
              onClick={() => changeTheme('theme-purple')}
              title="Purple Theme"
            ></div>
            <div 
              className={`theme-option theme-green ${currentTheme === 'theme-green' ? 'active' : ''}`}
              onClick={() => changeTheme('theme-green')}
              title="Green Theme"
            ></div>
            <div 
              className={`theme-option theme-orange ${currentTheme === 'theme-orange' ? 'active' : ''}`}
              onClick={() => changeTheme('theme-orange')}
              title="Orange Theme"
            ></div>
            <div 
              className={`theme-option theme-red ${currentTheme === 'theme-red' ? 'active' : ''}`}
              onClick={() => changeTheme('theme-red')}
              title="Red Theme"
            ></div>
          </div>

          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
