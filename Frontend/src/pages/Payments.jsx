import { useCallback, useEffect, useState } from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import { useSelection } from "../utils/useSelection";
import PaymentTable from "../components/payments/paymentTable";
import Search from "../components/search/Search";
import { applyPagination } from "../utils/applyPagination";
import Layout from "../layouts/dashboard/Layout";
import { useQuery } from "react-query";
import { getAllPayments, getPaymentByName } from "../api/payment";
import { useDispatch } from "react-redux";
import { showAlert } from "../redux/features/alertSlice";
import LoadingPage from "./LoadingPage";

function Payments() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const { data: allPayments, isLoading } = useQuery(
    "all-payments",
    getAllPayments,
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

  useEffect(() => {
    if (allPayments) {
      setData(allPayments);
    }
  }, [allPayments]);

  const usePayments = (page, rowsPerPage) => {
    return applyPagination(data?.data, page, rowsPerPage);
  };

  const usePaymentIds = (payments) => {
    return payments?.map((payment) => payment?._id);
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const payments = usePayments(page, rowsPerPage);
  const paymentsIds = usePaymentIds(data?.data);
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
        setData(allPayments);
      } else {
        setIsSearching(true);
        const data = await getPaymentByName(e.target.value);
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
                <Typography variant="h4">Lịch sử thanh toán</Typography>
              </Stack>
              <div></div>
            </Stack>
            <Search
              onKeyDown={onKeyDown}
              placeholder={"Tìm kiếm theo tên khách hàng"}
            />
            {!isLoading && !isSearching ? (
              <PaymentTable
                count={data?.result}
                payments={payments}
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
