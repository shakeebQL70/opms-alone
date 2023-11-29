import { Box } from "@mui/material";
import React from "react";
import Header from "./Header";
import List from "./List";
import Filters from "./Filters";

const Service = () => {
    return (
        <Box>
            <Header />
            <Filters data={''} />
            <List />
        </Box>
    );
}

export default Service;