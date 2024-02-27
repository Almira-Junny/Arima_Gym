import { useDispatch, useSelector } from "react-redux";
import Layout from "../layouts/dashboard/Layout";
// import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { format } from "date-fns";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import TotalCustomers from "../components/overview/TotalCustomers";
import TotalPts from "../components/overview/TotalPts";
import TotalProfit from "../components/overview/TotalProfit";
import TotalEnrollToday from "../components/overview/TotalEnrollToday";
import LatestPayments from "../components/overview/LatestPayments";
import TotalAttendances from "../components/overview/TotalAttendances";
import MembershipStartDate from "../components/overview/MembershipStartDate";
import MembershipEndDate from "../components/overview/MembershipEndDate";
import LatestAttendances from "../components/overview/LatestAttendances";
import { getAllPayments } from "../api/payment";
import { showAlert } from "../redux/features/alertSlice";
import { getAllPts, getAllUsers } from "../api/user";
import {
  getAttendanceToday,
  getLatestAttendance,
  getMyAttendance,
} from "../api/attendance";
import LoadingPage from "./LoadingPage";

function Dashboard() {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { data: payments } = useQuery("total-payments", getAllPayments, {
    refetchOnWindowFocus: false,
    enabled: userInfo?.role === "admin",
    onError: (err) => {
      dispatch(
        showAlert({
          severity: "error",
          message: err.response.data.message,
        })
      );
    },
  });

  const { data: users } = useQuery("total-users", getAllUsers, {
    refetchOnWindowFocus: false,
    enabled: userInfo?.role === "admin",
    onError: (err) => {
      dispatch(
        showAlert({
          severity: "error",
          message: err.response.data.message,
        })
      );
    },
  });

  const { data: pts } = useQuery("total-pts", getAllPts, {
    refetchOnWindowFocus: false,
    enabled: userInfo?.role === "admin",
    onError: (err) => {
      dispatch(
        showAlert({
          severity: "error",
          message: err.response.data.message,
        })
      );
    },
  });

  const { data: attendances } = useQuery(
    "total-attendances-today",
    getAttendanceToday,
    {
      refetchOnWindowFocus: false,
      enabled: userInfo?.role === "admin",
      onError: (err) => {
        dispatch(
          showAlert({
            severity: "error",
            message: err.response.data.message,
          })
        );
      },
    }
  );

  const { data: myAttendances } = useQuery(
    "total-my-attendances",
    getMyAttendance,
    {
      refetchOnWindowFocus: false,
      enabled: userInfo?.role === "user",
      onError: (err) => {
        dispatch(
          showAlert({
            severity: "error",
            message: err.response.data.message,
          })
        );
      },
    }
  );

  const { data: latestAttendances } = useQuery(
    "latest-attendances",
    getLatestAttendance,
    {
      refetchOnWindowFocus: false,
      enabled: userInfo?.role === "user",
      onError: (err) => {
        dispatch(
          showAlert({
            severity: "error",
            message: err.response.data.message,
          })
        );
      },
    }
  );

  const totalPayments =
    payments?.data.reduce((result, payment) => {
      return result + payment.amount;
    }, 0) / 1000;

  return (
    <Layout>
      <>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth="xl">
            <Grid container spacing={3}>
              {userInfo?.role === "admin" ? (
                <>
                  <Grid xs={12} sm={6} lg={3}>
                    <TotalEnrollToday
                      sx={{ height: "100%" }}
                      value={attendances?.result || "0"}
                    />
                  </Grid>

                  <Grid xs={12} sm={6} lg={3}>
                    <TotalCustomers
                      sx={{ height: "100%" }}
                      value={users?.result || "0"}
                    />
                  </Grid>

                  <Grid xs={12} sm={6} lg={3}>
                    <TotalPts
                      sx={{ height: "100%" }}
                      value={pts?.result || "0"}
                    />
                  </Grid>

                  <Grid xs={12} sm={6} lg={3}>
                    <TotalProfit
                      sx={{ height: "100%" }}
                      value={totalPayments ? `${totalPayments}k` : "0"}
                    />
                  </Grid>

                  <Grid xs={12}>
                    {payments ? (
                      <LatestPayments
                        sx={{ height: "100%" }}
                        payments={payments?.data?.slice(0, 6)}
                      />
                    ) : (
                      <LoadingPage />
                    )}
                  </Grid>
                </>
              ) : null}

              {userInfo?.role === "user" ? (
                <>
                  <Grid xs={12} sm={12} lg={4}>
                    <TotalAttendances
                      sx={{ height: "100%" }}
                      value={myAttendances?.result || "0"}
                    />
                  </Grid>

                  <Grid xs={12} sm={12} lg={4}>
                    <MembershipStartDate
                      sx={{ height: "100%" }}
                      value={
                        format(
                          new Date(userInfo?.membershipStartDate),
                          "dd/MM/yyyy"
                        ) || "0"
                      }
                    />
                  </Grid>

                  <Grid xs={12} sm={12} lg={4}>
                    <MembershipEndDate
                      sx={{ height: "100%" }}
                      value={
                        format(
                          new Date(userInfo?.membershipEndDate),
                          "dd/MM/yyyy"
                        ) || "0"
                      }
                    />
                  </Grid>

                  <Grid xs={12}>
                    {latestAttendances ? (
                      <LatestAttendances
                        sx={{ height: "100%" }}
                        attendances={latestAttendances?.data}
                      />
                    ) : (
                      <LoadingPage />
                    )}
                  </Grid>
                </>
              ) : null}

              {userInfo?.role === "pt" ? (
                <Grid xs={12}>
                  <img src="/img/ptDashboard.jpg" width="100%" height="70%" />
                </Grid>
              ) : null}
            </Grid>
          </Container>
        </Box>
      </>
    </Layout>
  );
}
export default Dashboard;
