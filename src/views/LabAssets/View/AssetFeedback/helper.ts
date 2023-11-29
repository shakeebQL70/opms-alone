export const exportLabAssetFeedback = (details: any) => {
    const exportableData = details.map((data: any) => {
        return {
            'School Name': data?.school?.school_name || 'N/A',
            'School Code': data?.school?.school_code || 'N/A',
            'School District': data?.school?.district || 'N/A',
            'School UDISE Code': data?.school?.udise_code || 'N/A',
            'School Block': data?.school?.block || 'N/A',
            'component': data?.component || 'N/A',
            'Asset Item Make': data?.asset_item_make || 'N/A',
            'Asset Serial No': data?.asset_serial_no || 'N/A',
            'Status': data?.status || 'N/A'
        }
    })

    return exportableData
  }