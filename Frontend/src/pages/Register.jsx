import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Link,
  MenuItem,
  Stack,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Layout from "../layouts/auth/Layout";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../redux/features/authSlice";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      lastName: "",
      firstName: "",
      phoneNumber: "",
      dateOfBirth: null,
      gender: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema: Yup.object({
      lastName: Yup.string()
        .required("Vui lòng nhập họ của bạn")
        .min(2, "Vui lòng nhập họ tối thiểu 2 chữ")
        .max(15, "Vui lòng nhập họ tối đa 15 chữ"),
      firstName: Yup.string().required("Vui lòng nhập tên của bạn"),
      phoneNumber: Yup.string().required("Vui lòng nhập số điện thoại của bạn"),
      dateOfBirth: Yup.string().required("Vui lòng chọn ngày sinh của bạn"),
      gender: Yup.string().required("Vui lòng chọn giới tính của bạn"),

      email: Yup.string()
        .email("Vui lòng nhập đúng email")
        .required("Vui lòng nhập email"),
      password: Yup.string().max(255).required("Password is required"),
      passwordConfirm: Yup.string().required(
        "Vui lòng nhập xác nhận mật khẩu của bạn"
      ),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        await dispatch(register(values)).unwrap();
        setIsLoading(false);
        navigate("/login");
      } catch (err) {
        setIsLoading(false);
      }
    },
  });

  return (
    <Layout>
      <Box
        sx={{
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: "100px",
            width: "100%",
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4">Đăng ký</Typography>
              <Typography color="text.secondary" variant="body2">
                Đã có tài khoản? &nbsp;
                <Link
                  component={RouterLink}
                  to="/login"
                  underline="hover"
                  variant="subtitle2"
                >
                  Đăng nhập
                </Link>
              </Typography>
            </Stack>
            <form noValidate onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.lastName && formik.errors.lastName)}
                  fullWidth
                  helperText={formik.touched.lastName && formik.errors.lastName}
                  label="Họ"
                  name="lastName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                />
                <TextField
                  error={
                    !!(formik.touched.firstName && formik.errors.firstName)
                  }
                  fullWidth
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                  label="Tên"
                  name="firstName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                />
                <TextField
                  error={
                    !!(formik.touched.phoneNumber && formik.errors.phoneNumber)
                  }
                  fullWidth
                  helperText={
                    formik.touched.phoneNumber && formik.errors.phoneNumber
                  }
                  label="Số điện thoại"
                  name="phoneNumber"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.phoneNumber}
                />
                <DatePicker
                  label="Ngày sinh"
                  format="dd/MM/yyyy"
                  value={formik.values.dateOfBirth}
                  onChange={(value) =>
                    formik.setFieldValue("dateOfBirth", value, true)
                  }
                  renderInput={(params) => (
                    <TextField
                      error={
                        !!(
                          formik.touched.dateOfBirth &&
                          formik.errors.dateOfBirth
                        )
                      }
                      fullWidth
                      helperText={
                        formik.touched.dateOfBirth && formik.errors.dateOfBirth
                      }
                      label="Ngày sinh"
                      name="dateOfBirth"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.dateOfBirth}
                      {...params}
                    />
                  )}
                />

                <TextField
                  select
                  error={!!(formik.touched.gender && formik.errors.gender)}
                  fullWidth
                  helperText={formik.touched.gender && formik.errors.gender}
                  label="Giới tính"
                  name="gender"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.gender}
                >
                  <MenuItem value={"male"}>Nam</MenuItem>
                  <MenuItem value={"female"}>Nữ</MenuItem>
                  <MenuItem value={"other"}>Khác</MenuItem>
                </TextField>
                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                />
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Mật khẩu"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                />
                <TextField
                  error={
                    !!(
                      formik.touched.passwordConfirm &&
                      formik.errors.passwordConfirm
                    )
                  }
                  fullWidth
                  helperText={
                    formik.touched.passwordConfirm &&
                    formik.errors.passwordConfirm
                  }
                  label="Nhập lại mật khẩu"
                  name="passwordConfirm"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.passwordConfirm}
                />
              </Stack>
              {formik.errors.submit && (
                <Typography color="error" sx={{ mt: 3 }} variant="body2">
                  {formik.errors.submit}
                </Typography>
              )}
              {isLoading ? (
                <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  type="submit"
                  variant="contained"
                  startIcon={
                    <SvgIcon fontSize="small">
                      <ArrowPathIcon />
                    </SvgIcon>
                  }
                  disabled
                >
                  Đang đăng ký
                </Button>
              ) : (
                <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  type="submit"
                  variant="contained"
                >
                  Đăng ký
                </Button>
              )}
            </form>
          </div>
        </Box>
      </Box>
    </Layout>
  );
}

export default Register;
