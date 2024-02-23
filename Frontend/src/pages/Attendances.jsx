import { useCallback, useState } from "react";
// import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
// import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
// import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Box,
  //   Button,
  Container,
  Stack,
  //   SvgIcon,
  Typography,
} from "@mui/material";
import { useSelection } from "../utils/useSelection";
import AttendanceTable from "../components/attendances/AttendanceTable";
import Search from "../components/search/Search";
import { applyPagination } from "../utils/applyPagination";
import Layout from "../layouts/dashboard/Layout";
import { useQuery } from "react-query";
import { getMyAttendance } from "../api/attendance";
import { useDispatch } from "react-redux";
import { showAlert } from "../redux/features/alertSlice";

function Attendances() {
  const dispatch = useDispatch();
  const { data } = useQuery("my-attendances", getMyAttendance, {
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

  const useAttendances = (page, rowsPerPage) => {
    return applyPagination(data?.data, page, rowsPerPage);
  };

  const useAttendanceIds = (attendances) => {
    return attendances?.map((attendance) => attendance?._id);
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const attendances = useAttendances(page, rowsPerPage);
  const attendancesIds = useAttendanceIds(data?.data);
  const attendancesSelection = useSelection(attendancesIds);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

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
                <Typography variant="h4">Lịch sử tập</Typography>
                {/* <Stack alignItems="center" direction="row" spacing={1}>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Export
                  </Button>
                </Stack> */}
              </Stack>
              <div>
                {/* <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Add
                </Button> */}
              </div>
            </Stack>
            <Search />
            <AttendanceTable
              count={data?.result}
              attendances={attendances}
              onDeselectAll={attendancesSelection.handleDeselectAll}
              onDeselectOne={attendancesSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={attendancesSelection.handleSelectAll}
              onSelectOne={attendancesSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={attendancesSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </Layout>
  );
}

export default Attendances;
