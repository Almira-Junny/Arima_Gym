import LandingPage from "../pages/LandingPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import PaymentPage from "../pages/PaymentPage";
import NotFound from "../pages/NotFound";
import QRScanner from "../pages/QRScaner";
import QRCreater from "../pages/QRCreater";
import Attendances from "../pages/Attendances";
import Payments from "../pages/Payments";
import CreateAccount from "../pages/CreateAccount";
import AllClass from "../pages/AllClass";
import MyClass from "../pages/MyClass";
import MyAccount from "../pages/MyAccount";
import CreateClass from "../pages/CreateClass";
import Plan from "../pages/Plan";
import MyClassPT from "../pages/MyClassPT";
import AllUsers from "../pages/AllUsers";
import AllPts from "../pages/AllPts";
import ForgetPassword from "../pages/ForgetPassword";
import ResetPassword from "../pages/ResetPassword";

export const normalRoutes = [
  { path: "/", component: LandingPage },
  {
    path: "*",
    component: NotFound,
  },
  { path: "/payment", component: PaymentPage },
];

export const authRoutes = [
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/forgetPassword", component: ForgetPassword },
  { path: "/resetPassword", component: ResetPassword },
];

export const userRoutes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/qrScan", component: QRScanner },
  { path: "/qrCreate", component: QRCreater },
  { path: "/attendances", component: Attendances },
  { path: "/payments", component: Payments },
  { path: "/createAccount", component: CreateAccount },
  { path: "/classes", component: AllClass },
  { path: "/myClass", component: MyClass },
  { path: "/account", component: MyAccount },
  { path: "/createClass", component: CreateClass },
  { path: "/plans", component: Plan },
  { path: "/myClassPT", component: MyClassPT },
  { path: "/customers", component: AllUsers },
  { path: "/pts", component: AllPts },
];
