  export const exportVisitorDetails = (details: any) => {
    const exportableData = details.map((data: any) => {
        return {
            'School Name': data?.school?.school_name || 'N/A',
            'School Code': data?.school?.school_code || 'N/A',
            'School District': data?.school?.district || 'N/A',
            'School UDISE Code': data?.school?.udise_code || 'N/A',
            'School Block': data?.school?.block || 'N/A',
            'Visitor Name': data?.name || 'N/A',
            'Date' : data?.date || 'N/A',
            'Type': data?.type || 'N/A',
            'Designation': data?.designation || 'N/A',
            'Purpose': data?.purpose || 'N/A',
            'Feedback': data?.feedback || 'N/A',
            'Issues': data?.any_issue || 'N/A',
        }
    })

    return exportableData
  }