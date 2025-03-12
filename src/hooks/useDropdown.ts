import { useState } from "react";

interface DropdownState {
  x: number;
  y: number;
  options: { label: string; onClick: () => void; icon?: React.ReactNode }[];
}

export function useDropdown() {
  const [dropdown, setDropdown] = useState<DropdownState | null>(null);

  const openDropdown = (
    event: React.MouseEvent,
    options: DropdownState["options"]
  ) => {
    event.stopPropagation(); // Prevents unwanted closing

    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setDropdown({
      x: rect.left,
      y: rect.bottom + window.scrollY,
      options,
    });
  };

  const closeDropdown = () => setDropdown(null);

  return { dropdown, openDropdown, closeDropdown };
}

