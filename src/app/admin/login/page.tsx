"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Zap } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const tryLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErr("");
    const { error } = await supabase.auth.signInWithPassword({ email, password: pwd });
    setLoading(false);
    if (error) {
      setErr("Incorrect email or password.");
      setPwd("");
      return;
    }
    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background:"#f9f9f9" }}>
      <div className="w-full max-w-sm mx-4">
        <div className="flex items-center gap-2 justify-center mb-10">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background:"var(--orange)" }}>
            <Zap size={18} className="text-white"/>
          </div>
          <span className="font-black text-gray-900 text-lg tracking-tight">
            Ambition <span style={{ color:"var(--orange)" }}>CMS</span>
          </span>
        </div>
        <div className="p-7 rounded-3xl" style={{ background:"#ffffff", border:"1px solid rgba(0,0,0,0.1)", boxShadow:"0 4px 24px rgba(0,0,0,0.06)" }}>
          <h1 className="text-lg font-black text-gray-900 mb-1">Admin Panel</h1>
          <p className="text-[11px] mb-6" style={{ color:"rgba(0,0,0,0.4)" }}>
            Sign in to manage your website content
          </p>
          <form onSubmit={tryLogin} className="flex flex-col gap-4">
            <div>
              <label className="text-[10px] font-bold tracking-widest block mb-1.5" style={{ color:"rgba(0,0,0,0.5)" }}>
                EMAIL
              </label>
              <input
                type="email" value={email} autoFocus required
                onChange={e=>{ setEmail(e.target.value); setErr(""); }}
                placeholder="you@company.com"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ background:"rgba(0,0,0,0.04)", border:`1px solid ${err?"#ef4444":"rgba(0,0,0,0.12)"}`, color:"#111111" }}
              />
            </div>
            <div>
              <label className="text-[10px] font-bold tracking-widest block mb-1.5" style={{ color:"rgba(0,0,0,0.5)" }}>
                PASSWORD
              </label>
              <input
                type="password" value={pwd} required
                onChange={e=>{ setPwd(e.target.value); setErr(""); }}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ background:"rgba(0,0,0,0.04)", border:`1px solid ${err?"#ef4444":"rgba(0,0,0,0.12)"}`, color:"#111111" }}
              />
              {err && (
                <p className="text-[10px] mt-1.5" style={{ color:"#ef4444" }}>{err}</p>
              )}
            </div>
            <button type="submit" disabled={loading}
                    className="w-full py-3 rounded-xl text-sm font-bold text-white disabled:opacity-60"
                    style={{ background:"var(--orange)" }}
                    onMouseEnter={e=>(e.currentTarget.style.boxShadow="0 8px 24px rgba(249,115,22,0.35)")}
                    onMouseLeave={e=>(e.currentTarget.style.boxShadow="")}>
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
