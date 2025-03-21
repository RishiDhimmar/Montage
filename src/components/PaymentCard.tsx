import React from "react";

const PaymentForm: React.FC = () => {
  return (
    <div className="mt-6 p-4 border rounded-lg bg-gray-100">
      <h2 className="text-lg font-semibold mb-4">Payment Details</h2>
      <input className="w-full mb-3 p-2 border rounded" type="email" placeholder="Email" />
      <input className="w-full mb-3 p-2 border rounded" type="text" placeholder="Card Number" />
      <div className="flex gap-2">
        <input className="w-1/2 p-2 border rounded" type="text" placeholder="MM/YY" />
        <input className="w-1/2 p-2 border rounded" type="text" placeholder="CVC" />
      </div>
      <input className="w-full mt-3 p-2 border rounded" type="text" placeholder="Full Name on Card" />
      <button className="w-full mt-4 p-2 bg-blue-600 text-white rounded">Pay</button>
    </div>
  );
};

export default PaymentForm;
