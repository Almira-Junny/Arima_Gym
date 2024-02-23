import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import store from "./redux/store";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { createTheme } from "../theme";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import GlobalAlert from "./components/alert/GlobalAlert";
import { authRoutes, normalRoutes, userRoutes } from "./routes";
import { injectStore } from "./api";
import { persistor } from "./redux/store";
import nProgress from "nprogress";
import "./app.css";
import "simplebar-react/dist/simplebar.min.css";
import "slick-carousel/slick/slick.css";
import LoadingPage from "./pages/LoadingPage";
import { useEffect } from "react";
import PrivateRoute from "./routes/PrivateRoute";

injectStore(store);

function App() {
  const { isLoggedIn, userInfo } = useSelector((state) => state.auth);
  const location = useLocation();

  useEffect(() => {
    nProgress.start();
    nProgress.done();
  }, [location.pathname]);
  return (
    <>
      <GlobalAlert />
      <Routes>
        {normalRoutes.map((route) => {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            />
          );
        })}

        {authRoutes.map((route) => {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                isLoggedIn ? <Navigate to="/dashboard" /> : <route.component />
              }
            />
          );
        })}

        {userRoutes.map((route) => {
          return (
            <Route
              path={route.path}
              key={route.path}
              element={
                <PrivateRoute
                  component={route.component}
                  isLoggedIn={isLoggedIn}
                  isAdmin={userInfo?.role !== "user"}
                  isMembershipValid={
                    userInfo?.membershipEndDate &&
                    new Date(userInfo?.membershipEndDate).getTime() > Date.now()
                  }
                />
              }
            />
          );
        })}
      </Routes>
    </>
  );
}

function WrappedApp() {
  const theme = createTheme();
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={<LoadingPage />} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <QueryClientProvider client={queryClient}>
                <CssBaseline />
                <App />
                <ReactQueryDevtools initialIsOpen={false} />
              </QueryClientProvider>
            </LocalizationProvider>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
}

export default WrappedApp;
