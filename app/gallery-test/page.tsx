"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { apiClient, GalleryPhoto } from "@/api/client";

export default function GalleryTestPage() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<string>("general");

  const fetchPhotos = async (albumSlug: string) => {
    try {
      setLoading(true);
      setError(null);
      console.log(`🎨 Testing: Fetching photos from album: ${albumSlug}`);

      const data = await apiClient.getAlbum(albumSlug);
      console.log("🎨 Testing: API Response:", data);

      const photoList = data.photos || [];
      console.log("🎨 Testing: Photo list:", photoList.map(p => ({
        id: p.id,
        title: p.title,
        image: p.image,
        hasImage: !!p.image
      })));

      setPhotos(photoList);

      console.log(`🎨 Testing: Found ${photoList.length} photos in ${albumSlug} album`);
    } catch (err) {
      console.error("🎨 Testing: Error fetching photos:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos(selectedAlbum);
  }, [selectedAlbum]);

  const handleAlbumChange = (albumSlug: string) => {
    setSelectedAlbum(albumSlug);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "30px", color: "#333" }}>🖼️ Gallery API Test Page</h1>

      {/* Album Selector */}
      <div style={{ marginBottom: "30px" }}>
        <h3>Select Album:</h3>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {["general", "before-after"].map((album) => (
            <button
              key={album}
              onClick={() => handleAlbumChange(album)}
              style={{
                padding: "10px 20px",
                backgroundColor: selectedAlbum === album ? "#007bff" : "#f8f9fa",
                color: selectedAlbum === album ? "white" : "#333",
                border: "1px solid #ddd",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "14px"
              }}
            >
              {album === "general" ? "General Gallery" : "Before/After Gallery"}
            </button>
          ))}
        </div>
      </div>

      {/* Status Info */}
      <div style={{ marginBottom: "20px", padding: "15px", backgroundColor: "#f8f9fa", borderRadius: "5px" }}>
        <h3>📊 Status:</h3>
        <p><strong>Selected Album:</strong> {selectedAlbum}</p>
        <p><strong>Loading:</strong> {loading ? "Yes" : "No"}</p>
        <p><strong>Photos Count:</strong> {photos.length}</p>
        {error && <p style={{ color: "red" }}><strong>Error:</strong> {error}</p>}
      </div>

      {/* Loading State */}
      {loading && (
        <div style={{ textAlign: "center", padding: "50px" }}>
          <div style={{ fontSize: "18px", marginBottom: "10px" }}>⏳ Loading photos...</div>
          <div style={{ color: "#666" }}>Testing API connection to {selectedAlbum} album</div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div style={{
          padding: "20px",
          backgroundColor: "#ffebee",
          border: "1px solid #f44336",
          borderRadius: "5px",
          color: "#c62828"
        }}>
          <h3>❌ Error Loading Photos</h3>
          <p>{error}</p>
          <button
            onClick={() => fetchPhotos(selectedAlbum)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginTop: "10px"
            }}
          >
            Try Again
          </button>
        </div>
      )}

      {/* Photos Grid */}
      {!loading && !error && (
        <div>
          <h3 style={{ marginBottom: "20px" }}>
            📸 Photos ({photos.length} found)
          </h3>

          {photos.length === 0 ? (
            <div style={{
              textAlign: "center",
              padding: "50px",
              backgroundColor: "#fff3e0",
              border: "1px solid #ff9800",
              borderRadius: "5px",
              color: "#e65100"
            }}>
              <h4>📭 No Photos Found</h4>
              <p>The {selectedAlbum} album appears to be empty or not accessible.</p>
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "20px"
            }}>
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    overflow: "hidden",
                    backgroundColor: "white",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                  }}
                >
                  {/* Image */}
                  <div style={{ position: "relative", height: "200px", backgroundColor: "#f5f5f5" }}>
                    {photo.image ? (
                      <Image
                        src={photo.image}
                        alt={photo.title || photo.description || `Photo ${photo.id}`}
                        fill
                        style={{ objectFit: "cover" }}
                        onError={(e) => {
                          console.error(`❌ Image failed to load: ${photo.image}`);
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                        color: "#999",
                        fontSize: "14px"
                      }}>
                        🚫 No Image URL
                      </div>
                    )}
                  </div>

                  {/* Photo Info */}
                  <div style={{ padding: "15px" }}>
                    <h4 style={{ margin: "0 0 10px 0", fontSize: "16px", color: "#333" }}>
                      ID: {photo.id}
                    </h4>

                    {photo.title && (
                      <p style={{ margin: "5px 0", fontWeight: "bold", color: "#555" }}>
                        📝 {photo.title}
                      </p>
                    )}

                    {photo.description && (
                      <p style={{ margin: "5px 0", color: "#666", fontSize: "14px" }}>
                        📖 {photo.description}
                      </p>
                    )}

                    <div style={{ marginTop: "10px", fontSize: "12px", color: "#888" }}>
                      <p>🖼️ Album ID: {photo.albumId}</p>
                      {photo.width && photo.height && (
                        <p>📐 Size: {photo.width} × {photo.height}px</p>
                      )}
                      {photo.imagePublicId && (
                        <p>🔗 Public ID: {photo.imagePublicId}</p>
                      )}
                      {photo.tag && (
                        <p>🏷️ Tag: {photo.tag}</p>
                      )}
                      {photo.createdAt && (
                        <p>📅 Created: {new Date(photo.createdAt).toLocaleDateString()}</p>
                      )}
                    </div>

                    {/* Image URL */}
                    <div style={{
                      marginTop: "10px",
                      padding: "8px",
                      backgroundColor: photo.image ? "#e8f5e8" : "#ffebee",
                      borderRadius: "3px",
                      fontSize: "11px",
                      wordBreak: "break-all",
                      color: photo.image ? "#2e7d32" : "#c62828"
                    }}>
                      <strong>Image Status:</strong><br />
                      {photo.image ? (
                        <>
                          ✅ Has URL: {photo.image}
                          <div style={{ color: "#1976d2", marginTop: "4px" }}>
                            🔗 From API 'url' field
                          </div>
                        </>
                      ) : (
                        <>
                          ❌ No image URL
                          {photo.url && (
                            <div style={{ color: "#1976d2", marginTop: "4px" }}>
                              🔄 Has 'url' field: {photo.url}
                            </div>
                          )}
                          {photo.title && (
                            <div style={{ color: "#f57c00", marginTop: "4px" }}>
                              📝 Filename: {photo.title}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* API Info */}
      <div style={{
        marginTop: "50px",
        padding: "20px",
        backgroundColor: "#e8f5e8",
        border: "1px solid #4caf50",
        borderRadius: "5px"
      }}>
        <h3>🔧 API Testing Info</h3>
        <p><strong>Base URL:</strong> {process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3002'}/api/v1</p>
        <p><strong>Current Endpoint:</strong> /public/gallery/albums/{selectedAlbum}</p>
        <p><strong>Method:</strong> GET (via Next.js proxy: /api/gallery?album={selectedAlbum})</p>
        <p><strong>Expected Response:</strong> JSON with album and photos array</p>

        <details style={{ marginTop: "10px" }}>
          <summary style={{ cursor: "pointer", fontWeight: "bold" }}>📋 API Response Structure</summary>
          <pre style={{
            marginTop: "10px",
            padding: "10px",
            backgroundColor: "#f8f9fa",
            borderRadius: "3px",
            fontSize: "12px",
            overflow: "auto"
          }}>
{`{
  "album": {
    "id": 1,
    "name": "General",
    "slug": "general",
    "type": "GENERAL"
  },
  "photos": [
    {
      "id": 1,
      "title": "Photo Title",
      "description": "Photo Description",
      "image": "https://example.com/photo.jpg",
      "imagePublicId": "photo-public-id",
      "albumId": 1,
      "tag": "general",
      "width": 800,
      "height": 600,
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ]
}`}
          </pre>
        </details>
      </div>
    </div>
  );
}
