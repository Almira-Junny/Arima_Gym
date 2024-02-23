// import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
// import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
// import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
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
import Layout from "../layouts/dashboard/Layout";
import ClassCard from "../components/class/ClassCard";
import Search from "../components/search/Search";
import { useQuery } from "react-query";
import { getAllClasses, getClassByName } from "../api/class";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "../redux/features/alertSlice";
import { getRegistrationByUser } from "../api/registration";
import LoadingPage from "./LoadingPage";
import { applyPagination } from "../utils/applyPagination";
import { useEffect, useState } from "react";

function AllClass() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [page, setPage] = useState(0);
  const [classes, setClasses] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const cardPerPage = 6;

  const { isLoading: isLoadingClass, data } = useQuery(
    "all-classes",
    getAllClasses,
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

  useEffect(() => {
    if (data) {
      setClasses(data);
    }
  }, [data]);

  const handleChange = (value) => {
    setPage(value - 1);
  };

  const allClasses = applyPagination(classes?.data, page, cardPerPage);

  const classArray = registrationByUser?.data?.map(
    (registration) => registration.class._id
  );

  const onKeyDown = async (e) => {
    if (e.key === "Enter") {
      if (e.target.value.trim() === "") {
        setClasses(data);
      } else {
        setIsSearching(true);
        const data = await getClassByName(e.target.value);
        setClasses(data);
        setIsSearching(false);
      }
    }
  };

  return (
    <Layout>
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
                {userInfo?.role !== "admin" ? (
                  <Typography variant="h4">Lớp tập các ngày tới</Typography>
                ) : (
                  <Typography variant="h4">Tất cả lớp tập</Typography>
                )}
                {/* <Stack
                alignItems="center"
                direction="row"
                spacing={1}
              >
                <Button
                  color="inherit"
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <ArrowUpOnSquareIcon />
                    </SvgIcon>
                  )}
                >
                  Import
                </Button>
                <Button
                  color="inherit"
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <ArrowDownOnSquareIcon />
                    </SvgIcon>
                  )}
                >
                  Export
                </Button>
              </Stack> */}
              </Stack>
              {/* <div>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Add
                </Button>
              </div> */}
            </Stack>
            <Search onKeyDown={onKeyDown} />
            {!isLoadingClass && !isLoadingRegistration && !isSearching ? (
              <>
                <Grid container spacing={3}>
                  {allClasses?.map((item) => (
                    <Grid xs={12} md={6} lg={4} key={item._id}>
                      <ClassCard
                        item={item}
                        userId={userInfo._id}
                        classArray={classArray}
                      />
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
              </>
            ) : (
              <LoadingPage />
            )}
          </Stack>
        </Container>
      </Box>
    </Layout>
  );
}

export default AllClass;
