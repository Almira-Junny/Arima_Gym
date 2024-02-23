/* eslint-disable react/prop-types */
import { useCallback } from "react";
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
import { useMutation } from "react-query";
import { createUser } from "../../api/user";
import { useDispatch } from "react-redux";
import { showAlert } from "../../redux/features/alertSlice";

function AccountProfileDetails(props) {
  // const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { file, values, setValues } = props;
  const formData = new FormData();

  // const [values, setValues] = useState({
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   phoneNumber: "",
  //   dateOfBirth: null,
  //   gender: "",
  //   role: "",
  //   bio: "",
  //   password: "",
  //   passwordConfirm: "",
  // });

  const handleChange = useCallback((event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
  }, []);

  const { isLoading, mutate: createAccount } = useMutation(createUser, {
    onSuccess: async () => {
      dispatch(
        showAlert({
          severity: "success",
          message: "Tạo tài khoản thành công",
        })
      );
      setValues({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        dateOfBirth: null,
        gender: "",
        role: "",
        password: "",
        passwordConfirm: "",
        bio: "",
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

  const handleCreateUser = () => {
    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    formData.append("email", values.email);
    formData.append("phoneNumber", values.phoneNumber);
    formData.append("dateOfBirth", values.dateOfBirth);
    formData.append("gender", values.gender);
    formData.append("photo", file);
    formData.append("role", values.role);
    formData.append("password", values.password);
    formData.append("passwordConfirm", values.passwordConfirm);
    formData.append("bio", values.bio);
    createAccount(formData);
  };

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Card>
        <CardHeader
          subheader="Đăng tải thông tin người dùng tại đây"
          title="Thông tin"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  required
                  //   helperText="Please specify the first name"
                  label="Họ"
                  name="lastName"
                  onChange={handleChange}
                  value={values.lastName}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  required
                  label="Tên"
                  name="firstName"
                  onChange={handleChange}
                  value={values.firstName}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  required
                  label="Email"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  required
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
                  onChange={() => {
                    setValues((prevState) => ({
                      ...prevState,
                      dateOfBirth: new Date(event.target.value),
                    }));
                  }}
                  value={values.dateOfBirth}
                  renderInput={(params) => <TextField required {...params} />}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  required
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
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  required
                  select
                  label="Vai trò"
                  name="role"
                  onChange={handleChange}
                  value={values.role}
                >
                  <MenuItem value="user">Người dùng</MenuItem>
                  <MenuItem value="pt">PT</MenuItem>
                  <MenuItem value="admin">Quản lý</MenuItem>
                </TextField>
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Giới thiệu"
                  name="bio"
                  onChange={handleChange}
                  value={values.bio}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  required
                  label="Mật khẩu"
                  name="password"
                  onChange={handleChange}
                  value={values.password}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  required
                  label="Nhập lại mật khẩu"
                  name="passwordConfirm"
                  onChange={handleChange}
                  value={values.passwordConfirm}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
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
              onClick={() => {
                handleCreateUser();
              }}
            >
              Tạo
            </Button>
          )}
        </CardActions>
      </Card>
    </form>
  );
}

export default AccountProfileDetails;
