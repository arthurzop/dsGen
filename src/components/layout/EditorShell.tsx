import { Sidebar } from "@/components/sidebar/Sidebar";
import { PresentationCanvas } from "@/components/canvas/PresentationCanvas";
import { ExportMenu } from "@/components/canvas/ExportMenu";
import { PageRegistryProvider } from "@/context/PageRegistryContext";

export function EditorShell() {
  return (
    <PageRegistryProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-white-off">
        <aside className="w-[20%] min-w-70 max-w-90 overflow-y-auto overflow-x-hidden border-r border-grey-200/50 bg-white-off p-3">
          <Sidebar />
        </aside>
        <main
          className="relative flex-1 overflow-y-auto"
          style={{
            backgroundColor: "var(--color-white-off)",
            backgroundImage:
              "radial-gradient(circle, var(--color-grey-200) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        >
          <ExportMenu />
          <PresentationCanvas />
        </main>
      </div>
    </PageRegistryProvider>
  );
}
