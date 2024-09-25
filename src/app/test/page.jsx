'use client'
import CommonForm from '@/components/common-form'
import { candidateFormControls, formControls, initialCandidateFormControls, initialFormControls, initialRecruiterFormControls, recruiterFormContrls, vc } from '@/utils'

import React, { useEffect, useState } from 'react'

function Test() {
    const [df, sdf] = useState(initialCandidateFormControls)
    return (
        <div>
            <CommonForm bt={'Add Test'} bd={!vc(df)}
                df={df} sdf={sdf}
                fcs={candidateFormControls} ac={() => { }}
                cln="w-2/3 font-bold mx-auto py-10"
                af={'.pdf'}
                />
        </div>
    )
}

export default Test