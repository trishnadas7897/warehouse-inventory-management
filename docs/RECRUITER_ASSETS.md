# Recruiter assets - Stocktake

Ready-to-use copy for resume, LinkedIn, and portfolio. Every claim here is backed
by code in this repo (see the honesty guard at the bottom).

**Live demo:** https://warehouse-inventory-management-mocha.vercel.app

---

## Resume bullets (STAR)

### Frontend / Full-stack framing

- Built a retail control-center SPA (React 18, TypeScript, Tailwind, shadcn/ui) with 25+ modular
  components across 6 routes - inventory, barcode scanning, demand forecast, logistics, orders,
  settings - using Recharts for KPI/forecast visualizations and a keyless Leaflet + OpenStreetMap
  delivery map, deployed as a static SPA on Vercel (zero-config, no API keys; SPA-rewrite for client routing).
- Designed a `schema_version`-versioned typed JSON contract between a Python computer-vision pipeline
  and the React dashboard, so detected on-shelf counts surface in the KPI cards, a top-products card,
  and a detected-on-shelf panel with a "Live from CCTV" provenance badge and a demo-data fallback -
  turning two independent halves into one traceable data flow.

### AI / Computer-Vision framing

- Engineered a YOLOv8 + Tesseract OCR pipeline (OpenCV) that classifies warehouse boxes vs shelf
  items by pixel-area threshold, estimates physical box dimensions (W x H x D cm), OCRs product
  labels/weights, and maintains per-label running counts across video frames.
- Exposed the pipeline's output through a versioned JSON contract consumed by the dashboard at build
  time, with every parameter (weights path, px-to-cm scale, area threshold, video dir, Tesseract
  binary, export path) environment-overridable for reproducible, cross-platform runs.

---

## LinkedIn post

> 🚀 New project: **Stocktake** - an AI retail inventory + logistics dashboard.
>
> 🧠 A YOLOv8 + Tesseract OCR pipeline watches warehouse/shelf footage, classifies boxes vs products,
> estimates box dimensions, and counts items by label.
>
> 🔗 Those detections feed a React 18 + TypeScript dashboard through a typed, versioned JSON contract -
> so the KPI cards show real detected counts, not just mockups.
>
> 🗺️ Logistics (keyless Leaflet/OpenStreetMap map), demand forecasting, barcode scanning, orders - all
> in one control center, deployable with zero API keys.
>
> 🔗 Live demo: https://warehouse-inventory-management-mocha.vercel.app | code in comments. Feedback welcome! #React #TypeScript #ComputerVision #YOLOv8 #AI #FullStack

---

## Portfolio blurb (~150 words)

> **Stocktake** is an AI-powered retail inventory and logistics platform built for a Walmart-track
> Sparkathon. It pairs a React 18 + TypeScript dashboard - 25+ components spanning inventory overview,
> barcode-scanning intake, AI demand forecasting, delivery logistics mapping, and order management -
> with a Python computer-vision pipeline. The pipeline uses YOLOv8 for object detection and Tesseract
> OCR to read product labels off shelf footage, classifying warehouse boxes from individual products by
> pixel-area threshold and estimating physical box dimensions. The hardest problem was integration: I
> defined a versioned JSON contract so the CV pipeline's per-label counts flow into the dashboard's KPI
> cards and product panels, with a "Live from CCTV" badge and a graceful demo-data fallback. Every
> pipeline parameter is environment-overridable, and the whole app deploys with no API keys. Built with
> React, TypeScript, Tailwind, Recharts, Leaflet, OpenCV, YOLOv8, and Tesseract; deployed on Vercel (zero-config, no API keys).

---

## Honesty guard (what these claims do and do NOT say)

- ✅ "detected counts surface in the UI" / "at build time" - accurate: it is a **batch handoff**. The
  pipeline runs over recorded MP4s, writes `src/data/cv_counts.json`, and Vite bakes it in at build time.
- ❌ Do **not** say "real-time live CCTV streaming" or "real-time inference." There is no live stream,
  websocket, or SSE. If asked "is it real-time?": _batch handoff today; a websocket/polling bridge is the
  next step._
- ⚠️ A shelf `count` is a per-frame detection tally, not a unique-carton count. The dashboard labels it
  "Shelf Detections," not "Total Products."
- ⚠️ The demand-forecast charts and the AI-accuracy figures are mock series/literals; describe them as a
  "forecasting UI," not a live model. The only live timer is `StockAlertPanel`'s alert simulation.
- ⚠️ The Shopify/WooCommerce/Stripe tiles and the Capacitor camera are scaffolding/installed-but-unused;
  do not claim live e-commerce integrations or a shipped native barcode scanner.
