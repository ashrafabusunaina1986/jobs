import qs from "query-string"

export const formControls = [
    {
        l: 'Name',
        n: 'name',
        ph: 'Enter Name',
        ct: 'input',
        t: 'text'
    }
]
export const initialFormControls = {
    name: ''
}

export const recruiterFormContrls = [
    {
        l: 'Name',
        n: 'name',
        ph: 'Enter Name',
        ct: 'input',
        t: 'text'
    }, {
        l: 'Company Name',
        n: 'companyName',
        ph: 'Enter Company Name',
        ct: 'input',
        t: 'text'
    }, {
        l: 'Company Role',
        n: 'companyRole',
        ph: 'Enter Company Role',
        ct: 'input',
        t: 'text'
    }
]

export const initialRecruiterFormControls = {
    name: '',
    companyName: '',
    companyRole: ''
}

export const candidateFormControls = [
    {
        l: 'Resume',
        n: 'resume',
        ct: 'input',
        t: 'file'
    },
    {
        l: 'Name',
        n: 'name',
        ph: 'Enter Name',
        ct: 'input',
        t: 'text'
    }, {
        l: 'Current Company',
        n: 'currentCompany',
        ph: 'Enter Current Name',
        ct: 'input',
        t: 'text',
    }, {
        l: 'Current Job Location',
        n: 'currentJobLocation',
        ph: 'Enter Current Job Name',
        ct: 'input',
        t: 'text'
    }, {
        l: 'Current Salary',
        n: 'currentSalary',
        ph: 'Enter Current Salary',
        ct: 'input',
        t: 'text'
    }, {
        l: 'Notice Period',
        n: 'noticePeriod',
        ph: 'Enter Notice Period',
        ct: 'input',
        t: 'text'
    }, {
        l: 'Skills',
        n: 'skills',
        ph: 'Enter skills',
        ct: 'input',
        t: 'text'
    }, {
        l: 'Previous Companies',
        n: 'previousCompanies',
        ph: 'Enter Previous Companies',
        ct: 'input',
        t: 'text'
    }, {
        l: 'Total Experience',
        n: 'totalExperience',
        ph: 'Enter Total Experience',
        ct: 'input',
        t: 'text'
    }, {
        l: 'College',
        n: 'college',
        ph: 'Enter College',
        ct: 'input',
        t: 'text'
    }, {
        l: 'College Location',
        n: 'collegeLocation',
        ph: 'Enter College Location',
        ct: 'input',
        t: 'text'
    }, {
        l: 'Graduated Year',
        n: 'graduatedYear',
        ph: 'Enter Graduated Year',
        ct: 'input',
        t: 'text'
    }, {
        l: 'Github Profile',
        n: 'githubProfile',
        ph: 'Enter Github Profile',
        ct: 'input',
        t: 'text'
    },
]
export const postNewJobFormControls = [
    {
        l: 'Company Name',
        n: 'companyName',
        ph: 'Enter Company Name',
        ct: 'input',
        t: 'text',
        d: true
    }, {
        l: 'Title',
        n: 'title',
        ph: 'Enter Title',
        ct: 'input',
        t: 'text'
    }, {
        l: 'Type',
        n: 'type',
        ph: 'Enter Type',
        ct: 'input',
        t: 'text'
    }, {
        l: 'Location',
        n: 'location',
        ph: 'Enter Location',
        ct: 'input',
        t: 'text'
    }, {
        l: 'Description',
        n: 'description',
        ph: 'Enter Description',
        ct: 'input',
        t: 'text'
    }, {
        l: 'Experience',
        n: 'experience',
        ph: 'Enter Experience',
        ct: 'input',
        t: 'text'
    }, {
        l: 'Skills',
        n: 'skills',
        ph: 'Enter Skills',
        ct: 'input',
        t: 'text'
    },
]
export const initialCandidateFormControls = {
    name: '',
    currentCompany: '',
    currentJobLocation: '',
    currentSalary: '',
    noticePeriod: '',
    skills: '',
    previousCompanies: '',
    totalExperience: '',
    college: '',
    collegeLocation: '',
    graduatedYear: '',
    githubProfile: '',
    resume: ''
}
export const initialCandidateAccountFormControls = {
    currentCompany: '',
    currentJobLocation: '',
    currentSalary: '',
    noticePeriod: '',
    skills: '',
    previousCompanies: '',
    totalExperience: '',
    college: '',
    collegeLocation: '',
    graduatedYear: '',
    githubProfile: '',
    resume: ''
}
export const initialPostNewJobFormControls = {
    companyName: '', type: '', location: '', skills: '', title: '', experience: '', description: '',
}
export const vc = d => d && Object.values(d).every(i => i.trim() !== '')
export const clnbtn = "disabled:opacity-55 px-3 py-1 rounded-md hover:shadow-md hover:shadow-gray-700"

export const filterMenuArray = [
    {
        id: 'companyName',
        l: 'Company Name'
    }, {
        id: 'title',
        l: 'Title'
    }, {
        id: 'type',
        l: 'Type'
    }, {
        id: 'location',
        l: 'Location'
    }
]

export const formUrlQuery = ({ params, dataToAdd }) => {
    let currentUrl = qs.parse(dataToAdd)

    if (Object.keys(dataToAdd).length > 0) {
        Object.keys(dataToAdd).map(key => {
            if (dataToAdd[key].length === 0) delete currentUrl[key]
            else currentUrl[key] = dataToAdd[key].join(',')
        })

    }

    return qs.stringifyUrl({
        url: window.location.pathname,
        query: currentUrl
    },
        { skipNull: true })
}