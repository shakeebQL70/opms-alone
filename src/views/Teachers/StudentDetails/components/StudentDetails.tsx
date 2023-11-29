import React, { useState } from "react";
import { Box } from "@mui/material";
import Header from "./Header";
import Filters from "./Filters";
import List from "./List";
import {useStudentStore} from 'SUPER/store'

const defaultValues = {
  district: null,
  class: null,
  schoolCode: null,
  gender: null,
  session: null,
};

const StudentDetails = () => {
  return (
    <Box>
      <Header />
      <Filters data={defaultValues} />
      <List />
    </Box>
  );
};

export default StudentDetails;
