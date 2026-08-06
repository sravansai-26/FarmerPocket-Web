import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/api";
import { Map, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/app/add-farm")({
  head: () => ({
    meta: [{ title: "Add New Farm — FarmerPocket" }],
  }),
  component: AddFarmPage,
});

function AddFarmPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await api.post("/farms/", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["farms"] });
      navigate({ to: "/app/" });
    },
    onError: (err: any) => {
      setError(err?.response?.data?.detail || "Failed to add farm. Please try again.");
    }
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    mutation.mutate(data);
  };

  const fieldClass = "mt-2 w-full rounded-md border border-border bg-card px-4 py-3 text-[13.8px] text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none";

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header>
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
          <Map size={24} />
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Add New Farm</h1>
        <p className="mt-2 text-[15px] text-muted-foreground font-medium">
          Register your farm location to enable our Weather Oracle to automatically monitor and protect it.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6 bg-card border border-border rounded-xl p-6 shadow-[var(--shadow-quiet)]">
        {error && (
          <div className="p-3 bg-[var(--failure)]/10 border border-[var(--failure)]/20 text-[var(--failure)] rounded-md text-[13px] font-medium">
            {error}
          </div>
        )}

        <div>
          <label className="block">
            <span className="text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">Farm Name</span>
            <input required name="name" className={fieldClass} placeholder="e.g. Ancestral Plot 1" />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">Survey Number</span>
            <input name="survey_number" className={fieldClass} placeholder="Optional" />
          </label>
          <label className="block">
            <span className="text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">Village</span>
            <input required name="village" className={fieldClass} placeholder="e.g. Palakurthi" />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">Mandal</span>
            <input required name="mandal" className={fieldClass} placeholder="e.g. Palakurthi Mandal" />
          </label>
          <label className="block">
            <span className="text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">District</span>
            <input required name="district" className={fieldClass} placeholder="e.g. Jangaon" />
          </label>
        </div>

        <div>
          <label className="block">
            <span className="text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">State</span>
            <select required name="state" className={fieldClass} defaultValue="Telangana">
              <option value="Telangana">Telangana</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
            </select>
          </label>
        </div>

        <div className="pt-4 border-t border-border flex justify-end">
          <button 
            type="submit" 
            disabled={mutation.isPending}
            className="bg-primary text-primary-foreground px-5 py-2.5 rounded-md text-sm font-semibold shadow-sm hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {mutation.isPending ? "Registering..." : "Register Farm"} <ArrowRight size={16} />
          </button>
        </div>
      </form>
    </div>
  );
}
