"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, X } from "lucide-react";
import { ColorEntry } from "@/types/project";

interface SortableColorItemProps {
  color: ColorEntry;
  index: number;
  onUpdate: (id: string, hex: string) => void;
  onRemove: (id: string) => void;
}

// Rótulo apenas ilustrativo — não é armazenado, é derivado da posição em tempo real
const HIERARCHY_LABELS = ["Dominante", "Secundária", "Suporte"];

export function SortableColorItem({
  color,
  index,
  onUpdate,
  onRemove,
}: SortableColorItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: color.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const label =
    HIERARCHY_LABELS[index] ?? (index === 0 ? "Dominante" : "Accent");

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 rounded-md border border-grey-200 bg-white-true px-2 py-2 "
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab touch-none text-grey-400 hover:text-grey-600"
        aria-label="Reordenar"
      >
        <GripVertical size={14} />
      </button>

      <input
        type="color"
        value={color.hex}
        onChange={(e) => onUpdate(color.id, e.target.value)}
        className="w-10 shrink-0 cursor-pointer rounded-full"
      />

      <div className="flex flex-1 flex-col">
        <input
          type="text"
          value={color.hex}
          onChange={(e) => onUpdate(color.id, e.target.value)}
          className="w-full bg-transparent text-xs font-mono uppercase outline-none"
        />
        <span className="text-[10px] text-grey-400">{label}</span>
      </div>

      <button
        onClick={() => onRemove(color.id)}
        className="text-grey-400 hover:text-bubblegum-600 cursor-pointer"
        aria-label="Remover cor"
      >
        <X size={14} />
      </button>
    </div>
  );
}
