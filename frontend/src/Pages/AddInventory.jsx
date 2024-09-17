import React, { useState, useEffect } from "react";
import AdminSidebar from "../Components/AdminSidebar";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Badge from "@mui/material/Badge";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import axios from "axios";
import Swal from "sweetalert2";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase.js";

export const AddInventory = () => {
  const [step, setStep] = useState(1);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [itemId, setItemId] = useState("");
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [sku, setSku] = useState("");
  const [mfd, setMfd] = useState("");
  const [exp, setExp] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  // Supplier fields
  const [supId, setSupId] = useState("");
  const [supName, setSupName] = useState("");
  const [supEmail, setSupEmail] = useState("");
  const [supNIC, setSupNIC] = useState("");
  const [supPhone, setSupPhone] = useState("");

  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageURL, setImageURL] = useState(null);
  const [loading, setLoading] = useState(false);

  const storage = getStorage(app);

  const generateItemId = () => {
    const id = `ITM${Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")}`;
    setItemId(id);
  };

  useEffect(() => {
    generateItemId();
  }, []);

  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    "& .MuiSwitch-switchBase": {
      margin: 1,
      padding: 0,
      transform: "translateX(6px)",
      "&.Mui-checked": {
        color: "#fff",
        transform: "translateX(22px)",
        "& .MuiSwitch-thumb:before": {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            "#fff"
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor: "#aab4be",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      backgroundColor: "#001e3c",
      width: 32,
      height: 32,
      "&::before": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    "& .MuiSwitch-track": {
      opacity: 1,
      backgroundColor: "#aab4be",
      borderRadius: 20 / 2,
    },
  }));

  const handleCollapseChange = (collapsed) => {
    setSidebarCollapsed(collapsed);
  };

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleUpload = () => {
    const storage = getStorage();
    const storageRef = ref(storage, `item_images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    setLoading(true);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (uploadError) => {
        console.error("Error uploading image:", uploadError);
        Swal.fire("Upload Error", "Error uploading image.", "error");
        setLoading(false);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("Download URL:", downloadURL);
          setImageURL(downloadURL);
          setLoading(false);
        } catch (error) {
          console.error("Error getting download URL:", error);
          Swal.fire("URL Error", "Error getting the download URL.", "error");
          setLoading(false);
        }
      }
    );
  };

  const handleSubmit = async () => {
    try {
      const resquestBody = {
        itemId: itemId,
        itemName: itemName,
        category: category,
        sku: sku,
        mfd: mfd,
        exp: exp,
        price: price,
        quantity: quantity,
        description: description,
        imageURL: imageURL,
        suplier: {
          supId: supId,
          supName: supName,
          supEmail: supEmail,
          supNIC: supNIC,
          supPhone: supPhone,
        },
      };
      const response = await axios.post(
        "http://localhost:3000/api/item/add",
        resquestBody
      );
      Swal.fire("Good job!", "New Item Successfully Saved!", "success");
      console.log(resquestBody);
    } catch (error) {
      console.log(error);
      Swal.fire("URL Error", "Error Adding New Item", "error");
    }
  };

  return (
    <div>
      <AdminSidebar onCollapseChange={handleCollapseChange} />

      <main
        style={{
          marginLeft: isSidebarCollapsed ? "60px" : "220px",
          transition: "margin-left 0.3s",
        }}
        className="bg-white min-h-screen rounded-2xl"
      >
        <header className="flex items-center justify-between h-16 shadow mb-5 rounded-2xl">
          <h2 className="items-center ml-20 font-bold text-2xl">
            Add New Inventory
          </h2>
          <div className="flex">
            <Badge color="secondary" badgeContent={100} sx={{ m: 1, mr: 5 }}>
              <NotificationsActiveIcon sx={{ fontSize: 30 }} />
            </Badge>
            <FormGroup>
              <FormControlLabel
                control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}
              />
            </FormGroup>
          </div>
        </header>

        {step === 1 && (
          <div className="pl-16 pt-2 pr-10 mt-20">
            <form>
              <div className="bg-slate-200 p-4 rounded-2xl shadow-sm">
                <h2 className="text-2xl font-bold mb-5">
                  Section 1: General Information
                </h2>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex flex-col w-1/3">
                    <label className="block text-gray-700 required">
                      Name:
                    </label>
                    <input
                      type="text"
                      name="itemName"
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                      className="border border-gray-300 rounded-md p-2 mr-10"
                      required
                    />
                  </div>
                  <div className="flex flex-col w-1/3">
                    <label className="block text-gray-700 required">
                      Category:
                    </label>
                    <input
                      type="text"
                      name="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="border border-gray-300 rounded-md p-2 bg-gray-100 mr-10"
                      required
                    />
                  </div>
                  <div className="flex flex-col w-1/3">
                    <label className="block text-gray-700 required">SKU:</label>
                    <input
                      type="text"
                      name="sku"
                      value={sku}
                      onChange={(e) => setSku(e.target.value)}
                      className="border border-gray-300 rounded-md p-2 bg-gray-100"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex flex-col w-1/4">
                    <label className="block text-gray-700 required">MFD:</label>
                    <input
                      type="date"
                      name="mfd"
                      value={mfd}
                      onChange={(e) => setMfd(e.target.value)}
                      className="border border-gray-300 rounded-md p-2 bg-gray-100 mr-10"
                      required
                    />
                  </div>
                  <div className="flex flex-col w-1/4">
                    <label className="block text-gray-700 required">Exp:</label>
                    <input
                      type="date"
                      name="exp"
                      value={exp}
                      onChange={(e) => setExp(e.target.value)}
                      className="border border-gray-300 rounded-md p-2 bg-gray-100 mr-10"
                      required
                    />
                  </div>
                  <div className="flex flex-col w-1/4">
                    <label className="block text-gray-700 required">
                      Price:
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="border border-gray-300 rounded-md p-2 bg-gray-100"
                      required
                    />
                  </div>
                  <div className="flex flex-col w-1/4">
                    <label className="block text-gray-700 required">
                      Quantity:
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="border border-gray-300 rounded-md p-2 bg-gray-100"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 required">
                    Description:
                  </label>
                  <textarea
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 w-full bg-gray-100"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700">Upload Image:</label>
                  <input
                    type="file"
                    name="image"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="border border-gray-300 rounded-md p-2 w-full"
                  />
                  {uploadProgress > 0 && (
                    <div className="w-full max-w-sm mt-4">
                      <div className="relative pt-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold inline-block py-1 px-2 rounded text-teal-600 bg-teal-200">
                            Upload Progress
                          </span>
                          <span className="text-xs font-semibold inline-block py-1 px-2 rounded text-teal-600 bg-teal-200">
                            {Math.round(uploadProgress)}%
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="relative flex items-center justify-center w-full">
                            <div className="w-full bg-gray-200 rounded">
                              <div
                                className="bg-teal-600 text-xs leading-none py-1 text-center text-white rounded"
                                style={{ width: `${uploadProgress}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center mb-4">
                  <button
                    onClick={handleUpload}
                    disabled={loading}
                    className="bg-black text-white text-xl px-4 py-2 rounded-md mt-5"
                  >
                    {loading ? "Uploading..." : "Upload"}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-blue-500 text-white p-2 rounded-md"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="pl-16 pt-2 pr-10 mt-20">
            <form>
              <div className="bg-slate-200 p-4 rounded-2xl shadow-sm">
                <h2 className="text-2xl font-bold mb-5">
                  Section 2: Supplier Information
                </h2>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex flex-col w-1/3">
                    <label className="block text-gray-700 required">
                      Supplier ID:
                    </label>
                    <input
                      type="text"
                      name="supId"
                      value={supId}
                      onChange={(e) => setSupId(e.target.value)}
                      className="border border-gray-300 rounded-md p-2 mr-10"
                      required
                    />
                  </div>
                  <div className="flex flex-col w-1/3">
                    <label className="block text-gray-700 required">
                      Supplier Name:
                    </label>
                    <input
                      type="text"
                      name="supName"
                      value={supName}
                      onChange={(e) => setSupName(e.target.value)}
                      className="border border-gray-300 rounded-md p-2 bg-gray-100 mr-10"
                      required
                    />
                  </div>
                  <div className="flex flex-col w-1/3">
                    <label className="block text-gray-700 required">
                      Supplier Email:
                    </label>
                    <input
                      type="email"
                      name="supEmail"
                      value={supEmail}
                      onChange={(e) => setSupEmail(e.target.value)}
                      className="border border-gray-300 rounded-md p-2 bg-gray-100"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex flex-col w-1/2">
                    <label className="block text-gray-700 required">
                      Supplier NIC:
                    </label>
                    <input
                      type="text"
                      name="supNIC"
                      value={supNIC}
                      onChange={(e) => setSupNIC(e.target.value)}
                      className="border border-gray-300 rounded-md p-2 mr-10"
                      required
                    />
                  </div>
                  <div className="flex flex-col w-1/2">
                    <label className="block text-gray-700 required">
                      Supplier Phone:
                    </label>
                    <input
                      type="tel"
                      name="supPhone"
                      value={supPhone}
                      onChange={(e) => setSupPhone(e.target.value)}
                      className="border border-gray-300 rounded-md p-2 bg-gray-100"
                      required
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-500 text-white p-2 rounded-md mr-4"
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="bg-blue-500 text-white p-2 rounded-md"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default AddInventory;
