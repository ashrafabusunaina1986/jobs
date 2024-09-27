"use client";
import { createTAction, fetchMessageAction, fetchTAction } from "@/actions";
import { Info, MessageCircle, MessageSquare, Notebook } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function T({ user }) {
  const [m, sm] = useState([]);
  const [l, sl] = useState(0);
  const [h, sh] = useState(false);

  useEffect(() => {
    const fetchMessaage = async () => {
      const message = await fetchMessageAction(user?.id);
      const t = await fetchTAction();
      // console.log(message, t);
      sm(message);
      let c = 0;
      message.map((tt, i) => (c = c + (!tt.t ? 1 : 0)));
      sl(c);
    };
    fetchMessaage();
  }, [user]);
  return (
    <div className="relative w-11/12">
      <Link
        href={"/update"}
        onClick={async () => {
          await createTAction(
            {
              userId: user?.id,
              time: l,
              dateStart: new Date().toDateString(),
              dateEnd: Date.UTC(
                new Date().getFullYear(),
                new Date().getMonth(),
                new Date().getDay()
              ).toString(),
            },
            "/job"
          );
          sl(0);
        }}
        onMouseOut={() => sh(false)}
        onMouseOver={() => sh(true)}
        className="flex items-center gap-2 px-2 py-1 bg-red-100 rounded-full hover:bg-red-200 w-max"
      >
        <Info />
        <span className=" text-xs text-gray-900 font-bold">Updates</span>
        {l > 0 && (
          <span className="text-xs font-bold bg-yellow-800 text-gray-900 rounded-full px-3 py-1 ">
            {l + " new"}
          </span>
        )}
      </Link>
    </div>
  );
}

export default T;
