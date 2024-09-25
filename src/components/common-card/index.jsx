import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import Image from 'next/image'

function CommonCard({ icon, title, companyName, fbtn }) {
  return (
    <Card className="px-5 py-3 transition duration-300 shadow-sm shadow-gray-600 hover:shadow-lg hover:shadow-gray-900 bg-gray-200" >
      <Image src={icon} width={75} height={75} alt='job' />
      <CardHeader >
        <CardTitle className="text-sm font-bold text-gray-900" >
          {title ? title : null}
        </CardTitle>
      </CardHeader>
      <CardDescription className="text-xs font-medium text-gray-600">
        {companyName ? companyName : null}
      </CardDescription>
      <CardFooter className="py-8">
        {fbtn}
      </CardFooter>
    </Card>
  )
}

export default CommonCard