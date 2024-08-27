// components/RawMaterialList.tsx
"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useTheme } from "./ThemeContext";

interface ProductsData {
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

interface ProductsDataProps {
  productsData: ProductsData[];
  loading: boolean;
}

const RawMaterialList: React.FC<ProductsDataProps> = ({
  productsData,
  loading,
}) => {
  const { theme } = useTheme();

  // Initialize filter state
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    challan_no: "",
    company: "",
    design: "",
    type: "",
    size: "",
    color: "",
    quantity: "",
    remarks: "",
    quality: "",
    shuttle_or_mat: "",
    receiving: "",
  });

  // Extract unique values for dropdowns
  const companies = useMemo(
    () => Array.from(new Set(productsData.map((item) => item.company))),
    [productsData]
  );

  const shuttleOrMatOptions = useMemo(
    () => Array.from(new Set(productsData.map((item) => item.shuttle_or_mat))),
    [productsData]
  );

  const receivingOptions = useMemo(
    () => Array.from(new Set(productsData.map((item) => item.receiving))),
    [productsData]
  );

  // Filtered data based on filters
  const filteredData = useMemo(() => {
    return productsData.filter((item) => {
      const itemDate = new Date(item.date);
      const startDate = filters.startDate ? new Date(filters.startDate) : null;
      const endDate = filters.endDate ? new Date(filters.endDate) : null;

      const isWithinDateRange =
        (!startDate || itemDate >= startDate) &&
        (!endDate || itemDate <= endDate);
      return (
        isWithinDateRange &&
        (filters.challan_no
          ? item.challan_no
              .toLowerCase()
              .includes(filters.challan_no.toLowerCase())
          : true) &&
        (filters.company ? item.company === filters.company : true) &&
        (filters.design
          ? item.design.toLowerCase().includes(filters.design.toLowerCase())
          : true) &&
        (filters.type
          ? item.type.toLowerCase().includes(filters.type.toLowerCase())
          : true) &&
        (filters.size
          ? item.size.toLowerCase().includes(filters.size.toLowerCase())
          : true) &&
        (filters.color
          ? item.color.toLowerCase().includes(filters.color.toLowerCase())
          : true) &&
        (filters.quantity
          ? item.quantity === Number(filters.quantity)
          : true) &&
        (filters.remarks
          ? item.remarks.toLowerCase().includes(filters.remarks.toLowerCase())
          : true) &&
        (filters.quality ? item.quality === filters.quality : true) &&
        (filters.shuttle_or_mat
          ? item.shuttle_or_mat === filters.shuttle_or_mat
          : true) &&
        (filters.receiving ? item.receiving === filters.receiving : true)
      );
    });
  }, [productsData, filters]);

  // Handle input changes
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

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
            <th className="tableData px-2 py-1 border">
              <div className="flex flex-col space-y-1">
                <input
                  type="date"
                  name="startDate"
                  value={filters.startDate}
                  onChange={handleFilterChange}
                  className={`p-2 border rounded w-full ${
                    theme === "dark" ? "dark" : "light"
                  }`}
                  placeholder="From"
                />
                <input
                  type="date"
                  name="endDate"
                  value={filters.endDate}
                  onChange={handleFilterChange}
                  className={`p-2 border rounded w-full ${
                    theme === "dark" ? "dark" : "light"
                  }`}
                  placeholder="To"
                />
              </div>
            </th>

            <th className="tableData px-2 py-1 border">
              <input
                type="text"
                name="challan_no"
                value={filters.challan_no}
                onChange={handleFilterChange}
                placeholder="Search..."
                className={`p-2 border rounded w-full ${
                  theme === "dark" ? "dark" : "light"
                }`}
              />
            </th>
            <th className="tableData px-2 py-1 border">
              <select
                name="company"
                value={filters.company}
                onChange={handleFilterChange}
                className={`p-2 border rounded w-full ${
                  theme === "dark" ? "dark" : "light"
                }`}
              >
                <option value="">All</option>
                {companies.map((company) => (
                  <option key={company} value={company}>
                    {company}
                  </option>
                ))}
              </select>
            </th>
            <th className="tableData px-2 py-1 border">
              <input
                name="design"
                value={filters.design}
                onChange={handleFilterChange}
                placeholder="Search..."
                className={`p-2 border rounded w-full ${
                  theme === "dark" ? "dark" : "light"
                }`}
              />
            </th>
            <th className="tableData px-2 py-1 border">
              <input
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                placeholder="Search..."
                className={`p-2 border rounded w-full ${
                  theme === "dark" ? "dark" : "light"
                }`}
              />
            </th>
            <th className="tableData px-2 py-1 border">
              <input
                name="size"
                value={filters.size}
                onChange={handleFilterChange}
                placeholder="Search..."
                className={`p-2 border rounded w-full ${
                  theme === "dark" ? "dark" : "light"
                }`}
              />
            </th>
            <th className="tableData px-2 py-1 border">
              <input
                name="color"
                value={filters.color}
                onChange={handleFilterChange}
                placeholder="Search..."
                className={`p-2 border rounded w-full ${
                  theme === "dark" ? "dark" : "light"
                }`}
              />
            </th>
            <th className="tableData px-2 py-1 border">
              <input
                type="number"
                name="quantity"
                value={filters.quantity}
                onChange={handleFilterChange}
                placeholder="Search..."
                className={`p-2 border rounded w-full ${
                  theme === "dark" ? "dark" : "light"
                }`}
              />
            </th>
            <th className="tableData px-2 py-1 border"></th>
            <th className="tableData px-2 py-1 border">
              <input
                type="text"
                name="remarks"
                value={filters.remarks}
                onChange={handleFilterChange}
                placeholder="Search..."
                className={`p-2 border rounded w-full ${
                  theme === "dark" ? "dark" : "light"
                }`}
              />
            </th>
            <th className="tableData px-2 py-1 border"></th>
            <th className="tableData px-2 py-1 border">
              <select
                name="shuttle_or_mat"
                value={filters.shuttle_or_mat}
                onChange={handleFilterChange}
                className={`p-2 border rounded w-full ${
                  theme === "dark" ? "dark" : "light"
                }`}
              >
                <option value="">All</option>
                {shuttleOrMatOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </th>
            <th className="tableData px-2 py-1 border">
              <select
                name="receiving"
                value={filters.receiving}
                onChange={handleFilterChange}
                className={`p-2 border rounded w-full ${
                  theme === "dark" ? "dark" : "light"
                }`}
              >
                <option value="">All</option>
                {receivingOptions.map((receiving) => (
                  <option key={receiving} value={receiving}>
                    {receiving}
                  </option>
                ))}
              </select>
            </th>
            <th className="tableData px-2 py-1 border"></th>
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
            filteredData.map((item, index) => (
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
