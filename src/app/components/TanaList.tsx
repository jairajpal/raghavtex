// components/RawMaterialList.tsx

import React, { useEffect, useState } from "react";

interface DataItem {
  date: string;
  loomNo: string;
  company: string;
  design_type: string;
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

export const TanaList: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Replace this URL with your actual API endpoint
    fetch("https://api.example.com/data")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full border-gray-200">
        <thead>
          <tr>
            <th className="tableData">Date</th>
            <th className="tableData">Loom No.</th>
            <th className="tableData">Company</th>
            <th className="tableData">Design Type</th>
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
          </tr>
        </thead>
        {data.length > 0 ? (
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className="tableData">{item.date}</td>
                <td className="tableData">{item.loomNo}</td>
                <td className="tableData">{item.company}</td>
                <td className="tableData">{item.design_type}</td>
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
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan={15} className="text-center align-middle">
                {loading ? "Loading data..." : "No data found..."}
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};
