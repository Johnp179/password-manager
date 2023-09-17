"use client";

import { Bars } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Bars height="300" width="300" color="#fff" ariaLabel="bars-loading" />
    </div>
  );
}
