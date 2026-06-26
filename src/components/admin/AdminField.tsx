"use client";

interface FieldProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}

export function Field({ label, required, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-bold tracking-widest" style={{ color:"rgba(0,0,0,0.5)" }}>
        {label}{required && <span style={{ color:"var(--orange)" }}> *</span>}
      </label>
      {children}
    </div>
  );
}

const base: React.CSSProperties = {
  background:"rgba(0,0,0,0.04)", border:"1px solid rgba(0,0,0,0.12)",
  borderRadius:10, color:"#111111", fontSize:13, padding:"10px 14px", width:"100%", outline:"none",
};
const focus: React.CSSProperties = { borderColor:"var(--orange)", boxShadow:"0 0 0 3px rgba(249,115,22,0.15)" };

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input {...props} style={base}
      onFocus={e=>{Object.assign(e.target.style,{...base,...focus});}}
      onBlur={e=>{Object.assign(e.target.style,base);}}
    />
  );
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea {...props} style={{...base,resize:"vertical",minHeight:80}}
      onFocus={e=>{Object.assign(e.target.style,{...base,resize:"vertical",minHeight:80,...focus});}}
      onBlur={e=>{Object.assign(e.target.style,{...base,resize:"vertical",minHeight:80});}}
    />
  );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select {...props} style={{...base,cursor:"pointer"}}
      onFocus={e=>{Object.assign(e.target.style,{...base,...focus});}}
      onBlur={e=>{Object.assign(e.target.style,base);}}
    />
  );
}

export function Toggle({ checked, onChange, label }: { checked:boolean; onChange:(v:boolean)=>void; label:string }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <div onClick={()=>onChange(!checked)}
           className="relative rounded-full transition-all duration-200"
           style={{ width:36, height:20, background: checked?"var(--orange)":"rgba(0,0,0,0.15)" }}>
        <div className="absolute top-0.5 rounded-full bg-white transition-all duration-200"
             style={{ width:16, height:16, left: checked?18:2 }} />
      </div>
      <span className="text-xs" style={{ color:"rgba(0,0,0,0.6)" }}>{label}</span>
    </label>
  );
}

export function SaveBtn({ loading, label="Save Changes" }: { loading?:boolean; label?:string }) {
  return (
    <button type="submit" disabled={loading}
            className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all duration-200"
            style={{ background:"var(--orange)" }}
            onMouseEnter={e=>(e.currentTarget.style.boxShadow="0 8px 24px rgba(249,115,22,0.35)")}
            onMouseLeave={e=>(e.currentTarget.style.boxShadow="")}>
      {loading ? "Saving…" : label}
    </button>
  );
}

export function DeleteBtn({ onClick }: { onClick:()=>void }) {
  return (
    <button type="button" onClick={onClick}
            className="px-3 py-1.5 rounded-lg text-[11px] font-bold transition-colors"
            style={{ background:"rgba(239,68,68,0.12)", color:"#ef4444" }}
            onMouseEnter={e=>(e.currentTarget.style.background="rgba(239,68,68,0.25)")}
            onMouseLeave={e=>(e.currentTarget.style.background="rgba(239,68,68,0.12)")}>
      Delete
    </button>
  );
}
