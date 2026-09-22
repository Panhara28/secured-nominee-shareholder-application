"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type SearchableOption = { code: string; name: string };

// Lightweight searchable dropdown (no extra dependency) used for fields like
// Nationality that need a full option list with type-to-filter (item 28).
export default function SearchableSelect({
  id,
  value,
  onChange,
  onBlur,
  options,
  placeholder,
  className,
}: {
  id?: string;
  value: string;
  onChange: (code: string) => void;
  onBlur?: () => void;
  options: SearchableOption[];
  placeholder?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.code === value);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
        onBlur?.();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = query
    ? options.filter(
        (o) =>
          o.name.toLowerCase().includes(query.toLowerCase()) ||
          o.code.toLowerCase().includes(query.toLowerCase()),
      )
    : options;

  return (
    <div ref={containerRef} className="relative">
      <input
        id={id}
        type="text"
        value={open ? query : (selected?.name ?? "")}
        placeholder={placeholder}
        onFocus={() => {
          setOpen(true);
          setQuery("");
        }}
        onChange={(e) => setQuery(e.target.value)}
        className={className}
        autoComplete="off"
      />
      {open && (
        <div className="absolute z-20 mt-1 max-h-56 w-full overflow-auto rounded-lg border border-slate-200 bg-white shadow-lg">
          {filtered.length === 0 ? (
            <p className="px-3 py-2 text-sm text-slate-400">No matches</p>
          ) : (
            filtered.map((o) => (
              <button
                key={o.code}
                type="button"
                onClick={() => {
                  onChange(o.code);
                  setOpen(false);
                  setQuery("");
                  onBlur?.();
                }}
                className={cn(
                  "flex w-full items-center px-3 py-2 text-left text-sm hover:bg-blue-50",
                  o.code === value ? "bg-blue-50 text-blue-700 font-medium" : "text-slate-700",
                )}
              >
                {o.name}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
