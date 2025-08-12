import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("images");
  const [timings, setTimings] = useState({
    Monday: "",
    Tuesday: "",
    Wednesday: "",
    Thursday: "",
    Friday: "",
    Saturday: "",
    Sunday: "",
  });
  const [images, setImages] = useState([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch(`https://backendapi-khaki.vercel.app/getImageAndDetails`);
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleLogout = () => {
    navigate("/");
  };

  const handleUpload = () => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: "dypza1fuj",
        uploadPreset: "mkaudiology",
        sources: ["local", "url", "camera"],
        multiple: false,
        cropping: false,
        resourceType: "image",
      },
      async (error, result) => {
        if (!error && result?.event === "success") {
          const { secure_url, public_id } = result.info;
          setImages([]);

          const encodedUrl = encodeURIComponent(secure_url);
          const response = await fetch(
            `http://localhost:5000/saveImageAndDetails/${public_id}/${encodedUrl}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
            }
          );

          if (response.ok) {
            fetchImages();
          }
        }
      }
    );
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this image?"
    );
    if (!confirmDelete) return;

    try {
      if (!id || typeof id !== "string") {
        throw new Error("Invalid image ID");
      }

      const response = await fetch(
        `https://backendapi-khaki.vercel.app/deleteImageAndDetails/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || result.message || "Failed to delete image"
        );
      }

      setImages((prevImages) =>
        prevImages.filter((img) => img._id !== id)
      );
      alert("Image deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);
      alert(`Delete failed: ${error.message}`);
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex p-0">
      {/* Sidebar - now collapsible */}
      <aside
        className={`d-flex flex-column p-3 text-white ${sidebarCollapsed ? 'collapsed' : ''}`}
        style={{
          width: sidebarCollapsed ? "80px" : "250px",
          backgroundColor: "rgba(0, 106, 193, 0.95)",
          transition: "width 0.3s ease",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          {!sidebarCollapsed && <h2 className="text-center mb-0">Admin Panel</h2>}
          <button 
            className="btn btn-light btn-sm p-1"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? '»' : '«'}
          </button>
        </div>
        
        <nav className="flex-grow-1">
          <ul className="nav flex-column">
            <li
              className={`nav-item mb-2 p-2 rounded ${
                activeTab === "images" ? "bg-light text-dark" : ""
              }`}
              style={{ cursor: "pointer", whiteSpace: "nowrap" }}
              onClick={() => setActiveTab("images")}
            >
              {sidebarCollapsed ? (
                <span title="Images">📷</span>
              ) : (
                "Images"
              )}
            </li>
          </ul>
        </nav>

        <button
          className="btn btn-light w-100 mt-auto fw-bold"
          onClick={handleLogout}
        >
          {sidebarCollapsed ? '⚡' : 'Logout'}
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow-1 p-3 p-md-4 bg-light overflow-auto" style={{ height: "100vh" }}>
        {activeTab === "images" && (
          <div className="card shadow-sm p-3 p-md-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 style={{ color: "rgba(0, 106, 193, 0.95)" }}>
                Manage Images
              </h3>
              <button
                className="btn text-white"
                style={{ backgroundColor: "rgba(0, 106, 193, 0.95)" }}
                onClick={handleUpload}
              >
                Upload New Image
              </button>
            </div>
            
            <p className="mb-4">You can upload, delete, or edit clinic images here.</p>

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
              {images?.length > 0 ? (
                images.map((img, index) => (
                  <div key={index} className="col">
                    <div className="card h-100">
                      <img
                        src={img.url}
                        alt={`Uploaded ${index}`}
                        className="card-img-top img-fluid"
                        style={{
                          height: "180px",
                          objectFit: "cover",
                          width: "100%",
                        }}
                      />
                      <div className="card-body p-2 d-flex flex-column">
                        <button
                          className="btn btn-danger btn-sm mt-auto"
                          onClick={() => handleDelete(img.public_id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12">
                  <p className="text-center py-4">No images found. Upload some images to get started.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;