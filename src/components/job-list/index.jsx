"use client";
import React, { useEffect, useState } from "react";
import PostNewJob from "../post-new-job";
import RecruiterJobList from "../recruiter-job-list";
import CandidateJobList from "../candidate-job-list";
import { filterMenuArray, formUrlQuery } from "@/utils";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "../ui/menubar";
import { Label } from "../ui/label";
import { useRouter, useSearchParams } from "next/navigation";

function JobList({ filterCategories, user, profileInfo, jobs, jobApplicants }) {
  const [num, setNum] = useState(0);
  const h = () => {
    let arr = [];
    for (let i = 0; i < jobs.length; i++) {
      arr.push(jobs.slice(20 * i, 20 + i * 20));
    }
    return arr.filter((item) => item?.length !== 0);
  };
  const [filterParams, setFilterParams] = useState({});
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleFilter = (getCurrentId, getCurrentOption) => {
    let cpyFilterPararms = { ...filterParams };
    const indexOfFilter = Object.keys(cpyFilterPararms).indexOf(getCurrentId);

    if (indexOfFilter === -1) {
      cpyFilterPararms = {
        ...cpyFilterPararms,
        [getCurrentId]: [getCurrentOption],
      };
    } else {
      const indexCurrentOption =
        cpyFilterPararms[getCurrentId].indexOf(getCurrentOption);
      if (indexCurrentOption === -1)
        cpyFilterPararms[getCurrentId].push(getCurrentOption);
      else cpyFilterPararms[getCurrentId].splice(indexCurrentOption, 1);
    }
    setFilterParams(cpyFilterPararms);
    sessionStorage.setItem("filterParams", JSON.stringify(cpyFilterPararms));
  };
  const filterMenus = filterMenuArray.map((filterItem) => ({
    id: filterItem.id,
    name: filterItem.l,
    options: [
      ...new Set(
        filterCategories?.map(
          (filterCategory) => filterCategory[filterItem?.id]
        )
      ),
    ],
  }));
  useEffect(() => {
    setFilterParams(JSON.parse(sessionStorage.getItem("filterParams")));
  }, []);
  useEffect(() => {
    let url = "";
    if (filterParams && Object.keys(filterParams).length > 0) {
      url = formUrlQuery({
        params: searchParams.toString(),
        dataToAdd: filterParams,
      });
      router.push(url, { scroll: false });
    }
  }, [router, filterParams, searchParams]);
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-10 items-baseline md:justify-between  pt-20 border-b-[2px] border-gray-500 pb-6">
        <h1 className="text-3xl font-extrabold text-gray-950">
          {profileInfo?.role === "recruiter" ? "Dashboard" : "All Jobs"}
        </h1>
        {profileInfo?.role === "recruiter" ? (
          <PostNewJob user={user} profileInfo={profileInfo} />
        ) : (
          <Menubar>
            {filterMenus.map((filterMenu, i) => (
              <MenubarMenu key={i}>
                <MenubarTrigger className="cursor-pointer text-sm font-bold text-gray-500">
                  {filterMenu.name}
                </MenubarTrigger>
                <MenubarContent>
                  {filterMenu.options.map((option, optionInd) => (
                    <MenubarItem
                      onClick={() => handleFilter(filterMenu.id, option)}
                      key={optionInd}
                      className="flex items-center"
                    >
                      <div
                        className={`w-[14px] rounded text-blue-950 h-[14px] border-2 border-gray-950 ${
                          filterParams &&
                          Object.keys(filterParams).length > 0 &&
                          filterParams[filterMenu.id] &&
                          filterParams[filterMenu.id].indexOf(option) > -1
                            ? "bg-black"
                            : ""
                        } mx-2`}
                      />
                      <Label className=" cursor-pointer text-sm font-bold text-gray-500">
                        {option}
                      </Label>
                    </MenubarItem>
                  ))}
                </MenubarContent>
              </MenubarMenu>
            ))}
          </Menubar>
        )}
      </div>
      <div className="flex items-center justify-center w-[98%] mx-auto my-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-5 px-8 py-5 w-full">
          {jobs &&
            h()
              .slice(num, num + 1)[0]
              .map((job, i) =>
                profileInfo?.role === "recruiter" ? (
                  <RecruiterJobList
                    key={i}
                    job={job}
                    profileInfo={profileInfo}
                    jobApplicants={jobApplicants}
                  />
                ) : (
                  <CandidateJobList
                    key={i}
                    job={job}
                    user={user}
                    profileInfo={profileInfo}
                    jobApplicants={jobApplicants}
                  />
                )
              )}
        </div>
      </div>
      <div className="w-max mx-auto flex items-center gap-2 mb-20">
        {h().map((item, i) => (
          <div
            onClick={() => setNum(i)}
            key={i}
            className="bg-black text-white font-bold text-sm px-3 py-2 mt-20 rounded-full cursor-pointer"
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobList;
