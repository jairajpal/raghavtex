"use client";
import React, { useState } from "react";
import { useTheme } from "../components/ThemeContext";
import "../../../styles/globals.css"; // Ensure your global styles are imported
import { TanaList } from "../components/TanaList";

interface FormData {
  date: string;
  loomNo: string;
  company: string;
  design_type: string;
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
  design_type: "",
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
            <label htmlFor="date" className="label-group">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`input-group ${theme === "dark" ? "dark" : "light"}`}
            />
          </div>
          <div>
            <label htmlFor="loomNo" className="label-group">
              Loom No.
            </label>
            <input
              type="text"
              id="loomNo"
              name="loomNo"
              value={formData.loomNo}
              onChange={handleChange}
              placeholder="Loom No."
              className={`input-group ${theme === "dark" ? "dark" : "light"}`}
            />
          </div>
          <div>
            <label htmlFor="company" className="label-group">
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Company"
              className={`input-group ${theme === "dark" ? "dark" : "light"}`}
            />
          </div>
          <div>
            <label htmlFor="design_type" className="label-group">
              Design Type
            </label>
            <input
              type="text"
              id="design_type"
              name="design_type"
              value={formData.design_type}
              onChange={handleChange}
              placeholder="Design Type"
              className={`input-group ${theme === "dark" ? "dark" : "light"}`}
            />
          </div>
          <div>
            <label htmlFor="warp" className="label-group">
              Warp
            </label>
            <input
              type="text"
              id="warp"
              name="warp"
              value={formData.warp}
              onChange={handleChange}
              placeholder="Warp"
              className={`input-group ${theme === "dark" ? "dark" : "light"}`}
            />
          </div>
          <div>
            <label htmlFor="warpColor" className="label-group">
              Warp Color
            </label>
            <input
              type="text"
              id="warpColor"
              name="warpColor"
              value={formData.warpColor}
              onChange={handleChange}
              placeholder="Warp Color"
              className={`input-group ${theme === "dark" ? "dark" : "light"}`}
            />
          </div>
          <div>
            <label htmlFor="weft" className="label-group">
              Weft
            </label>
            <input
              type="text"
              id="weft"
              name="weft"
              value={formData.weft}
              onChange={handleChange}
              placeholder="Weft"
              className={`input-group ${theme === "dark" ? "dark" : "light"}`}
            />
          </div>
          <div>
            <label htmlFor="weftColor" className="label-group">
              Weft Color
            </label>
            <input
              type="text"
              id="weftColor"
              name="weftColor"
              value={formData.weftColor}
              onChange={handleChange}
              placeholder="Weft Color"
              className={`input-group ${theme === "dark" ? "dark" : "light"}`}
            />
          </div>
          <div>
            <label htmlFor="widthInch" className="label-group">
              Width (inch)
            </label>
            <input
              type="text"
              id="widthInch"
              name="widthInch"
              value={formData.widthInch}
              onChange={handleChange}
              placeholder="Width (inch)"
              className={`input-group ${theme === "dark" ? "dark" : "light"}`}
            />
          </div>
          <div>
            <label htmlFor="lengthMeter" className="label-group">
              Length (Meter)
            </label>
            <input
              type="text"
              id="lengthMeter"
              name="lengthMeter"
              value={formData.lengthMeter}
              onChange={handleChange}
              placeholder="Length (Meter)"
              className={`input-group ${theme === "dark" ? "dark" : "light"}`}
            />
          </div>
          <div>
            <label htmlFor="threadCount" className="label-group">
              Thread Count
            </label>
            <input
              type="text"
              id="threadCount"
              name="threadCount"
              value={formData.threadCount}
              onChange={handleChange}
              placeholder="Thread Count"
              className={`input-group ${theme === "dark" ? "dark" : "light"}`}
            />
          </div>
          <div>
            <label htmlFor="reedBoram" className="label-group">
              Reed
            </label>
            <input
              type="text"
              id="reed"
              name="reed"
              value={formData.reed}
              onChange={handleChange}
              placeholder="Reed"
              className={`input-group ${theme === "dark" ? "dark" : "light"}`}
            />
          </div>
          <div>
            <label htmlFor="reedBoram" className="label-group">
              B or M
            </label>
            <input
              type="text"
              id="bOrM"
              name="bOrM"
              value={formData.bOrM}
              onChange={handleChange}
              placeholder="B or M"
              className={`input-group ${theme === "dark" ? "dark" : "light"}`}
            />
          </div>
          <div>
            <label htmlFor="dentThread" className="label-group">
              Dent Thread
            </label>
            <input
              type="text"
              id="dentThread"
              name="dentThread"
              value={formData.dentThread}
              onChange={handleChange}
              placeholder="Dent Thread"
              className={`input-group ${theme === "dark" ? "dark" : "light"}`}
            />
          </div>
          <div>
            <label htmlFor="remarks" className="label-group">
              Remarks
            </label>
            <input
              type="text"
              id="remarks"
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              placeholder="Remarks"
              className={`input-group ${theme === "dark" ? "dark" : "light"}`}
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
