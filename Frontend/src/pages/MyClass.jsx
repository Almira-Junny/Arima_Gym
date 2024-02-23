import { useQuery } from "react-query";
import {
  Box,
  //   Button,
  Container,
  Pagination,
  Stack,
  //   SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getRegistrationByUser } from "../api/registration";
import { showAlert } from "../redux/features/alertSlice";
import Layout from "../layouts/dashboard/Layout";
import LoadingPage from "./LoadingPage";
import Search from "../components/search/Search";
import MyClassCard from "../components/class/MyClassCard";
import { useState } from "react";
import { applyPagination } from "../utils/applyPagination";

function MyClass() {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const cardPerPage = 6;

  const { isLoading: isLoadingRegistration, data: registrationByUser } =
    useQuery(
      ["class-by-user", userInfo._id],
      () => getRegistrationByUser(userInfo?._id),
      {
        refetchOnWindowFocus: false,
        enabled: userInfo.role === "user",
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

  const registrations = applyPagination(
    registrationByUser?.data,
    page,
    cardPerPage
  );

  const handleChange = (value) => {
    setPage(value - 1);
  };

  return (
    <Layout>
      {!isLoadingRegistration ? (
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth="xl">
            <Stack spacing={3}>
              <Stack direction="row" justifyContent="space-between" spacing={4}>
                <Stack spacing={1}>
                  <Typography variant="h4">Lớp tập đã đăng ký</Typography>
                </Stack>
              </Stack>
              <Search />
              <Grid container spacing={3}>
                {registrations?.map((item) => (
                  <Grid xs={12} md={6} lg={4} key={item._id}>
                    <MyClassCard item={item} />
                  </Grid>
                ))}
              </Grid>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Pagination
                  count={
                    Math.ceil(registrationByUser?.result / cardPerPage) || 1
                  }
                  color="primary"
                  page={page + 1}
                  onChange={handleChange}
                />
              </Box>
            </Stack>
          </Container>
        </Box>
      ) : (
        <LoadingPage />
      )}
    </Layout>
  );
}

export default MyClass;
