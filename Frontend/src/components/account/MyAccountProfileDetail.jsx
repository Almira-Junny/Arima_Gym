/* eslint-disable react/prop-types */
import { useCallback, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
  MenuItem,
  SvgIcon,
} from "@mui/material";
import ArrowPathIcon from "@heroicons/react/24/solid/ArrowPathIcon";
import { DatePicker } from "@mui/x-date-pickers";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "react-query";
import { getUserById, updateMe } from "../../api/user";
import { changeUserInfo } from "../../redux/features/authSlice";
import { showAlert } from "../../redux/features/alertSlice";

function MyAccountProfileDetails(props) {
  const { file } = props;
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const formData = new FormData();

  const [values, setValues] = useState({
    firstName: userInfo?.firstName,
    lastName: userInfo?.lastName,
    email: userInfo?.email,
    phoneNumber: userInfo?.phoneNumber,
    dateOfBirth: new Date(userInfo?.dateOfBirth),
    gender: userInfo?.gender,
  });

  const handleChange = useCallback((event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
  }, []);

  const { isLoading: isLoadingUpdate, mutate: updateUser } = useMutation(
    updateMe,
    {
      onSuccess: async () => {
        const res = await getUserById(userInfo._id);
        dispatch(changeUserInfo(res));
        dispatch(
          showAlert({
            severity: "success",
            message: "Cập nhật thành công",
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
        setValues({
          firstName: userInfo?.firstName,
          lastName: userInfo?.lastName,
          email: userInfo?.email,
          phoneNumber: userInfo?.phoneNumber,
          dateOfBirth: new Date(userInfo?.dateOfBirth),
          gender: userInfo?.gender,
        });
      },
    }
  );

  const handleUpdateUser = () => {
    if (file) {
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("email", values.email);
      formData.append("phoneNumber", values.phoneNumber);
      formData.append("dateOfBirth", values.dateOfBirth);
      formData.append("gender", values.gender);
      formData.append("photo", file);
      updateUser(formData);
    } else {
      updateUser(values);
    }
  };

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Card>
        <CardHeader
          subheader="Bạn có thể sửa thông tin tại đây"
          title="Thông tin"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Họ"
                  name="lastName"
                  onChange={handleChange}
                  value={values.lastName}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Tên"
                  name="firstName"
                  onChange={handleChange}
                  value={values.firstName}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Số điện thoại"
                  name="phoneNumber"
                  onChange={handleChange}
                  type="number"
                  value={values.phoneNumber}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <DatePicker
                  fullWidth
                  format="dd/MM/yyyy"
                  label="Ngày sinh"
                  onChange={handleChange}
                  value={values.dateOfBirth}
                  renderInput={(params) => (
                    <TextField name="dateOfBirth" {...params} />
                  )}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  label="Giới tính"
                  name="gender"
                  onChange={handleChange}
                  value={values.gender}
                >
                  <MenuItem value="male">Nam</MenuItem>
                  <MenuItem value="female">Nữ</MenuItem>
                  <MenuItem value="other">Khác</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />

        <CardActions sx={{ justifyContent: "flex-end" }}>
          {isLoadingUpdate ? (
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
              Đang cập nhật
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={() => {
                handleUpdateUser();
              }}
            >
              Lưu lại
            </Button>
          )}
        </CardActions>
      </Card>
    </form>
  );
}

export default MyAccountProfileDetails;
