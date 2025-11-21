import React, { useMemo, useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useDroppable,
  useDraggable,
  useSensor,
  useSensors,
  rectIntersection,
} from "@dnd-kit/core";
import { createPortal } from "react-dom";
import Button from "../../components/button/_component";

type Col = { id: string; label: string; mappedTo?: string | null };
type Slot = { id: string; label: string; mapped?: string | null };

const files = [
  { id: "loan_details", name: "loan_details.xls" },
  { id: "loan_guarantee", name: "loan_guarantee_data.xls" },
  { id: "loan_collateral", name: "loan_collateral_data.xls" },
  { id: "historical_payments", name: "Historical_payments.xls" },
];

const FileTabs = ({
  activeId,
  mappedCount,
  total,
}: {
  activeId: string;
  mappedCount: number;
  total: number;
}) => {
  return (
    <div className="flex flex-wrap gap-16 text-sm text-gray-700">
      {files.map((f) => {
        const active = f.id === activeId;
        return (
          <div key={f.id} className="min-w-[180px]">
            <div
              className={`pb-1 ${
                active ? "text-[#166E94] font-medium" : "text-gray-600"
              }`}
            >
              {f.name}
            </div>
            <div
              className={`h-[2px] rounded ${
                active ? "bg-[#166E94]" : "bg-gray-200"
              }`}
            />
            <div className="text-[11px] text-gray-400 mt-1">
              {active ? `${mappedCount}/${total} mapped` : `0/${total} mapped`}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const LeftItem = ({
  id,
  label,
  disabled,
}: {
  id: string;
  label: string;
  disabled?: boolean;
}) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    disabled,
  });

  return (
    <div
      ref={setNodeRef}
      {...(!disabled ? listeners : {})}
      {...(!disabled ? attributes : {})}
      className={`flex items-center justify-between px-3 py-2 mb-3 rounded-md border bg-white text-sm select-none ${
        disabled
          ? "opacity-60 cursor-not-allowed"
          : "cursor-grab active:cursor-grabbing hover:bg-gray-50"
      } ${isDragging ? "opacity-60 cursor-grabbing" : ""}`}
    >
      <span className="text-gray-700">{label}</span>
      {disabled && <span className="text-[12px] text-green-600">Mapped</span>}
    </div>
  );
};

const SlotRow = ({
  id,
  label,
  assigned,
  onClear,
  isActive,
}: {
  id: string;
  label: string;
  assigned?: string | null;
  onClear: () => void;
  isActive?: boolean;
}) => {
  const { setNodeRef, isOver } = useDroppable({ id });
  const active = isOver || isActive;

  return (
    <div
      ref={setNodeRef}
      className={`flex items-center justify-between px-3 py-3 mb-3 rounded-md border text-sm transition-colors
        ${
          active
            ? "bg-[#E6F4F8] border-[#166E94] border-dashed"
            : "bg-white border-dashed border-gray-300"
        }`}
    >
      <div className="text-gray-700">
        {assigned ? (
          <div className="px-3 py-[6px] bg-white border rounded-md shadow-[0_1px_0_rgba(0,0,0,0.02)]">
            {assigned}
          </div>
        ) : (
          <div className="text-gray-400">{label} — Drop column here</div>
        )}
      </div>

      {assigned && (
        <button
          onClick={onClear}
          className="ml-3 text-sm text-gray-400 hover:text-red-500"
          aria-label="Clear mapping"
          type="button"
        >
          ✕
        </button>
      )}
    </div>
  );
};

const ColumnMappingPage: React.FC = () => {
  const [activeFileId] = useState("loan_details");
  const [activeDragId, setActiveDragId] = useState<string | null>(null);

  const [left, setLeft] = useState<Col[]>([
    { id: "customer_id", label: "Customer ID", mappedTo: null },
    { id: "birth_date", label: "Birth Date", mappedTo: null },
    { id: "loan_amount", label: "Loan Amount", mappedTo: null },
    { id: "interest_rate", label: "Interest rate", mappedTo: null },
    { id: "duration", label: "Duration", mappedTo: null },
  ]);

  const [slots, setSlots] = useState<Slot[]>([
    { id: "slot_customer_id", label: "Customer ID", mapped: null },
    { id: "slot_dob", label: "Date of birth", mapped: null },
    { id: "slot_amt", label: "Loan Amount", mapped: null },
    { id: "slot_rate", label: "Interest Rate", mapped: null },
    { id: "slot_duration", label: "Loan Duration", mapped: null },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } })
  );

  const mappedCount = useMemo(
    () => slots.filter((s) => !!s.mapped).length,
    [slots]
  );

  function onDragStart(e: any) {
    setActiveDragId(e.active?.id ?? null);
  }

  function clearSlot(slotId: string) {
    const mappedLabel = slots.find((s) => s.id === slotId)?.mapped;
    setSlots((prev) =>
      prev.map((s) => (s.id === slotId ? { ...s, mapped: null } : s))
    );
    if (mappedLabel) {
      setLeft((prev) =>
        prev.map((c) =>
          c.label === mappedLabel ? { ...c, mappedTo: null } : c
        )
      );
    }
  }

  return (
    <div className="min-h-screen px-4 py-8 bg-white sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="overflow-hidden border shadow-sm rounded-2xl">
          <div className="px-6 pt-5 pb-4 border-b bg-gray-50">
            <div className="text-[15px] font-medium text-gray-800">
              Map columns
            </div>
            <div className="mt-1 text-sm text-gray-500">
              Drag columns from the left to match them with the right fields.
            </div>
          </div>
          <div className="px-6 mt-4">
            <FileTabs
              activeId={activeFileId}
              mappedCount={mappedCount}
              total={slots.length}
            />
          </div>
          <DndContext
            sensors={sensors}
            onDragStart={onDragStart}
            onDragOver={() => {}}
            onDragEnd={(event) => {
              const { active, over } = event;
              setActiveDragId(null);

              if (!active || !over) return;

              const draggedId = active.id as string;
              const dropTargetId = over.id as string;

              if (!dropTargetId.startsWith("slot_")) return;

              const draggedLabel =
                left.find((c) => c.id === draggedId)?.label ?? "";
              if (!draggedLabel) return;

              setSlots((prev) =>
                prev.map((slot) => {
                  if (slot.id === dropTargetId) {
                    // Find if this slot already had a mapped column
                    const previouslyMapped = slot.mapped;

                    // If previously mapped, clear its mappedTo flag from left list
                    if (previouslyMapped) {
                      setLeft((prevLeft) =>
                        prevLeft.map((c) =>
                          c.label === previouslyMapped
                            ? { ...c, mappedTo: null }
                            : c
                        )
                      );
                    }

                    // Update the slot with the new mapped label
                    return { ...slot, mapped: draggedLabel };
                  }
                  return slot;
                })
              );

              // Mark dragged column as mapped
              setLeft((prev) =>
                prev.map((col) =>
                  col.id === draggedId
                    ? { ...col, mappedTo: dropTargetId }
                    : col
                )
              );
            }}
            collisionDetection={rectIntersection}
          >
            <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
              <div className="p-4 border-[2px] border-[#AFAFAF] rounded-xl h-[320px]">
                <div className="mb-3 text-sm font-medium text-gray-700">
                  Your columns
                </div>
                <div className="min-h-[320px]">
                  {left.map((c) => (
                    <LeftItem
                      key={c.id}
                      id={c.id}
                      label={c.label}
                      disabled={!!c.mappedTo}
                    />
                  ))}
                </div>
              </div>

              <div className="p-4 border-[2px] border-[#AFAFAF] rounded-xl">
                <div className="mb-3 text-sm font-medium text-gray-700">
                  Expected columns
                </div>
                <div className="min-h-[320px]">
                  {slots.map((s) => (
                    <SlotRow
                      key={s.id}
                      id={s.id}
                      label={s.label}
                      assigned={s.mapped}
                      isActive={false}
                      onClear={() => clearSlot(s.id)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {createPortal(
              <DragOverlay>
                {activeDragId ? (
                  <div className="px-3 py-2 text-sm bg-white border rounded-md shadow-lg">
                    {left.find((c) => c.id === activeDragId)?.label}
                  </div>
                ) : null}
              </DragOverlay>,
              document.body
            )}
          </DndContext>
          <div className="flex items-center justify-end gap-2 px-6 py-4 border-t">
            <Button
              text="Cancel"
              className="w-1/12 text-gray-700 bg-white border border-gray-300"
            />
            <Button
              text="Confirm mapping"
              className="bg-[#166E94] w-2/12 text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColumnMappingPage;
