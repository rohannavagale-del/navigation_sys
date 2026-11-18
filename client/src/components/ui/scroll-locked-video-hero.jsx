import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, MapPin, Sparkles, Lock, Unlock } from "lucide-react";

const DEFAULT_VIDEO = "https://cdn.21st.dev/assets/mirror/21/21a77eac28eacbb7e142016eefeaa0b4a766619e51113629a3bc6df6af066c0f.mp4";
const DEFAULT_SIGNATURE = { name: "MIT ADT Campus Navigation", url: "#" };
const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

const COL_BG = "#05070d";
const COL_TEXT = "#f2f4f8";

function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}

export default function MetroHero({
  videoSrc = DEFAULT_VIDEO,
  title = "MIT ADT CAMPUS GATE",
  scrollHint = "SCROLL OR CLICK TO OPEN GATE",
  tagline = "Welcome to MIT ADT University",
  signature = DEFAULT_SIGNATURE,
  scrubDistance = 2400,
  className,
  style,
  onComplete,
}) {
  const sectionRef = useRef(null);
  const leftGateRef = useRef(null);
  const rightGateRef = useRef(null);
  const campusInnerRef = useRef(null);
  const latchRef = useRef(null);
  const titleRef = useRef(null);
  const hintRef = useRef(null);
  const taglineRef = useRef(null);
  const progressBarRef = useRef(null);
  const [ready, setReady] = useState(true);
  const [isOpening, setIsOpening] = useState(false);
  const isAutoOpeningRef = useRef(false);
  const triggerAutoOpenRef = useRef(null);

  const handleEnterClick = () => {
    setIsOpening(true);
    if (triggerAutoOpenRef.current) {
      triggerAutoOpenRef.current();
    } else {
      isAutoOpeningRef.current = true;
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    triggerAutoOpenRef.current = () => {
      isAutoOpeningRef.current = true;
    };

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    let rafId = 0;
    let targetProgress = 0;
    let currentProgress = 0;
    let hasStartedScrolling = false;
    let locked = false;
    let lockedScrollY = 0;
    let touchStartY = 0;
    let completedTriggered = false;

    function engageLock() {
      if (locked || typeof document === "undefined") return;
      locked = true;
      lockedScrollY = window.scrollY;
      const b = document.body.style;
      b.position = "fixed";
      b.top = `-${lockedScrollY}px`;
      b.left = "0";
      b.right = "0";
      b.width = "100%";
      b.height = "100%";
      b.overscrollBehavior = "none";
    }

    function releaseLock() {
      if (!locked || typeof document === "undefined") return;
      locked = false;
      const y = lockedScrollY;
      const bodyStyle = document.body.style;
      bodyStyle.position = "";
      bodyStyle.top = "";
      bodyStyle.left = "";
      bodyStyle.right = "";
      bodyStyle.width = "";
      bodyStyle.height = "";
      bodyStyle.overscrollBehavior = "";
      window.scrollTo(0, y);
    }

    engageLock();

    function addDelta(deltaY) {
      if (isAutoOpeningRef.current) return;
      const next = clamp(targetProgress + deltaY / scrubDistance, 0, 1);
      targetProgress = next;
      if (targetProgress > 0.001) hasStartedScrolling = true;
      return true;
    }

    const onWheel = (e) => {
      addDelta(e.deltaY);
      e.preventDefault();
    };

    const onTouchStart = (e) => {
      touchStartY = e.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (e) => {
      const y = e.touches[0]?.clientY ?? touchStartY;
      const deltaY = touchStartY - y;
      touchStartY = y;
      addDelta(deltaY);
      e.preventDefault();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    section.addEventListener("touchstart", onTouchStart, { passive: true, capture: true });
    section.addEventListener("touchmove", onTouchMove, { passive: false, capture: true });

    function frame() {
      if (isAutoOpeningRef.current) {
        targetProgress = 1;
        currentProgress += (1 - currentProgress) * 0.055;
        if (currentProgress > 0.99) currentProgress = 1;
        hasStartedScrolling = true;
      } else {
        currentProgress += (targetProgress - currentProgress) * 0.18;
      }

      const angle = currentProgress * 88;
      const transX = currentProgress * 28;
      const gateOpacity = Math.max(0, 1 - Math.pow(currentProgress, 2) * 1.15);

      if (leftGateRef.current) {
        leftGateRef.current.style.transform = `rotateY(-${angle}deg) translateX(-${transX}%)`;
        leftGateRef.current.style.opacity = String(gateOpacity);
      }
      if (rightGateRef.current) {
        rightGateRef.current.style.transform = `rotateY(${angle}deg) translateX(${transX}%)`;
        rightGateRef.current.style.opacity = String(gateOpacity);
      }
      if (campusInnerRef.current) {
        const scale = 1.02 + currentProgress * 0.18;
        campusInnerRef.current.style.transform = `scale(${scale})`;
      }
      if (latchRef.current) {
        const latchProg = clamp(currentProgress / 0.22, 0, 1);
        latchRef.current.style.opacity = String(1 - latchProg);
        latchRef.current.style.transform = `translate(-50%, -50%) scale(${1 + latchProg * 0.35})`;
      }

      if (titleRef.current) {
        const t = 1 - clamp(currentProgress / 0.35, 0, 1);
        titleRef.current.style.opacity = String(t);
        titleRef.current.style.transform = `translateY(${(1 - t) * -28}px) scale(${0.96 + t * 0.04})`;
        titleRef.current.style.filter = `blur(${(1 - t) * 10}px)`;
      }
      if (hintRef.current) {
        hintRef.current.style.opacity = (hasStartedScrolling || isAutoOpeningRef.current) ? "0" : "1";
      }
      if (taglineRef.current) {
        const t = clamp((currentProgress - 0.55) / 0.45, 0, 1);
        taglineRef.current.style.opacity = String(t);
        taglineRef.current.style.transform = `translateY(${(1 - t) * 18}px) scale(${0.96 + t * 0.04})`;
        taglineRef.current.style.filter = `blur(${(1 - t) * 8}px)`;

        if (currentProgress >= 0.96 && !completedTriggered && onComplete) {
          completedTriggered = true;
          setTimeout(() => {
            onComplete();
          }, 500);
        }
      }
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${currentProgress})`;
      }

      rafId = requestAnimationFrame(frame);
    }

    if (!reduceMotion) {
      rafId = requestAnimationFrame(frame);
    }

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      section.removeEventListener("touchstart", onTouchStart, true);
      section.removeEventListener("touchmove", onTouchMove, true);
      cancelAnimationFrame(rafId);
      releaseLock();
    };
  }, [scrubDistance, onComplete]);

  return (
    <div
      ref={sectionRef}
      className={className}
      style={{
        position: "fixed",
        inset: 0,
        height: "100vh",
        width: "100vw",
        zIndex: 2000,
        overflow: "hidden",
        background: COL_BG,
        touchAction: "none",
        transition: "opacity 0.6s ease",
        opacity: isOpening ? 0.96 : 1,
        ...style,
      }}
    >
      {/* 1. Behind the gate: Inside MIT ADT Campus Reveal (World Peace Dome & Grounds) */}
      <div
        ref={campusInnerRef}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          overflow: "hidden",
          pointerEvents: "none",
          transformOrigin: "center center",
          willChange: "transform",
        }}
      >
        <img
          src="/buildings/world_peace_dome.jpg"
          alt="Inside MIT ADT Campus"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.92) contrast(1.08)",
          }}
        />
        {/* Sunlight glow through open gate */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(circle at 50% 40%, rgba(254, 240, 138, 0.28) 0%, rgba(37, 99, 235, 0.2) 55%, rgba(5, 7, 13, 0.8) 100%)",
          }}
        />
      </div>

      {/* 2. 3D Gate Doors Stage */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 4,
          perspective: "1400px",
          perspectiveOrigin: "50% 50%",
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        {/* Left Gate Door */}
        <div
          ref={leftGateRef}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            width: "50%",
            overflow: "hidden",
            transformOrigin: "left center",
            willChange: "transform, opacity",
            borderRight: "1.5px solid rgba(245, 158, 11, 0.6)",
            boxShadow: "8px 0 25px rgba(0,0,0,0.7)",
          }}
        >
          <img
            src="/buildings/mit_campus_gate.jpg"
            alt="MIT ADT Campus Gate Left"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              maxWidth: "none",
              objectFit: "cover",
              pointerEvents: "none",
              filter: "brightness(0.9) contrast(1.06)",
            }}
          />
        </div>

        {/* Right Gate Door */}
        <div
          ref={rightGateRef}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            width: "50%",
            overflow: "hidden",
            transformOrigin: "right center",
            willChange: "transform, opacity",
            borderLeft: "1.5px solid rgba(245, 158, 11, 0.6)",
            boxShadow: "-8px 0 25px rgba(0,0,0,0.7)",
          }}
        >
          <img
            src="/buildings/mit_campus_gate.jpg"
            alt="MIT ADT Campus Gate Right"
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "100vw",
              height: "100vh",
              maxWidth: "none",
              objectFit: "cover",
              pointerEvents: "none",
              filter: "brightness(0.9) contrast(1.06)",
            }}
          />
        </div>
      </div>

      {/* 3. Central Gate Emblem / Latch */}
      <div
        ref={latchRef}
        onClick={handleEnterClick}
        style={{
          position: "absolute",
          left: "50%",
          top: "52%",
          transform: "translate(-50%, -50%)",
          zIndex: 8,
          cursor: "pointer",
          pointerEvents: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transition: "transform 0.2s ease",
        }}
        title="Click to Open Campus Gate"
      >
        <div
          style={{
            background: "radial-gradient(circle, #f59e0b 0%, #b45309 75%, #78350f 100%)",
            border: "3px solid #fef3c7",
            boxShadow: "0 0 30px rgba(245, 158, 11, 0.75), 0 8px 25px rgba(0,0,0,0.9)",
            width: 64,
            height: 64,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
          }}
        >
          {isOpening ? <Unlock size={28} /> : <Lock size={28} />}
        </div>
        <span
          style={{
            marginTop: "0.6rem",
            background: "rgba(15, 23, 42, 0.9)",
            border: "1px solid rgba(245, 158, 11, 0.6)",
            color: "#fef3c7",
            padding: "0.3rem 0.8rem",
            borderRadius: "9999px",
            fontSize: "0.75rem",
            fontWeight: 800,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            boxShadow: "0 4px 15px rgba(0,0,0,0.6)",
          }}
        >
          {isOpening ? "GATE OPENING..." : "CLICK TO OPEN GATE"}
        </span>
      </div>

      {/* Atmospheric lighting overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(5,7,13,0.55), rgba(5,7,13,0.1) 30%, rgba(5,7,13,0.2) 70%, rgba(5,7,13,0.85))",
          pointerEvents: "none",
          zIndex: 6,
        }}
      />

      {/* Initial Title Banner */}
      <div
        ref={titleRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "clamp(35px, 7vh, 75px)",
          paddingLeft: "6%",
          paddingRight: "6%",
          textAlign: "center",
          pointerEvents: "none",
          zIndex: 7,
        }}
      >
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          background: "rgba(15, 23, 42, 0.8)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(245, 158, 11, 0.5)",
          padding: "0.35rem 1rem",
          borderRadius: "9999px",
          color: "#fbbf24",
          fontSize: "0.85rem",
          fontWeight: 700,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          marginBottom: "0.6rem",
          boxShadow: "0 4px 15px rgba(0,0,0,0.5)"
        }}>
          <Sparkles size={15} /> Welcome to Rajbaug Campus
        </div>
        <span
          style={{
            fontFamily: SANS,
            fontWeight: 800,
            fontSize: "clamp(26px, 5.5vw, 68px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: COL_TEXT,
            textShadow: "0 4px 30px rgba(0,0,0,0.9)",
            display: "inline-block",
            willChange: "transform, filter, opacity",
          }}
        >
          {title}
        </span>
        <span
          style={{
            marginTop: "0.8rem",
            fontFamily: SANS,
            fontWeight: 700,
            fontSize: "clamp(12px, 1.5vw, 16px)",
            color: "#60a5fa",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            textShadow: "0 2px 10px rgba(0,0,0,0.8)",
          }}
        >
          CLICK BELOW OR SCROLL TO SWING OPEN THE CAMPUS GATE
        </span>
      </div>

      {/* Grand Welcome Reveal Banner on Gate Open */}
      <div
        ref={taglineRef}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 6%",
          textAlign: "center",
          opacity: 0,
          pointerEvents: "none",
          zIndex: 12,
        }}
      >
        <div
          style={{
            background: "rgba(5, 7, 13, 0.75)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "1.5rem",
            padding: "2.5rem 3.5rem",
            boxShadow: "0 20px 50px rgba(0,0,0,0.7), 0 0 40px rgba(37, 99, 235, 0.3)",
            maxWidth: "850px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.8rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#60a5fa", fontSize: "0.9rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>
            <Sparkles size={18} /> CAMPUS GATE OPEN <Sparkles size={18} />
          </div>

          <h1
            style={{
              margin: 0,
              fontFamily: SANS,
              fontWeight: 800,
              fontSize: "clamp(26px, 4.5vw, 56px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#ffffff",
              textShadow: "0 4px 20px rgba(0,0,0,0.9)",
            }}
          >
            Welcome to MIT ADT University
          </h1>

          <p
            style={{
              margin: "0.4rem 0 0 0",
              fontFamily: SANS,
              fontWeight: 500,
              fontSize: "clamp(14px, 2vw, 20px)",
              color: "#cbd5e1",
              letterSpacing: "0.02em",
            }}
          >
            Rajbaug Campus, Loni Kalbhor, Pune • Interactive Campus Directory & Navigation
          </p>
        </div>
      </div>

      {/* Gate Open Scroll Hint & Direct Enter Button */}
      <div
        ref={hintRef}
        style={{
          position: "absolute",
          left: "50%",
          bottom: "clamp(24px, 7vh, 56px)",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          color: "rgba(240,244,248,0.9)",
          fontFamily: SANS,
          fontSize: "clamp(11px, 1.4vw, 13px)",
          fontWeight: 700,
          letterSpacing: "0.25em",
          transition: "opacity 0.4s ease",
          zIndex: 10,
        }}
      >
        <span>{scrollHint}</span>
        <svg width="16" height="20" viewBox="0 0 14 18" style={{ animation: "metro-hero-bounce 1.6s ease-in-out infinite" }}>
          <style>{`
            @keyframes metro-hero-bounce {
              0%, 100% { transform: translateY(0); opacity: 0.5; }
              50% { transform: translateY(6px); opacity: 1; }
            }
          `}</style>
          <path d="M7 1 L7 17 M2 12 L7 17 L12 12" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        {/* Enter Map Action Button */}
        <button
          onClick={handleEnterClick}
          disabled={isOpening}
          style={{
            marginTop: "0.5rem",
            padding: "0.75rem 2rem",
            borderRadius: "9999px",
            background: isOpening 
              ? "linear-gradient(135deg, #059669 0%, #10b981 100%)" 
              : "linear-gradient(135deg, #1e1452 0%, #2563eb 100%)",
            color: "#ffffff",
            border: "1px solid rgba(255,255,255,0.4)",
            fontWeight: 700,
            fontSize: "0.9rem",
            letterSpacing: "0.08em",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            boxShadow: "0 8px 24px rgba(37, 99, 235, 0.4)",
            pointerEvents: "auto",
            transition: "all 0.3s ease",
            transform: isOpening ? "scale(1.05)" : "scale(1)",
          }}
        >
          <MapPin size={18} /> {isOpening ? "OPENING CAMPUS GATE..." : "ENTER CAMPUS MAP"} <ArrowRight size={18} />
        </button>
      </div>

      {/* Scrub Progress Bar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 5,
          background: "rgba(255,255,255,0.15)",
        }}
      >
        <div
          ref={progressBarRef}
          style={{
            height: "100%",
            width: "100%",
            background: "linear-gradient(90deg, #3b82f6, #60a5fa, #ffffff)",
            transform: "scaleX(0)",
            transformOrigin: "left center",
          }}
        />
      </div>
    </div>
  );
}
