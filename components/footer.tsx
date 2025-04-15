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
  className={className} 
  viewBox="0 0 512 512" 
  xmlns="http://www.w3.org/2000/svg"
  fill="currentColor"
>
  <path d="M407.3 337.2c-5.3 0-10.6.5-15.6 1.5-26.2-29.2-70.2-48.2-119.2-48.2-79.5 0-144 54.2-144 121 0 23.8 9 46 24.4 63.9-15.2 7.4-33 11.7-51.9 11.7-7.4 0-14.5-.5-21.5-1.5-2.6-.5-5.3.9-6.3 3.4-1 2.5.2 5.3 2.5 6.5 20.3 10.8 44.1 17.2 69.4 17.2 93.5 0 169.5-64.3 169.5-143.5 0-4.4-.3-8.8-.8-13.2 6.2-.8 12.6-1.3 19.1-1.3 60.5 0 109.5 38.3 109.5 85.4 0 19.3-8.4 37-23.1 50.8 2.3 6.2 4.3 12.6 5.8 19.2.7 3.1 3.3 5.1 6.4 5.1 1.2 0 2.4-.3 3.5-.9 25.1-13.2 42.2-39.5 42.2-70.1 0-50.3-51.2-91.2-114.3-91.2zM178.4 243.7c0-6.5 5.3-11.8 11.8-11.8s11.8 5.3 11.8 11.8-5.3 11.8-11.8 11.8-11.8-5.3-11.8-11.8zm65.1 11.8c-6.5 0-11.8-5.3-11.8-11.8s5.3-11.8 11.8-11.8 11.8 5.3 11.8 11.8-5.3 11.8-11.8 11.8zM256 64C150 64 64 139.6 64 233.5c0 48.7 26.4 92.5 68.2 121.1-3.2 11.7-9.5 24.1-20.6 35.2-2.5 2.5-1.3 6.9 2.1 8.1 14.5 5.2 30.2 7.9 45.9 7.9 6.4 0 12.8-.5 19.1-1.5 24.6 13.7 53.9 21.8 85.2 21.8 106 0 192-75.6 192-169.5S362 64 256 64zm-54.7 137.6c9.2 0 16.6 7.5 16.6 16.6s-7.5 16.6-16.6 16.6c-9.2 0-16.6-7.5-16.6-16.6s7.4-16.6 16.6-16.6zm109.4 33.1c-9.2 0-16.6-7.5-16.6-16.6s7.5-16.6 16.6-16.6 16.6 7.5 16.6 16.6-7.4 16.6-16.6 16.6z"/>
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
            href="https://x.com/TEDxBeixinqiao"
            rel="noreferrer"
            target="_blank"
            className={Underline}
          >
            <DIcons.X className="h-5 w-5 text-[#1DA1F2]" />
          </Link>
          <Link
            aria-label="Instagram"
            href="https://www.instagram.com/tedxbeixinqiao/?__d=1"
            rel="noreferrer"
            target="_blank"
            className={Underline}
          >
            <DIcons.Instagram className="h-5 w-5 text-[#E4405F]" />
          </Link>
          <Link
            aria-label="YouTube"
            href="https://www.youtube.com/watch?v=pHwQZ35obSM"
            rel="noreferrer"
            target="_blank"
            className={Underline}
          >
            <DIcons.YouTube className="h-5 w-5 text-[#FF0000]" />
          </Link>
          <Link
            aria-label="Facebook"
            href="https://www.facebook.com/people/Tedx-Beixinqiao/pfbid02iqkq73bKAphU1ECiyX7fk7gVT1RU3aVnduTFYkWkUJTkuVVLQ5dQ6pbXSfWaGBVUl/"
            rel="noreferrer"
            target="_blank"
            className={Underline}
          >
            <DIcons.Facebook className="h-5 w-5 text-[#1877F2]" />
          </Link>
          <Link
            aria-label="LinkedIn"
            href="https://www.linkedin.com/company/tedxbeixinqiao/posts/?feedView=all"
            rel="noreferrer"
            target="_blank"
            className={Underline}
          >
            <DIcons.LinkedIn className="h-5 w-5 text-[#0A66C2]" />
          </Link>
          <Link
            aria-label="Threads"
            href="https://www.threads.net/tedxbeixinqiao"
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
            href="https://weixin.qq.com/sph3EFAFKUDaYWo"
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
