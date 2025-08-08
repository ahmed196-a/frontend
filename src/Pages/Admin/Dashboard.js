
// import React, { useState, useEffect } from "react";
// import "./Dashboard.css";

// const Dashboard = () => {
//   const [activeTab, setActiveTab] = useState("images");
//   const [timings, setTimings] = useState({
//     Monday: "",
//     Tuesday: "",
//     Wednesday: "",
//     Thursday: "",
//     Friday: "",
//     Saturday: "",
//     Sunday: "",
//   });
//   const [images, setImages] = useState([]);

//   // Fetch images on component mount
//   useEffect(() => {
//     fetchImages();
//   }, []);

//   const fetchImages = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/getImageAndDetails");
//       const data = await response.json();
//       // Store both URL and public_id for each image
//       console.log(data)
//       setImages(data);
//     } catch (error) {
//       console.error("Fetch error:", error);
//     }
//   };

//   const handleTimingChange = (day, value) => {
//     setTimings((prev) => ({ ...prev, [day]: value }));
//   };

//   const handleSaveTimings = () => {
//     console.log("Saved Timings:", timings);
//     alert("Clinic timings saved successfully!");
//   };

//   const handleUpload = () => {
//     window.cloudinary.openUploadWidget(
//       {
//         cloudName: "dypza1fuj",
//         uploadPreset: "mkaudiology",
//         sources: ["local", "url", "camera"],
//         multiple: false,
//         cropping: false,
//         resourceType: "image",
//       },
//       async (error, result) => {
//         if (!error && result?.event === "success") {
//           const { secure_url, public_id } = result.info;
//           setImages([]);

//           const encodedUrl = encodeURIComponent(secure_url);
//           const response = await fetch(
//             `http://localhost:5000/saveImageAndDetails/${public_id}/${encodedUrl}`,
//             {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//             }
//           );

//           if (response.ok) {
//             console.log("response.ok", secure_url);
//             fetchImages(); // Refresh list
//           }
//         }
//       }
//     );
//   };

//   const handleDelete = async (public_id) => {
//     const confirmDelete = window.confirm("Delete this image?");
//     if (!confirmDelete) return;

//     try {
//       await fetch(`http://localhost:5000/delete/${public_id}`, {
//         method: "DELETE",
//       });
//       setImages((prev) => prev.filter((img) => img.public_id !== public_id));
//     } catch (error) {
//       console.error("Delete error:", error);
//     }
//   };

//   return (
//     <div className="dashboard-container">
//       <aside className="dashboard-sidebar">
//         <h2 className="sidebar-title">Admin Panel</h2>
//         <nav>
//           <ul>
//             <li
//               className={activeTab === "images" ? "active" : ""}
//               onClick={() => setActiveTab("images")}
//             >
//               Images
//             </li>
//             {/* <li
//               className={activeTab === "timings" ? "active" : ""}
//               onClick={() => setActiveTab("timings")}
//             >
//               Timings
//             </li>*/}
//           </ul> 
//         </nav>
//       </aside>

//       <main className="dashboard-content">
//         {activeTab === "images" && (
//           <div className="dashboard-card">
//             <h3>Manage Images</h3>
//             <p>You can upload, delete, or edit clinic images here.</p>

//             {/* Uploaded Images Preview */}
//             <div className="image-gallery">
//               {images?.length > 0 ? (
//                 images.map((img, index) => (
//                   <div key={index} className="image-item">
//                     <img src={img.url} alt={`Uploaded ${index}`} />
//                     {/* <button
//                       className="delete-btn"
//                       onClick={() => handleDelete(img.public_id)}
//                     >
//                       Delete
//                     </button> */}
//                   </div>
//                 ))
//               ) : (
//                 <p>No images found. Upload some images to get started.</p>
//               )}
//             </div>

//             <button className="dashboard-button" onClick={handleUpload}>
//               Upload New Image
//             </button>
//           </div>
//         )}

//         {/* {activeTab === "timings" && (
//           <div className="dashboard-card">
//             <h3>Update Clinic Timings</h3>
//             <table className="timing-table">
//               <thead>
//                 <tr>
//                   <th>Day</th>
//                   <th>Clinic Timings</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {Object.keys(timings).map((day) => (
//                   <tr key={day}>
//                     <td>{day}</td>
//                     <td>
//                       <input
//                         type="text"
//                         placeholder="e.g. 10:00 AM - 6:00 PM"
//                         value={timings[day]}
//                         onChange={(e) =>
//                           handleTimingChange(day, e.target.value)
//                         }
//                       />
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             <button className="dashboard-button mt" onClick={handleSaveTimings}>
//               Save Timings
//             </button>
//           </div> */}
//         {/* )} */}
//       </main>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

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
  const navigate = useNavigate();

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch("http://localhost:5000/getImageAndDetails");
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleTimingChange = (day, value) => {
    setTimings((prev) => ({ ...prev, [day]: value }));
  };

  const handleSaveTimings = () => {
    console.log("Saved Timings:", timings);
    alert("Clinic timings saved successfully!");
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
            console.log("response.ok", secure_url);
            fetchImages();
          }
        }
      }
    );
  };

  const handleDelete = async (public_id) => {
    const confirmDelete = window.confirm("Delete this image?");
    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:5000/delete/${public_id}`, {
        method: "DELETE",
      });
      setImages((prev) => prev.filter((img) => img.public_id !== public_id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <h2 className="sidebar-title">Admin Panel</h2>
        <nav>
          <ul>
            <li
              className={activeTab === "images" ? "active" : ""}
              onClick={() => setActiveTab("images")}
            >
              Images
            </li>
          </ul>
        </nav>

        {/* Logout Button */}
        <div style={{ marginTop: "auto" }}>
          <button className="dashboard-button logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>

      <main className="dashboard-content">
        {activeTab === "images" && (
          <div className="dashboard-card">
            <h3>Manage Images</h3>
            <p>You can upload, delete, or edit clinic images here.</p>

            <div className="image-gallery">
              {images?.length > 0 ? (
                images.map((img, index) => (
                  <div key={index} className="image-item">
                    <img src={img.url} alt={`Uploaded ${index}`} />
                    {/* 
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(img.public_id)}
                    >
                      Delete
                    </button> 
                    */}
                  </div>
                ))
              ) : (
                <p>No images found. Upload some images to get started.</p>
              )}
            </div>

            <button className="dashboard-button" onClick={handleUpload}>
              Upload New Image
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
