import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { MapPin, Navigation, ThumbsUp, ArrowRight, ShieldAlert } from 'lucide-react';

export default function InteractiveMap({
  issues = [],
  mode = 'explorer', // 'explorer' | 'picker'
  selectedLocation = null,
  onLocationSelect = null,
  onSelectIssue = null,
  center = [12.9092, 77.5666],
  zoom = 14,
  height = '100%'
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);
  const pickerMarkerRef = useRef(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const initialCenter = selectedLocation
      ? [selectedLocation.lat, selectedLocation.lng]
      : center;

    const map = L.map(mapContainerRef.current, {
      center: initialCenter,
      zoom: zoom,
      zoomControl: false,
      attributionControl: false
    });

    // Add standard OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Zoom control in bottom right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Layer group for dynamic markers
    const markersGroup = L.layerGroup().addTo(map);
    markersLayerRef.current = markersGroup;
    mapInstanceRef.current = map;

    // Handle clicks in picker mode
    if (mode === 'picker') {
      map.on('click', (e) => {
        const { lat, lng } = e.latlng;
        if (onLocationSelect) {
          onLocationSelect({
            lat: parseFloat(lat.toFixed(5)),
            lng: parseFloat(lng.toFixed(5)),
            address: `Pin at ${lat.toFixed(4)}, ${lng.toFixed(4)}`,
            neighborhood: 'Selected Location'
          });
        }
      });
    }

    // Force map to adapt to container layout
    const resizeObserver = new ResizeObserver(() => {
      if (map) {
        map.invalidateSize();
      }
    });

    if (mapContainerRef.current) {
      resizeObserver.observe(mapContainerRef.current);
    }

    setTimeout(() => {
      map.invalidateSize();
    }, 250);

    return () => {
      resizeObserver.disconnect();
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Markers in Explorer Mode
  useEffect(() => {
    if (mode !== 'explorer') return;
    const map = mapInstanceRef.current;
    const markersGroup = markersLayerRef.current;
    if (!map || !markersGroup) return;

    markersGroup.clearLayers();

    issues.forEach((issue) => {
      if (!issue.location?.lat || !issue.location?.lng) return;

      const isEmergency = issue.urgency === 'Emergency';
      const isResolved = issue.status === 'Resolved';
      const isHigh = issue.urgency === 'High';

      let bgClass = 'bg-teal-600 text-white';
      let ringColor = 'rgba(13, 148, 136, 0.4)';

      if (isResolved) {
        bgClass = 'bg-emerald-600 text-white';
        ringColor = 'rgba(16, 185, 129, 0.4)';
      } else if (isEmergency) {
        bgClass = 'bg-red-600 text-white animate-pulse';
        ringColor = 'rgba(239, 68, 68, 0.7)';
      } else if (isHigh) {
        bgClass = 'bg-amber-500 text-slate-900';
        ringColor = 'rgba(245, 158, 11, 0.5)';
      }

      const iconHtml = `
        <div style="position: relative; width: 38px; height: 38px; display: flex; align-items: center; justify-content: center;">
          ${
            isEmergency
              ? `<div style="position: absolute; inset: -6px; border-radius: 9999px; background: ${ringColor}; animation: pulse-beacon 1.8s infinite;"></div>`
              : ''
          }
          <div class="custom-marker-pin ${bgClass}" style="width: 34px; height: 34px; border: 2.5px solid white; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold;">
            ${
              isResolved
                ? '✓'
                : isEmergency
                ? '⚡'
                : isHigh
                ? '!'
                : '•'
            }
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: iconHtml,
        className: 'civic-marker-wrapper',
        iconSize: [38, 38],
        iconAnchor: [19, 19],
        popupAnchor: [0, -20]
      });

      const marker = L.marker([issue.location.lat, issue.location.lng], {
        icon: customIcon
      });

      // Rich interactive Popup
      const popupContent = document.createElement('div');
      popupContent.className = 'civic-popup-card';
      popupContent.style.minWidth = '240px';
      popupContent.style.maxWidth = '280px';
      popupContent.innerHTML = `
        <div style="overflow: hidden; border-radius: 12px; font-family: inherit;">
          <div style="height: 110px; width: 100%; position: relative; background: #0f172a;">
            <img src="${issue.mediaUrl}" alt="${issue.title}" style="width: 100%; height: 100%; object-fit: cover;" />
            <div style="position: absolute; top: 6px; left: 6px; background: rgba(15,23,42,0.85); color: #fff; font-size: 10px; font-weight: bold; padding: 2px 6px; border-radius: 4px;">
              ${issue.ticketId}
            </div>
            <div style="position: absolute; top: 6px; right: 6px; background: ${
              isResolved ? '#059669' : isEmergency ? '#dc2626' : '#d97706'
            }; color: white; font-size: 10px; font-weight: bold; padding: 2px 6px; border-radius: 4px;">
              ${issue.status}
            </div>
          </div>
          <div style="padding: 10px 4px 4px 4px;">
            <div style="font-weight: 700; font-size: 13px; line-height: 1.3; color: #0f172a; margin-bottom: 4px;">
              ${issue.title}
            </div>
            <div style="font-size: 11px; color: #64748b; margin-bottom: 8px; display: flex; align-items: center; gap: 4px;">
              📍 ${issue.location.neighborhood || issue.location.address}
            </div>
            <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid #f1f5f9; padding-top: 8px; margin-top: 4px;">
              <span style="font-size: 11px; font-weight: 600; color: #0d9488;">
                ▲ ${issue.upvotes} Citizens Endorsed
              </span>
              <button id="view-btn-${issue.id}" style="background: #0f172a; color: white; border: none; border-radius: 6px; padding: 4px 8px; font-size: 11px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 4px;">
                View Details →
              </button>
            </div>
          </div>
        </div>
      `;

      popupContent.querySelector(`#view-btn-${issue.id}`)?.addEventListener('click', (e) => {
        e.stopPropagation();
        if (onSelectIssue) onSelectIssue(issue);
      });

      marker.bindPopup(popupContent, { maxWidth: 300 });
      markersGroup.addLayer(marker);
    });
  }, [issues, mode, onSelectIssue]);

  // Update Draggable Marker in Picker Mode
  useEffect(() => {
    if (mode !== 'picker') return;
    const map = mapInstanceRef.current;
    if (!map) return;

    const lat = selectedLocation?.lat || center[0];
    const lng = selectedLocation?.lng || center[1];

    if (!pickerMarkerRef.current) {
      const pinHtml = `
        <div style="position: relative; width: 42px; height: 42px; display: flex; align-items: center; justify-content: center;">
          <div style="position: absolute; inset: -4px; border-radius: 9999px; background: rgba(13, 148, 136, 0.4); animation: pulse-beacon 2s infinite;"></div>
          <div style="width: 36px; height: 36px; border-radius: 9999px; background: #0d9488; border: 3px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 16px;">
            📍
          </div>
        </div>
      `;

      const pickerIcon = L.divIcon({
        html: pinHtml,
        className: 'civic-picker-pin',
        iconSize: [42, 42],
        iconAnchor: [21, 21]
      });

      const marker = L.marker([lat, lng], {
        icon: pickerIcon,
        draggable: true
      }).addTo(map);

      marker.on('dragend', (e) => {
        const pos = e.target.getLatLng();
        if (onLocationSelect) {
          onLocationSelect({
            lat: parseFloat(pos.lat.toFixed(5)),
            lng: parseFloat(pos.lng.toFixed(5)),
            address: `Pin placed at ${pos.lat.toFixed(4)}, ${pos.lng.toFixed(4)}`,
            neighborhood: 'Custom Geolocation'
          });
        }
      });

      pickerMarkerRef.current = marker;
    } else {
      pickerMarkerRef.current.setLatLng([lat, lng]);
      map.panTo([lat, lng]);
    }
  }, [selectedLocation, mode, center, onLocationSelect]);

  const handleCenterUserLocation = () => {
    if (!mapInstanceRef.current) return;
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          mapInstanceRef.current.flyTo([latitude, longitude], 15);
          if (mode === 'picker' && onLocationSelect) {
            onLocationSelect({
              lat: parseFloat(latitude.toFixed(5)),
              lng: parseFloat(longitude.toFixed(5)),
              address: 'Auto-detected current location',
              neighborhood: 'Current Vicinity'
            });
          }
        },
        () => {
          // Fallback to metropolitan default
          mapInstanceRef.current.flyTo([40.7180, -74.0020], 14);
        }
      );
    }
  };

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-slate-200 shadow-sm" style={{ height }}>
      {/* Map Container */}
      <div ref={mapContainerRef} className="w-full h-full min-h-[300px]" />

      {/* Floating Map Controls & Badges */}
      <div className="absolute top-4 left-4 z-[400] flex flex-col gap-2">
        <div className="bg-slate-900/90 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded-xl shadow-lg border border-slate-700/60 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <span>{mode === 'picker' ? 'Drag pin or click map to set location' : `${issues.length} Civic Incidents Monitored`}</span>
        </div>

        {mode === 'explorer' && (
          <div className="hidden sm:flex items-center gap-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md border border-slate-200 text-[11px] font-semibold text-slate-700">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping inline-block" />
              Emergency
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
              High
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-600 inline-block" />
              Active
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
              Resolved
            </span>
          </div>
        )}
      </div>

      {/* Recenter GPS floating button */}
      <button
        onClick={handleCenterUserLocation}
        title="Center on my location"
        className="absolute bottom-5 left-4 z-[400] bg-white hover:bg-slate-50 text-slate-800 p-2.5 rounded-xl shadow-lg border border-slate-200 flex items-center gap-2 text-xs font-semibold transition-all hover:scale-105 active:scale-95"
      >
        <Navigation className="w-4 h-4 text-teal-600" />
        <span className="hidden sm:inline">My Location</span>
      </button>
    </div>
  );
}
