"use client";
import { updateMessageAction } from "@/actions";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Update({ m }) {
  const [num, setNum] = useState(0);
  const [messagesGroup, setMessageGroup] = useState([]);
  const [s, ss] = useState(false);
  const updateMessage = async (getId) => {
    await updateMessageAction(getId, true, "/update");
  };

  const h = () => {
    let arr = [];
    for (let i = 0; i < m.length; i++) {
      arr.push(m.slice(5 * i, 5 + i * 5));
    }
    return arr.filter((item) => item?.length !== 0);
  };
  const sum = (f) => {
    let s = 0;
    for (let i = 0; i < f; i++) {
      s += h().slice(i, i + 1)[0].length;
    }
    return s;
  };
  // console.log(
  //   h().length,
  //   h().length - num ,
  //   num,
  //   h().slice(num, num + 1)[0].length
  // );
  useEffect(() => {}, []);
  return (
    <div className="flex flex-col gap-5 items-baseline px-8 py-5 mt-10 mb-10 border-2 border-purple-200 rounded-lg">
      {m && m.length > 0
        ? h()
            .slice(num, num + 1)[0]
            .map((mm, i) => (
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
      {/* <div className="w-max mx-auto flex items-center gap-2">
        {h().map((item, i) => (
          <div
            onClick={() => setNum(i)}
            key={i}
            className="bg-black text-white font-bold text-sm px-3 py-2 mt-20 rounded-full cursor-pointer"
          >
            {i + 1}
          </div>
        ))}
      </div> */}
      {m && m.length > 0 && (
        <div className="w-max mx-auto flex items-center gap-2">
          <span className="text-xs text-gray-200">
            1-{sum(num + 1)} of {m?.length}
          </span>
          <ChevronLeft
            onClick={() =>
              num > 0
                ? num >= h().length - 1 - num && setNum((prev) => prev - 1)
                : setNum((prev) => prev)
            }
            className="cursor-pointer"
          />
          <ChevronRight
            onClick={() => num < h().length - 1 && setNum((prev) => prev + 1)}
            className="cursor-pointer"
          />
        </div>
      )}
    </div>
  );
}

export default Update;
