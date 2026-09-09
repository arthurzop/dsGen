"use client";

import { Plus, X } from "lucide-react";
import { useProjectStore } from "@/store/useProjectStore";
import {
  TEMPLATE_LABELS,
  TEMPLATE_REGISTRY,
} from "@/lib/applications/templateRegistry";
import { ApplicationTemplateId } from "@/types/project";

const AVAILABLE_TEMPLATES = Object.keys(
  TEMPLATE_REGISTRY,
) as ApplicationTemplateId[];

export function ApplicationsSidebarSection() {
  const applications = useProjectStore((s) => s.project.applications);
  const addApplication = useProjectStore((s) => s.addApplication);
  const removeApplication = useProjectStore((s) => s.removeApplication);

  return (
    <section className="flex flex-col gap-3">
      <span className="text-xs font-medium uppercase tracking-wide text-grey-500">
        Applications
      </span>

      {applications.map((app) => (
        <div
          key={app.id}
          className="flex items-center justify-between rounded-md border border-grey-200 px-3 py-2 text-sm"
        >
          <span>{TEMPLATE_LABELS[app.templateId]}</span>
          <button
            onClick={() => removeApplication(app.id)}
            className="text-grey-400 hover:text-bubblegum-600"
          >
            <X size={14} />
          </button>
        </div>
      ))}

      <div className="flex flex-wrap gap-2">
        {AVAILABLE_TEMPLATES.map((templateId) => {
          const implemented = TEMPLATE_REGISTRY[templateId] !== null;
          return (
            <button
              key={templateId}
              disabled={!implemented}
              onClick={() => addApplication(templateId)}
              className="flex items-center gap-1 rounded-md border border-dashed border-grey-300 px-2 py-1 text-xs text-grey-500 hover:border-tiger-500 hover:text-tiger-500 disabled:cursor-not-allowed disabled:opacity-40"
              title={implemented ? undefined : "Em breve"}
            >
              <Plus size={12} /> {TEMPLATE_LABELS[templateId]}
            </button>
          );
        })}
      </div>
    </section>
  );
}
