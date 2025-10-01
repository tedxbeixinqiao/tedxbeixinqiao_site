"use client";

import { useEffect, useRef } from "react";

export default function GoogleMap() {
  const mapRef = useRef(null);

  useEffect(() => {
    // This is a placeholder for a real Google Maps implementation
    // In a real implementation, you would use the Google Maps JavaScript API

    if (mapRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = mapRef.current.clientWidth;
      canvas.height = mapRef.current.clientHeight;
      mapRef.current.appendChild(canvas);

      const ctx = canvas.getContext("2d");

      // Draw a placeholder map
      if (ctx) {
        // Background
        ctx.fillStyle = "#e5e7eb";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Grid lines
        ctx.strokeStyle = "#d1d5db";
        ctx.lineWidth = 1;

        // Horizontal grid lines
        for (let i = 0; i < canvas.height; i += 20) {
          ctx.beginPath();
          ctx.moveTo(0, i);
          ctx.lineTo(canvas.width, i);
          ctx.stroke();
        }

        // Vertical grid lines
        for (let i = 0; i < canvas.width; i += 20) {
          ctx.beginPath();
          ctx.moveTo(i, 0);
          ctx.lineTo(i, canvas.height);
          ctx.stroke();
        }

        // Roads
        ctx.strokeStyle = "#9ca3af";
        ctx.lineWidth = 3;

        // Main road
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();

        // Cross road
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.stroke();

        // Location marker
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        // Pin shadow
        ctx.beginPath();
        ctx.arc(centerX, centerY + 2, 8, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
        ctx.fill();

        // Pin body
        ctx.beginPath();
        ctx.arc(centerX, centerY, 10, 0, Math.PI * 2);
        ctx.fillStyle = "#ef4444";
        ctx.fill();

        // Pin inner circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, 5, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();

        // Map label
        ctx.font = "bold 14px Arial";
        ctx.fillStyle = "#111827";
        ctx.textAlign = "center";
        ctx.fillText("Beixinqiao, Beijing", centerX, centerY + 30);

        // Note text
        ctx.font = "12px Arial";
        ctx.fillStyle = "#4b5563";
        ctx.textAlign = "center";
        ctx.fillText(
          "Interactive Google Map would be implemented here",
          centerX,
          canvas.height - 20
        );
      }
    }

    return () => {
      if (mapRef.current) {
        while (mapRef.current.firstChild) {
          mapRef.current.removeChild(mapRef.current.firstChild);
        }
      }
    };
  }, []);

  return (
    <div
      ref={mapRef}
      className="h-full w-full rounded-lg bg-gray-100 dark:bg-gray-800"
      aria-label="Map showing Beixinqiao subdistrict, Dongcheng, Beijing"
    ></div>
  );
}
