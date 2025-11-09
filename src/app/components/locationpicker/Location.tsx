"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { BeatLoader } from "react-spinners";

// Dynamically import Leaflet (client only)
const Leaflet = dynamic(() => import("leaflet"), { ssr: false });

interface LocationPickerProps {
  setSelectedLocation: (location: [number, number]) => void;
}

const LocationPicker: React.FC<LocationPickerProps> = ({ setSelectedLocation }) => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [pickedLocation, setPickedLocation] = useState<[number, number] | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // --- Get user location safely ---
  useEffect(() => {
    if (typeof window === "undefined") return; // Prevent SSR run

    if (!navigator.geolocation) {
      console.error("Geolocation not supported by this browser.");
      setUserLocation([27.7172, 85.324]); // Default: Kathmandu
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
        setLoading(false);
      },
      (error) => {
        // More descriptive logging
        console.error("Error getting location:", {
          code: error.code,
          message: error.message,
        });

        // Graceful fallback
        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert("Location permission was denied. Using default location.");
            break;
          case error.POSITION_UNAVAILABLE:
            alert("Location unavailable. Using default location.");
            break;
          case error.TIMEOUT:
            alert("Location request timed out. Using default location.");
            break;
          default:
            alert("Unable to get your location. Using default location.");
        }

        setUserLocation([27.7172, 85.324]); // Kathmandu fallback
        setLoading(false);
      }
    );
  }, []);

  // --- Initialize Leaflet map once userLocation + modal open ---
  useEffect(() => {
    if (userLocation && isOpen) {
      import("leaflet").then((L) => {
        const map = L.map("map").setView(userLocation, 13);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        const customIcon = L.icon({
          iconUrl: "/marker.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
        });

        const marker = L.marker(userLocation, { icon: customIcon }).addTo(map);

        // When user clicks on map
        map.on("click", (e: L.LeafletMouseEvent) => {
          const { lat, lng } = e.latlng;
          setPickedLocation([lat, lng]);
          marker.setLatLng([lat, lng]);
          marker
            .bindPopup(`Picked Location: ${lat.toFixed(4)}, ${lng.toFixed(4)}`)
            .openPopup();
        });

        return () => {
          map.remove();
        };
      });
    }
  }, [userLocation, isOpen]);

  // --- Confirm selected location ---
  const handleConfirm = () => {
    if (pickedLocation) {
      setSelectedLocation(pickedLocation);
      setIsOpen(false);
    } else {
      alert("Please pick a location on the map before confirming.");
    }
  };

  return (
    <div>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-black text-sm text-white rounded hover:bg-gray-700"
      >
        Pick your location
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg p-5 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              ✕
            </button>

            {/* Loader while fetching user location */}
            {loading ? (
              <div className="flex justify-center items-center h-80">
                <BeatLoader size={12} color="gray" />
              </div>
            ) : (
              <div className="mt-5">
                <div
                  id="map"
                  className="h-80 w-full rounded-lg shadow-lg overflow-hidden"
                />
              </div>
            )}

            {/* Picked Location Display */}
            {pickedLocation && (
              <div className="mt-4 text-center">
                <p>
                  <strong>Picked Location:</strong>{" "}
                  {pickedLocation[0].toFixed(4)}, {pickedLocation[1].toFixed(4)}
                </p>
              </div>
            )}

            {/* Confirm Button */}
            <div className="mt-4 text-center">
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Confirm Location
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationPicker;
