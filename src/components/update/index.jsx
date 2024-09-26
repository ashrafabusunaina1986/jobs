"use client";
import { updateMessageAction } from "@/actions";
import Link from "next/link";
import React, { useState } from "react";

function Update({ m }) {
  const [s, ss] = useState(false);
  const updateMessage = async (getId) => {
    await updateMessageAction(getId, true, "/update");
  };
  return (
    <div className="flex flex-col gap-5 items-baseline px-8 py-5 mt-10 mb-10 border-2 border-purple-200 rounded-lg">
      {m && m.length > 0
        ? m.map((mm, i) => (
            <Link
              href={`/update/${mm?._id}`}
              key={i}
              id={`m${i}`}
              onClick={() => updateMessage(mm._id)}
              className={`flex flex-col gap-3 ${
                mm?.t ? "font-normal bg-gray-50" : "font-bold bg-gray-200"
              } cursor-pointer w-full shadow-sm shadow-purple-200 px-5 py-3 transition duration-300 hover:shadow-md hover:shadow-purple-300 rounded-md`}
            >
              <h1 className="text-sm text-gray-600">
                {"Job Title " + mm?.jobTitle}
              </h1>
            </Link>
          ))
        : null}
    </div>
  );
}

export default Update;
