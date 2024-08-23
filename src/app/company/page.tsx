"use client";
import React, { useState } from "react";
import { useTheme } from "../components/ThemeContext";
import "../../../styles/globals.css"; // Ensure your global styles are imported
import { CompanyList } from "../components/CompanyList";

interface FormData {
  date: string;
  name: string;
  gstNo: string;
  phoneNo: string;
  remarks: string;
}

const initialFormData: FormData = {
  date: "",
  name: "",
  gstNo: "",
  phoneNo: "",
  remarks: "",
};

const CompanyFormComponent: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const { theme } = useTheme();

  return (
    <>
      <form className="space-y-4 p-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label htmlFor="date" className="block mb-1">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              //   onChange={handleChange}
              className={`p-2 border rounded w-full ${
                theme === "dark" ? "dark" : "light"
              }`}
            />
          </div>
          <div>
            <label htmlFor="name" className="block mb-1">
              Comapny Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              //   onChange={handleChange}
              placeholder="Name"
              className={`p-2 border rounded w-full ${
                theme === "dark" ? "dark" : "light"
              }`}
            />
          </div>
          <div>
            <label htmlFor="gstNo" className="block mb-1">
              GST no.
            </label>
            <input
              type="text"
              id="gstNo"
              name="gstNo"
              value={formData.gstNo}
              //   onChange={handleChange}
              placeholder="Gst No"
              className={`p-2 border rounded w-full ${
                theme === "dark" ? "dark" : "light"
              }`}
            />
          </div>
          <div>
            <label htmlFor="phoneNo" className="block mb-1">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNo"
              name="phoneNo"
              value={formData.phoneNo}
              //   onChange={handleChange}
              placeholder="Phone Number"
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
              //   onChange={handleChange}
              placeholder="Remarks"
              className={`p-2 border rounded w-full ${
                theme === "dark" ? "dark" : "light"
              }`}
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button className="btn">Save</button>
        </div>
      </form>
      <CompanyList />
    </>
  );
};
export default CompanyFormComponent;
