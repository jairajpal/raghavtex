// components/RawMaterialList.tsx

import React, { useEffect, useState } from "react";

interface DataItem {
  date: string;
  challanNo: string;
  company: string;
  designType: string;
  size: string;
  color: string;
  quantity: number;
  weight: number;
  remarks: string;
  quality: string;
  shuttleOrMat: string;
  receiving: string;
}

const RawMaterialList: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Replace this URL with your actual API endpoint
    // fetch("https://api.example.com/data")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setData(data);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching data:", error);
    //     setLoading(false);
    //   });
  }, []);

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full border-gray-200">
        <thead>
          <tr>
            <th className="tableData">Date</th>
            <th className="tableData">Challan No</th>
            <th className="tableData">Company</th>
            <th className="tableData">Design Type</th>
            <th className="tableData">Size</th>
            <th className="tableData">Color</th>
            <th className="tableData">Quantity</th>
            <th className="tableData">Weight</th>
            <th className="tableData">Remarks</th>
            <th className="tableData">Quality</th>
            <th className="tableData">Shuttle or Mat</th>
            <th className="tableData">Receiving</th>
          </tr>
        </thead>
        {data.length > 0 ? (
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className="tableData">{item.date}</td>
                <td className="tableData">{item.challanNo}</td>
                <td className="tableData">{item.company}</td>
                <td className="tableData">{item.designType}</td>
                <td className="tableData">{item.size}</td>
                <td className="tableData">{item.color}</td>
                <td className="tableData">{item.quantity}</td>
                <td className="tableData">{item.weight}</td>
                <td className="tableData">{item.remarks}</td>
                <td className="tableData">{item.quality}</td>
                <td className="tableData">{item.shuttleOrMat}</td>
                <td className="tableData">{item.receiving}</td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              {loading ? (
                <td className="text-center align-middle">Loading data...</td>
              ) : (
                <td className="text-center align-middle">No data found...</td>
              )}
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};

export default RawMaterialList;
