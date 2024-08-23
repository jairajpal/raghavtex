"use client";
import React, { useState } from "react";
import { useTheme } from "../components/ThemeContext";
import "../../../styles/globals.css"; // Ensure your global styles are imported
import { TanaList } from "../components/Tana";

interface FormData {
  date: string;
  loomNo: string;
  company: string;
  designType: string;
  warp: string;
  warpColor: string;
  weft: string;
  weftColor: string;
  widthInch: string;
  lengthMeter: string;
  threadCount: string;
  reed: string;
  bOrM: string;
  dentThread: string;
  remarks: string;
}

const initialFormData: FormData = {
  date: "",
  loomNo: "",
  company: "",
  designType: "",
  warp: "",
  warpColor: "",
  weft: "",
  weftColor: "",
  widthInch: "",
  lengthMeter: "",
  threadCount: "",
  reed: "",
  bOrM: "",
  dentThread: "",
  remarks: "",
};

const CompanyFormComponent: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const { theme } = useTheme();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
              onChange={handleChange}
              className={`p-2 border rounded w-full ${
                theme === "dark" ? "dark" : "light"
              }`}
            />
          </div>
          <div>
            <label htmlFor="loomNo" className="block mb-1">
              Loom No.
            </label>
            <input
              type="text"
              id="loomNo"
              name="loomNo"
              value={formData.loomNo}
              onChange={handleChange}
              placeholder="Loom No."
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
            <label htmlFor="warp" className="block mb-1">
              Warp
            </label>
            <input
              type="text"
              id="warp"
              name="warp"
              value={formData.warp}
              onChange={handleChange}
              placeholder="Warp"
              className={`p-2 border rounded w-full ${
                theme === "dark" ? "dark" : "light"
              }`}
            />
          </div>
          <div>
            <label htmlFor="warpColor" className="block mb-1">
              Warp Color
            </label>
            <input
              type="text"
              id="warpColor"
              name="warpColor"
              value={formData.warpColor}
              onChange={handleChange}
              placeholder="Warp Color"
              className={`p-2 border rounded w-full ${
                theme === "dark" ? "dark" : "light"
              }`}
            />
          </div>
          <div>
            <label htmlFor="weft" className="block mb-1">
              Weft
            </label>
            <input
              type="text"
              id="weft"
              name="weft"
              value={formData.weft}
              onChange={handleChange}
              placeholder="Weft"
              className={`p-2 border rounded w-full ${
                theme === "dark" ? "dark" : "light"
              }`}
            />
          </div>
          <div>
            <label htmlFor="weftColor" className="block mb-1">
              Weft Color
            </label>
            <input
              type="text"
              id="weftColor"
              name="weftColor"
              value={formData.weftColor}
              onChange={handleChange}
              placeholder="Weft Color"
              className={`p-2 border rounded w-full ${
                theme === "dark" ? "dark" : "light"
              }`}
            />
          </div>
          <div>
            <label htmlFor="widthInch" className="block mb-1">
              Width (inch)
            </label>
            <input
              type="text"
              id="widthInch"
              name="widthInch"
              value={formData.widthInch}
              onChange={handleChange}
              placeholder="Width (inch)"
              className={`p-2 border rounded w-full ${
                theme === "dark" ? "dark" : "light"
              }`}
            />
          </div>
          <div>
            <label htmlFor="lengthMeter" className="block mb-1">
              Length (Meter)
            </label>
            <input
              type="text"
              id="lengthMeter"
              name="lengthMeter"
              value={formData.lengthMeter}
              onChange={handleChange}
              placeholder="Length (Meter)"
              className={`p-2 border rounded w-full ${
                theme === "dark" ? "dark" : "light"
              }`}
            />
          </div>
          <div>
            <label htmlFor="threadCount" className="block mb-1">
              Thread Count
            </label>
            <input
              type="text"
              id="threadCount"
              name="threadCount"
              value={formData.threadCount}
              onChange={handleChange}
              placeholder="Thread Count"
              className={`p-2 border rounded w-full ${
                theme === "dark" ? "dark" : "light"
              }`}
            />
          </div>
          <div>
            <label htmlFor="reedBoram" className="block mb-1">
              Reed
            </label>
            <input
              type="text"
              id="reed"
              name="reed"
              value={formData.reed}
              onChange={handleChange}
              placeholder="Reed"
              className={`p-2 border rounded w-full ${
                theme === "dark" ? "dark" : "light"
              }`}
            />
          </div>
          <div>
            <label htmlFor="reedBoram" className="block mb-1">
              B or M
            </label>
            <input
              type="text"
              id="bOrM"
              name="bOrM"
              value={formData.bOrM}
              onChange={handleChange}
              placeholder="B or M"
              className={`p-2 border rounded w-full ${
                theme === "dark" ? "dark" : "light"
              }`}
            />
          </div>
          <div>
            <label htmlFor="dentThread" className="block mb-1">
              Dent Thread
            </label>
            <input
              type="text"
              id="dentThread"
              name="dentThread"
              value={formData.dentThread}
              onChange={handleChange}
              placeholder="Dent Thread"
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
        </div>
        <div className="flex items-center justify-center">
          <button className="btn">Save</button>
        </div>
      </form>
      <TanaList />
    </>
  );
};

export default CompanyFormComponent;
