
import { useState, useEffect, useRef } from "react";

interface DropdownOption {
  label?: string; //  Made optional
  onClick: () => void;
  icon?: React.ReactNode;
}

interface DropdownState {
  x: number;
  y: number;
  options: DropdownOption[];
}

export function useDropdown() {
  const [dropdown, setDropdown] = useState<DropdownState | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const openDropdown = (event: React.MouseEvent, options: DropdownOption[]) => {
    event.stopPropagation(); // Prevent closing on click

    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setDropdown({
      x: rect.right + window.scrollX + 5,
      y: rect.top + window.scrollY,
      options,
    });
  };

  const closeDropdown = () => setDropdown(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    if (dropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdown]);

  return { dropdown, openDropdown, closeDropdown, dropdownRef };
}
