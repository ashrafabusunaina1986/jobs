"use client";
import React from "react";

function JobStatus({ m }) {
  console.log(m);

  return (
    <div className="bg-gray-100 flex flex-col items-baseline gap-4 px-14 py-10 m-5 rounded-lg shadow-md shadow-purple-200">
      <h1 className="text-3xl font-extrabold text-gray-900">
        {" "}
        {"Job title (" + m?.jobTitle + ")"}
      </h1>
      <p className="text-xl font-bold text-gray-700">{"Status " + m?.m}</p>
      <span className="text-xs font-bold text-red-950">{"Date " + m?.dateStart}</span>
    </div>
  );
}

export default JobStatus;
