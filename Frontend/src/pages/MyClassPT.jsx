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
import { showAlert } from "../redux/features/alertSlice";
import Layout from "../layouts/dashboard/Layout";
import LoadingPage from "./LoadingPage";
import Search from "../components/search/Search";
import MyClassPTCard from "../components/class/MyClassPTCard";
import { useState } from "react";
import { applyPagination } from "../utils/applyPagination";
import { getClassByTrainer } from "../api/class";

function MyClass() {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const cardPerPage = 6;

  const { isLoading, data: classes } = useQuery(
    ["class-by-trainer", userInfo._id],
    () => getClassByTrainer(userInfo?._id),
    {
      refetchOnWindowFocus: false,
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

  const myClasses = applyPagination(classes?.data, page, cardPerPage);

  const handleChange = (value) => {
    setPage(value - 1);
  };

  return (
    <Layout>
      {!isLoading ? (
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
                  <Typography variant="h4">Lớp tập của tôi</Typography>
                </Stack>
              </Stack>
              <Search />
              <Grid container spacing={3}>
                {myClasses?.map((item) => (
                  <Grid xs={12} md={6} lg={4} key={item._id}>
                    <MyClassPTCard item={item} />
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
                  count={Math.ceil(classes?.result / cardPerPage) || 1}
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
