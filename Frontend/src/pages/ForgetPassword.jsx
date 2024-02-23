import { useCallback, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  // Alert,
  Box,
  Button,
  Stack,
  SvgIcon,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import Layout from "../layouts/auth/Layout";
import AuthService from "../api/auth";
import { useDispatch } from "react-redux";
import { showAlert } from "../redux/features/alertSlice";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

function Login() {
  const [method, setMethod] = useState("email");
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Vui lòng nhập đúng email")
        .max(255)
        .required("Vui lòng nhập email"),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        await AuthService.forgotPassword({
          email: values.email,
        });
        dispatch(
          showAlert({
            severity: "success",
            message: "Gửi mail thành công. Vui lòng kiểm tra email",
          })
        );
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        dispatch(
          showAlert({
            severity: "error",
            message: err.response.data.message,
          })
        );
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
              <Typography variant="h4">Quên mật khẩu</Typography>
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
                      startIcon={
                        <SvgIcon fontSize="small">
                          <ArrowPathIcon />
                        </SvgIcon>
                      }
                      sx={{ mt: 3 }}
                      type="submit"
                      variant="contained"
                      disabled
                    >
                      Đang gửi
                    </Button>
                  ) : (
                    <Button
                      fullWidth
                      size="large"
                      sx={{ mt: 3 }}
                      type="submit"
                      variant="contained"
                    >
                      Gửi mail
                    </Button>
                  )}
                </form>
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
