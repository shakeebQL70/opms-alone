import React from 'react'
import {useSelectStore} from 'SUPER/store'

const useSelectorOptions = () => {
    const selectStore = useSelectStore((state: any) => state)
    const {schools, teachers, students, getSchools, getStudents, getTeachers} = selectStore

    const {isLoading: schoolsLoading, list: schoolsList} = schools || {}
    const {isLoading: teachersLoading, list: teachersList} = teachers || {}
    const {isLoading: studentsLoading, list: studentsList} = students || {}

  return {
    schoolsLoading,
    schoolsList,
    teachersList,
    teachersLoading,
    studentsLoading,
    studentsList,
    getSchools,
    getStudents,
    getTeachers
  }
}

export default useSelectorOptions