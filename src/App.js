import React, { useState } from "react";
import { tenureData } from "./utils/constants";

const App = () => {
  const [cost, setCost] = useState(0);
  const [interest, setInterest] = useState(10);
  const [fee, setFee] = useState(1);
  const [downPayment, setDownPayment] = useState();
  const [tenure, setTenure] = useState(24);
  const [emi, setEmi] = useState(0);

  const updateEmi = (e) => {
    if (!cost) return;

    const dp = Number(e.target.value);
    setDownPayment(dp.toFixed(0));

    const emi = calculateEmi(dp);
    setEmi(emi);
  };
  const updateDownPayment = () => {
    
  };
  const calculateEmi = (downpayment) => {
    if (!cost) return;

    const loanAmt = cost - downpayment;
    const rateOfInterest = interest / 100;
    const numOfYears = tenure / 12;

    const EMI =
      (loanAmt * rateOfInterest * (1 + rateOfInterest) ** numOfYears) /
      ((1 + rateOfInterest) ** numOfYears - 1);

    return Number(EMI / 12).toFixed(0);
  };


  return (
    <div className="flex flex-col gap-4 m-10">
      <span className="text-lg font-bold">EMI Calculator</span>
      <span>Total Cast of Asset</span>
      <input
        className="outline-none border p-1"
        type="number"
        value={cost}
        onChange={(e) => setCost(e.target.value)}
        placeholder="Total Cast of Asset"
      />
      <span>Interest Rate (in %)</span>
      <input
        className="outline-none border p-1"
        type="number"
        value={interest}
        onChange={(e) => setInterest(e.target.value)}
        placeholder="Interest Rate"
      />
      <span>Processing Fee (in %)</span>
      <input
        className="outline-none border p-1"
        type="number"
        value={fee}
        onChange={(e) => setFee(e.target.value)}
        placeholder="Processing Fee"
      />
      <span>Down Payment</span>
      <div>
        <input
          type="range"
          className="w-[100%]"
          min={0}
          max={cost}
          value={downPayment}
          onChange={updateEmi}
        />
        <div className="flex justify-between">
          <label>0%</label>
          <b>{downPayment}</b>
          <label>100%</label>
        </div>
      </div>
      <span>Loan Per Month</span>
      <div>
        <input
          type="range"
          className="w-[100%]"
          min={calculateEmi(cost)}
          max={calculateEmi(0)}
          value={downPayment}
          onChange={updateDownPayment}
        />
        <div className="flex justify-between">
          <label>{calculateEmi(cost)}</label>
          <b>{emi}</b>
          <label>{calculateEmi(0)}</label>
        </div>
      </div>

      <span>Tenure</span>
      <span className="flex justify-between">
        {tenureData.map((data, index) => (
          <span
            className={
              data === tenure
                ? "border py-2 px-6 bg-blue-300 rounded-lg cursor-pointer"
                : "border py-2 px-6  rounded-lg cursor-pointer"
            }
            onClick={() => setTenure(data)}
            key={index}
          >
            {data}
          </span>
        ))}
      </span>
    </div>
  );
};

export default App;
