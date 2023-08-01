import { VisualGrid } from "./components/VisualGrid/VisualGrid.tsx";
import { Sidebar } from "./components/sidebar/Sidebar.tsx";
import { useEffect } from "react";
import { useTemporalStore } from "./store/store.ts";

export function App() {
  const { undo, redo } = useTemporalStore((state) => ({
    undo: state.undo,
    redo: state.redo,
  }));

  useEffect(() => {
    function handleUndoRedo(e: KeyboardEvent) {
      if (e.key === "z" && (e.metaKey || e.ctrlKey)) {
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
      }
    }

    document.addEventListener("keydown", handleUndoRedo);

    return () => {
      document.removeEventListener("keydown", handleUndoRedo);
    };
  }, [redo, undo]);

  return (
    <>
      <div className="app__container">
        <Sidebar />

        <div className={"visual-grid__container"}>
          <VisualGrid />
        </div>
      </div>
    </>
  );
}
