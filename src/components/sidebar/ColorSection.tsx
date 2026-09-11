"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  restrictToVerticalAxis,
  restrictToParentElement,
} from "@dnd-kit/modifiers";
import { Plus } from "lucide-react";
import { useProjectStore } from "@/store/useProjectStore";
import { SortableColorItem } from "./SortableColorItem";

export function ColorSection() {
  const palette = useProjectStore((s) => s.project.brandCore.colors.palette);
  const addColor = useProjectStore((s) => s.addColor);
  const removeColor = useProjectStore((s) => s.removeColor);
  const updateColor = useProjectStore((s) => s.updateColor);
  const reorderColors = useProjectStore((s) => s.reorderColors);

  const [newColorHex, setNewColorHex] = useState("#F5642F");

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const fromIndex = palette.findIndex((c) => c.id === active.id);
    const toIndex = palette.findIndex((c) => c.id === over.id);
    if (fromIndex === -1 || toIndex === -1) return;

    reorderColors(fromIndex, toIndex);
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-grey-400">{palette.length} Colors</span>
      </div>

      {palette.length === 0 && (
        <p className="text-xs text-grey-400">
          Adicione cores. A ordem define a hierarquia visual.
        </p>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis, restrictToParentElement]}
      >
        <SortableContext
          items={palette.map((c) => c.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col gap-2">
            {palette.map((color, index) => (
              <SortableColorItem
                key={color.id}
                color={color}
                index={index}
                onUpdate={updateColor}
                onRemove={removeColor}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <div className="flex items-center gap-2">
        <input
          type="color"
          value={newColorHex}
          onChange={(e) => setNewColorHex(e.target.value)}
          className="h-8 w-8 cursor-pointer rounded border border-grey-200 p-0"
        />
        <button
          onClick={() => addColor(newColorHex)}
          className="flex flex-1 items-center justify-center gap-1 rounded-md border border-dashed border-grey-300 py-2 text-xs text-grey-500 hover:border-tiger-500 hover:text-tiger-500"
        >
          <Plus size={14} /> Adicionar cor
        </button>
      </div>
    </>
  );
}
