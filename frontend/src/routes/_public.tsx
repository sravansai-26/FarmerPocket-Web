import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { auth } from "../lib/firebase";
import { Nav } from "../components/pocket/Nav";
import { Footer } from "../components/pocket/Footer";

export const Route = createFileRoute("/_public")({
  component: PublicLayout,
});

function PublicLayout() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
