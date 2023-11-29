export const schoolDetailsTemplate = [
    {
        'Project Id': '',
        'UDISE Code': '',
        'BCCL Code': '',
        "School Name": '',
        'School Type': null,
        'Pincode': '',
        'Country': null,
        'State': null,
        'City': '',
        'District': null,
        'Block': '',
        'Village': '',
        'Address': '',
        'Landline': '',
        'Principal Name': '',
        'Principal Mobile': '',
        'Policestation Name': '',
        'Policestation Address': '',
        'Policestation Landline': '',
        'Policestation Contact Person': '',
        'Policestation Contact Person No': '',
        'IS Esic Available': '',
        'Is Active': '',
        'Latitude': '',
        'Longitude': '',
        'SW Code': '',
        'SW Activation Key': '',
        'Device Token': '',
        'Zone': ''
    },
  ];

  export const exportSchoolDetails = (details: any) => {
    const exportableData = details?.map((data: any) => {
        return {
            'School Name': data?.name || 'N/A',
            'School Code': data?.school_code || 'N/A',
            'School District': data?.district || 'N/A',
            'School UDISE Code': data?.udise_code || 'N/A',
            'School Block': data?.block || 'N/A',
            'Project State / UT': data?.state || 'N/A',
            'School Type': data?.type || 'N/A',
            'Pin' : data?.pincode || 'N/A',
        }
    })

    return exportableData
  }