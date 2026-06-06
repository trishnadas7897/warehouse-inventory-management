// CV pipeline -> dashboard integration contract.
//
// The Python pipeline at ai-cctv-analysis/video_processor.py writes its
// shelf_counts and warehouse-box detections to ./cv_counts.json after every
// run. This module imports that JSON at build time (Vite supports JSON
// imports natively) and exposes typed accessors the dashboard can consume.
//
// Contract owners:
//   - Python writer:  ai-cctv-analysis/video_processor.py::write_dashboard_export
//   - TypeScript reader:  src/data/cv_counts.ts (this file)
//
// If you change the JSON shape, change BOTH sides. The TS types here ARE the
// contract.

import rawCounts from "./cv_counts.json";

export interface CvShelfItem {
  label: string;       // OCR-detected name + weight, e.g. "Whole Milk 1L"
  count: number;       // running per-label count across the processed video
  last_seen_frame: number;
}

export interface CvWarehouseBox {
  label: string;       // first OCR line, or "Box" if unreadable
  dimensions_cm: string; // e.g. "42.0x36.0x30.0 cm"
  detected_count: number;
}

export interface CvCountsExport {
  schema_version: 1;
  generated_at: string;        // ISO 8601
  source_video: string;        // basename of processed file
  total_frames_processed: number;
  fps: number;
  shelf_items: CvShelfItem[];
  warehouse_boxes: CvWarehouseBox[];
}

const counts = rawCounts as CvCountsExport;

export function getCvCounts(): CvCountsExport {
  return counts;
}

/** Sum of every shelf-item count - useful for a dashboard "items detected" KPI. */
export function getTotalShelfItems(): number {
  return counts.shelf_items.reduce((sum, item) => sum + item.count, 0);
}

/** Sum of every warehouse-box detection. */
export function getTotalWarehouseBoxes(): number {
  return counts.warehouse_boxes.reduce((sum, b) => sum + b.detected_count, 0);
}

/**
 * Top-N shelf items by detected count, for a "trending on shelf" UI panel.
 * Falls back to all items if N exceeds the array length.
 */
export function getTopShelfItems(n: number): CvShelfItem[] {
  return [...counts.shelf_items]
    .sort((a, b) => b.count - a.count)
    .slice(0, n);
}

/** True iff the most recent export is fresher than `maxAgeMs` milliseconds. */
export function isCvCountsFresh(maxAgeMs: number): boolean {
  const generated = Date.parse(counts.generated_at);
  if (Number.isNaN(generated)) return false;
  return Date.now() - generated < maxAgeMs;
}
