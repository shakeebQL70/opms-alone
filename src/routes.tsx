import React from "react";
const Home = React.lazy(() => import("./components/Dashboard"));
// @ts-ignore
import { Outlet } from "react-router-dom";

const Users = React.lazy(() => import("./views/Users"));
const Details = React.lazy(() => import("./views/Users/Details"));
const Projects = React.lazy(() => import("./views/Projects"));
const Schools = React.lazy(() => import("./views/Schools"));
const Teachers = React.lazy(() => import("./views/Teachers"));
const LabUsageTheory = React.lazy(() => import("./views/LabUsage/Theory"));
const LabUsageMIS = React.lazy(() => import("./views/LabUsage/MISOffice"));
const Students = React.lazy(() => import("./views/Students"));
const Visitors = React.lazy(() => import("./views/Visitors/VisitorsList"));
const DCVisitors = React.lazy(() => import("./views/Visitors/DCVisitorsList"));
// const LabUsage = React.lazy(() => import("./views/LabUsage"));
const ContentFeedback = React.lazy(() => import("./views/ContentFeedback"));
const AssetsCallLog = React.lazy(() => import("./views/AssetsCallLog/Lists"));
const AssetsFAQ = React.lazy(() => import("./views/AssetsCallLog/FAQ"));
const AssetsTheftList = React.lazy(() => import("./views/AssetsTheftDetails"));
const StudentDetails = React.lazy(
  () => import("./views/Teachers/StudentDetails")
);
const UptimeDowntime = React.lazy(() => import("./views/UptimeDowntime"));
const LabAssetReplacement = React.lazy(
  () => import("./views/LabAssets/View/AssetReplacement/LabAssetReplacement")
);
const LabAssetFeedback = React.lazy(
  () => import("./views/LabAssets/View/AssetFeedback/LabAssetFeedback")
);

const Service = React.lazy(() => import("./views/Service"));
const TeacherDetails = React.lazy(
  () => import("./views/TeacherTrainingModule")
);
const LabAssets = React.lazy(() => import("./views/LabAssets"));

const routes = [
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        path: "",
        element: <Home />,
        index: true,
      },
      {
        path: "employee",
        element: <Users />,
      },
      {
        path: "employee/view/:id",
        element: <Details />,
      },
      {
        path: "project",
        element: <Projects />,
      },
      {
        path: "schools",
        element: <Schools />,
      },
      {
        path: "teachers",
        element: <Teachers />,
      },
      {
        path: "students",
        element: <Outlet />,

        children: [
          {
            path: "",
            element: <Students />,
            index: true,
          },
          {
            path: "details",
            element: <StudentDetails />,
          },
        ],
      },
      {
        path: "lab-assets",
        element: <Outlet />,

        children: [
          {
            path: "",
            element: <LabAssets />,
            index: true,
          },
          {
            path: "replacement",
            element: <LabAssetReplacement />,
            index: true,
          },
          {
            path: "feedback",
            element: <LabAssetFeedback />,
            index: true,
          },
        ],
      },
      {
        path: "content-feedback",
        element: <ContentFeedback />,
      },
      {
        path: "service",
        element: <Service />,
      },
      {
        path: "labusage",
        element: <Outlet />,

        children: [
          {
            path: "",
            element: <LabUsageTheory />,
            index: true,
          },
          {
            path: "mis",
            element: <LabUsageMIS />,
          },
        ],
      },
      {
        path: "visitors",
        element: <Outlet />,

        children: [
          {
            path: "",
            element: <Visitors />,
            index: true,
          },
          {
            path: "dc",
            element: <DCVisitors />,
          },
        ],
      },
      {
        path: "asset-call-log",
        element: <Outlet />,
        children: [
          {
            path: "",
            element: <AssetsCallLog />,
            index: true,
          },
          {
            path: "faq",
            element: <AssetsFAQ />,
          },
        ],
      },

      {
        path: "asset-theft",
        element: <AssetsTheftList />,
      },
      {
        path: "uptime-downtime",
        element: <UptimeDowntime />,
      },
      {
        path: "teacher-training",
        element: <TeacherDetails />,
      },
    ],
  },
];

export default routes;
