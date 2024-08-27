"use client";
import React, { useEffect, useState } from "react";
import RawMaterialList from "../components/RawMaterialList";
import "../../../styles/globals.css"; // Ensure your global styles are imported
import { useTheme } from "../components/ThemeContext";
import axios from "axios";
import { getCSRFToken } from "../../utils/tools";
import axiosInstance from "@/utils/axiosInstance";

interface FormData {
  date: string;
  challan_no: string;
  company: string;
  design: string;
  type: string;
  size: string;
  color: string;
  quantity: number;
  weight: number;
  remarks: string;
  quality: string;
  shuttle_or_mat: string;
  receiving: string;
}

interface DataItem {
  date: string;
  challan_no: string;
  company: string;
  design: string;
  type: string;
  size: string;
  color: string;
  quantity: number;
  weight: number;
  remarks: string;
  quality: string;
  shuttle_or_mat: string;
  receiving: string;
}

const initialFormData: FormData = {
  date: "",
  challan_no: "",
  company: "",
  design: "",
  type: "",
  size: "",
  color: "",
  quantity: 0,
  weight: 0,
  remarks: "",
  quality: "",
  shuttle_or_mat: "",
  receiving: "",
};

const FormComponent: React.FC = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [productsData, setProductsData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [csvFile, setCsvFile] = useState<File | null>(null);

  useEffect(() => {
    fetchData(); // Call the async function
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/api/products/", {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCSRFToken(),
        },
      });
      setProductsData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    const response = await axiosInstance.post("/api/products/", formData, {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCSRFToken(),
      },
    });
    await fetchData();

    console.log("response: ", response);
  };

  const handleCsvUpload = async () => {
    if (!csvFile) return;

    const formData = new FormData();
    formData.append("file", csvFile);

    try {
      const response = await axiosInstance.post("/api/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": getCSRFToken(),
        },
      });
      console.log("CSV upload response:", response);
      await fetchData(); // Reload the data after successful upload
    } catch (error) {
      console.error("Error uploading CSV:", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCsvFile(e.target.files[0]);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 p-4">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          <div>
            <label htmlFor="date" className="block mb-1">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`p-2 border rounded w-full ${
                theme === "dark" ? "dark" : "light"
              }`}
            />
          </div>

          <div>
            <label htmlFor="challan_no" className="block mb-1">
              Challan No.
            </label>
            <input
              type="text"
              id="challan_no"
              name="challan_no"
              value={formData.challan_no}
              onChange={handleChange}
              placeholder="Challan No."
              className={`p-2 border rounded w-full ${
                theme === "dark" ? "dark" : "light"
              }`}
            />
          </div>

          <div>
            <label htmlFor="company" className="block mb-1">
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Company"
              className={`p-2 border rounded w-full ${
                theme === "dark" ? "dark" : "light"
              }`}
            />
          </div>

          <div>
            <label htmlFor="design" className="block mb-1">
              Design Type
            </label>
            <input
              type="text"
              id="design"
              name="design"
              value={formData.design}
              onChange={handleChange}
              placeholder="Design"
              className={`p-2 border rounded w-full ${
                theme === "dark" ? "dark" : "light"
              }`}
            />
          </div>

          <div>
            <label htmlFor="type" className="block mb-1">
              Design Type
            </label>
            <input
              type="text"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              placeholder="Type"
              className={`p-2 border rounded w-full ${
                theme === "dark" ? "dark" : "light"
              }`}
            />
          </div>

          <div>
            <label htmlFor="size" className="block mb-1">
              Size
            </label>
            <input
              type="text"
              id="size"
              name="size"
              value={formData.size}
              onChange={handleChange}
              placeholder="Size"
              className={`p-2 border rounded w-full ${
                theme === "dark" ? "dark" : "light"
              }`}
            />
          </div>

          <div>
            <label htmlFor="color" className="block mb-1">
              Color
            </label>
            <input
              type="text"
              id="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              placeholder="Color"
              className={`p-2 border rounded w-full ${
                theme === "dark" ? "dark" : "light"
              }`}
            />
          </div>

          <div>
            <label htmlFor="quantity" className="block mb-1">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Quantity"
              className={`p-2 border rounded w-full ${
                theme === "dark" ? "dark" : "light"
              }`}
            />
          </div>

          <div>
            <label htmlFor="weight" className="block mb-1">
              Weight
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="Weight"
              className={`p-2 border rounded w-full ${
                theme === "dark" ? "dark" : "light"
              }`}
            />
          </div>

          <div>
            <label htmlFor="remarks" className="block mb-1">
              Remarks
            </label>
            <input
              type="text"
              id="remarks"
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              placeholder="Remarks"
              className={`p-2 border rounded w-full ${
                theme === "dark" ? "dark" : "light"
              }`}
            />
          </div>

          <div>
            <label htmlFor="quality" className="block mb-1">
              Quality
            </label>
            <input
              type="text"
              id="quality"
              name="quality"
              value={formData.quality}
              onChange={handleChange}
              placeholder="Quality"
              className={`p-2 border rounded w-full ${
                theme === "dark" ? "dark" : "light"
              }`}
            />
          </div>

          <div>
            <label htmlFor="shuttle_or_mat" className="block mb-1">
              Shuttle or Mat
            </label>
            <input
              type="text"
              id="shuttle_or_mat"
              name="shuttle_or_mat"
              value={formData.shuttle_or_mat}
              onChange={handleChange}
              placeholder="Shuttle or Mat"
              className={`p-2 border rounded w-full ${
                theme === "dark" ? "dark" : "light"
              }`}
            />
          </div>

          <div>
            <label htmlFor="receiving" className="block mb-1">
              Receiving
            </label>
            <input
              type="text"
              id="receiving"
              name="receiving"
              value={formData.receiving}
              onChange={handleChange}
              placeholder="Receiving"
              className={`p-2 border rounded w-full ${
                theme === "dark" ? "dark" : "light"
              }`}
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button type="submit" className="btn">
            Save
          </button>
        </div>
      </form>
      <div className="flex justify-end mb-4">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="hidden"
          id="upload-csv"
        />
        <label htmlFor="upload-csv" className="btn">
          Choose CSV File
        </label>
        <button
          onClick={handleCsvUpload}
          className="btn ml-2 mr-6"
          disabled={!csvFile}
        >
          Upload CSV
        </button>
      </div>
      <RawMaterialList productsData={productsData} loading={loading} />
    </>
  );
};

export default FormComponent;
