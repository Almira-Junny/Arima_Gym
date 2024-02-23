import { useFormik } from "formik";
import * as Yup from "yup";
import {
  // Alert,
  Box,
  Button,
  Stack,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import Layout from "../layouts/auth/Layout";
import { useDispatch } from "react-redux";
import { showAlert } from "../redux/features/alertSlice";
import { useLocation, useNavigate } from "react-router-dom";
import AuthService from "../api/auth";
import { useMemo, useState } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

const useQuery = () => {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
};

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const query = useQuery();
  const token = query.get("token");

  const formik = useFormik({
    initialValues: {
      password: "",
      passwordConfirm: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .max(50, "Mật khẩu tối đa 50 chữ cái")
        .min(5, "Mật khẩu tối thiểu 5 chữ cái")
        .required("Vui lòng nhập mật khẩu"),
      passwordConfirm: Yup.string().required("Vui lòng xác nhận mật khẩu"),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        await AuthService.resetPassword(token, {
          password: values.password,
          passwordConfirm: values.passwordConfirm,
        });
        dispatch(
          showAlert({
            severity: "success",
            message: "Đã đổi mật khẩu thành công",
          })
        );
        setIsLoading(false);
        navigate("/login");
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
              <Typography variant="h4">Đổi mật khẩu</Typography>
            </Stack>

            <Stack spacing={2}>
              <form noValidate onSubmit={formik.handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    error={
                      !!(formik.touched.password && formik.errors.password)
                    }
                    fullWidth
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                    label="Mật khẩu mới"
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
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
                    label="Nhập lại mật khẩu mới"
                    name="passwordConfirm"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
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
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowPathIcon />
                      </SvgIcon>
                    }
                    type="submit"
                    variant="contained"
                    disabled
                  >
                    Đang xác nhận
                  </Button>
                ) : (
                  <Button
                    fullWidth
                    size="large"
                    sx={{ mt: 3 }}
                    type="submit"
                    variant="contained"
                  >
                    Xác nhận
                  </Button>
                )}
              </form>
            </Stack>
          </div>
        </Box>
      </Box>
    </Layout>
  );
}

export default Login;
