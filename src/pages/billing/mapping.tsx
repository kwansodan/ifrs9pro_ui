import React, { useEffect, useMemo, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../core/stores";
import { useNavigate } from "react-router-dom";
import { CreatePortfolioIngestion } from "../../core/services/portfolio.service";
import { showToast } from "../../core/hooks/alert";
import { clearIngestionData } from "../../core/stores/slices/ingestion_slice";
import {
  buildFileMappings,
  inferType,
  validateRequiredMappingsFromPayload,
} from "../../data";
import { Slot } from "../../core/interfaces";
import PageLoader from "../../components/page_loader/_component";
import { Modal } from "../../components/modal/_component";

type Col = { id: string; label: string; mappedTo?: string | null };

const slotIdFromModel = (model: string) => `slot_${model}`;

const toFieldKey = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");

const FileTabs = ({
  files,
  activeId,
  mappedCount,
  onChange,
}: {
  files: { key: string; name: string }[];
  activeId: string | null;
  mappedCount: number;
  onChange: (id: string) => void;
}) => {
  return (
    <div className="flex flex-wrap gap-16 text-sm text-gray-700">
      {files.map((f) => {
        const active = f.key === activeId;
        return (
          <div key={f.key} className="min-w-[180px]">
            <div
              onClick={() => onChange(f.key)}
              className={`pb-1 cursor-pointer ${
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
              {active
                ? `${mappedCount}/${f ? (f?.name?.length ?? 0) : 0} mapped`
                : `0/${f ? (f?.name?.length ?? 0) : 0} mapped`}
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
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const ingestion = useSelector((state: RootState) => state.ingestion);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [perFileState, setPerFileState] = useState<
    Record<string, { left: Col[]; slots: Slot[] }>
  >({});

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
  );

  useEffect(() => {
    const uploaded = ingestion?.files ?? {};
    const keys = Object.keys(uploaded);
    if (keys.length === 0) return;

    setPerFileState((prev) => {
      const next = { ...prev };
      keys.forEach((key) => {
        const file = (uploaded as any)[key];
        if (!file) return;

        if (!next[key]) {
          next[key] = {
            left: (file.excel_columns || []).map((col: string) => ({
              id: col,
              label: col,
              mappedTo: null,
            })),
            slots: (file.model_columns || []).map((modelCol: string) => ({
              id: slotIdFromModel(modelCol),
              label: modelCol,
              fieldKey: toFieldKey(modelCol),
              mapped: null,
            })),
          };
        } else {
          next[key] = {
            left:
              next[key].left.length > 0
                ? next[key].left
                : (file.excel_columns || []).map((col: string) => ({
                    id: col,
                    label: col,
                    mappedTo: null,
                  })),
            slots:
              next[key].slots.length > 0
                ? next[key].slots
                : (file.model_columns || []).map((modelCol: string) => ({
                    id: slotIdFromModel(modelCol),
                    label: modelCol,
                    mapped: null,
                  })),
          };
        }
      });

      return next;
    });

    if (!activeFileId) {
      const firstKey = keys.find((k) => !!(uploaded as any)[k]);
      if (firstKey) setActiveFileId(firstKey);
    }
  }, [ingestion]);

  const currentFileState = activeFileId
    ? perFileState[activeFileId]
    : undefined;
  const left = currentFileState?.left ?? [];
  const slots = currentFileState?.slots ?? [];
  console.log("testing ex cols:", currentFileState);

  const mappedCount = useMemo(
    () => slots.filter((s) => !!s.mapped).length,
    [slots],
  );

  function onDragStart(e: any) {
    setActiveDragId(e.active?.id ?? null);
  }

  function clearSlot(slotId: string) {
    if (!activeFileId) return;

    setPerFileState((prev) => {
      const fileState = prev[activeFileId];
      if (!fileState) return prev;

      const slot = fileState.slots.find((s) => s.id === slotId);
      if (!slot || !slot.mapped) return prev;

      const mappedLabel = slot.mapped;

      const newSlots = fileState.slots.map((s) =>
        s.id === slotId ? { ...s, mapped: null } : s,
      );

      const newLeft = [
        ...fileState.left,
        {
          id: mappedLabel,
          label: mappedLabel,
          mappedTo: null,
        },
      ];

      return {
        ...prev,
        [activeFileId]: { left: newLeft, slots: newSlots },
      };
    });
  }

  useEffect(() => {
    const hasUnsavedChanges = slots.length > 0 && slots.some((s) => !s.mapped);

    const shouldBlockUnload = hasUnsavedChanges || isSubmitting;

    if (!shouldBlockUnload) return;

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [slots, isSubmitting]);

  function onDragEnd(event: any) {
    if (!activeFileId) {
      setActiveDragId(null);
      return;
    }

    const { active, over } = event;
    setActiveDragId(null);

    if (!active || !over) return;

    const draggedId = active.id as string;
    const dropTargetId = over.id as string;

    if (!dropTargetId.startsWith("slot_")) return;

    const fileState = perFileState[activeFileId];
    if (!fileState) return;

    const draggedLabel =
      fileState.left.find((c) => c.id === draggedId)?.label ?? "";

    const targetSlot = fileState.slots.find((s) => s.id === dropTargetId);
    const expectedLabel = targetSlot?.label ?? "";

    if (!draggedLabel || !expectedLabel) return;

    const draggedType = inferType(draggedLabel);
    const expectedType = inferType(expectedLabel);

    if (draggedType !== expectedType) {
      showToast(
        `Invalid mapping: "${draggedLabel}" (type ${draggedType}) cannot map to "${expectedLabel}" (type ${expectedType})`,
        false,
      );
      return;
    }

    setPerFileState((prev) => {
      const fs = prev[activeFileId];
      if (!fs) return prev;

      const newLeft = fs.left.filter((col) => col.id !== draggedId);

      const newSlots = fs.slots.map((slot) => {
        if (slot.id === dropTargetId) {
          const prevMapped = slot.mapped;

          if (prevMapped) {
            newLeft.push({
              id: prevMapped,
              label: prevMapped,
              mappedTo: null,
            });
          }

          return { ...slot, mapped: draggedLabel };
        }
        return slot;
      });

      return {
        ...prev,
        [activeFileId]: { left: newLeft, slots: newSlots },
      };
    });
  }

  const ingestionFilesList = useMemo(() => {
    const uploaded = ingestion?.files ?? {};

    return Object.keys(uploaded)
      .filter((k) => !!(uploaded as any)[k])
      .map((key) => {
        const obj = (uploaded as any)[key];
        const objectName: string = obj?.object_name ?? "";

        let fileName = objectName ? (objectName.split("/").pop() ?? "") : key;

        if (fileName.includes("_")) {
          const parts = fileName.split("_");
          if (parts[0].length >= 8 && parts[0].includes("-")) {
            parts.shift();
            fileName = parts.join("_");
          }
        }

        return {
          key,
          name: fileName,
        };
      });
  }, [ingestion]);

  const handleFinalSubmit = () => {
    if (!ingestion.portfolioId) return;

    const fileEntries = buildFileMappings(perFileState, ingestion.files);
    const validationErrors = validateRequiredMappingsFromPayload(fileEntries);

    if (validationErrors.length > 0) {
      showToast(validationErrors.join(" | "), false);
      return;
    }

    setIsSubmitting(true);

    CreatePortfolioIngestion(ingestion.portfolioId, { files: fileEntries })
      .then(() => {
        dispatch(clearIngestionData());
        navigate(`/dashboard/portfolio-details/${ingestion.portfolioId}`);
        showToast(
          "Ingestion started successfully. You will receive an email notification when it is complete.",
          true,
        );
      })
      .catch((err) => {
        showToast(err?.response?.data?.detail || "Ingestion failed", false);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleTabChange = (key: string) => {
    setActiveFileId(key);
  };

  const isConfirmDisabled = isSubmitting || !activeFileId;

  return (
    <>
      <Modal
        showClose={true}
        open={isSubmitting}
        modalHeader="Operation ongoing"
      >
        <div className="flex flex-col items-center justify-center p-8 bg-white">
          <PageLoader />
          <small className="mt-2 text-[#F7941E]">This may take a while.</small>
          <small className="text-center text-[#F7941E]">
            Ingestion is being initialized. Please do not close, refresh, or
            navigate away from this page.
          </small>
        </div>
      </Modal>

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
                files={ingestionFilesList}
                activeId={activeFileId}
                mappedCount={mappedCount}
                onChange={handleTabChange}
              />
            </div>

            <DndContext
              sensors={sensors}
              onDragStart={onDragStart}
              onDragOver={() => {}}
              onDragEnd={onDragEnd}
              collisionDetection={rectIntersection}
            >
              <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
                <div className="p-4 border-[2px] border-[#AFAFAF] rounded-xl h-[520px] overflow-y-auto">
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

                <div className="p-4 border-[2px] border-[#AFAFAF] rounded-xl h-[520px] overflow-y-auto">
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
                document.body,
              )}
            </DndContext>

            <div className="flex items-center justify-end gap-2 px-6 py-4 border-t">
              <Button
                text="Cancel"
                className="w-1/12 text-gray-700 bg-white border border-gray-300"
                onClick={() => {
                  dispatch(clearIngestionData());
                  navigate(-1);
                }}
              />
              <Button
                text="Confirm mapping"
                className="bg-[#166E94] w-2/12 text-white"
                onClick={handleFinalSubmit}
                isLoading={isSubmitting}
                disabled={isConfirmDisabled}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ColumnMappingPage;
