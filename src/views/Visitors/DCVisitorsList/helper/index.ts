export const exportDCVisitorDetails = (details: any) => {
    const exportableData = details.map((data: any) => {
        return {
            'School Name': data?.school?.school_name || 'N/A',
            'School Code': data?.school?.school_code || 'N/A',
            'School District': data?.school?.district || 'N/A',
            'School UDISE Code': data?.school?.udise_code || 'N/A',
            'School Block': data?.school?.block || 'N/A',
            'Visitor Name': data?.name || 'N/A',
            'Date' : data?.date_of_visit || 'N/A',
            'Type': data?.visit_type || 'N/A',
        }
    })

    return exportableData
  }