import { useCallback, useEffect, useState } from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import { useSelection } from "../utils/useSelection";
import PTTable from "../components/pt/PTTable";
import Search from "../components/search/Search";
import { applyPagination } from "../utils/applyPagination";
import Layout from "../layouts/dashboard/Layout";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { showAlert } from "../redux/features/alertSlice";
import { getAllPts, getPtByNumber } from "../api/user";
import LoadingPage from "./LoadingPage";

function Payments() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const { data: allUsers, isLoading } = useQuery("all-pts", getAllPts, {
    refetchOnWindowFocus: false,
    onError: (err) => {
      dispatch(
        showAlert({
          severity: "error",
          message: err.response.data.message,
        })
      );
    },
  });

  useEffect(() => {
    if (allUsers) {
      setData(allUsers);
    }
  }, [allUsers]);

  const useUsers = (page, rowsPerPage) => {
    return applyPagination(data?.data, page, rowsPerPage);
  };

  const useUserIds = (users) => {
    return users?.map((user) => user?._id);
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const users = useUsers(page, rowsPerPage);
  const paymentsIds = useUserIds(data?.data);
  const paymentsSelection = useSelection(paymentsIds);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const onKeyDown = async (e) => {
    if (e.key === "Enter") {
      if (e.target.value.trim() === "") {
        setData(allUsers);
      } else {
        setIsSearching(true);
        const data = await getPtByNumber(e.target.value);
        setData(data);
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
                <Typography variant="h4">Danh sách huấn luyện viên</Typography>
                {/* <Stack alignItems="center" direction="row" spacing={1}>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Nhập file
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Xuất file
                  </Button>
                </Stack> */}
              </Stack>
            </Stack>
            <Search
              onKeyDown={onKeyDown}
              placeholder="Tìm kiếm theo số điện thoại"
            />
            {!isLoading && !isSearching ? (
              <PTTable
                count={data?.result}
                users={users}
                onDeselectAll={paymentsSelection.handleDeselectAll}
                onDeselectOne={paymentsSelection.handleDeselectOne}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                onSelectAll={paymentsSelection.handleSelectAll}
                onSelectOne={paymentsSelection.handleSelectOne}
                page={page}
                rowsPerPage={rowsPerPage}
                selected={paymentsSelection.selected}
              />
            ) : (
              <LoadingPage />
            )}
          </Stack>
        </Container>
      </Box>
    </Layout>
  );
}

export default Payments;
