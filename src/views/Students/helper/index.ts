export const studentDetailsTemplate = [
    {
        'School Name': '',
        'Name': '',
        'Class': '',
        'Section': '',
        'State': '',
        'District': '',
        'Village': '',
        'Session': '',
        'Gender': '',
        'Date Of Birth': '',
    },
  ];

  export const exportStudentDetails = (details: any) => {
    const exportableData = details.map((data: any) => {
        return {
            'School Name': data?.school?.school_name || 'N/A',
            'School Code': data?.school?.school_code || 'N/A',
            'School District': data?.school?.district || 'N/A',
            'School UDISE Code': data?.school?.udise_code || 'N/A',
            'School Block': data?.school?.block || 'N/A',
            'Student Name': data?.name || 'N/A',
            'Class': data?.class || 'N/A',
            'Gender': data?.gender || 'N/A',
            'Session': data?.session || 'N/A'
        }
    })

    return exportableData
  }