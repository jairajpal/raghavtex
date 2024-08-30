"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useTheme } from "../components/ThemeContext";
import "../../../styles/globals.css"; // Ensure your global styles are imported
import { TanaList } from "../components/TanaList";
import axiosInstance from "@/utils/axiosInstance";
import { getCSRFToken } from "@/utils/tools";

interface FormData {
  id: string;
  date: string;
  loomNo: string;
  company: string;
  design: string;
  type: string;
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
  id: "",
  date: "",
  loomNo: "",
  company: "",
  design: "",
  type: "",
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
  const [loomData, setLoomData] = useState<FormData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [csvFile, setCsvFile] = useState<File | null>(null);

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    date: "",
    loomNo: "",
    company: "",
    design: "",
    type: "",
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
  });
  // Extract unique values for dropdowns

  const looms = useMemo(
    () => Array.from(new Set(loomData.map((item) => item.loomNo))),
    [loomData]
  );

  const companies = useMemo(
    () => Array.from(new Set(loomData.map((item) => item.company))),
    [loomData]
  );

  // const companyOptions = companies.map((company) => ({
  //   label: company,
  //   value: company,
  // }));

  // const handleCompanyChange = (selectedOption: any) => {
  //   handleChange({
  //     target: {
  //       name: "company",
  //       value: selectedOption ? selectedOption.value : "",
  //     },
  //   });
  // };

  const designs = useMemo(
    () => Array.from(new Set(loomData.map((item) => item.design))),
    [loomData]
  );

  // const designOptions = designs.map((design) => ({
  //   label: design,
  //   value: design,
  // }));

  // const handleDesignChange = (selectedOption: any) => {
  //   handleChange({
  //     target: {
  //       name: "design",
  //       value: selectedOption ? selectedOption.value : "",
  //     },
  //   });
  // };

  const types = useMemo(
    () => Array.from(new Set(loomData.map((item) => item.type))),
    [loomData]
  );

  // const typeOptions = types.map((type) => ({
  //   label: type,
  //   value: type,
  // }));

  // const handleTypeChange = (selectedOption: any) => {
  //   handleChange({
  //     target: {
  //       name: "type",
  //       value: selectedOption ? selectedOption.value : "",
  //     },
  //   });
  // };

  const warps = useMemo(
    () => Array.from(new Set(loomData.map((item) => item.warp))),
    [loomData]
  );

  // const warpOptions = warps.map((warp) => ({
  //   label: warp,
  //   value: warp,
  // }));

  // const handleWarpChange = (selectedOption: any) => {
  //   handleChange({
  //     target: {
  //       name: "warp",
  //       value: selectedOption ? selectedOption.value : "",
  //     },
  //   });
  // };

  const warpColors = useMemo(
    () => Array.from(new Set(loomData.map((item) => item.warpColor))),
    [loomData]
  );

  // const warpColorOptions = warpColors.map((warpColor) => ({
  //   label: warpColor,
  //   value: warpColor,
  // }));

  // const handleWarpColorChange = (selectedOption: any) => {
  //   handleChange({
  //     target: {
  //       name: "warpColor",
  //       value: selectedOption ? selectedOption.value : "",
  //     },
  //   });
  // };

  const wefts = useMemo(
    () => Array.from(new Set(loomData.map((item) => item.weft))),
    [loomData]
  );

  // const weftOptions = wefts.map((weft) => ({
  //   label: weft,
  //   value: weft,
  // }));

  // const handleWeftChange = (selectedOption: any) => {
  //   handleChange({
  //     target: {
  //       name: "weft",
  //       value: selectedOption ? selectedOption.value : "",
  //     },
  //   });
  // };

  const weftColors = useMemo(
    () => Array.from(new Set(loomData.map((item) => item.weftColor))),
    [loomData]
  );

  // const weftColorOptions = weftColors.map((weftColor) => ({
  //   label: weftColor,
  //   value: weftColor,
  // }));

  // const handleWeftColorChange = (selectedOption: any) => {
  //   handleChange({
  //     target: {
  //       name: "weftColor",
  //       value: selectedOption ? selectedOption.value : "",
  //     },
  //   });
  // };

  const widthInchOptions = useMemo(
    () => Array.from(new Set(loomData.map((item) => item.widthInch))),
    [loomData]
  ).map((widthInch) => ({
    label: widthInch.toString(),
    value: widthInch,
  }));

  const lengthMeterOptions = useMemo(
    () => Array.from(new Set(loomData.map((item) => item.lengthMeter))),
    [loomData]
  ).map((lengthMeter) => ({
    label: lengthMeter.toString(),
    value: lengthMeter,
  }));

  const threadCountOptions = useMemo(
    () => Array.from(new Set(loomData.map((item) => item.threadCount))),
    [loomData]
  ).map((threadCount) => ({
    label: threadCount.toString(),
    value: threadCount,
  }));

  const reedOptions = useMemo(
    () => Array.from(new Set(loomData.map((item) => item.reed))),
    [loomData]
  ).map((reed) => ({
    label: reed,
    value: reed,
  }));

  // const handleWidthInchChange = (selectedOption: any) => {
  //   handleChange({
  //     target: {
  //       name: "widthInch",
  //       value: selectedOption ? selectedOption.value : "",
  //     },
  //   });
  // };

  // const handleLengthMeterChange = (selectedOption: any) => {
  //   handleChange({
  //     target: {
  //       name: "lengthMeter",
  //       value: selectedOption ? selectedOption.value : "",
  //     },
  //   });
  // };

  // const handleThreadCountChange = (selectedOption: any) => {
  //   handleChange({
  //     target: {
  //       name: "threadCount",
  //       value: selectedOption ? selectedOption.value : "",
  //     },
  //   });
  // };

  // const handleReedChange = (selectedOption: any) => {
  //   handleChange({
  //     target: {
  //       name: "reed",
  //       value: selectedOption ? selectedOption.value : "",
  //     },
  //   });
  // };

  const handleCsvUpload = async () => {
    if (!csvFile) return;

    const formData = new FormData();
    formData.append("file", csvFile);

    try {
      await axiosInstance.post("/api/looms/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": getCSRFToken(),
        },
      });
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

  const filteredData = useMemo(() => {
    return loomData.filter((item) => {
      const itemDate = new Date(item.date);
      const startDate = filters.startDate ? new Date(filters.startDate) : null;
      const endDate = filters.endDate ? new Date(filters.endDate) : null;

      const isWithinDateRange =
        (!startDate || itemDate >= startDate) &&
        (!endDate || itemDate <= endDate);
      return (
        isWithinDateRange &&
        (filters.loomNo ? item.loomNo === filters.loomNo : true) &&
        (filters.company ? item.company === filters.company : true) &&
        (filters.design
          ? item.design.toLowerCase().includes(filters.design.toLowerCase())
          : true) &&
        (filters.type
          ? item.type.toLowerCase().includes(filters.type.toLowerCase())
          : true) &&
        (filters.warp
          ? item.warp.toLowerCase().includes(filters.warp.toLowerCase())
          : true) &&
        (filters.warpColor
          ? item.warpColor
              .toLowerCase()
              .includes(filters.warpColor.toLowerCase())
          : true) &&
        (filters.weft
          ? item.weft.toLowerCase().includes(filters.weft.toLowerCase())
          : true) &&
        (filters.weftColor
          ? item.weftColor
              .toLowerCase()
              .includes(filters.weftColor.toLowerCase())
          : true) &&
        (filters.widthInch
          ? item.widthInch
              .toLowerCase()
              .includes(filters.widthInch.toLowerCase())
          : true) &&
        (filters.lengthMeter
          ? item.lengthMeter
              .toLowerCase()
              .includes(filters.lengthMeter.toLowerCase())
          : true) &&
        (filters.threadCount
          ? item.threadCount
              .toLowerCase()
              .includes(filters.threadCount.toLowerCase())
          : true) &&
        (filters.reed
          ? item.reed.toLowerCase().includes(filters.reed.toLowerCase())
          : true) &&
        (filters.remarks
          ? item.remarks.toLowerCase().includes(filters.remarks.toLowerCase())
          : true) &&
        (filters.bOrM ? item.bOrM === filters.bOrM : true)
      );
    });
  }, [loomData, filters]);
  console.log("filters: ", filters);

  const onUpdate = (newValue: any) => {
    setFormData(newValue);
  };

  const onDelete = (id: any) => {
    const updated: any = loomData.filter((item) => item.id !== id);
    setFormData(updated);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let response: any = {};
    if (!formData.id) {
      response = await axiosInstance.post("/api/looms/", formData, {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCSRFToken(),
        },
      });
    } else {
      await axiosInstance.put("/api/looms/" + formData.id + "/", formData, {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCSRFToken(),
        },
      });
    }
    fetchData();
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/api/looms/", {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCSRFToken(),
        },
      });
      setLoomData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setFormData(initialFormData);
    return;
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="space-y-4 p-4">
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
            <label htmlFor="design" className="label-group">
              Design
            </label>
            <input
              type="text"
              id="design"
              name="design"
              value={formData.design}
              onChange={handleChange}
              placeholder="Design"
              className={`input-group ${theme === "dark" ? "dark" : "light"}`}
            />
          </div>
          <div>
            <label htmlFor="type" className="label-group">
              Type
            </label>
            <input
              type="text"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              placeholder="Type"
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
          <button className="btn" onClick={handleSubmit}>
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
      <TanaList
        loading={loading}
        filters={filters}
        setFilters={setFilters}
        companies={companies}
        onUpdate={onUpdate}
        deleteRow={onDelete}
        filteredData={filteredData}
        looms={looms}
      />
    </>
  );
};

export default CompanyFormComponent;
