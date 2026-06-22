"use client";
import { useState } from "react";
import { Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { Field, SaveBtn } from "../AdminField";

const ADMIN_PWD_KEY = "ac_admin_pwd";
const DEFAULT_PWD = "admin123";

export default function SecuritySection() {
  const [current,    setCurrent]    = useState("");
  const [newPwd,     setNewPwd]     = useState("");
  const [confirm,    setConfirm]    = useState("");
  const [showPwd,    setShowPwd]    = useState(false);
  const [error,      setError]      = useState("");
  const [toast,      setToast]      = useState("");

  const showToast = (msg:string) => { setToast(msg); setTimeout(()=>setToast(""),3000); };

  const storedPwd = () => {
    try { return localStorage.getItem(ADMIN_PWD_KEY) || DEFAULT_PWD; } catch { return DEFAULT_PWD; }
  };

  const submit = (e:React.FormEvent) => {
    e.preventDefault();
    setError("");
    if(current !== storedPwd()) { setError("Current password is incorrect."); return; }
    if(newPwd.length < 6)       { setError("New password must be at least 6 characters."); return; }
    if(newPwd !== confirm)       { setError("Passwords don't match."); return; }
    try { localStorage.setItem(ADMIN_PWD_KEY, newPwd); } catch { /**/ }
    setCurrent(""); setNewPwd(""); setConfirm("");
    showToast("Password changed successfully!");
  };

  const inputStyle: React.CSSProperties = {
    background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)",
    borderRadius:10, color:"white", fontSize:13, padding:"10px 40px 10px 14px", width:"100%", outline:"none",
  };

  return (
    <div>
      {toast && (
        <div className="fixed top-20 right-6 z-50 px-4 py-3 rounded-xl text-sm font-bold text-white flex items-center gap-2"
             style={{ background:"#22c55e", boxShadow:"0 8px 24px rgba(34,197,94,0.35)" }}>
          <ShieldCheck size={14}/> {toast}
        </div>
      )}

      <div className="mb-6">
        <h1 className="text-xl font-black text-white">Security</h1>
        <p className="text-xs mt-0.5" style={{ color:"rgba(255,255,255,0.3)" }}>Update admin panel access credentials</p>
      </div>

      <div className="max-w-sm">
        <div className="p-6 rounded-2xl" style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex items-center gap-2 mb-5">
            <Lock size={16} style={{ color:"var(--orange)" }}/>
            <span className="font-bold text-white text-sm">Change Password</span>
          </div>

          <form onSubmit={submit} className="flex flex-col gap-4">
            <Field label="CURRENT PASSWORD">
              <div className="relative">
                <input type={showPwd?"text":"password"} value={current} onChange={e=>setCurrent(e.target.value)}
                       placeholder="Current password" style={inputStyle} required/>
                <button type="button" onClick={()=>setShowPwd(p=>!p)}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                        style={{ color:"rgba(255,255,255,0.3)", background:"none", border:"none", cursor:"pointer" }}>
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
                         style={{ background: newPwd.length >= i*2 ? (newPwd.length>=8?"#22c55e":newPwd.length>=6?"var(--orange)":"#ef4444") : "rgba(255,255,255,0.1)" }}/>
                  ))}
                </div>
              )}
            </Field>

            <Field label="CONFIRM NEW PASSWORD">
              <div className="relative">
                <input type={showPwd?"text":"password"} value={confirm} onChange={e=>setConfirm(e.target.value)}
                       placeholder="Repeat new password" style={{...inputStyle, borderColor:confirm&&confirm!==newPwd?"#ef4444":undefined}} required/>
                {confirm && confirm===newPwd && (
                  <ShieldCheck size={14} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color:"#22c55e" }}/>
                )}
              </div>
            </Field>

            {error && (
              <div className="px-3 py-2.5 rounded-xl text-xs font-bold" style={{ background:"rgba(239,68,68,0.1)", color:"#ef4444", border:"1px solid rgba(239,68,68,0.2)" }}>
                {error}
              </div>
            )}

            <SaveBtn label="Change Password"/>
          </form>
        </div>

        <div className="mt-4 p-4 rounded-2xl" style={{ background:"rgba(249,115,22,0.05)", border:"1px solid rgba(249,115,22,0.1)" }}>
          <div className="text-[10px] font-bold mb-1" style={{ color:"var(--orange)" }}>DEFAULT CREDENTIALS</div>
          <p className="text-[11px] leading-relaxed" style={{ color:"rgba(255,255,255,0.4)" }}>
            Default password is <code className="font-mono" style={{ color:"var(--orange)" }}>admin123</code>.
            Change it after your first login for security.
          </p>
        </div>
      </div>
    </div>
  );
}
