import React, { useState, useRef, useCallback } from "react";
import { X, ArrowLeft, ImageIcon, PlayCircle, Smile, Loader2 } from "lucide-react";
import { usePost } from "../hooks/usePost";
import { useNavigate } from "react-router-dom";

const CreatePost = ({ onClose, currentUser }) => {
  const [step, setStep] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const { loading, handleCreatePost } = usePost();  // ✅ Fix 2: object destructure
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const MAX_CAPTION = 2200;

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setSelectedImage(url);
    setSelectedFile(file);
    setStep(2);
  };

  const handleFileInput = (e) => handleFile(e.target.files[0]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  // ✅ Fix 1: use selectedFile directly, no e.preventDefault(), no ref nonsense
  const handleSubmit = async () => {
    if (!selectedFile) return;
    await handleCreatePost(selectedFile, caption);
    navigate("/feed");
    onClose?.();
  };

  const handleBack = () => {
    setStep(1);
    setSelectedImage(null);
    setSelectedFile(null);
    setCaption("");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <div
        className="relative flex flex-col rounded-2xl overflow-hidden shadow-2xl w-full"
        style={{
          background: "#1c1c1e",
          maxWidth: step === 1 ? "520px" : "900px",
          maxHeight: "90vh",
          transition: "max-width 0.35s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {/* ── Header ── */}
        <div
          className="flex items-center justify-between px-4 shrink-0"
          style={{ borderBottom: "1px solid #2c2c2e", height: "48px" }}
        >
          {step === 2 ? (
            <button onClick={handleBack} className="text-white hover:text-zinc-400 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : (
            <div className="w-5" />
          )}

          <span className="text-white font-semibold text-sm tracking-wide">
            Create new post
          </span>

          {step === 2 ? (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="text-sm font-semibold transition-colors flex items-center gap-1.5 disabled:opacity-50"
              style={{ color: "#4f8ef7" }}
              onMouseEnter={(e) => !loading && (e.target.style.color = "#82b4ff")}
              onMouseLeave={(e) => !loading && (e.target.style.color = "#4f8ef7")}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sharing...</span>
                </>
              ) : (
                "Share"
              )}
            </button>
          ) : (
            <button onClick={onClose} className="text-zinc-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* ── Body ── */}
        {step === 1 ? (

          /* ── Step 1: Upload ── */
          <div
            className="flex flex-col items-center justify-center gap-6 cursor-pointer select-none"
            style={{
              height: "clamp(320px, 60vw, 520px)",
              background: isDragging ? "#2c2c2e" : "#1c1c1e",
              transition: "background 0.2s",
            }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
          >
            {/* Stacked icons */}
            <div className="flex items-center">
              <div
                className="flex items-center justify-center rounded-xl"
                style={{
                  width: "60px", height: "60px",
                  border: "2px solid #ffffffcc",
                  marginRight: "-12px",
                  background: "transparent",
                  zIndex: 1,
                }}
              >
                <ImageIcon className="w-6 h-6" style={{ color: "#ffffffcc" }} />
              </div>
              <div
                className="flex items-center justify-center rounded-xl"
                style={{
                  width: "60px", height: "60px",
                  border: "2px solid #ffffffcc",
                  background: "#1c1c1e",
                  zIndex: 2,
                  position: "relative",
                }}
              >
                <PlayCircle className="w-6 h-6" style={{ color: "#ffffffcc" }} />
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 px-4 text-center">
              <p className="text-white text-lg sm:text-xl font-light tracking-wide">
                Drag photos and videos here
              </p>
              <button
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all active:scale-95"
                style={{ background: "#4f8ef7" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#3a7de0")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#4f8ef7")}
                onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
              >
                Select From Computer
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileInput}
            />
          </div>

        ) : (
          /* ── Step 2: Details ── */
          <>
            {/* ── MOBILE + TABLET: image on top, fields below ── */}
            <div
              className="flex flex-col overflow-y-auto lg:hidden"
              style={{ maxHeight: "calc(90vh - 48px)" }}
            >
              {/* Image — shorter on small screens */}
              <div
                className="w-full shrink-0 overflow-hidden relative"
                style={{ height: "clamp(200px, 50vw, 340px)", background: "#000" }}
              >
                <img
                  src={selectedImage}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* User */}
              <div
                className="flex items-center gap-3 px-4 py-4 shrink-0"
                style={{ borderBottom: "1px solid #2c2c2e" }}
              >
                <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 ring-2 ring-zinc-600">
                  <img
                    src={currentUser?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop"}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-white font-semibold text-sm">
                  {currentUser?.username || "yourprofile"}
                </span>
              </div>

              {/* Caption */}
              <div className="px-4 pt-3 flex-1 flex flex-col">
                <textarea
                  className="w-full flex-1 resize-none text-sm text-white placeholder-zinc-500 bg-transparent outline-none leading-relaxed"
                  style={{ minHeight: "100px" }}
                  placeholder="Write a caption..."
                  maxLength={MAX_CAPTION}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                />
              </div>

              {/* Emoji + Counter */}
              <div
                className="flex items-center justify-between px-4 py-3 shrink-0"
                style={{ borderTop: "1px solid #2c2c2e" }}
              >
                <button className="text-zinc-500 hover:text-zinc-300 transition-colors">
                  <Smile className="w-5 h-5" />
                </button>
                <span className="text-zinc-500 text-xs">
                  {caption.length}/{MAX_CAPTION}
                </span>
              </div>
            </div>

            {/* ── DESKTOP: side by side ── */}
            <div className="hidden lg:flex" style={{ height: "540px" }}>
              {/* Left — Image */}
              <div
                className="shrink-0 overflow-hidden relative"
                style={{
                  width: "540px",
                  background: "#000",
                  borderRight: "1px solid #2c2c2e",
                }}
              >
                <img
                  src={selectedImage}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute top-5 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg text-white text-sm font-medium pointer-events-none"
                  style={{ background: "rgba(0,0,0,0.75)" }}
                >
                  Click photo to tag people
                </div>
              </div>

              {/* Right — Details */}
              <div className="flex flex-col flex-1 overflow-y-auto" style={{ minWidth: 0 }}>
                {/* User */}
                <div className="flex items-center gap-3 px-4 py-4 shrink-0">
                  <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 ring-2 ring-zinc-600">
                    <img
                      src={currentUser?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop"}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-white font-semibold text-sm">
                    {currentUser?.username || "yourprofile"}
                  </span>
                </div>

                {/* Caption */}
                <div className="px-4 flex-1 flex flex-col">
                  <textarea
                    className="w-full flex-1 resize-none text-sm text-white placeholder-zinc-500 bg-transparent outline-none leading-relaxed"
                    style={{ minHeight: "120px" }}
                    placeholder="Write a caption..."
                    maxLength={MAX_CAPTION}
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                  />
                </div>

                {/* Emoji + Counter */}
                <div
                  className="flex items-center justify-between px-4 py-3 shrink-0"
                  style={{ borderTop: "1px solid #2c2c2e" }}
                >
                  <button className="text-zinc-500 hover:text-zinc-300 transition-colors">
                    <Smile className="w-5 h-5" />
                  </button>
                  <span className="text-zinc-500 text-xs">
                    {caption.length}/{MAX_CAPTION}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CreatePost;