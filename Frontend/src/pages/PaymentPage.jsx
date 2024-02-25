import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Header from "../components/landingpage/Header";
import { useQuery } from "react-query";
import { getAllPlans } from "../api/plan";
import { useDispatch } from "react-redux";
import { showAlert } from "../redux/features/alertSlice";
import { getCheckoutSession } from "../api/payment";
import LoadingPage from "./LoadingPage";
import { useState } from "react";

const descriptions = [
  "Sử dụng đầy đủ các dịch vụ của Arima Gym",
  "Huấn luyện viên chỉ dạy",
  "Miễn phí nước, khăn, gửi xe",
  "Truy cập toàn bộ chức năng của web",
];

function PaymentPage() {
  const dispatch = useDispatch();
  const [isLoadingBuy, setIsLoadingBuy] = useState(false);
  const { data: plans, isLoading } = useQuery("all-plans", getAllPlans, {
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

  const handleBuy = async (id) => {
    try {
      setIsLoadingBuy(true);
      const data = await getCheckoutSession(id);
      setIsLoadingBuy(false);
      window.location.href = data.session.url;
    } catch (err) {
      dispatch(
        showAlert({
          severity: "error",
          message: err.response.data.message,
        })
      );
    }
  };

  return (
    <>
      <Header />
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Gói tập
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
        >
          Đăng ký gói tập để có thể sử dụng toàn bộ các chức năng của website
          như: Tạo mã QR, Đăng ký lớp tập, Theo dõi tiến độ tập, .....
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {!isLoading && !isLoadingBuy ? (
            plans.data.map((plan) => (
              // Enterprise card is full width at sm breakpoint
              <Grid item key={plan?._id} xs={12} sm={6} md={4}>
                <Card>
                  <CardHeader
                    title={plan?.name}
                    titleTypographyProps={{ align: "center" }}
                    subheaderTypographyProps={{
                      align: "center",
                    }}
                    sx={{
                      backgroundColor: (theme) =>
                        theme.palette.mode === "light"
                          ? theme.palette.grey[200]
                          : theme.palette.grey[700],
                    }}
                  />
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "baseline",
                        mb: 2,
                      }}
                    >
                      <Typography
                        component="h2"
                        variant="h3"
                        color="text.primary"
                      >
                        {plan.price / 1000}K
                      </Typography>
                      {/* <Typography variant="h6" color="text.secondary">
                      VNĐ
                    </Typography> */}
                    </Box>
                    <ul style={{ padding: 20 }}>
                      {descriptions.map((line) => (
                        <Typography
                          component="li"
                          variant="subtitle1"
                          align="center"
                          key={line}
                        >
                          {line}
                        </Typography>
                      ))}
                    </ul>
                  </CardContent>
                  <CardActions>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => {
                        handleBuy(plan._id);
                      }}
                    >
                      Mua ngay
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <LoadingPage />
          )}
        </Grid>
      </Container>
    </>
  );
}

export default PaymentPage;
