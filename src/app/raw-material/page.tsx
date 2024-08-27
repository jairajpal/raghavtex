"use client";
import React, { useEffect, useMemo, useState } from "react";
import RawMaterialList from "../components/RawMaterialList";
import "../../../styles/globals.css"; // Ensure your global styles are imported
import { useTheme } from "../components/ThemeContext";
import axios from "axios";
import { getCSRFToken } from "../../utils/tools";
import axiosInstance from "@/utils/axiosInstance";
import CreatableSelect from "react-select/creatable"; // Import CreatableSelect

interface FormData {
  id: 0;
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
  shuttle_or_mat: string;
  receiving: string;
  form_enum: string;
}

interface DataItem {
  id: number;
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
  shuttle_or_mat: string;
  receiving: string;
  form_enum: string;
}

const initialFormData: FormData = {
  id: 0,
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
  shuttle_or_mat: "",
  receiving: "",
  form_enum: "raw",
};

const FormComponent: React.FC = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [productsData, setProductsData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isRaw, setIsRaw] = useState<boolean>(true);
  const [csvFile, setCsvFile] = useState<File | null>(null);
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
    shuttle_or_mat: "",
    receiving: "",
  });

  const handleUpdate = (newValue: any) => {
    setFormData(newValue);
  };

  const handleDelete = (id: any) => {
    const updatedProductsData: any = productsData.filter(
      (item) => item.id !== id
    );
    setProductsData(updatedProductsData);
  };

  // Extract unique values for dropdowns
  const companies = useMemo(
    () => Array.from(new Set(productsData.map((item) => item.company))),
    [productsData]
  );

  const companyOptions = companies.map((company) => ({
    label: company,
    value: company,
  }));

  const handleCompanyChange = (selectedOption: any) => {
    handleChange({
      target: {
        name: "company",
        value: selectedOption ? selectedOption.value : "",
      },
    });
  };

  const designs = useMemo(
    () => Array.from(new Set(productsData.map((item) => item.design))),
    [productsData]
  );

  const designOptions = designs.map((design) => ({
    label: design,
    value: design,
  }));

  const handleDesignChange = (selectedOption: any) => {
    handleChange({
      target: {
        name: "design",
        value: selectedOption ? selectedOption.value : "",
      },
    });
  };

  const types = useMemo(
    () => Array.from(new Set(productsData.map((item) => item.type))),
    [productsData]
  );

  const typeOptions = types.map((type) => ({
    label: type,
    value: type,
  }));

  const handleTypeChange = (selectedOption: any) => {
    handleChange({
      target: {
        name: "type",
        value: selectedOption ? selectedOption.value : "",
      },
    });
  };

  const colors = useMemo(
    () => Array.from(new Set(productsData.map((item) => item.color))),
    [productsData]
  );

  const colorOptions = colors.map((color) => ({
    label: color,
    value: color,
  }));

  const handleColorChange = (selectedOption: any) => {
    handleChange({
      target: {
        name: "color",
        value: selectedOption ? selectedOption.value : "",
      },
    });
  };

  const sizes = useMemo(
    () => Array.from(new Set(productsData.map((item) => item.size))),
    [productsData]
  );

  const sizeOptions = sizes.map((size) => ({
    label: size,
    value: size,
  }));

  const handleSizeChange = (selectedOption: any) => {
    handleChange({
      target: {
        name: "size",
        value: selectedOption ? selectedOption.value : "",
      },
    });
  };

  const remarks = useMemo(
    () => Array.from(new Set(productsData.map((item) => item.remarks))),
    [productsData]
  );

  const remarkOptions = remarks.map((remark) => ({
    label: remark,
    value: remark,
  }));

  const handleRemarkChange = (selectedOption: any) => {
    handleChange({
      target: {
        name: "remarks",
        value: selectedOption ? selectedOption.value : "",
      },
    });
  };

  const shuttleOrMats = useMemo(
    () => Array.from(new Set(productsData.map((item) => item.shuttle_or_mat))),
    [productsData]
  );

  const shuttleOrMatOptions = shuttleOrMats.map((shuttle_or_mat) => ({
    label: shuttle_or_mat,
    value: shuttle_or_mat,
  }));

  const handleShuttleOrMatChange = (selectedOption: any) => {
    handleChange({
      target: {
        name: "shuttle_or_mat",
        value: selectedOption ? selectedOption.value : "",
      },
    });
  };

  const receivings = useMemo(
    () => Array.from(new Set(productsData.map((item) => item.receiving))),
    [productsData]
  );

  const receivingOptions = receivings.map((receiving) => ({
    label: receiving,
    value: receiving,
  }));

  const handleReceivingChange = (selectedOption: any) => {
    handleChange({
      target: {
        name: "receiving",
        value: selectedOption ? selectedOption.value : "",
      },
    });
  };

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
        (filters.shuttle_or_mat
          ? item.shuttle_or_mat === filters.shuttle_or_mat
          : true) &&
        (filters.receiving ? item.receiving === filters.receiving : true)
      );
    });
  }, [productsData, filters]);

  useEffect(() => {
    formData.form_enum = isRaw ? "raw" : "dispatch";
    fetchData(); // Call the async function
  }, [isRaw]);

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
        params: { form_enum: formData.form_enum },
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
    let response: any = {};
    // Handle form submission logic here
    if (!formData.id) {
      formData.form_enum = isRaw ? "raw" : "dispatch";
      response = await axiosInstance.post("/api/products/", formData, {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCSRFToken(),
        },
      });
    } else {
      await axiosInstance.put("/api/products/" + formData.id + "/", formData, {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCSRFToken(),
        },
      });
    }
    // if (response && response?.data) {
    //   console.log("response.data: ", response.data);
    //   const updatedProductsData: any = [response.data, ...productsData];
    //   setProductsData(updatedProductsData);
    // }
    fetchData();
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

  const clear = () => {
    console.log("initialFormData: ", initialFormData);
    setFormData(initialFormData);
    return;
  };

  const handleToggle = (check: boolean) => {
    check ? setIsRaw(true) : setIsRaw(false);
  };

  return (
    <>
      <div className="flex rounded px-10 overflow-hidden py-4">
        <button
          className={`flex-1 py-2 rounded-full text-center font-semibold transition-colors duration-1000 ${
            !isRaw ? "bg-gray-200 text-gray-800" : "bg-blue-500 text-white"
          }`}
          onClick={() => handleToggle(true)}
        >
          Raw Material
        </button>
        <button
          className={`flex-1 py-2 rounded-full text-center font-semibold transition-colors duration-1000 ${
            isRaw ? "bg-gray-200 text-gray-800" : "bg-blue-500 text-white"
          }`}
          onClick={() => handleToggle(false)}
        >
          Dispatch Product
        </button>
      </div>

      <div className="space-y-4 p-4">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
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
            <label htmlFor="challan_no" className="label-group">
              Challan No.
            </label>
            <input
              type="text"
              id="challan_no"
              name="challan_no"
              value={formData.challan_no}
              onChange={handleChange}
              placeholder="Challan No."
              className={`input-group ${theme === "dark" ? "dark" : "light"}`}
            />
          </div>

          <div>
            <label htmlFor="company" className="label-group">
              Company
            </label>
            <CreatableSelect
              id="company"
              name="company"
              options={companyOptions}
              isClearable
              isSearchable
              value={
                formData.company
                  ? { label: formData.company, value: formData.company }
                  : null
              }
              onChange={handleCompanyChange}
              placeholder="Search"
              className={`p-0 border rounded w-full z-auto${
                theme === "dark" ? "dark" : "light"
              }`}
              noOptionsMessage={() => "No company found"}
              formatCreateLabel={(inputValue) =>
                `Create new company: "${inputValue}"`
              }
            />
          </div>

          <div>
            <label htmlFor="design" className="label-group">
              Design
            </label>
            <CreatableSelect
              id="design"
              name="design"
              options={designOptions}
              isClearable
              isSearchable
              value={
                formData.design
                  ? { label: formData.design, value: formData.design }
                  : null
              }
              onChange={handleDesignChange}
              placeholder="Search"
              className={`p-0 border rounded w-full ${
                theme === "dark" ? "dark" : "light"
              }`}
              noOptionsMessage={() => "No design found"}
              formatCreateLabel={(inputValue) =>
                `Create new design: "${inputValue}"`
              }
            />
          </div>

          <div>
            <label htmlFor="type" className="label-group">
              Type
            </label>
            <CreatableSelect
              id="type"
              name="type"
              options={typeOptions}
              isClearable
              isSearchable
              value={
                formData.type
                  ? { label: formData.type, value: formData.type }
                  : null
              }
              onChange={handleTypeChange}
              placeholder="Search"
              className={`p-0 border rounded w-full ${
                theme === "dark" ? "dark" : "light"
              }`}
              noOptionsMessage={() => "No type found"}
              formatCreateLabel={(inputValue) =>
                `Create new type: "${inputValue}"`
              }
            />
          </div>

          <div>
            <label htmlFor="size" className="label-group">
              Size
            </label>
            <CreatableSelect
              id="size"
              name="size"
              options={sizeOptions}
              isClearable
              isSearchable
              value={
                formData.size
                  ? { label: formData.size, value: formData.size }
                  : null
              }
              onChange={handleSizeChange}
              placeholder="Search"
              className={`p-0 border rounded w-full ${
                theme === "dark" ? "dark" : "light"
              }`}
              noOptionsMessage={() => "No size found"}
              formatCreateLabel={(inputValue) =>
                `Create new size: "${inputValue}"`
              }
            />
          </div>

          <div>
            <label htmlFor="color" className="label-group">
              Color
            </label>
            <CreatableSelect
              id="color"
              name="color"
              options={colorOptions}
              isClearable
              isSearchable
              value={
                formData.color
                  ? { label: formData.color, value: formData.color }
                  : null
              }
              onChange={handleColorChange}
              placeholder="Search"
              className={`p-0 border rounded w-full ${
                theme === "dark" ? "dark" : "light"
              }`}
              noOptionsMessage={() => "No color found"}
              formatCreateLabel={(inputValue) =>
                `Create new color: "${inputValue}"`
              }
            />
          </div>

          <div>
            <label htmlFor="quantity" className="label-group">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Quantity"
              className={`input-group ${theme === "dark" ? "dark" : "light"}`}
            />
          </div>

          <div>
            <label htmlFor="weight" className="label-group">
              Weight
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="Weight"
              className={`input-group ${theme === "dark" ? "dark" : "light"}`}
            />
          </div>

          <div>
            <label htmlFor="remarks" className="label-group">
              Remarks
            </label>
            <CreatableSelect
              id="remarks"
              name="remarks"
              options={remarkOptions}
              isClearable
              isSearchable
              value={
                formData.remarks
                  ? { label: formData.remarks, value: formData.remarks }
                  : null
              }
              onChange={handleRemarkChange}
              placeholder="Search"
              className={`p-0 border rounded w-full ${
                theme === "dark" ? "dark" : "light"
              }`}
              noOptionsMessage={() => "No remark found"}
              formatCreateLabel={(inputValue) =>
                `Create new remark: "${inputValue}"`
              }
            />
          </div>

          <div>
            <label htmlFor="shuttle_or_mat" className="label-group">
              Shuttle or Mat
            </label>
            <CreatableSelect
              id="shuttle_or_mat"
              name="shuttle_or_mat"
              options={shuttleOrMatOptions}
              isClearable
              isSearchable
              value={
                formData.shuttle_or_mat
                  ? {
                      label: formData.shuttle_or_mat,
                      value: formData.shuttle_or_mat,
                    }
                  : null
              }
              onChange={handleShuttleOrMatChange}
              placeholder="Search"
              className={`p-0 border rounded w-full ${
                theme === "dark" ? "dark" : "light"
              }`}
              noOptionsMessage={() => "No company found"}
              formatCreateLabel={(inputValue) =>
                `Create new company: "${inputValue}"`
              }
            />
          </div>

          <div>
            <label htmlFor="receiving" className="label-group">
              Receiving
            </label>
            <CreatableSelect
              id="receiving"
              name="receiving"
              options={receivingOptions}
              isClearable
              isSearchable
              value={
                formData.receiving
                  ? { label: formData.receiving, value: formData.receiving }
                  : null
              }
              onChange={handleReceivingChange}
              placeholder="Search"
              className={`p-0 border rounded w-full ${
                theme === "dark" ? "dark" : "light"
              }`}
              noOptionsMessage={() => "No receiving found"}
              formatCreateLabel={(inputValue) =>
                `Create new receiving: "${inputValue}"`
              }
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button onClick={handleSubmit} className="btn">
            Save
          </button>
          <button onClick={clear} className="btn ml-4">
            Clear
          </button>
        </div>
      </div>
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
      <RawMaterialList
        loading={loading}
        filters={filters}
        setFilters={setFilters}
        companies={companies}
        shuttleOrMats={shuttleOrMats}
        receivings={receivings}
        filteredData={filteredData}
        onUpdate={handleUpdate}
        deleteProduct={handleDelete}
      />
    </>
  );
};

export default FormComponent;
