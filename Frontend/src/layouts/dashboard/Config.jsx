import {
  ChartBarIcon,
  UserIcon,
  UserGroupIcon,
  QrCodeIcon,
  AcademicCapIcon,
  ClipboardDocumentListIcon,
  BanknotesIcon,
  CurrencyDollarIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  DocumentPlusIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/solid";
import { SvgIcon } from "@mui/material";

export const userItems = [
  {
    title: "Trang chủ",
    path: "/dashboard",
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Tạo QR",
    path: "/qrCreate",
    icon: (
      <SvgIcon fontSize="small">
        <QrCodeIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Lớp tập",
    path: "/classes",
    icon: (
      <SvgIcon fontSize="small">
        <ClipboardDocumentListIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Lớp của tôi",
    path: "/myClass",
    icon: (
      <SvgIcon fontSize="small">
        <ClipboardDocumentCheckIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Lịch sử tập",
    path: "/attendances",
    icon: (
      <SvgIcon fontSize="small">
        <ArrowRightOnRectangleIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Gói tập",
    path: "/payment",
    icon: (
      <SvgIcon fontSize="small">
        <BanknotesIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Tài khoản",
    path: "/account",
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    ),
  },
];

export const ptItems = [
  {
    title: "Trang chủ",
    path: "/dashboard",
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Tạo lớp",
    path: "/createClass",
    icon: (
      <SvgIcon fontSize="small">
        <DocumentPlusIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Lớp của tôi",
    path: "/myClassPT",
    icon: (
      <SvgIcon fontSize="small">
        <ClipboardDocumentListIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Tài khoản",
    path: "/account",
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    ),
  },
];

export const adminItems = [
  {
    title: "Trang chủ",
    path: "/dashboard",
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Quét QR",
    path: "/qrScan",
    icon: (
      <SvgIcon fontSize="small">
        <QrCodeIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Khách hàng",
    path: "/customers",
    icon: (
      <SvgIcon fontSize="small">
        <UserGroupIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Huấn luyện viên",
    path: "/pts",
    icon: (
      <SvgIcon fontSize="small">
        <AcademicCapIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Lớp dạy",
    path: "/classes",
    icon: (
      <SvgIcon fontSize="small">
        <ClipboardDocumentListIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Gói tập",
    path: "/plans",
    icon: (
      <SvgIcon fontSize="small">
        <BanknotesIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Giao dịch",
    path: "/payments",
    icon: (
      <SvgIcon fontSize="small">
        <CurrencyDollarIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Tài khoản",
    path: "/account",
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Tạo tài khoản",
    path: "/createAccount",
    icon: (
      <SvgIcon fontSize="small">
        <UserPlusIcon />
      </SvgIcon>
    ),
  },
];
