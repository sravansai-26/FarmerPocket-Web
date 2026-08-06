import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/documents/")({
  component: DocumentsPage,
});

function DocumentsPage() {
  return <div>Documents coming soon</div>;
}
