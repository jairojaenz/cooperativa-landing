"use client";

import { useEffect } from "react";
import "leaflet/dist/leaflet.css";

export default function MapaCooperativa() {
  useEffect(() => {
    (async () => {
      const L = await import("leaflet");

      // Corregir íconos que no cargan por defecto en Next.js
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "/leaflet/marker-icon-2x.png",
        iconUrl: "/leaflet/marker-icon.png",
        shadowUrl: "/leaflet/marker-shadow.png",
      });

      const mapId = "map";

      // ✅ Evitar duplicación del mapa
      const existingMap = L.DomUtil.get(mapId);
      if (existingMap && existingMap._leaflet_id) {
        existingMap._leaflet_id = null;
      }

      const map = L.map(mapId, {
        center: [13.36278, -86.25861],
        zoom: 13,
        scrollWheelZoom: true,
        dragging: true,
        zoomControl: true,
        minZoom: 2, // evitar alejarse demasiado
        maxBounds: [
          [-90, -180],
          [90, 180],
        ], // evitar que se desplace infinito
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© Colaboradores de OpenStreetMap",
        noWrap: true, // 🔒 evitar múltiples mapamundis
      }).addTo(map);

      L.marker([13.36278, -86.25861])
        .addTo(map)
        .bindPopup("Ubicación de la Cooperativa CONTINUE")
        .openPopup();
    })();
  }, []);

  return (
    <div>
      <div
        id="map"
        className="absolute inset-0 z-0"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}
