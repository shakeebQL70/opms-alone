export const LabAssetTemplate = [
    {
        'School Name': '',
        'Item Category': '',
        'Item Make': '',
        'Service Provider': '',
        'Category': '',
        'Serial No': '',
        'Model Name': '',
        'Service SLA Amount': '',
        'Service SLA Days': '',
        'Purchase Date': '',
        'Warranty End Date': '',
        'OMT Serial Key': '',
        'OEM Name': '',
        'Asset Status': '',
    },
  ];

  export const exportLabAssetDetails = (details: any) => {
    const exportableData = details.map((data: any) => {
        return {
            'School Name': data?.school?.school_name || 'N/A',
            'School Code': data?.school?.school_code || 'N/A',
            'School District': data?.school?.district || 'N/A',
            'School UDISE Code': data?.school?.udise_code || 'N/A',
            'School Block': data?.school?.block || 'N/A',
            'component': data?.item_category || 'N/A',
            'Asset Item Make': data?.item_make || 'N/A',
            'Asset Serial No': data?.item_serial_no || 'N/A',
            'Status': data?.status || 'N/A'
        }
    })

    return exportableData
  }