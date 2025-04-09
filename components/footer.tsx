"use client";

import Link from "next/link";
import { ArrowUp, Sun, Moon, Heart } from "lucide-react";
import { DIcons } from "dicons";
import { useTheme } from "next-themes";

function handleScrollTop() {
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
}

// WeChat SVG icon component since it's not in DIcons
const WeChatIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    className={className} 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M9.817 15.877c-4.234 0-7.683-2.883-7.683-6.439C2.134 5.883 5.582 3 9.817 3c4.236 0 7.683 2.883 7.683 6.438 0 3.555-3.447 6.439-7.683 6.439zm.367-9.936c-.815 0-1.474.613-1.474 1.368 0 .755.66 1.368 1.474 1.368.815 0 1.474-.613 1.474-1.368 0-.755-.659-1.368-1.474-1.368zm4.246 0c-.816 0-1.475.613-1.475 1.368 0 .755.66 1.368 1.475 1.368.815 0 1.474-.613 1.474-1.368 0-.755-.659-1.368-1.474-1.368zm.734 5.464c0-2.492-2.598-4.515-5.8-4.515-3.201 0-5.8 2.023-5.8 4.515 0 2.492 2.599 4.514 5.8 4.514.683 0 1.342-.084 1.958-.238l1.788.919-.492-1.415c1.547-.89 2.546-2.248 2.546-3.78z"/>
    <path d="M18.133 21c3.497 0 6.333-2.214 6.333-4.944 0-2.73-2.836-4.944-6.333-4.944-3.498 0-6.333 2.214-6.333 4.944 0 2.73 2.835 4.944 6.333 4.944zm-2.998-6.708c-.57 0-1.032.43-1.032.96 0 .53.462.96 1.032.96.569 0 1.032-.43 1.032-.96 0-.53-.463-.96-1.032-.96zm4.245 0c-.57 0-1.032.43-1.032.96 0 .53.462.96 1.032.96.57 0 1.031-.43 1.031-.96 0-.53-.462-.96-1.031-.96z"/>
    <path d="M14.18 14.092c0-1.737 1.908-3.142 4.261-3.142 2.352 0 4.26 1.405 4.26 3.142 0 1.738-1.908 3.143-4.26 3.143-.503 0-.986-.058-1.44-.166l-1.316.64.362-.985c-1.137-.62-1.867-1.565-1.867-2.632z"/>
  </svg>
);

const ThemeToggle = () => {
  const { setTheme } = useTheme();

  return (
    <div className="flex items-center justify-center py-6">
      <div className="flex items-center rounded-full border border-dotted">
        <button
          onClick={() => setTheme("light")}
          className="bg-black mr-3 rounded-full p-2 text-white dark:bg-background dark:text-white"
        >
          <Sun className="h-5 w-5" strokeWidth={1} />
          <span className="sr-only">Light Mode</span>
        </button>

        <button type="button" onClick={handleScrollTop}>
          <ArrowUp className="h-3 w-3" />
          <span className="sr-only">Top</span>
        </button>

        <button
          onClick={() => setTheme("dark")}
          className="dark:bg-black ml-3 rounded-full p-2 text-black dark:text-white"
        >
          <Moon className="h-5 w-5" strokeWidth={1} />
          <span className="sr-only">Dark Mode</span>
        </button>
      </div>
    </div>
  );
};

const Underline = `hover:-translate-y-1 border border-dotted rounded-xl p-2.5 transition-transform `;

const navigation = {
  categories: [
    {
      id: "tedx",
      name: "TEDx",
      sections: [
        {
          id: "about",
          name: "About",
          items: [
            { name: "Home", href: "/" },
            { name: "Speakers", href: "/speakers" },
            { name: "Team", href: "/team" },
          ],
        },
        {
          id: "info",
          name: "Information",
          items: [
            { name: "About TEDx", href: "https://www.ted.com/about/programs-initiatives/tedx-program" },
            { name: "TED Talks", href: "https://www.ted.com/talks" },
            { name: "TEDx Events", href: "https://www.ted.com/tedx/events" },
          ],
        },
        {
          id: "resources",
          name: "Resources",
          items: [
            { name: "Contact", href: "/contact" },
            { name: "Event Info", href: "/contact" },
            { name: "Partners", href: "/contact" },
          ],
        },
        {
          id: "legal",
          name: "Legal",
          items: [
            { name: "Privacy Policy", href: "/contact" },
            { name: "Terms of Use", href: "/contact" },
            { name: "Cookie Policy", href: "/contact" },
          ],
        },
      ],
    },
  ],
};

