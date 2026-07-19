"use client";
import { useEffect, useState } from "react";
import { Lock, Eye, EyeOff, ShieldCheck, Shield } from "lucide-react";
import { Field, SaveBtn } from "../AdminField";
import { createClient } from "@/lib/supabase/client";

export default function SecuritySection() {
  const supabase = createClient();
  const [email,      setEmail]      = useState("");
  const [current,    setCurrent]    = useState("");
  const [newPwd,     setNewPwd]     = useState("");
  const [confirm,    setConfirm]    = useState("");
  const [showPwd,    setShowPwd]    = useState(false);
  const [error,      setError]      = useState("");
  const [saving,     setSaving]     = useState(false);
  const [toast,      setToast]      = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? ""));
  }, [supabase]);

  const showToast = (msg:string) => { setToast(msg); setTimeout(()=>setToast(""),3000); };

  const submit = async (e:React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (newPwd.length < 6)  { setError("New password must be at least 6 characters."); return; }
    if (newPwd !== confirm) { setError("Passwords don't match."); return; }

    setSaving(true);

    // Re-verify the current password before allowing a change.
    const { error: verifyErr } = await supabase.auth.signInWithPassword({ email, password: current });
    if (verifyErr) {
      setSaving(false);
      setError("Current password is incorrect.");
      return;
    }

    const { error: updateErr } = await supabase.auth.updateUser({ password: newPwd });
    setSaving(false);
    if (updateErr) {
      setError(updateErr.message);
      return;
    }

    setCurrent(""); setNewPwd(""); setConfirm("");
    showToast("Password changed successfully!");
  };

  const inputStyle: React.CSSProperties = {
    background:"rgba(0,0,0,0.04)", border:"1px solid rgba(0,0,0,0.12)",
    borderRadius:10, color:"#111111", fontSize:13, padding:"10px 40px 10px 14px", width:"100%", outline:"none",
  };

  return (
    <div>
      {toast && (
        <div className="fixed top-20 right-6 z-50 px-4 py-3 rounded-xl text-sm font-bold text-white flex items-center gap-2"
             style={{ background:"var(--orange)", boxShadow:"0 8px 24px rgba(249,115,22,0.35)" }}>
          <ShieldCheck size={14}/> {toast}
        </div>
      )}

      <div className="mb-6">
        <h1 className="text-xl font-black text-gray-900">Security</h1>
        <p className="text-xs mt-0.5" style={{ color:"rgba(0,0,0,0.4)" }}>Update admin panel access credentials</p>
      </div>

      {/* Security notice */}
      <div className="flex items-start gap-3 p-4 rounded-2xl mb-5 max-w-sm" style={{ background:"rgba(249,115,22,0.06)", border:"1px solid rgba(249,115,22,0.15)" }}>
        <Shield size={15} style={{ color:"var(--orange)", marginTop:2 }}/>
        <div>
          <div className="text-xs font-bold" style={{ color:"var(--orange)" }}>Admin Access</div>
          <p className="text-[11px] mt-0.5 leading-relaxed" style={{ color:"rgba(0,0,0,0.5)" }}>
            Signed in as <span className="font-bold">{email || "…"}</span>. Use a strong password and keep it private.
          </p>
        </div>
      </div>

      <div className="max-w-sm">
        <div className="p-6 rounded-2xl" style={{ background:"#ffffff", border:"1px solid rgba(0,0,0,0.08)" }}>
          <div className="flex items-center gap-2 mb-5">
            <Lock size={16} style={{ color:"var(--orange)" }}/>
            <span className="font-bold text-gray-900 text-sm">Change Password</span>
          </div>

          <form onSubmit={submit} className="flex flex-col gap-4">
            <Field label="CURRENT PASSWORD">
              <div className="relative">
                <input type={showPwd?"text":"password"} value={current} onChange={e=>setCurrent(e.target.value)}
                       placeholder="Current password" style={inputStyle} required/>
                <button type="button" onClick={()=>setShowPwd(p=>!p)}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                        style={{ color:"rgba(0,0,0,0.3)", background:"none", border:"none", cursor:"pointer" }}>
                  {showPwd?<EyeOff size={14}/>:<Eye size={14}/>}
                </button>
              </div>
            </Field>

            <Field label="NEW PASSWORD">
              <div className="relative">
                <input type={showPwd?"text":"password"} value={newPwd} onChange={e=>setNewPwd(e.target.value)}
                       placeholder="Min. 6 characters" style={inputStyle} required/>
              </div>
              {newPwd.length > 0 && (
                <div className="flex gap-1 mt-1.5">
                  {[1,2,3,4].map(i=>(
                    <div key={i} className="h-1 flex-1 rounded-full transition-all"
                         style={{ background: newPwd.length >= i*2 ? (newPwd.length>=8?"#22c55e":newPwd.length>=6?"var(--orange)":"#ef4444") : "rgba(0,0,0,0.08)" }}/>
                  ))}
                </div>
              )}
            </Field>

            <Field label="CONFIRM NEW PASSWORD">
              <div className="relative">
                <input type={showPwd?"text":"password"} value={confirm} onChange={e=>setConfirm(e.target.value)}
                       placeholder="Repeat new password"
                       style={{...inputStyle, borderColor:confirm&&confirm!==newPwd?"#ef4444":undefined}} required/>
                {confirm && confirm===newPwd && (
                  <ShieldCheck size={14} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color:"#22c55e" }}/>
                )}
              </div>
            </Field>

            {error && (
              <div className="px-3 py-2.5 rounded-xl text-xs font-bold" style={{ background:"rgba(239,68,68,0.08)", color:"#ef4444", border:"1px solid rgba(239,68,68,0.15)" }}>
                {error}
              </div>
            )}

            <SaveBtn loading={saving} label="Change Password"/>
          </form>
        </div>
      </div>
    </div>
  );
}
