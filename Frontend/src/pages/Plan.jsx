import { useCallback, useEffect, useState } from "react";
// import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
// import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import MinusCircleIcon from "@heroicons/react/24/solid/MinusCircleIcon";
import {
  Box,
  Button,
  Container,
  Dialog,
  Stack,
  SvgIcon,
  TextField,
  Typography,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useSelection } from "../utils/useSelection";
import Search from "../components/search/Search";
import { applyPagination } from "../utils/applyPagination";
import Layout from "../layouts/dashboard/Layout";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { showAlert } from "../redux/features/alertSlice";
import {
  createPlan,
  deletePlan,
  getAllPlans,
  getPlanByName,
} from "../api/plan";
import PlanTable from "../components/plan/PlanTable";
import LoadingPage from "./LoadingPage";

function Plan() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [data, setData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const { data: allPlans, isLoading } = useQuery("all-plans", getAllPlans, {
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

  const { isLoading: isLoadingAdd, mutate: addPlan } = useMutation(createPlan, {
    onSuccess: () => {
      handleClose();
      dispatch(
        showAlert({
          severity: "success",
          message: "Thêm thành công",
        })
      );
      queryClient.invalidateQueries("all-plans");
      setValues({
        name: "",
        price: "",
        duration: "",
        description: "",
      });
    },
    onError: (err) => {
      dispatch(
        showAlert({
          severity: "error",
          message: err.response.data.message,
        })
      );
    },
  });

  const { isLoading: isLoadingDelete, mutate: removePlan } = useMutation(
    deletePlan,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("all-plans");
        plansSelection.handleDeselectAll();
        dispatch(
          showAlert({
            severity: "success",
            message: "Xóa thành công",
          })
        );
      },
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
    if (allPlans) {
      setData(allPlans);
    }
  }, [allPlans]);

  const usePlans = (page, rowsPerPage) => {
    return applyPagination(data?.data, page, rowsPerPage);
  };

  const usePlanIds = (plans) => {
    return plans?.map((plan) => plan?._id);
  };

  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const plans = usePlans(page, rowsPerPage);
  const plansIds = usePlanIds(data?.data);
  const plansSelection = useSelection(plansIds);
  const [values, setValues] = useState({
    name: "",
    price: "",
    duration: "",
    description: "",
  });

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = useCallback((event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleAddPlan = () => {
    addPlan(values);
  };

  const handleDeletePlan = () => {
    removePlan(plansSelection?.selected);
  };

  const onKeyDown = async (e) => {
    if (e.key === "Enter") {
      if (e.target.value.trim() === "") {
        setData(allPlans);
      } else {
        setIsSearching(true);
        const data = await getPlanByName(e.target.value);
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
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Tạo gói tập</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Để tạo gói tập, vui lòng nhập đầy đủ thông tin phía dưới
              </DialogContentText>
              <TextField
                fullWidth
                sx={{ marginTop: "20px" }}
                label="Tên gói tập"
                name="name"
                onChange={handleChange}
                value={values.name}
              />
              <TextField
                sx={{ marginTop: "20px" }}
                fullWidth
                label="Giá gói"
                name="price"
                type="number"
                onChange={handleChange}
                value={values.price}
              />
              <TextField
                sx={{ marginTop: "20px" }}
                fullWidth
                label="Số ngày"
                name="duration"
                type="number"
                onChange={handleChange}
                value={values.duration}
              />
              <TextField
                sx={{ marginTop: "20px" }}
                fullWidth
                label="Chi tiết"
                name="description"
                onChange={handleChange}
                value={values.description}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Thoát</Button>
              <Button
                onClick={() => {
                  handleAddPlan();
                }}
              >
                Tạo
              </Button>
            </DialogActions>
          </Dialog>
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Gói tập</Typography>
              </Stack>
              <div>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  onClick={handleClickOpen}
                >
                  Thêm
                </Button>
                {plansSelection?.selected.length > 0 ? (
                  <Button
                    startIcon={
                      <SvgIcon fontSize="small">
                        <MinusCircleIcon />
                      </SvgIcon>
                    }
                    variant="contained"
                    onClick={() => {
                      handleDeletePlan();
                    }}
                    sx={{ marginLeft: "50px" }}
                  >
                    Xóa
                  </Button>
                ) : null}
              </div>
            </Stack>
            <Search onKeyDown={onKeyDown} />
            {!isLoading && !isLoadingAdd && !isLoadingDelete && !isSearching ? (
              <PlanTable
                count={data?.result}
                plans={plans}
                onDeselectAll={plansSelection.handleDeselectAll}
                onDeselectOne={plansSelection.handleDeselectOne}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                onSelectAll={plansSelection.handleSelectAll}
                onSelectOne={plansSelection.handleSelectOne}
                page={page}
                rowsPerPage={rowsPerPage}
                selected={plansSelection.selected}
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

export default Plan;
