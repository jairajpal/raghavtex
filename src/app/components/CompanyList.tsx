// components/RawMaterialList.tsx

import React, { useEffect, useState } from "react";

interface DataItem {
  date: string;
  name: string;
  gstNo: string;
  phoneNo: string;
  remarks: string;
}

export const CompanyList: React.FC = () => {
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
            <th className="tableData">Name</th>
            <th className="tableData">GST No.</th>
            <th className="tableData">Phone No.</th>
            <th className="tableData">Remarks</th>
          </tr>
        </thead>
        {data.length > 0 ? (
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className="tableData">{item.date}</td>
                <td className="tableData">{item.name}</td>
                <td className="tableData">{item.gstNo}</td>
                <td className="tableData">{item.phoneNo}</td>
                <td className="tableData">{item.remarks}</td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td></td>
              <td></td>
              {loading ? (
                <td className="text-center align-middle">Loading data...</td>
              ) : (
                <td className="text-center align-middle">No data found...</td>
              )}
            </tr>
          </tbody>
        )}{" "}
      </table>
    </div>
  );
};
