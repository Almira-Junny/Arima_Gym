import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  SvgIcon,
} from "@mui/material";
import Layout from "../layouts/dashboard/Layout";
import { DatePicker } from "@mui/x-date-pickers";
import { createClass } from "../api/class";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "../redux/features/alertSlice";
import ArrowPathIcon from "@heroicons/react/24/solid/ArrowPathIcon";
import { useMutation } from "react-query";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

Date.prototype.addHours = function (h) {
  this.setTime(this.getTime() + h * 60 * 60 * 1000);
  return this;
};

function CreateClass() {
  const formik = useFormik({
    initialValues: {
      name: "",
      capacity: "",
      duration: "",
      hour: "",
      date: null,
    },
    onSubmit: (values) => {
      create({
        name: values.name,
        trainer: userInfo._id,
        date: new Date(
          values.date.setTime(
            values.date.getTime() + values.hour * 60 * 60 * 1000
          )
        ),
        duration: values.duration,
        capacity: values.capacity,
      });
    },
  });

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const { isLoading, mutate: create } = useMutation(createClass, {
    onSuccess: () => {
      dispatch(
        showAlert({
          severity: "success",
          message: "Tạo lớp thành cong",
        })
      );
      navigate("/myClassPT");
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

  return (
    <Layout>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">Tạo lớp tập</Typography>
            </div>
            <form noValidate onSubmit={formik.handleSubmit}>
              <Stack direction="column" spacing={5} alignItems="center">
                <TextField
                  fullWidth
                  required
                  label="Tên lớp"
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                <TextField
                  fullWidth
                  required
                  type="number"
                  label="Số lượng"
                  name="capacity"
                  onChange={formik.handleChange}
                  value={formik.values.capacity}
                />
                <TextField
                  fullWidth
                  required
                  type="number"
                  label="Thời gian tập"
                  name="duration"
                  onChange={formik.handleChange}
                  value={formik.values.duration}
                />
                <TextField
                  fullWidth
                  required
                  type="number"
                  label="Giờ bắt đầu"
                  name="hour"
                  onChange={formik.handleChange}
                  value={formik.values.hour}
                />
                <DatePicker
                  label="Ngày tập"
                  format="dd/MM/yyyy"
                  value={formik.values.date}
                  onChange={(value) =>
                    formik.setFieldValue("date", value, true)
                  }
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      label="Ngày tập"
                      name="date"
                      onChange={formik.handleChange}
                      value={formik.values.date}
                      {...params}
                    />
                  )}
                />
                {isLoading ? (
                  <Button
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowPathIcon />
                      </SvgIcon>
                    }
                    variant="contained"
                    size="medium"
                    disabled
                  >
                    Đang tạo
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    type="submit"
                    // onClick={() => {
                    //   handleCreateClass();
                    // }}
                  >
                    Tạo
                  </Button>
                )}
              </Stack>
            </form>
          </Stack>
        </Container>
      </Box>
    </Layout>
  );
}

export default CreateClass;
