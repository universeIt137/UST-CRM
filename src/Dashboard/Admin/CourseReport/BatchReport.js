import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ReactToPrint from "react-to-print";
import {
  getCourseCollectionData,
  getCourseCollectionTotal,
} from "../../../Utils/courseCollectionTotal";
import CourseCollectionTable from "../Collection/CourseCollectionTable";

const PayReport = () => {
  const [filterData, setFilterData] = useState([]);
  const [total, setTotal] = useState([]);

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const componentRef = useRef();

  const [show, setShow] = useState(false);

  const batchRef = useRef();

  const { data: admissions = [] } = useQuery({
    queryKey: ["admissions"],
    queryFn: async () => {
      const data = await getCourseCollectionData();
      return data;
    },
  });

  const handleCollectionStartInputChange = (event) => {
    const value = event.target.value;
    setStartDate(value);
  };

  const handleCollectionEndInputChange = (event) => {
    const value = event.target.value;
    setEndDate(value);
  };

  const { data: batchsName = [] } = useQuery({
    queryKey: ["batchsName"],
    queryFn: async () => {
      const res = await fetch(`https://uiti-crm-server.vercel.app/batch`);
      const data = await res.json();
      return data;
    },
  });

  useEffect(() => {
    if (filterData.length > 0) {
      const totalCollection = getCourseCollectionTotal(filterData, startDate, endDate);
      setTotal(totalCollection);
    }
  }, [filterData, startDate, endDate]);

  const handleCollectionDateSearch = () => {
    const fData = admissions?.filter(
      (si) => si.batch.name === batchRef.current.value
    );
    setFilterData(fData);
    const filteredData = fData.filter(
      (a) =>
        (a.firstInstallmentDate >= startDate && a.firstInstallmentDate <= endDate) ||
        (a.secondInstallmentDate >= startDate && a.secondInstallmentDate <= endDate) ||
        (a.thirdInstallmentDate >= startDate && a.thirdInstallmentDate <= endDate)
    );
    setFilterData(filteredData);
    setShow(true);
  };



  return (
    <div className="mx-2 my-6">
      <div className="flex flex-row justify-around">
        <h2 className="text-2xl font-bold">Batch Wise Report!</h2>
      </div>

      <div className="flex flex-row justify-center mt-2">
        <div className="form-control mx-2">
          <label className="label">
            <span className="label-text">Batch Name</span>
          </label>

          <select
            ref={batchRef}
            className="select   select-sm w-full border-accent outline-0  ring-0 focus:ring-0 focus:outline-0  "
          >
            <option>Batch Name</option>
            {batchsName?.users?.map((user) => (
              <option key={user._id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-control mx-2">
          <label className="label">
            <span className="label-text">Collection Start Date</span>
          </label>
          <input
            onChange={handleCollectionStartInputChange}
            name=""
            type="date"
            className="input input-accent  input-sm focus:ring-0 focus:outline-0 focus:input-sm  focus:border-2 w-full max-w-xs"
          />
        </div>

        <div className="form-control mx-2">
          <label className="label">
            <span className="label-text">Collection End Date</span>
          </label>
          <input
            onChange={handleCollectionEndInputChange}
            name=""
            type="date"
            className="input input-accent  input-sm focus:ring-0 focus:outline-0 focus:input-sm  focus:border-2 w-full max-w-xs"
          />
        </div>

        <div className="mt-8 mx-2">
          <button
            onClick={handleCollectionDateSearch}
            className="btn btn-sm   text-white btn-accent   hover:btn-accent/[.8]   border-0"
          >
            Filter
          </button>
        </div>

        <div className="my-8 mx-4">
          <ReactToPrint
            trigger={() => (
              <button className="btn btn-sm   text-white bg-green-500   hover:bg-green-600   border-0">
                Print
              </button>
            )}
            content={() => componentRef.current}
          />
        </div>
      </div>

      <div ref={componentRef}>
        {show && (
          <div className="text-center p-2">
            <h1 className="font-bold text-3xl">Universe It Institute</h1>
            <h3>
              {startDate} to {endDate} Collection {total} BDT
            </h3>
          </div>
        )}
        <h1 className="font-bold ">Batch Wise Course Collection Report</h1>
        <CourseCollectionTable
          filterData={filterData}
          startDate={startDate}
          endDate={endDate}
        ></CourseCollectionTable>
        <div className="mt-2 mx-1 flex justify-end">
          <p className="p-1 border-2"> Total : {total} BDT</p>
        </div>
      </div>
    </div>
  );
};

export default PayReport;






