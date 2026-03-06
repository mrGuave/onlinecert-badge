import { useState, useRef } from "react";

const LOGO_SVG_PATHS = `
  <path d="M95.06,34.06l-13.91,14.13-3.51,3.58c-1.59,14.57-13.96,25.92-29,25.92-16.11,0-29.17-13.04-29.17-29.12,0-2.52.31-4.96.92-7.29.01-.01.01-.02.01-.03.75-2.92,1.94-5.67,3.52-8.15,5.15-8.21,14.29-13.67,24.72-13.67,6.83,0,13.11,2.33,18.08,6.25l.06-.06,13.6-13.82C71.87,4.45,60.77,0,48.64,0,21.82,0,0,21.78,0,48.56s21.82,48.54,48.64,48.54,48.64-21.77,48.64-48.54c0-5.05-.78-9.92-2.23-14.5Z" fill="#383838"/>
  <path d="M99.9,21.92l-6.81,6.93-15.55,15.8-20.79,21.16c-1.51,1.54-3.5,2.36-5.63,2.36s-4.14-.83-5.65-2.36l-17.74-18.06c-3.07-3.12-3.07-8.21,0-11.33,1.51-1.53,3.5-2.37,5.63-2.37s4.14.85,5.65,2.37l12.11,12.32,19.27-19.59,13.64-13.86,4.61-4.7c1.51-1.52,3.5-2.36,5.63-2.36,1.07,0,2.12.2,3.05.61.96.4,1.83.99,2.58,1.76.08.08.15.15.21.23,2.83,3.13,2.78,8.05-.21,11.09Z" fill="#2549d3"/>
  <path d="M20.4,41.25c.75-2.92,1.94-5.67,3.52-8.15-2.17,2.29-3.34,5.2-3.52,8.15Z" fill="#1d1d1b"/>
  <path d="M11.69,44.75l-.8-.14-2.21-2.36-.32,1.77-1.08-.19.61-3.42.8.14,2.21,2.36.35-1.95,1.08.19-.64,3.6Z" fill="#fff"/>
  <path d="M13.08,38.82c-.12.42-.33.76-.6,1.03s-.62.44-1.01.52c-.39.08-.82.05-1.28-.08-.46-.13-.82-.34-1.11-.62-.28-.28-.46-.6-.55-.97-.09-.37-.07-.76.05-1.17.11-.38.3-.71.56-.96.26-.26.58-.43.96-.51s.8-.06,1.27.08l.42.13-.84,2.86c.29.03.53,0,.71-.11.19-.11.32-.27.38-.49.05-.18.06-.34,0-.48-.05-.14-.14-.25-.28-.34l.39-1.32c.3.14.53.34.7.6.17.25.27.54.31.85s0,.64-.1.99ZM10.09,38.85l.46-1.57c-.25-.03-.46,0-.61.11-.16.1-.27.25-.33.45-.06.2-.05.38.03.56s.23.33.44.46Z" fill="#fff"/>
  <path d="M13.87,36.17l-4.15-1.73.5-1.21.64.27v-.03c-.16-.18-.27-.38-.33-.62-.05-.23-.02-.46.08-.7l.15-.35,1.11.46-.17.41c-.14.34-.15.63-.02.86.13.23.34.41.65.53l2.08.87-.52,1.25Z" fill="#fff"/>
  <path d="M15.85,31.83c-.16.3-.36.5-.61.58-.24.08-.53.04-.85-.13l-2.07-1.09-.31.6-.96-.5.32-.61-1.2-.63.61-1.17,1.2.63.4-.77.96.5-.4.76,2.07,1.09.44-.84.96.5-.56,1.08Z" fill="#fff"/>
  <path d="M12.95,27.1c-.11.17-.26.29-.46.33-.2.05-.39.01-.56-.09-.17-.11-.28-.26-.33-.46-.05-.2-.02-.39.09-.56.11-.18.26-.29.46-.33.2-.05.39-.02.56.09.17.11.28.26.33.46.05.2.02.39-.09.56ZM16.74,30.25l-3.82-2.38.71-1.15,3.82,2.38-.71,1.15Z" fill="#fff"/>
  <path d="M18.07,28.11l-2.71-2.09-.41.53-.85-.66.42-.54-.57-.44c-.29-.23-.45-.47-.48-.72-.03-.25.07-.52.28-.79l.73-.95.85.66-.59.76.57.44.53-.69.86.66-.52.68,2.7,2.09-.83,1.07ZM16.37,22.32c-.13.16-.29.26-.49.28-.2.03-.39-.03-.55-.15s-.26-.29-.28-.49c-.03-.21.02-.39.15-.55.13-.16.29-.26.49-.28.2-.03.39.02.55.15.16.13.26.29.28.49.03.21-.02.39-.15.55ZM19.82,25.84l-3.56-2.75.83-1.07,3.56,2.75-.83,1.07Z" fill="#fff"/>
  <path d="M21.07,24.33l-.57-.57-.47-3.2-1.27,1.28-.78-.78,2.46-2.46.57.57.47,3.2,1.4-1.4.77.77-2.58,2.59Z" fill="#fff"/>
  <path d="M21.53,17.18c-.16.13-.34.19-.54.17-.21-.02-.37-.1-.51-.26s-.19-.34-.17-.54c.02-.2.11-.37.26-.51.16-.13.34-.19.54-.17.2.02.37.1.5.26.13.16.19.34.17.54s-.1.37-.26.5ZM24.16,21.34l-2.91-3.44,1.03-.87,2.91,3.43-1.03.87Z" fill="#fff"/>
  <path d="M27.56,18.8c-.36.25-.73.39-1.11.42-.38.04-.76-.04-1.11-.22s-.67-.47-.95-.86c-.27-.39-.43-.78-.48-1.17-.05-.39,0-.76.17-1.1.16-.34.42-.64.77-.88.33-.23.67-.36,1.04-.4.36-.04.72.03,1.07.2.35.17.66.46.94.86l.25.36-2.44,1.71c.2.21.41.32.63.36.21.03.42-.02.61-.15.16-.11.26-.23.3-.37s.05-.28,0-.44l1.13-.79c.14.3.2.6.17.9s-.12.59-.29.86c-.17.27-.4.51-.69.71ZM25.21,16.96l1.34-.94c-.18-.18-.36-.28-.54-.3-.19-.02-.37.03-.53.15s-.28.27-.33.46c-.05.19-.03.4.06.63Z" fill="#fff"/>
  <path d="M29.84,17.21l-2.17-3.94,1.14-.63.33.61.03-.02c-.02-.25.02-.48.12-.69s.27-.38.5-.51l.34-.18.58,1.05-.39.21c-.32.18-.51.4-.55.66-.04.26.01.53.17.82l1.08,1.97-1.18.65Z" fill="#fff"/>
  <path d="M34.1,15.05c-.32.14-.6.16-.84.08-.24-.09-.44-.3-.58-.63l-.94-2.14-.62.27-.44-.99.63-.28-.54-1.23,1.21-.53.54,1.24.8-.35.44.99-.78.34.94,2.14.87-.38.44.99-1.11.49Z" fill="#fff"/>
  <path d="M39.21,13.36c-.36.09-.7.08-1.02-.04-.32-.12-.6-.33-.84-.63-.24-.3-.41-.68-.53-1.12-.12-.45-.14-.87-.08-1.25s.21-.7.43-.96c.22-.26.52-.44.88-.53.54-.14.98-.02,1.32.35h.03s-.59-2.31-.59-2.31l1.31-.34,1.57,6.1-1.26.32-.15-.6h-.03c-.13.53-.48.86-1.02,1ZM39.28,12.1c.26-.07.44-.2.54-.41.1-.2.12-.45.04-.75l-.08-.32c-.08-.29-.21-.51-.4-.64-.19-.13-.41-.16-.67-.1-.27.07-.45.22-.56.46-.1.24-.11.53-.03.87.09.34.23.59.44.75s.44.2.71.14Z" fill="#fff"/>
  <path d="M44.1,12.38c-.32.04-.62,0-.88-.13-.26-.13-.48-.32-.65-.58-.17-.26-.27-.58-.32-.94l-.31-2.71,1.34-.16.28,2.44c.03.28.12.5.28.64.15.14.35.2.59.17.26-.03.45-.14.58-.33s.18-.42.14-.71l-.28-2.39,1.34-.16.52,4.47-1.3.15-.08-.67h-.03c-.1.26-.25.47-.46.62-.21.16-.47.25-.78.29Z" fill="#fff"/>
  <path d="M47.68,11.99v-4.5s1.3,0,1.3,0v.69s.03,0,.03,0c.1-.23.25-.41.44-.55.19-.13.42-.2.68-.2h.38s0,1.2,0,1.2h-.44c-.37,0-.64.1-.8.31s-.24.47-.24.8v2.25s-1.35,0-1.35,0Z" fill="#fff"/>
  <path d="M52.8,12.27c-.42-.04-.79-.18-1.11-.4s-.55-.52-.71-.89c-.16-.37-.21-.79-.17-1.26.05-.48.18-.88.41-1.21.23-.33.51-.57.87-.73s.74-.21,1.16-.17c.36.04.69.14.97.3.28.16.51.38.68.66.17.27.26.59.27.97l-1.37-.14c-.03-.17-.11-.31-.23-.41-.12-.1-.26-.16-.44-.18-.25-.03-.47.05-.65.24-.18.19-.29.46-.33.81-.04.35.02.63.16.85.14.22.34.34.59.37.19.02.35-.01.5-.09.14-.08.25-.22.32-.42l1.34.13c-.08.39-.24.71-.46.95-.22.24-.49.42-.8.52-.31.1-.66.14-1.02.1Z" fill="#fff"/>
  <path d="M55.33,12.47l1.42-6.14,1.32.3-.54,2.34h.03c.18-.18.39-.3.63-.37.24-.07.5-.07.78,0,.31.07.57.22.78.43s.34.48.42.78.07.65-.02,1.01l-.6,2.61-1.32-.3.54-2.35c.07-.29.05-.53-.05-.73-.1-.19-.27-.32-.52-.38-.24-.06-.45-.02-.63.11-.18.13-.3.34-.37.63l-.54,2.35-1.32-.3Z" fill="#fff"/>
  <path d="M29.45,86.84c-.67-.35-1.18-.82-1.54-1.41-.36-.59-.54-1.24-.54-1.97,0-.72.2-1.47.61-2.24.41-.78.91-1.37,1.51-1.78s1.24-.63,1.93-.66c.68-.04,1.36.12,2.03.48.67.35,1.19.82,1.55,1.4.36.58.54,1.23.54,1.96,0,.72-.21,1.48-.62,2.26-.41.77-.91,1.36-1.51,1.77-.6.41-1.24.64-1.93.67-.68.03-1.36-.12-2.03-.48ZM30.24,85.36c.36.19.72.26,1.09.21.37-.05.72-.21,1.05-.48.33-.27.62-.63.86-1.09.25-.47.39-.91.42-1.34.03-.42-.03-.8-.2-1.13-.17-.33-.43-.59-.8-.78-.36-.19-.72-.26-1.09-.21-.37.05-.72.2-1.05.47-.33.27-.62.63-.87,1.1-.24.46-.38.9-.41,1.33-.03.42.03.8.2,1.14.17.33.44.6.8.79Z" fill="#fff"/>
  <path d="M35.25,89.35l1.62-5.95,1.73.47-.23.85h.04c.26-.25.56-.43.9-.51.34-.08.71-.07,1.11.04.43.12.78.33,1.05.63.27.3.44.67.53,1.1.08.43.06.89-.08,1.38l-.96,3.54-1.79-.49.87-3.18c.11-.39.09-.72-.03-1-.13-.27-.36-.45-.69-.54-.32-.09-.61-.05-.86.12-.25.17-.43.45-.54.84l-.87,3.19-1.79-.49Z" fill="#fff"/>
  <path d="M43.07,91.17l1.05-8.57,1.84.22-1.05,8.57-1.84-.22Z" fill="#fff"/>
  <path d="M46.8,91.54l.2-6.17,1.85.06-.2,6.17-1.85-.06ZM47.94,84.87c-.28,0-.52-.12-.71-.32-.19-.2-.28-.45-.27-.73,0-.28.12-.52.32-.71.2-.19.45-.28.73-.28.28,0,.52.12.71.32.19.21.28.45.28.73s-.12.52-.32.71c-.21.19-.45.28-.73.28Z" fill="#fff"/>
  <path d="M50.83,91.65l-.69-6.13,1.78-.2.1.88h.04c.14-.34.36-.62.64-.82.29-.2.64-.33,1.04-.38.44-.05.85.02,1.21.2.36.18.66.46.9.83.23.37.38.81.44,1.32l.41,3.65-1.84.21-.37-3.28c-.04-.4-.18-.71-.4-.91-.22-.21-.5-.29-.84-.25-.33.04-.59.18-.76.43-.17.25-.23.58-.19.98l.37,3.28-1.84.21Z" fill="#fff"/>
  <path d="M61.64,89.79c-.57.17-1.11.2-1.63.09-.52-.12-.97-.37-1.36-.75-.39-.38-.68-.89-.88-1.52-.19-.62-.24-1.2-.13-1.73.1-.53.33-.99.68-1.37.35-.38.81-.66,1.37-.83.52-.16,1.03-.19,1.52-.09.49.1.93.34,1.31.71.38.37.67.88.87,1.52l.18.58-3.9,1.2c.18.35.4.6.67.73s.55.15.85.06c.25-.08.43-.2.55-.35.12-.16.18-.35.17-.57l1.81-.56c.06.45,0,.87-.15,1.25-.16.39-.41.72-.74,1-.33.28-.73.49-1.2.64ZM59.33,86.4l2.14-.66c-.15-.31-.35-.52-.58-.62-.24-.1-.49-.11-.76-.03-.27.08-.47.24-.62.46-.14.22-.2.51-.18.85Z" fill="#fff"/>
  <path d="M69.69,86.38c-.68.37-1.36.54-2.05.51-.69-.03-1.33-.26-1.93-.67-.6-.41-1.1-.99-1.51-1.75-.41-.75-.63-1.49-.66-2.21-.03-.73.13-1.39.47-1.98.34-.6.85-1.08,1.53-1.45.56-.31,1.12-.47,1.69-.5.56-.02,1.1.09,1.6.33.5.24.94.61,1.3,1.11l-1.73.95c-.23-.32-.53-.52-.91-.59-.38-.08-.75,0-1.12.19-.35.19-.61.46-.77.79-.16.33-.22.71-.18,1.13.04.42.19.86.44,1.32.25.46.54.82.87,1.08.33.26.68.42,1.05.46.37.04.73-.03,1.08-.23.37-.21.63-.49.77-.84.14-.36.14-.72,0-1.09l1.73-.95c.23.57.31,1.13.24,1.69-.07.56-.26,1.07-.59,1.53-.32.46-.77.85-1.33,1.15Z" fill="#fff"/>
  <path d="M76.47,81.61c-.45.39-.94.63-1.46.72-.52.1-1.04.04-1.55-.15-.51-.2-.98-.55-1.41-1.05-.42-.5-.69-1.01-.81-1.53-.12-.53-.09-1.04.09-1.53.17-.49.48-.92.93-1.31.42-.36.87-.58,1.36-.69.49-.1.98-.06,1.48.13.5.19.96.54,1.4,1.05l.39.46-3.11,2.65c.31.25.61.39.9.4.3.02.57-.08.81-.28.2-.17.32-.35.37-.54.05-.19.03-.39-.07-.59l1.44-1.23c.23.39.35.79.36,1.21,0,.42-.09.82-.28,1.21-.19.39-.48.74-.85,1.06ZM73.01,79.41l1.71-1.45c-.26-.22-.52-.34-.78-.34-.26,0-.49.09-.71.27-.21.18-.34.4-.39.67-.04.26.01.55.17.86Z" fill="#fff"/>
  <path d="M79.91,78.18l-4.69-4.01,1.16-1.36.72.62.03-.03c-.15-.31-.21-.62-.18-.95.03-.32.16-.62.39-.89l.34-.4,1.25,1.07-.39.46c-.33.38-.46.75-.39,1.11.07.35.27.68.62.97l2.34,2-1.2,1.41Z" fill="#fff"/>
  <path d="M84.39,72.35c-.26.4-.56.63-.91.71-.34.08-.73-.01-1.14-.29l-2.68-1.76-.51.77-1.24-.81.52-.79-1.55-1.02.99-1.51,1.55,1.02.66-1,1.24.81-.64.98,2.68,1.76.71-1.08,1.24.81-.91,1.39Z" fill="#fff"/>
`;

