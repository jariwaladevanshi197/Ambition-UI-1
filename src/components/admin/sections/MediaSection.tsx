"use client";
import { useState, useRef } from "react";
import { Upload, Trash2, FolderOpen, Image, Video } from "lucide-react";
import type { MediaFile } from "../types";

const FOLDERS = ["All","Banners","Products","CSR","Activities"];

// Where an upload can be shown on the live site. "Activities"/"CSR" feed those
// pages' real photo galleries directly; the rest are general-purpose storage.
const UPLOAD_DESTINATIONS = [
  { value:"Activities", label:"Activities Gallery" },
  { value:"CSR",         label:"CSR Gallery" },
  { value:"Products",    label:"Products (general)" },
  { value:"Banners",     label:"Banners (general)" },
];

interface Props {
  media: MediaFile[];
  add: (file: File, folder: string) => Promise<{ error: string|null }>;
  remove: (id: string) => void;
}

export default function MediaSection({ media, add, remove }: Props) {
  const [folder, setFolder]   = useState("All");
  const [destination, setDestination] = useState("Activities");
  const [dragOver, setDragOver] = useState(false);
  const [toast,  setToast]    = useState("");
  const [error,  setError]    = useState("");
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg:string) => { setToast(msg); setTimeout(()=>setToast(""),2500); };

  const uploadFiles = async (files: FileList|null) => {
    if(!files || files.length===0) return;
    setUploading(true);
    setError("");
    const results = await Promise.all(Array.from(files).map(file => add(file, destination)));
    setUploading(false);
    const failed = results.filter(r => r.error);
    const okCount = results.length - failed.length;
    if (okCount > 0) showToast(`${okCount} file${okCount>1?"s":""} added to ${UPLOAD_DESTINATIONS.find(d=>d.value===destination)?.label}!`);
    if (failed.length > 0) setError(`${failed.length} file${failed.length>1?"s":""} failed to upload: ${failed[0].error}`);
  };

  const visible = folder==="All" ? media : media.filter(f=>f.folder===folder);

  return (
    <div>
      {toast && (
        <div className="fixed top-20 right-6 z-50 px-4 py-3 rounded-xl text-sm font-bold text-white"
             style={{ background:"var(--orange)", boxShadow:"0 8px 24px rgba(249,115,22,0.35)" }}>✓ {toast}</div>
      )}
      {error && (
        <div className="mb-4 px-4 py-3 rounded-xl text-sm font-bold" style={{ background:"rgba(239,68,68,0.08)", color:"#ef4444", border:"1px solid rgba(239,68,68,0.15)" }}>
          {error}
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-black text-gray-900">Media Library</h1>
          <p className="text-xs mt-0.5" style={{ color:"rgba(0,0,0,0.4)" }}>{media.length} files · {media.filter(f=>f.type==="image").length} images · {media.filter(f=>f.type==="video").length} videos</p>
        </div>
        <button onClick={()=>inputRef.current?.click()} disabled={uploading}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white disabled:opacity-60"
                style={{ background:"var(--orange)" }}
                onMouseEnter={e=>(e.currentTarget.style.boxShadow="0 8px 24px rgba(249,115,22,0.35)")}
                onMouseLeave={e=>(e.currentTarget.style.boxShadow="")}>
          <Upload size={14}/> {uploading ? "Uploading…" : "Upload Files"}
        </button>
        <input ref={inputRef} type="file" multiple accept="image/*,video/*" className="hidden"
               onChange={e=>uploadFiles(e.target.files)}/>
      </div>

      {/* Folder tabs */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {FOLDERS.map(f=>(
          <button key={f} onClick={()=>setFolder(f)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all"
                  style={{ background:folder===f?"var(--orange)":"rgba(0,0,0,0.05)", color:folder===f?"white":"rgba(0,0,0,0.55)" }}>
            <FolderOpen size={11}/> {f}
            <span className="px-1.5 py-0.5 rounded-full text-[9px]"
                  style={{ background:folder===f?"rgba(255,255,255,0.25)":"rgba(0,0,0,0.08)" }}>
              {f==="All" ? media.length : media.filter(x=>x.folder===f).length}
            </span>
          </button>
        ))}
      </div>

      {/* Upload destination */}
      <div className="flex items-center gap-3 mb-3 flex-wrap">
        <label className="text-[10px] font-bold tracking-widest" style={{ color:"rgba(0,0,0,0.5)" }}>SHOW ON PAGE</label>
        <select value={destination} onChange={e=>setDestination(e.target.value)}
                className="px-3 py-2 rounded-lg text-xs font-bold outline-none"
                style={{ background:"rgba(0,0,0,0.04)", border:"1px solid rgba(0,0,0,0.12)", color:"#111111" }}>
          {UPLOAD_DESTINATIONS.map(d=>(
            <option key={d.value} value={d.value}>{d.label}</option>
          ))}
        </select>
        <span className="text-[10px]" style={{ color:"rgba(0,0,0,0.35)" }}>
          New uploads below will be added here
        </span>
      </div>

      {/* Drop zone */}
      <div className="rounded-2xl mb-5 flex flex-col items-center justify-center py-8 transition-all cursor-pointer"
           style={{ border:`2px dashed ${dragOver?"var(--orange)":"rgba(0,0,0,0.15)"}`, background:dragOver?"rgba(249,115,22,0.04)":"rgba(0,0,0,0.02)" }}
           onDragOver={e=>{e.preventDefault();setDragOver(true)}}
           onDragLeave={()=>setDragOver(false)}
           onDrop={e=>{e.preventDefault();setDragOver(false);uploadFiles(e.dataTransfer.files)}}
           onClick={()=>inputRef.current?.click()}>
        <Upload size={24} style={{ color:dragOver?"var(--orange)":"rgba(0,0,0,0.2)", marginBottom:8 }}/>
        <p className="text-sm font-bold" style={{ color:dragOver?"var(--orange)":"rgba(0,0,0,0.4)" }}>
          {dragOver ? "Drop to upload" : "Drag & drop or click to upload"}
        </p>
        <p className="text-[10px] mt-1" style={{ color:"rgba(0,0,0,0.3)" }}>Images and videos supported</p>
      </div>

      {/* Grid */}
      {visible.length === 0 ? (
        <div className="py-12 text-center rounded-2xl text-sm" style={{ background:"rgba(0,0,0,0.02)", border:"1px solid rgba(0,0,0,0.07)", color:"rgba(0,0,0,0.4)" }}>
          No files in this folder
        </div>
      ) : (
        <div className="grid gap-2" style={{ gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))" }}>
          {visible.map(f=>(
            <div key={f.id} className="group relative rounded-2xl p-4 transition-all"
                 style={{ background:"#ffffff", border:"1px solid rgba(0,0,0,0.08)" }}
                 onMouseEnter={e=>(e.currentTarget.style.background="rgba(0,0,0,0.03)")}
                 onMouseLeave={e=>(e.currentTarget.style.background="#ffffff")}>
              {/* Preview area */}
              <div className="w-full rounded-xl overflow-hidden flex items-center justify-center mb-3"
                   style={{ height:96, background:"rgba(0,0,0,0.04)" }}>
                {f.type==="image" && f.url
                  ? <img src={f.url} alt={f.name} className="w-full h-full object-cover"/>
                  : <Video size={28} style={{ color:"rgba(0,0,0,0.25)" }}/>}
              </div>
              {/* Delete button */}
              <button onClick={()=>{ if(confirm("Delete this file? This cannot be undone.")) remove(f.id) }}
                      className="absolute top-3 right-3 w-7 h-7 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                      style={{ background:"rgba(239,68,68,0.85)" }}>
                <Trash2 size={11} className="text-white"/>
              </button>
              <div className="flex items-center gap-1.5 mb-0.5">
                {f.type==="image" ? <Image size={10} style={{ color:"rgba(0,0,0,0.35)"}}/> : <Video size={10} style={{ color:"rgba(0,0,0,0.35)"}}/>}
                <span className="text-[9px] font-bold" style={{ color:"rgba(0,0,0,0.4)", textTransform:"uppercase" }}>{f.type}</span>
              </div>
              <div className="text-xs font-bold text-gray-900 truncate" title={f.name}>{f.name}</div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-[10px]" style={{ color:"rgba(0,0,0,0.4)" }}>{f.size}</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ background:"rgba(249,115,22,0.1)", color:"var(--orange)" }}>{f.folder}</span>
              </div>
              <div className="text-[9px] mt-0.5" style={{ color:"rgba(0,0,0,0.3)" }}>{f.date}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
