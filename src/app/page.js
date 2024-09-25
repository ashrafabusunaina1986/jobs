
import { fetchProfileAction } from "@/actions";
import HomepageButtons from "@/components/homepage-buttons";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Fragment } from "react";


export default async function Home() {
  const user = await currentUser()
  const profileInfo = await fetchProfileAction(user?.id)
  if (user && !profileInfo?._id) {
    redirect('/onboard')
  } else return (<Fragment>
    <div className="bg-white">
      <div className="relative w-full">
        <div className="min-h-screen flex">
          <div className=" container p-0 mx-auto">
            <div className="flex items-center flex-wrap gap-12 lg:gap-0">
              <div className="lg:w-5/12 space-y-8">
                <span className="flex space-x-2">
                  <span className="block w-14 border-b-2 border-gray-700 mb-2"></span>
                  <span className=" font-medium text-gray-700" >One Stop Solution To Find Jobs</span>
                </span>
                <h1 className="text-4xl md:text-6xl">
                  The Best <br />Job Portal App
                </h1>
                <p className="text-xl text-gray-700">
                  Find Best Jobs From To Product Best Companies And Built
                  Your Career
                </p>
                <HomepageButtons user={JSON.parse(JSON.stringify(user))} profileInfo={profileInfo} />
              </div>
              <div className="hidden md:block lg:w-7/12">
                <Image width={500} height={400} alt="Job Portal" src={'/job.jpeg'} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Fragment>)
}
