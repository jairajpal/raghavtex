// components/RawMaterialList.tsx

import React, { useEffect, useState } from "react";
import { useTheme } from "./ThemeContext";
import axiosInstance from "@/utils/axiosInstance";
import { getCSRFToken } from "@/utils/tools";

interface DataItem {
  date: string;
  loomNo: string;
  company: string;
  design: string;
  type: string;
  warp: string;
  warpColor: string;
  weft: string;
  weftColor: string;
  widthInch: number;
  lengthMeter: number;
  threadCount: number;
  reed: string;
  bOrM: string;
  dentThread: string;
  remarks: string;
}
interface LoomsDataProps {
  filteredData: any;
  loading: any;
  filters: any;
  setFilters: any;
  companies: any;
  looms: any;
  onUpdate: any;
  deleteRow: any;
}
export const TanaList: React.FC<LoomsDataProps> = ({
  filteredData,
  loading,
  filters,
  setFilters,
  companies,
  looms,
  onUpdate,
  deleteRow,
}) => {
  const { theme } = useTheme();

  // Handle input changes
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prevFilters: any) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const onEdit = (e: any) => {
    onUpdate(e);
  };

  const onCopy = (e: any) => {
    e.id = "";
    onUpdate(e);
  };

  const onDelete = async (id: any) => {
    await axiosInstance.delete("/api/products/" + id + "/", {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCSRFToken(),
      },
    });
    deleteRow(id);
  };

  useEffect(() => {
    // Replace this URL with your actual API endpoint
  }, []);

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full border-gray-200">
        <thead>
          <tr>
            <th className="tableData">Date</th>
            <th className="tableData">Loom No.</th>
            <th className="tableData w-40">Company</th>
            <th className="tableData">Design</th>
            <th className="tableData">Type</th>
            <th className="tableData">Warp</th>
            <th className="tableData">Warp Color</th>
            <th className="tableData">Weft</th>
            <th className="tableData">Weft Color</th>
            <th className="tableData">Width (inch)</th>
            <th className="tableData">Length (Meter)</th>
            <th className="tableData">Thread Count</th>
            <th className="tableData">Reed</th>
            <th className="tableData">BorM</th>
            <th className="tableData">Dent Thread</th>
            <th className="tableData">Remarks</th>
            <th className="tableData w-7">Actions</th>
          </tr>
          <tr>
            <th className="tableData ">
              <div className="flex flex-col space-y-1">
                <input
                  type="date"
                  name="startDate"
                  value={filters.startDate}
                  onChange={handleFilterChange}
                  className={`w-28 ${theme === "dark" ? "dark" : "light"}`}
                  placeholder="From"
                />
                <input
                  type="date"
                  name="endDate"
                  value={filters.endDate}
                  onChange={handleFilterChange}
                  className={`w-28 ${theme === "dark" ? "dark" : "light"}`}
                  placeholder="To"
                />
              </div>
            </th>
            <th className="tableData ">
              <select
                name="loomNo"
                value={filters.loomNo}
                onChange={handleFilterChange}
                className={`input-group ${theme === "dark" ? "dark" : "light"}`}
              >
                <option value="">All</option>
                {looms.map((loomNo: any) => (
                  <option key={loomNo} value={loomNo}>
                    {loomNo}
                  </option>
                ))}
              </select>
            </th>
            <th className="tableData ">
              <select
                name="company"
                value={filters.company}
                onChange={handleFilterChange}
                className={`input-group ${theme === "dark" ? "dark" : "light"}`}
              >
                <option value="">All</option>
                {companies.map((company: any) => (
                  <option key={company} value={company}>
                    {company}
                  </option>
                ))}
              </select>
            </th>
            <th className="tableData ">
              <input
                type="text"
                name="design"
                value={filters.design}
                onChange={handleFilterChange}
                placeholder="Search..."
                className={`input-group ${theme === "dark" ? "dark" : "light"}`}
              />
            </th>
            <th className="tableData ">
              <input
                type="text"
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                placeholder="Search..."
                className={`input-group ${theme === "dark" ? "dark" : "light"}`}
              />
            </th>
            <th className="tableData ">
              <input
                type="text"
                name="warp"
                value={filters.warp}
                onChange={handleFilterChange}
                placeholder="Search..."
                className={`input-group ${theme === "dark" ? "dark" : "light"}`}
              />
            </th>
            <th className="tableData ">
              <input
                type="text"
                name="warpColor"
                value={filters.warpColor}
                onChange={handleFilterChange}
                placeholder="Search..."
                className={`input-group ${theme === "dark" ? "dark" : "light"}`}
              />
            </th>
            <th className="tableData ">
              <input
                type="text"
                name="weft"
                value={filters.weft}
                onChange={handleFilterChange}
                placeholder="Search..."
                className={`input-group ${theme === "dark" ? "dark" : "light"}`}
              />
            </th>
            <th className="tableData ">
              <input
                type="text"
                name="weftColor"
                value={filters.weftColor}
                onChange={handleFilterChange}
                placeholder="Search..."
                className={`input-group ${theme === "dark" ? "dark" : "light"}`}
              />
            </th>
            <th className="tableData ">
              <input
                type="text"
                name="widthInch"
                value={filters.widthInch}
                onChange={handleFilterChange}
                placeholder="Search..."
                className={`input-group ${theme === "dark" ? "dark" : "light"}`}
              />
            </th>
            <th className="tableData ">
              <input
                type="text"
                name="lengthMeter"
                value={filters.lengthMeter}
                onChange={handleFilterChange}
                placeholder="Search..."
                className={`input-group ${theme === "dark" ? "dark" : "light"}`}
              />
            </th>
            <th className="tableData ">
              <input
                type="text"
                name="threadCount"
                value={filters.threadCount}
                onChange={handleFilterChange}
                placeholder="Search..."
                className={`input-group ${theme === "dark" ? "dark" : "light"}`}
              />
            </th>
            <th className="tableData ">
              <input
                type="text"
                name="reed"
                value={filters.reed}
                onChange={handleFilterChange}
                placeholder="Search..."
                className={`input-group ${theme === "dark" ? "dark" : "light"}`}
              />
            </th>
            <th className="tableData "></th>
            <th className="tableData "></th>
            <th className="tableData ">
              <input
                type="text"
                name="remarks"
                value={filters.remarks}
                onChange={handleFilterChange}
                placeholder="Search..."
                className={`input-group ${theme === "dark" ? "dark" : "light"}`}
              />
            </th>
            <th className="tableData "></th>
          </tr>
        </thead>
        {filteredData.length > 0 ? (
          <tbody>
            {filteredData.map((item: any, index: any) => (
              <tr key={index}>
                <td className="tableData">{item.date}</td>
                <td className="tableData">{item.loomNo}</td>
                <td className="tableData">{item.company}</td>
                <td className="tableData">{item.design}</td>
                <td className="tableData">{item.type}</td>
                <td className="tableData">{item.warp}</td>
                <td className="tableData">{item.warpColor}</td>
                <td className="tableData">{item.weft}</td>
                <td className="tableData">{item.weftColor}</td>
                <td className="tableData">{item.widthInch}</td>
                <td className="tableData">{item.lengthMeter}</td>
                <td className="tableData">{item.threadCount}</td>
                <td className="tableData">{item.reed}</td>
                <td className="tableData">{item.bOrM}</td>
                <td className="tableData">{item.dentThread}</td>
                <td className="tableData">{item.remarks}</td>
                <td className="px-2 border">
                  <button onClick={() => onCopy(item)} className="action-btn">
                    <i className="fas fa-copy"></i>
                  </button>
                  <button
                    onClick={() => onEdit(item)}
                    className="action-btn ml-2"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="action-btn ml-2"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan={15} className="text-center align-middle">
                {loading
                  ? "Loading filteredData..."
                  : "No filteredData found..."}
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};
