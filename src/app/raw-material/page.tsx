"use client";
import React, { useState } from "react";
import RawMaterialList from "../components/RawMaterialList";
import "../../../styles/globals.css"; // Ensure your global styles are imported
import { useTheme } from "../components/ThemeContext";

interface FormData {
  date: string;
  challanNo: string;
  company: string;
  designType: string;
  size: string;
  color: string;
  quantity: number;
  weight: number;
  remarks: string;
  quality: string;
  shuttleOrMat: string;
  receiving: string;
}

const initialFormData: FormData = {
  date: "",
  challanNo: "",
  company: "",
  designType: "",
  size: "",
  color: "",
  quantity: 0,
  weight: 0,
  remarks: "",
  quality: "",
  shuttleOrMat: "",
  receiving: "",
};

const FormComponent: React.FC = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 p-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
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
            <label htmlFor="challanNo" className="block mb-1">
              Challan No.
            </label>
            <input
              type="text"
              id="challanNo"
              name="challanNo"
              value={formData.challanNo}
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
            <label htmlFor="designType" className="block mb-1">
              Design Type
            </label>
            <input
              type="text"
              id="designType"
              name="designType"
              value={formData.designType}
              onChange={handleChange}
              placeholder="Design Type"
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
            <label htmlFor="shuttleOrMat" className="block mb-1">
              Shuttle or Mat
            </label>
            <input
              type="text"
              id="shuttleOrMat"
              name="shuttleOrMat"
              value={formData.shuttleOrMat}
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
      <RawMaterialList />
    </>
  );
};

export default FormComponent;