const OnlineCertLogo = ({ width = "100%", height = "100%" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 102.19 97.1" width={width} height={height}
    dangerouslySetInnerHTML={{ __html: LOGO_SVG_PATHS }} />
);

const filename = (id, norm, suffix) =>
  `${id}_badge-${norm.replace(/[^a-z0-9]/gi, "_")}_${suffix}`;

export default function BadgeGenerator() {
  const [system, setSystem] = useState("QM System");
  const [norm, setNorm] = useState("ISO 9001:2015");
  const [validUntil, setValidUntil] = useState("09.12.2026");
  const [id, setId] = useState("12777256-b5b9-482b-a0c6-406b987fd7ec");
  const [generated, setGenerated] = useState({
    system: "QM System", norm: "ISO 9001:2015",
    validUntil: "09.12.2026", id: "12777256-b5b9-482b-a0c6-406b987fd7ec",
  });

  const handleGenerate = () => setGenerated({ system, norm, validUntil, id });

  // ── PNG helpers ──────────────────────────────────────────────────────────
  const renderPNG = ({ w, h, logoX, logoY, logoW, logoH, textX, lines, cornerRadius = 32 }) => {
    return new Promise((resolve) => {
      const scale = 3;
      const canvas = document.createElement("canvas");
      canvas.width = w * scale; canvas.height = h * scale;
      const ctx = canvas.getContext("2d");

      // background
      ctx.beginPath();
      const r = cornerRadius * scale;
      const W = w * scale, H = h * scale;
      ctx.moveTo(r, 0); ctx.lineTo(W - r, 0); ctx.arcTo(W, 0, W, r, r);
      ctx.lineTo(W, H - r); ctx.arcTo(W, H, W - r, H, r);
      ctx.lineTo(r, H); ctx.arcTo(0, H, 0, H - r, r);
      ctx.lineTo(0, r); ctx.arcTo(0, 0, r, 0, r); ctx.closePath();
      const grad = ctx.createLinearGradient(0, 0, W, H);
      grad.addColorStop(0, "#f0f4ff"); grad.addColorStop(1, "#eaeefc");
      ctx.fillStyle = grad; ctx.fill();
      ctx.strokeStyle = "#c7d2f5"; ctx.lineWidth = 2 * scale; ctx.stroke();

      // logo
      const svgBlob = new Blob(
        [`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 102.19 97.1">${LOGO_SVG_PATHS}</svg>`],
        { type: "image/svg+xml" }
      );
      const url = URL.createObjectURL(svgBlob);
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, logoX * scale, logoY * scale, logoW * scale, logoH * scale);
        URL.revokeObjectURL(url);
        // text
        lines.forEach(({ text, x, y, size, color, align }) => {
          ctx.fillStyle = color;
          ctx.font = `bold ${size * scale}px 'Segoe UI', Arial, sans-serif`;
          ctx.textAlign = align || "left";
          ctx.fillText(text, x * scale, y * scale);
        });
        resolve(canvas.toDataURL("image/png"));
      };
      img.src = url;
    });
  };

  const downloadPNG = async (dataUrl, name) => {
    const a = document.createElement("a"); a.href = dataUrl; a.download = name; a.click();
  };

  // ── Snippet helper ───────────────────────────────────────────────────────
  const downloadSnippet = (html, name) => {
    const blob = new Blob([html], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = name; a.click();
    URL.revokeObjectURL(url);
  };

  const verifyUrl = `https://www.virtualbadge.io/certificate-validator?credential=${generated.id}`;
  const logoSvgStr = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 102.19 97.1">${LOGO_SVG_PATHS}</svg>`;

  // ── HORIZONTAL ───────────────────────────────────────────────────────────
  const handleHorizPNG = async () => {
    const url = await renderPNG({
      w: 480, h: 190, logoX: 14, logoY: 14, logoW: 155, logoH: 155,
      textX: 182,
      lines: [
        { text: generated.system, x: 182, y: 55, size: 18, color: "#1e293b" },
        { text: generated.norm,   x: 182, y: 82, size: 22, color: "#2549d3" },
        { text: `Gültig bis: ${generated.validUntil}`, x: 182, y: 128, size: 15, color: "#1e293b" },
        { text: `ID ${generated.id}`, x: 182, y: 153, size: 13, color: "#475569" },
      ],
    });
    downloadPNG(url, filename(generated.id, generated.norm, "horizontal.png"));
  };

  const handleHorizSnippet = () => {
    const snippet = `<!-- OnlineCert Badge – Horizontal -->
<a href="${verifyUrl}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:20px;background:linear-gradient(135deg,#f0f4ff,#eaeefc);border-radius:20px;padding:20px 28px 20px 20px;border:1.5px solid rgba(37,73,211,0.12);box-shadow:0 2px 16px rgba(37,73,211,0.08);text-decoration:none;font-family:'Segoe UI',Arial,sans-serif;transition:box-shadow 0.2s;">
  <div style="width:105px;min-width:105px;">${logoSvgStr}</div>
  <div style="display:flex;flex-direction:column;">
    <span style="font-size:1rem;font-weight:700;color:#1e293b;margin-bottom:1px;">${generated.system}</span>
    <span style="font-size:1.2rem;font-weight:800;color:#2549d3;margin-bottom:12px;">${generated.norm}</span>
    <span style="font-size:0.85rem;font-weight:700;color:#1e293b;margin-bottom:2px;">Gültig bis: ${generated.validUntil}</span>
    <span style="font-size:0.85rem;font-weight:600;color:#475569;">ID ${generated.id}</span>
    <span style="margin-top:10px;font-size:0.72rem;font-weight:600;color:#2549d3;opacity:0.8;">✓ Zertifikat verifizieren ↗</span>
  </div>
</a>`;
    downloadSnippet(snippet, filename(generated.id, generated.norm, "horizontal.html"));
  };

  // ── VERTICAL ─────────────────────────────────────────────────────────────
  const handleVertPNG = async () => {
    const url = await renderPNG({
      w: 200, h: 280, logoX: 30, logoY: 16, logoW: 140, logoH: 133,
      cornerRadius: 24,
      lines: [
        { text: generated.system, x: 100, y: 170, size: 14, color: "#1e293b", align: "center" },
        { text: generated.norm,   x: 100, y: 192, size: 16, color: "#2549d3", align: "center" },
        { text: `Gültig bis:`,              x: 100, y: 220, size: 11, color: "#1e293b", align: "center" },
        { text: generated.validUntil,       x: 100, y: 234, size: 11, color: "#1e293b", align: "center" },
        { text: `ID ${generated.id}`, x: 100, y: 255, size: 7.5, color: "#475569", align: "center" },
      ],
    });
    downloadPNG(url, filename(generated.id, generated.norm, "vertikal.png"));
  };

  const handleVertSnippet = () => {
    const snippet = `<!-- OnlineCert Badge – Vertikal (Sidebar) -->
<a href="${verifyUrl}" target="_blank" rel="noopener" style="display:inline-flex;flex-direction:column;align-items:center;width:190px;background:linear-gradient(160deg,#f0f4ff,#eaeefc);border-radius:20px;padding:20px 18px 18px;border:1.5px solid rgba(37,73,211,0.12);box-shadow:0 2px 16px rgba(37,73,211,0.08);text-decoration:none;font-family:'Segoe UI',Arial,sans-serif;text-align:center;">
  <div style="width:120px;">${logoSvgStr}</div>
  <span style="margin-top:12px;font-size:0.95rem;font-weight:700;color:#1e293b;">${generated.system}</span>
  <span style="font-size:1.05rem;font-weight:800;color:#2549d3;margin-bottom:10px;">${generated.norm}</span>
  <span style="font-size:0.78rem;font-weight:700;color:#1e293b;margin-bottom:2px;">Gültig bis: ${generated.validUntil}</span>
  <span style="font-size:0.7rem;font-weight:600;color:#475569;word-break:break-all;">${generated.id}</span>
  <span style="margin-top:10px;font-size:0.68rem;font-weight:600;color:#2549d3;opacity:0.8;">✓ Zertifikat verifizieren ↗</span>
</a>`;
    downloadSnippet(snippet, filename(generated.id, generated.norm, "vertikal.html"));
  };

  // ── Styles ───────────────────────────────────────────────────────────────
  const fields = [
    { label: "System-Bezeichnung", value: system, setter: setSystem, placeholder: "z.B. QM System" },
    { label: "Norm / Standard",    value: norm,   setter: setNorm,   placeholder: "z.B. ISO 9001:2015" },
    { label: "Gültig bis",         value: validUntil, setter: setValidUntil, placeholder: "TT.MM.JJJJ" },
    { label: "Zertifikats-ID",     value: id,     setter: setId,     placeholder: "z.B. 12777256-b5b9-..." },
  ];

  const btnOutline = {
    padding: "9px 16px", background: "white", color: "#2549d3",
    border: "2px solid #2549d3", borderRadius: "9px", fontSize: "0.85rem",
    fontWeight: "700", cursor: "pointer", fontFamily: "inherit",
    display: "flex", alignItems: "center", gap: "6px",
  };
  const btnFilled = {
    padding: "9px 16px", background: "#2549d3", color: "white",
    border: "2px solid #2549d3", borderRadius: "9px", fontSize: "0.85rem",
    fontWeight: "700", cursor: "pointer", fontFamily: "inherit",
    display: "flex", alignItems: "center", gap: "6px",
    boxShadow: "0 3px 10px rgba(37,73,211,0.25)",
  };

  const IcoDown = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
  const IcoLink = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>;

  return (
    <div style={{
      minHeight: "100vh", background: "linear-gradient(145deg,#eef2ff,#e0e7f8)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: "40px 20px", fontFamily: "'Segoe UI',system-ui,sans-serif",
    }}>
      <h1 style={{ fontSize: "1.6rem", fontWeight: "800", color: "#1e293b", marginBottom: "6px", letterSpacing: "-0.5px" }}>
        Badge Generator
      </h1>
      <p style={{ color: "#64748b", marginBottom: "32px", fontSize: "0.9rem" }}>
        Felder ausfüllen · Badge generieren · herunterladen
      </p>

      {/* Form */}
      <div style={{ background: "white", borderRadius: "18px", padding: "28px 32px", boxShadow: "0 4px 28px rgba(37,73,211,0.1)", width: "100%", maxWidth: "400px", marginBottom: "32px" }}>
        {fields.map(({ label, value, setter, placeholder }) => (
          <div key={label} style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "0.73rem", fontWeight: "600", color: "#64748b", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.7px" }}>{label}</label>
            <input value={value} onChange={e => setter(e.target.value)} placeholder={placeholder}
              onKeyDown={e => e.key === "Enter" && handleGenerate()}
              onFocus={e => e.target.style.borderColor = "#2549d3"}
              onBlur={e => e.target.style.borderColor = "#e2e8f0"}
              style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1.5px solid #e2e8f0", fontSize: "0.95rem", color: "#1e293b", outline: "none", boxSizing: "border-box", background: "#fafbff", fontFamily: "inherit" }}
            />
          </div>
        ))}
        <button onClick={handleGenerate} style={{ width: "100%", padding: "12px", background: "linear-gradient(135deg,#2549d3,#1d3eb8)", color: "white", border: "none", borderRadius: "10px", fontSize: "0.95rem", fontWeight: "700", cursor: "pointer", boxShadow: "0 4px 14px rgba(37,73,211,0.3)", fontFamily: "inherit" }}>
          Badge generieren
        </button>
      </div>

      {/* Badge Preview */}
      <div style={{ background: "linear-gradient(135deg,#f0f4ff,#eaeefc)", borderRadius: "22px", padding: "22px 32px 22px 22px", display: "flex", alignItems: "center", gap: "22px", boxShadow: "0 2px 20px rgba(37,73,211,0.08),inset 0 0 0 1.5px rgba(37,73,211,0.12)", maxWidth: "480px", width: "100%" }}>
        <div style={{ width: "115px", minWidth: "115px", height: "110px" }}>
          <OnlineCertLogo />
        </div>
        <div>
          <div style={{ fontSize: "1.15rem", fontWeight: "700", color: "#1e293b", marginBottom: "1px" }}>{generated.system}</div>
          <div style={{ fontSize: "1.3rem", fontWeight: "800", color: "#2549d3", marginBottom: "14px" }}>{generated.norm}</div>
          <div style={{ fontSize: "0.9rem", fontWeight: "700", color: "#1e293b", marginBottom: "3px" }}>Gültig bis: {generated.validUntil}</div>
          <div style={{ fontSize: "0.82rem", fontWeight: "600", color: "#475569" }}>ID {generated.id}</div>
        </div>
      </div>

      <p style={{ marginTop: "14px", fontSize: "0.78rem", color: "#94a3b8" }}>Enter oder Button klicken zum Aktualisieren</p>

      {/* Download Sections */}
      <div style={{ marginTop: "24px", width: "100%", maxWidth: "480px", display: "flex", flexDirection: "column", gap: "14px" }}>

        {/* Horizontal */}
        <div style={{ background: "white", borderRadius: "14px", padding: "16px 20px", boxShadow: "0 2px 12px rgba(37,73,211,0.07)" }}>
          <div style={{ fontSize: "0.7rem", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "10px" }}>↔ Horizontal</div>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button onClick={handleHorizPNG} style={btnOutline}
              onMouseEnter={e => { e.currentTarget.style.background = "#2549d3"; e.currentTarget.style.color = "white"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "white"; e.currentTarget.style.color = "#2549d3"; }}>
              <IcoDown /> PNG
            </button>
            <button onClick={handleHorizSnippet} style={btnFilled}
              onMouseEnter={e => e.currentTarget.style.background = "#1d3eb8"}
              onMouseLeave={e => e.currentTarget.style.background = "#2549d3"}>
              <IcoLink /> HTML-Snippet + Verifikationslink
            </button>
          </div>
        </div>

        {/* Vertical */}
        <div style={{ background: "white", borderRadius: "14px", padding: "16px 20px", boxShadow: "0 2px 12px rgba(37,73,211,0.07)" }}>
          <div style={{ fontSize: "0.7rem", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "10px" }}>↕ Vertikal (Sidebar)</div>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button onClick={handleVertPNG} style={btnOutline}
              onMouseEnter={e => { e.currentTarget.style.background = "#2549d3"; e.currentTarget.style.color = "white"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "white"; e.currentTarget.style.color = "#2549d3"; }}>
              <IcoDown /> PNG
            </button>
            <button onClick={handleVertSnippet} style={btnFilled}
              onMouseEnter={e => e.currentTarget.style.background = "#1d3eb8"}
              onMouseLeave={e => e.currentTarget.style.background = "#2549d3"}>
              <IcoLink /> HTML-Snippet + Verifikationslink
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
