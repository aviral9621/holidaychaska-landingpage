"use client";
import { useEffect, useRef, useState, useId } from "react";
import { CheckIcon } from "./Icons";

export type SelectOption = { value: string; label: string; hint?: string };

type Props = {
  value: string;
  onChange: (v: string) => void;
  options: SelectOption[];
  placeholder?: string;
  error?: boolean;
  ariaLabel?: string;
};

export default function CustomSelect({
  value,
  onChange,
  options,
  placeholder = "Select an option",
  error,
  ariaLabel,
}: Props) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={wrapRef} className="custom-select-wrap">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-label={ariaLabel}
        className={`form-input custom-select-trigger ${error ? "error" : ""} ${
          !selected ? "is-placeholder" : ""
        } ${open ? "is-open" : ""}`}
      >
        <span className="truncate">{selected ? selected.label : placeholder}</span>
        <svg
          className="custom-select-chev"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <ul
          id={listboxId}
          role="listbox"
          className="custom-select-panel"
          aria-label={ariaLabel ?? "Options"}
        >
          {options.map((opt) => {
            const isSel = opt.value === value;
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={isSel}
                tabIndex={0}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onChange(opt.value);
                    setOpen(false);
                  }
                }}
                className={`custom-select-option ${isSel ? "is-selected" : ""} ${
                  opt.hint ? "has-hint" : ""
                }`}
              >
                <span className="custom-select-option-text">
                  <span className="custom-select-option-label">{opt.label}</span>
                  {opt.hint && (
                    <span className="custom-select-option-hint">{opt.hint}</span>
                  )}
                </span>
                {isSel && (
                  <CheckIcon
                    width={14}
                    height={14}
                    className="text-[var(--color-gold)] flex-shrink-0"
                  />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
