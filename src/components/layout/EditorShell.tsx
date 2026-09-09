import { Sidebar } from "@/components/sidebar/Sidebar";
import { PresentationCanvas } from "@/components/canvas/PresentationCanvas";
import { PageRegistryProvider } from "@/context/PageRegistryContext";

export function EditorShell() {
  return (
    <PageRegistryProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-white-off">
        <aside className="w-[20%] min-w-70 max-w-90 border-r border-grey-200 bg-white-true overflow-y-auto">
          <Sidebar />
        </aside>
        <main className="flex-1 overflow-y-auto">
          <PresentationCanvas />
        </main>
      </div>
    </PageRegistryProvider>
  );
}
