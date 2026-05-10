"use client";
import { useEffect, useMemo, useRef, useState } from "react";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DOW = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function pad(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}
function toIso(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}
function fmtDisplay(iso: string) {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

type Props = {
  value: string;
  onChange: (iso: string) => void;
  min?: string;
  error?: boolean;
  placeholder?: string;
};

export default function CustomDatePicker({
  value,
  onChange,
  min,
  error,
  placeholder = "Select travel date",
}: Props) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const initial = useMemo(() => {
    if (value) return new Date(value + "T00:00:00");
    if (min) return new Date(min + "T00:00:00");
    return new Date();
  }, [value, min]);

  const [view, setView] = useState({
    y: initial.getFullYear(),
    m: initial.getMonth(),
  });

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

  const minDate = min ? startOfDay(new Date(min + "T00:00:00")) : null;
  const today = startOfDay(new Date());

  const firstDay = new Date(view.y, view.m, 1);
  const startDow = firstDay.getDay();
  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();

  const cells: (number | null)[] = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  function go(delta: number) {
    setView(({ y, m }) => {
      let nm = m + delta;
      let ny = y;
      if (nm < 0) {
        nm = 11;
        ny -= 1;
      } else if (nm > 11) {
        nm = 0;
        ny += 1;
      }
      return { y: ny, m: nm };
    });
  }

  return (
    <div ref={wrapRef} className="custom-date-wrap">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={`form-input custom-date-trigger ${error ? "error" : ""} ${
          !value ? "is-placeholder" : ""
        } ${open ? "is-open" : ""}`}
      >
        <span className="truncate">
          {value ? fmtDisplay(value) : placeholder}
        </span>
        <svg
          className="custom-date-icon"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      </button>

      {open && (
        <div className="custom-date-panel" role="dialog" aria-label="Choose date">
          <div className="custom-date-header">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous month"
              className="custom-date-nav"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <div className="custom-date-title">
              {MONTHS[view.m]} {view.y}
            </div>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next month"
              className="custom-date-nav"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          <div className="custom-date-dow">
            {DOW.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>

          <div className="custom-date-grid">
            {cells.map((d, i) => {
              if (d === null)
                return <span key={i} className="custom-date-cell is-empty" aria-hidden />;
              const cellDate = startOfDay(new Date(view.y, view.m, d));
              const iso = toIso(cellDate);
              const disabled = !!(minDate && cellDate < minDate);
              const isToday = cellDate.getTime() === today.getTime();
              const isSelected = iso === value;
              return (
                <button
                  key={i}
                  type="button"
                  disabled={disabled}
                  onClick={() => {
                    onChange(iso);
                    setOpen(false);
                  }}
                  aria-selected={isSelected}
                  aria-label={fmtDisplay(iso)}
                  className={`custom-date-cell ${disabled ? "is-disabled" : ""} ${
                    isToday ? "is-today" : ""
                  } ${isSelected ? "is-selected" : ""}`}
                >
                  {d}
                </button>
              );
            })}
          </div>

          <div className="custom-date-footer">
            <button
              type="button"
              className="custom-date-quick"
              onClick={() => {
                const t = startOfDay(new Date());
                if (minDate && t < minDate) return;
                const iso = toIso(t);
                onChange(iso);
                setOpen(false);
              }}
            >
              Today
            </button>
            {value && (
              <button
                type="button"
                className="custom-date-quick"
                onClick={() => {
                  onChange("");
                  setOpen(false);
                }}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
