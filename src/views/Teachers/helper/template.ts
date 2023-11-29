export const teacherDetailsTemplate = [
    {'School Name': "",
     'Teacher Name': '',
      Gender: "",
     'Ict Trained': '',
      Mobile:'',
     'Class Taught': '',
     'Appointed For' : '',
     'Teacher Qualification': '',
     'Teacher Skills': '',
     'Teacher Category': '',
     Experience: '',
     Village: '',
     State:'',
     District: '',
     Country: '',
     Session: ''
    },
  ];

  export const exportTeacherDetails = (details: any) => {
    const exportableData = details?.map((data: any) => {
        return {
            'School Name': data?.school?.school_name,
            'School Code': data?.school?.school_code,
            'School District': data?.school?.district,
            'School UDISE Code': data?.school?.udise_code,
            'School Block': data?.school?.block,
            'Teacher Name': data?.name,
            'Gender': data?.gender,
            'Mobile': data?.mobile,
            'Subject' : data?.appointed_subject?.join(', '),
            'ICT Trained': data?.ict_trained,
            'Status': data?.status
        }
    })

    return exportableData
  }