export default function Footer() {
  return (
    <footer className="border-ali/20 w-full border-b border-t bg-white px-2 dark:bg-black">
      <div className="relative mx-auto grid max-w-7xl items-center justify-center gap-6 p-10 pb-0 md:flex">
        <Link href="/">
          <p className="flex items-center justify-center rounded-full">
            <span className="flex items-center gap-2 text-xl font-bold">
              <span className="text-2xl text-red-600 dark:text-red-500">TEDx</span>
              <span className="text-black dark:text-white">Beixinqiao</span>
            </span>
          </p>
        </Link>
        <p className="bg-transparent text-center text-xs leading-4 text-primary/60 md:text-left dark:text-gray-400">
          TEDxBeixinqiao is an independently organized TED event that brings together innovative thinkers, creative minds, 
          and thought leaders to share ideas worth spreading. Our events aim to inspire action, foster connections, and 
          drive positive change in our community and beyond. In the spirit of ideas worth spreading, TEDx is a program of 
          local, self-organized events that bring people together to share a TED-like experience.
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="border-b border-dotted"> </div>
        <div className="py-10">
          {navigation.categories.map((category) => (
            <div
              key={category.name}
              className="grid grid-cols-2 flex-row justify-between gap-6 leading-6 md:flex md:grid-cols-4"
            >
              {category.sections.map((section) => (
                <div key={section.name}>
                  <h3 className="font-semibold text-red-600 dark:text-red-500 mb-3">{section.name}</h3>
                  <ul
                    role="list"
                    aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                    className="flex flex-col space-y-2"
                  >
                    {section.items.map((item) => (
                      <li key={item.name} className="flow-root">
                        <Link
                          href={item.href}
                          className="text-sm text-slate-600 hover:text-black dark:text-slate-400 hover:dark:text-white md:text-xs"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="border-b border-dotted"> </div>
      </div>

      <div className="flex flex-wrap justify-center gap-y-6">
        <div className="flex flex-wrap items-center justify-center gap-6 gap-y-4 px-6">
          <Link
            aria-label="Email"
            href="mailto:Info@tedxbeixinqiao.com"
            rel="noreferrer"
            target="_blank"
            className={Underline}
          >
            <DIcons.Mail className="h-5 w-5" />
          </Link>
          <Link
            aria-label="Twitter"
            href="#"
            rel="noreferrer"
            target="_blank"
            className={Underline}
          >
            <DIcons.X className="h-5 w-5 text-[#1DA1F2]" />
          </Link>
          <Link
            aria-label="Instagram"
            href="#"
            rel="noreferrer"
            target="_blank"
            className={Underline}
          >
            <DIcons.Instagram className="h-5 w-5 text-[#E4405F]" />
          </Link>
          <Link
            aria-label="YouTube"
            href="#"
            rel="noreferrer"
            target="_blank"
            className={Underline}
          >
            <DIcons.YouTube className="h-5 w-5 text-[#FF0000]" />
          </Link>
          <Link
            aria-label="Facebook"
            href="#"
            rel="noreferrer"
            target="_blank"
            className={Underline}
          >
            <DIcons.Facebook className="h-5 w-5 text-[#1877F2]" />
          </Link>
          <Link
            aria-label="LinkedIn"
            href="#"
            rel="noreferrer"
            target="_blank"
            className={Underline}
          >
            <DIcons.LinkedIn className="h-5 w-5 text-[#0A66C2]" />
          </Link>
          <Link
            aria-label="Threads"
            href="#"
            rel="noreferrer"
            target="_blank"
            className={Underline}
          >
            <DIcons.Threads className="h-5 w-5 text-[#000000] dark:text-[#FFFFFF]" />
          </Link>
          <Link
            aria-label="WhatsApp"
            href="#"
            rel="noreferrer"
            target="_blank"
            className={Underline}
          >
            <DIcons.WhatsApp className="h-5 w-5 text-[#25D366]" />
          </Link>
          <Link
            aria-label="WeChat"
            href="#"
            rel="noreferrer"
            target="_blank"
            className={Underline}
          >
            <WeChatIcon className="h-5 w-5 text-[#07C160]" />
          </Link>
        </div>
        <ThemeToggle />
      </div>

      <div className="mx-auto mb-10 mt-10 flex flex-col justify-between text-center text-xs md:max-w-7xl">
        <div className="flex flex-row items-center justify-center gap-1 text-slate-600 dark:text-slate-400">
          <span> © </span>
          <span>{new Date().getFullYear()}</span>
          <span>TEDxBeixinqiao.</span>
          <span>Made with</span>
          <Heart className="text-red-600 mx-1 h-4 w-4 animate-pulse" />
          <span>All rights reserved.</span>
          <span>This independent TEDx event is operated under license from TED.</span>
        </div>
      </div>
    </footer>
  );
}
