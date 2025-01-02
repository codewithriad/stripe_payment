"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function PaymentSuccess() {
  const amount = useSearchParams().get("amount")?.toString();
  const [isVisible, setIsVisible] = useState(true);
  const route = useRouter();

  function handleClose() {
    setIsVisible(false);
    route.push("/");

    // No need to return anything here
  }

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
        <div className="text-center">
          <div className="mb-4 flex items-center justify-center">
            <div className="h-12 w-12 rounded-full bg-green-100 p-2">
              <svg
                className="h-full w-full text-green-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2a10 10 0 100 20 10 10 0 000-20zM10.707 15.293a1 1 0 01-1.414 0L7 13l1.414-1.414L10 13.172l5.293-5.293L17 9.586l-6.293 6.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <h2 className="text-4xl font-semibold text-gray-800">
            Payment Successful!
          </h2>
          <p className="mt-2 text-2xl font-semibold text-green-500">
            You have successfully paid{" "}
            <span className="text-purple-700">${amount}</span>
          </p>
          <button
            onClick={handleClose}
            className="mt-4 w-full rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
