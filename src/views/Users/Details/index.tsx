import { Grid } from "@mui/material";
import React, { useState, SyntheticEvent, useEffect, useMemo } from "react";
import { BasicTabs, TabsWrapper, TabWrapper, CustomTabPanel } from "UI/tabs";
import Profile from "./Profile";
import PersonalDetails from "./PersonalDetails";
import BankInformation from "./BankInformation";
import EducationalQualification, {
  EditEducationDetail,
} from "./EducationDetail";
import TechnicalQualification from "./TechnicalQualification";
import PriorExperience from "./PriorExperience";
import { useUserProfileStore } from "SUPER/store";
import { useParams, useSearchParams } from "react-router-dom";
import { formatDateYYYYMMDD } from "../../../utils";

export type selectedFile = {
  file: File | null;
  msg: string;
};

const tabs = [
  "Profile",
  "Personal Information",
  "Bank/PF Information",
  "Educational Qualification",
  // "Technical/Professional Qualification",
  "Experience Details (Recent to Past)",
];

const tabIndices: Record<number, string> = {
  0: "profile",
  1: "personal",
  2: "bank",
  3: "education",
  // 4: "technical",
  4: "experience",
};
export const NA = "Not Available";

const QUERY_NAME = "detail";
const index = () => {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const getIndex = () => {
    const index = Object.values(tabIndices).findIndex(
      (item) => item === searchParams.get(QUERY_NAME)
    );
    return index < 0 ? 0 : index;
  };

  const selectedTab = useMemo(() => getIndex(), [searchParams.get(QUERY_NAME)]);

  const { getUserInfoById, userInfo } = useUserProfileStore(
    (state: any) => state
  );

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setSearchParams({ [QUERY_NAME]: tabIndices[newValue] });
  };

  useEffect(() => {
    if (!selectedTab) {
      setSearchParams({ [QUERY_NAME]: tabIndices["0"] });
    }
  }, []);

  useEffect(() => {
    if (params?.id) {
      (() => {
        getUserInfoById(params.id);
      })();
    }
  }, [params.id]);

  const profileDetails = {
    email: userInfo?.email || NA,
    personalcontactNUMBER: userInfo?.contact_number || NA,
    gender: userInfo?.gender || NA,
    designation: userInfo?.designation || NA,
    dateOfJoining: userInfo?.date_of_joining,
    dateOfResignation: userInfo?.date_of_resignation,
  };


  const personalDetail = {
    fatherName: userInfo?.father_name || NA,
    dob: userInfo?.d_o_b,
    gender: userInfo?.gender || NA,
    emergencycontactNUMBER: userInfo?.emergency_contact_no || NA,
    residentialAddress: userInfo?.residential_address || NA,
    residentialPINCODENUMBER: userInfo?.residential_pincode || NA,
    permanentAddress: userInfo?.permanent_address,
    permanentPINCODENUMBER: userInfo?.permanent_pincode || NA,
    imgSignedURL: userInfo?.user_profile_image || NA,
  };

  

  return (
    <BasicTabs>
      <TabsWrapper value={selectedTab} onChange={handleChange}>
        {tabs.map((tab, index) => {
          return <TabWrapper key={index} label={tab} index={index} />;
        })}
      </TabsWrapper>

      <CustomTabPanel value={selectedTab} index={0}>
        <Profile details={profileDetails} />
      </CustomTabPanel>
      <CustomTabPanel value={selectedTab} index={1}>
        <PersonalDetails details={personalDetail} />
      </CustomTabPanel>
      <CustomTabPanel value={selectedTab} index={2}>
        <BankInformation
          details={
            userInfo?.bank_details && Object.keys(userInfo.bank_details).length
              ? userInfo.bank_details
              : null
          }
        />
      </CustomTabPanel>
      <CustomTabPanel value={selectedTab} index={3}>
        <EducationalQualification details={userInfo?.qualification || []} />
      </CustomTabPanel>
      {/* <CustomTabPanel value={selectedTab} index={4}>
        <TechnicalQualification details={userInfo?.qualification} />
      </CustomTabPanel> */}
      <CustomTabPanel value={selectedTab} index={4}>
        <PriorExperience details={userInfo?.experience || []} />
      </CustomTabPanel>
    </BasicTabs>
  );
};

export default index;
