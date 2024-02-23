import { useCallback, useState } from "react";
import { useFormik } from "formik";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  // Alert,
  Box,
  Button,
  Link,
  Stack,
  SvgIcon,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import Layout from "../layouts/auth/Layout";
import { login } from "../redux/features/authSlice";
import { useDispatch } from "react-redux";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [method, setMethod] = useState("email");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Vui lòng nhập đúng email")
        .max(255)
        .required("Vui lòng nhập email"),
      password: Yup.string().max(50).required("Vui lòng nhập mật khẩu"),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        await dispatch(
          login({
            email: values.email,
            password: values.password,
          })
        ).unwrap();
        setIsLoading(false);
        navigate("/dashboard");
      } catch (err) {
        setIsLoading(false);
      }
    },
  });

  const handleMethodChange = useCallback((event, value) => {
    setMethod(value);
  }, []);

  return (
    <Layout>
      <Box
        sx={{
          backgroundColor: "background.paper",
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
              <Typography variant="h4">Đăng nhập</Typography>
              <Typography color="text.secondary" variant="body2">
                Không có tài khoản? &nbsp;
                <Link
                  component={ReactLink}
                  to="/register"
                  underline="hover"
                  variant="subtitle2"
                >
                  Đăng ký
                </Link>
              </Typography>
            </Stack>
            <Tabs onChange={handleMethodChange} sx={{ mb: 3 }} value={method}>
              <Tab label="Email" value="email" />
              <Tab label="Số điện thoại" value="phoneNumber" />
            </Tabs>
            {method === "email" && (
              <Stack spacing={2}>
                <form noValidate onSubmit={formik.handleSubmit}>
                  <Stack spacing={3}>
                    <TextField
                      error={!!(formik.touched.email && formik.errors.email)}
                      fullWidth
                      helperText={formik.touched.email && formik.errors.email}
                      label="Địa chỉ email"
                      name="email"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="email"
                      value={formik.values.email}
                    />
                    <TextField
                      error={
                        !!(formik.touched.password && formik.errors.password)
                      }
                      fullWidth
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
                      label="Mật khẩu"
                      name="password"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="password"
                      value={formik.values.password}
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
                      Đang đăng nhập
                    </Button>
                  ) : (
                    <Button
                      fullWidth
                      size="large"
                      sx={{ mt: 3 }}
                      type="submit"
                      variant="contained"
                    >
                      Đăng nhập
                    </Button>
                  )}
                </form>
                <Link
                  sx={{ marginLeft: "auto!important" }}
                  component={ReactLink}
                  to="/forgetPassword"
                  underline="hover"
                  variant="subtitle2"
                >
                  Quên mật khẩu ?
                </Link>
              </Stack>
            )}
            {method === "phoneNumber" && (
              <div>
                <Typography sx={{ mb: 1 }} variant="h6">
                  Tạm thời không có
                </Typography>
                <Typography color="text.secondary">
                  Tính năng đang được phát triển
                </Typography>
              </div>
            )}
          </div>
        </Box>
      </Box>
    </Layout>
  );
}

export default Login;
