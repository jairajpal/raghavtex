// components/RawMaterialList.tsx
"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useTheme } from "./ThemeContext";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axiosInstance from "@/utils/axiosInstance";
import { getCSRFToken } from "@/utils/tools";

interface ProductsDataProps {
  loading: boolean;
  filters: any;
  setFilters: any;
  companies: any;
  shuttleOrMats: any;
  receivings: any;
  filteredData: any;
  onUpdate: any;
  deleteProduct: any;
}

const RawMaterialList: React.FC<ProductsDataProps> = ({
  loading,
  filters,
  setFilters,
  companies,
  shuttleOrMats,
  receivings,
  filteredData,
  onUpdate,
  deleteProduct,
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
    deleteProduct(id);
  };

  useEffect(() => {}, [filteredData]);

  return (
    <div className="overflow-x-auto p-4 max-h-[800px] overflow-y-auto">
      <table className="min-w-full border">
        <thead className={"sticky top-0 z-10 " + theme}>
          {/* Header Titles */}
          <tr>
            <th className="tableData w-11">Date</th>
            <th className="tableData w-5">Challan</th>
            <th className="tableData">Company</th>
            <th className="tableData">Design</th>
            <th className="tableData">Type</th>
            <th className="tableData">Size</th>
            <th className="tableData">Color</th>
            <th className="tableData w-5">Quantity</th>
            <th className="tableData w-36">Weight</th>
            <th className="tableData">Remarks</th>
            <th className="tableData">Quality</th>
            <th className="tableData">S or M</th>
            <th className="tableData w-5">Receiving</th>
            <th className="tableData">Action</th>
          </tr>
          {/* Filter Inputs */}
          <tr>
            <th className="tableData ">
              <div className="flex flex-col space-y-1">
                <input
                  type="date"
                  name="startDate"
                  value={filters.startDate}
                  onChange={handleFilterChange}
                  className={`input-group ${
                    theme === "dark" ? "dark" : "light"
                  }`}
                  placeholder="From"
                />
                <input
                  type="date"
                  name="endDate"
                  value={filters.endDate}
                  onChange={handleFilterChange}
                  className={`input-group ${
                    theme === "dark" ? "dark" : "light"
                  }`}
                  placeholder="To"
                />
              </div>
            </th>

            <th className="tableData ">
              <input
                type="text"
                name="challan_no"
                value={filters.challan_no}
                onChange={handleFilterChange}
                placeholder="Search..."
                className={`input-group ${theme === "dark" ? "dark" : "light"}`}
              />
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
                name="design"
                value={filters.design}
                onChange={handleFilterChange}
                placeholder="Search..."
                className={`input-group ${theme === "dark" ? "dark" : "light"}`}
              />
            </th>
            <th className="tableData ">
              <input
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                placeholder="Search..."
                className={`input-group ${theme === "dark" ? "dark" : "light"}`}
              />
            </th>
            <th className="tableData ">
              <input
                name="size"
                value={filters.size}
                onChange={handleFilterChange}
                placeholder="Search..."
                className={`input-group ${theme === "dark" ? "dark" : "light"}`}
              />
            </th>
            <th className="tableData ">
              <input
                name="color"
                value={filters.color}
                onChange={handleFilterChange}
                placeholder="Search..."
                className={`input-group ${theme === "dark" ? "dark" : "light"}`}
              />
            </th>
            <th className="tableData ">
              <input
                type="number"
                name="quantity"
                value={filters.quantity}
                onChange={handleFilterChange}
                placeholder="Search..."
                className={`input-group ${theme === "dark" ? "dark" : "light"}`}
              />
            </th>
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
            <th className="tableData ">
              <select
                name="shuttle_or_mat"
                value={filters.shuttle_or_mat}
                onChange={handleFilterChange}
                className={`input-group ${theme === "dark" ? "dark" : "light"}`}
              >
                <option value="">All</option>
                {shuttleOrMats.map((option: any) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </th>
            <th className="tableData ">
              <select
                name="receiving"
                value={filters.receiving}
                onChange={handleFilterChange}
                className={`input-group ${theme === "dark" ? "dark" : "light"}`}
              >
                <option value="">All</option>
                {receivings.map((receiving: any) => (
                  <option key={receiving} value={receiving}>
                    {receiving}
                  </option>
                ))}
              </select>
            </th>
            <th className="tableData "></th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={12} className="text-center py-4">
                Loading data...
              </td>
            </tr>
          ) : filteredData.length > 0 ? (
            filteredData.map((item: any, index: any) => (
              <tr key={index} className="">
                <td className="tableData">{item.date}</td>
                <td className="tableData">{item.challan_no}</td>
                <td className="tableData">{item.company}</td>
                <td className="tableData">{item.design}</td>
                <td className="tableData">{item.type}</td>
                <td className="tableData">{item.size}</td>
                <td className="tableData">{item.color}</td>
                <td className="tableData">{item.quantity}</td>
                <td className="tableData">{item.weight} Kgs</td>
                <td className="tableData">{item.remarks}</td>
                <td className="tableData">
                  {(item.weight / item.quantity).toFixed(2)}
                </td>
                <td className="tableData">{item.shuttle_or_mat}</td>
                <td className="tableData">{item.receiving}</td>
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
            ))
          ) : (
            <tr>
              <td colSpan={12} className="text-center py-4">
                No data found...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RawMaterialList;
