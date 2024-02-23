import ArrowLeftIcon from "@heroicons/react/24/solid/ArrowLeftIcon";
import { Box, Button, Container, SvgIcon, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                mb: 3,
                textAlign: "center",
              }}
            >
              <img
                alt="Under development"
                src="/img/error-404.png"
                style={{
                  display: "inline-block",
                  maxWidth: "100%",
                  width: 400,
                }}
              />
            </Box>
            <Typography align="center" sx={{ mb: 3 }} variant="h3">
              404: Trang bạn tìm kiếm không tồn tại
            </Typography>
            <Typography align="center" color="text.secondary" variant="body1">
              Bạn đang vào trang cấm hoặc không tồn tại. Vui lòng bấm nút để
              quay lại trang chủ
            </Typography>
            <Button
              component={Link}
              to="/"
              startIcon={
                <SvgIcon fontSize="small">
                  <ArrowLeftIcon />
                </SvgIcon>
              }
              sx={{ mt: 3 }}
              variant="contained"
            >
              Quay lại trang chủ
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default NotFound;
