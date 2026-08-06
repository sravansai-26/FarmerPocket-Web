import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "../../../lib/auth";
import { useState, useEffect, useRef } from "react";
import { Camera, Save, Shield, Bell, User as UserIcon, Trash2, Key, Loader2, CheckCircle2 } from "lucide-react";
import { api } from "../../../lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { sendPasswordResetEmail, deleteUser, updateProfile as updateAuthProfile } from "firebase/auth";
import { auth, storage } from "../../../lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import clsx from "clsx";

export const Route = createFileRoute("/app/settings/")({
  component: SettingsPage,
});

function SettingsPage() {
  const { user, logout } = useAuth();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<"profile" | "security" | "notifications">("profile");
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const { data: profile } = useQuery({
    queryKey: ["farmerProfile"],
    queryFn: async () => {
      const res = await api.get("/farmers/me");
      return res.data;
    }
  });

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (profile) {
      setName(profile.full_name || user?.name || "");
      setPhone(profile.phone || "");
    }
  }, [profile, user]);

  const updateProfile = useMutation({
    mutationFn: async (data: { full_name: string; phone: string }) => {
      const res = await api.patch("/farmers/me", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["farmerProfile"] });
      showSuccess("Profile updated successfully!");
    },
    onError: (err: any) => {
      setErrorMsg(err?.response?.data?.detail || "Failed to update profile.");
    }
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile.mutate({ full_name: name, phone: phone });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !auth.currentUser) return;
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg("File size must be less than 5MB");
      return;
    }

    try {
      setIsUploading(true);
      setErrorMsg("");
      
      const formData = new FormData();
      formData.append("file", file);
      
      const res = await api.post("/farmers/me/photo", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      
      const url = res.data.url;
      
      await updateAuthProfile(auth.currentUser, { photoURL: url });
      
      // Force reload to update user state across the app
      window.location.reload();
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to upload profile picture");
    } finally {
      setIsUploading(false);
    }
  };

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  const handlePasswordReset = async () => {
    if (!user?.email) return;
    try {
      await sendPasswordResetEmail(auth, user.email);
      showSuccess("Password reset email sent! Check your inbox.");
    } catch (e: any) {
      setErrorMsg(e.message);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure? This action cannot be undone.")) return;
    try {
      await api.delete("/farmers/me");
      logout();
    } catch (e: any) {
      setErrorMsg(e?.response?.data?.detail || e.message || "Failed to delete account");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
        <p className="mt-2 text-[13px] text-muted-foreground">
          Manage your account preferences, security, and notification settings.
        </p>
      </header>

      {successMsg && (
        <div className="bg-[var(--success-soft)] text-[var(--success)] px-4 py-3 rounded-md text-sm font-medium flex items-center gap-2">
          <CheckCircle2 size={16} /> {successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="bg-[var(--failure)]/10 text-[var(--failure)] px-4 py-3 rounded-md text-sm font-medium">
          {errorMsg}
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-8">
        {/* Settings Sidebar */}
        <nav className="w-full md:w-64 flex flex-col gap-1 shrink-0">
          <button 
            onClick={() => setActiveTab("profile")}
            className={clsx(
              "flex items-center gap-3 rounded-md px-3 py-2 text-[14px] font-medium transition-colors",
              activeTab === "profile" ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
            )}
          >
            <UserIcon size={16} /> Profile
          </button>
          <button 
            onClick={() => setActiveTab("security")}
            className={clsx(
              "flex items-center gap-3 rounded-md px-3 py-2 text-[14px] font-medium transition-colors",
              activeTab === "security" ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
            )}
          >
            <Shield size={16} /> Security
          </button>
          <button 
            onClick={() => setActiveTab("notifications")}
            className={clsx(
              "flex items-center gap-3 rounded-md px-3 py-2 text-[14px] font-medium transition-colors",
              activeTab === "notifications" ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
            )}
          >
            <Bell size={16} /> Notifications
          </button>
        </nav>

        {/* Main Settings Content */}
        <div className="flex-1 space-y-6">
          
          {activeTab === "profile" && (
            <section className="rounded-xl border border-border bg-card shadow-[var(--shadow-quiet)] overflow-hidden animate-in fade-in">
              <div className="p-6 border-b border-border">
                <h2 className="text-[16px] font-medium text-foreground">Personal Information</h2>
                <p className="text-[13px] text-muted-foreground mt-1">Update your personal details and public profile.</p>
              </div>
              <div className="p-6">
                <form onSubmit={handleSave} className="space-y-6">
                  {/* Avatar Section */}
                  <div className="flex items-center gap-6">
                    <div className="relative h-20 w-20 rounded-full bg-accent flex items-center justify-center overflow-hidden border border-border group">
                      {user?.picture ? (
                        <img src={user.picture} alt="Profile" className="h-full w-full object-cover" />
                      ) : user?.name ? (
                        <span className="text-xl font-semibold">{user.name.charAt(0)}</span>
                      ) : (
                        <UserIcon size={24} className="text-muted-foreground" />
                      )}
                      <button 
                        type="button" 
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white"
                      >
                        {isUploading ? <Loader2 className="animate-spin" size={20} /> : <Camera size={20} />}
                      </button>
                    </div>
                    <div>
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        accept="image/jpeg, image/png, image/webp" 
                        className="hidden" 
                      />
                      <button 
                        type="button" 
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        className="text-[13px] font-medium bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-70"
                      >
                        {isUploading ? "Uploading..." : "Upload new picture"}
                      </button>
                      <p className="text-[12px] text-muted-foreground mt-2">At least 800x800 px recommended. JPG or PNG is allowed.</p>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-[13px] font-medium">Full Name</label>
                      <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[13px] font-medium">Email Address</label>
                      <input 
                        type="email" 
                        value={user?.email || ""}
                        disabled
                        className="w-full rounded-md border border-input bg-muted/50 px-3 py-2 text-sm text-muted-foreground cursor-not-allowed"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[13px] font-medium">Phone Number</label>
                      <input 
                        type="tel" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 90000 00000"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4 border-t border-border">
                    <button 
                      type="submit" 
                      disabled={updateProfile.isPending}
                      className="flex items-center gap-2 bg-foreground text-background px-4 py-2 text-[13px] font-medium rounded-md hover:bg-foreground/90 transition-colors disabled:opacity-70"
                    >
                      {updateProfile.isPending ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} 
                      {updateProfile.isPending ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              </div>
            </section>
          )}

          {activeTab === "security" && (
            <div className="space-y-6 animate-in fade-in">
              <section className="rounded-xl border border-border bg-card shadow-[var(--shadow-quiet)] overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h2 className="text-[16px] font-medium text-foreground">Password & Authentication</h2>
                  <p className="text-[13px] text-muted-foreground mt-1">Manage your security credentials.</p>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[14px] font-medium">Change Password</p>
                      <p className="text-[13px] text-muted-foreground mt-1">We will send a password reset link to {user?.email}</p>
                    </div>
                    <button 
                      onClick={handlePasswordReset}
                      className="flex items-center gap-2 bg-accent text-foreground px-4 py-2 text-[13px] font-medium rounded-md hover:bg-accent/80 transition-colors"
                    >
                      <Key size={16} /> Reset Password
                    </button>
                  </div>
                </div>
              </section>

              <section className="rounded-xl border border-[var(--failure)]/30 bg-card overflow-hidden">
                <div className="p-6">
                  <h2 className="text-[16px] font-medium text-[var(--failure)]">Danger Zone</h2>
                  <p className="text-[13px] text-muted-foreground mt-1">Permanently delete your account and all associated data. This action cannot be undone.</p>
                  
                  <div className="mt-6">
                    <button 
                      onClick={handleDeleteAccount}
                      className="flex items-center gap-2 text-[13px] font-medium border border-[var(--failure)] text-[var(--failure)] px-4 py-2 rounded-md hover:bg-[var(--failure)]/10 transition-colors"
                    >
                      <Trash2 size={16} /> Delete Account
                    </button>
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === "notifications" && (
            <section className="rounded-xl border border-border bg-card shadow-[var(--shadow-quiet)] overflow-hidden animate-in fade-in">
              <div className="p-6 border-b border-border">
                <h2 className="text-[16px] font-medium text-foreground">Notification Preferences</h2>
                <p className="text-[13px] text-muted-foreground mt-1">Choose what alerts you want to receive.</p>
              </div>
              <div className="p-6 space-y-6">
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[14px] font-medium">Smart Contract Payouts</p>
                    <p className="text-[13px] text-muted-foreground mt-1">Get notified when a weather condition triggers a payout.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-9 h-5 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                
                <hr className="border-border" />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[14px] font-medium">Weather Alerts</p>
                    <p className="text-[13px] text-muted-foreground mt-1">Extreme weather warnings affecting your active plots.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-9 h-5 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <hr className="border-border" />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[14px] font-medium">Marketing & Promotions</p>
                    <p className="text-[13px] text-muted-foreground mt-1">Receive new coverage plans and offers.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-9 h-5 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex justify-end pt-4">
                  <button 
                    onClick={() => showSuccess("Preferences saved successfully!")}
                    className="flex items-center gap-2 bg-foreground text-background px-4 py-2 text-[13px] font-medium rounded-md hover:bg-foreground/90 transition-colors"
                  >
                    <Save size={16} /> Save Preferences
                  </button>
                </div>

              </div>
            </section>
          )}

        </div>
      </div>
    </div>
  );
}
