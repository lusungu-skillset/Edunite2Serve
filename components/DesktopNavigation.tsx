"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, type KeyboardEvent, type ReactNode } from "react";
import { navigationItems, type NavigationItem } from "@/data/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

function submenuId(path: string) {
  return `desktop-submenu-${path.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}

export default function DesktopNavigation() {
  const pathname = usePathname();
  const [openPaths, setOpenPaths] = useState<string[]>([]);
  const closeTimers = useRef<Record<string, NodeJS.Timeout>>({});

  function clearCloseTimer(path: string) {
    if (closeTimers.current[path]) {
      clearTimeout(closeTimers.current[path]);
      delete closeTimers.current[path];
    }
  }

  function handleMouseEnter(path: string) {
    // Clear any pending close timer for this path and its ancestors
    clearCloseTimer(path);
    const parts = path.split("/");
    let accum = "";
    for (const part of parts) {
      accum = accum ? `${accum}/${part}` : part;
      clearCloseTimer(accum);
    }

    setOpenPaths((current) => {
      // Keep ancestors open as well
      const ancestorPaths: string[] = [];
      let prefix = "";
      for (const part of parts) {
        prefix = prefix ? `${prefix}/${part}` : part;
        ancestorPaths.push(prefix);
      }
      return Array.from(new Set([...current, ...ancestorPaths]));
    });
  }

  function handleMouseLeave(path: string) {
    clearCloseTimer(path);
    // Grace period of 180ms prevents accidental escape when moving cursor between trigger and menu
    closeTimers.current[path] = setTimeout(() => {
      setOpenPaths((current) =>
        current.filter((openPath) => openPath !== path && !openPath.startsWith(`${path}/`))
      );
      delete closeTimers.current[path];
    }, 180);
  }

  function togglePath(path: string) {
    clearCloseTimer(path);
    setOpenPaths((current) =>
      current.includes(path)
        ? current.filter((openPath) => openPath !== path && !openPath.startsWith(`${path}/`))
        : [...current.filter((openPath) => !openPath.startsWith(`${path}/`)), path],
    );
  }

  function closeAll() {
    Object.values(closeTimers.current).forEach(clearTimeout);
    closeTimers.current = {};
    setOpenPaths([]);
  }

  function renderItems(items: NavigationItem[], parentPath = ""): ReactNode {
    return items.map((item) => {
      const path = parentPath ? `${parentPath}/${item.label}` : item.label;
      const hasChildren = Boolean(item.children?.length);
      const isOpen = openPaths.includes(path);
      const id = submenuId(path);
      const isTopLevel = !parentPath;
      const isActive = pathname === item.href;

      return (
        <li
          className="relative group"
          key={path}
          onMouseEnter={() => hasChildren && handleMouseEnter(path)}
          onMouseLeave={() => hasChildren && handleMouseLeave(path)}
          onKeyDown={(event: KeyboardEvent<HTMLLIElement>) => {
            if (event.key === "Escape" && isOpen) {
              event.preventDefault();
              event.stopPropagation();
              handleMouseLeave(path);
              event.currentTarget
                .querySelector<HTMLButtonElement>("[data-submenu-trigger]")
                ?.focus();
            }
          }}
        >
          <div
            className={cn(
              "flex items-center transition-colors",
              isTopLevel
                ? "min-h-12 gap-1 rounded-lg px-2"
                : "min-h-10 justify-between rounded-md px-3 py-1.5 hover:bg-[#f0f4ea]"
            )}
          >
            <Link
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              onClick={() => {
                if (!hasChildren) {
                  closeAll();
                }
              }}
              className={cn(
                "inline-flex items-center whitespace-nowrap font-brand font-bold transition-colors focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-brand-orange",
                isTopLevel
                  ? "text-base text-[#2D3F12] hover:text-[#506722]"
                  : "text-sm text-brand-ink hover:text-brand-green",
                isActive && isTopLevel && "text-brand-green font-extrabold"
              )}
            >
              {item.label}
            </Link>
            {hasChildren ? (
              <button
                className={cn(
                  "grid place-items-center border-0 bg-transparent text-[#2D3F12] transition-colors hover:text-[#506722] focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-brand-orange cursor-pointer",
                  isTopLevel ? "h-9 w-6" : "h-6 w-6 ml-2"
                )}
                type="button"
                aria-label={`${isOpen ? "Close" : "Open"} ${item.label} submenu`}
                aria-expanded={isOpen}
                aria-controls={id}
                data-submenu-trigger
                onClick={() => togglePath(path)}
              >
                {isTopLevel ? (
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      isOpen && "rotate-180"
                    )}
                    aria-hidden="true"
                  />
                ) : (
                  <ChevronRight
                    className={cn(
                      "h-3.5 w-3.5 transition-transform duration-200",
                      isOpen && "translate-x-0.5"
                    )}
                    aria-hidden="true"
                  />
                )}
              </button>
            ) : null}
          </div>

          {hasChildren ? (
            <div
              className={cn(
                "z-40 min-w-[230px]",
                isTopLevel
                  ? "absolute left-0 top-full pt-1.5"
                  : "absolute left-full top-0 pl-1.5",
                isOpen ? "block" : "hidden"
              )}
              onMouseEnter={() => handleMouseEnter(path)}
              onMouseLeave={() => handleMouseLeave(path)}
            >
              {/* Invisible hover bridge pseudo-element ensuring cursor never crosses a dead zone */}
              <div
                className={cn(
                  "absolute pointer-events-auto",
                  isTopLevel
                    ? "-top-2 inset-x-0 h-4"
                    : "-left-2 inset-y-0 w-4"
                )}
                aria-hidden="true"
              />

              <ul
                className="list-none rounded-xl border border-border/80 bg-white p-2 shadow-xl ring-1 ring-black/5 animate-in fade-in-0 zoom-in-95 duration-150 m-0"
                id={id}
              >
                {renderItems(item.children ?? [], path)}
              </ul>
            </div>
          ) : null}
        </li>
      );
    });
  }

  return (
    <nav className="min-w-0 flex-1 max-[1180px]:hidden" aria-label="Main navigation">
      <ul className="m-0 flex list-none items-center justify-end gap-[clamp(8px,1.4vw,20px)] p-0">
        {renderItems(navigationItems)}
      </ul>
    </nav>
  );
}
