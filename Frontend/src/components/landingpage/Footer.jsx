import { Container, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "primary.main",
        py: { xs: 6, md: 10 },
        color: "primary.contrastText",
      }}
    >
      <Container>
        <Stack alignItems={"center"} justifyContent={"center"}>
          <Typography component="h2" variant="h2" sx={{ mb: 2 }}>
            Arima GYM
          </Typography>
          <Typography variant="subtitle1" sx={{ letterSpacing: 1, mb: 2 }}>
            Nơi hiện thực giấc mơ về thân hình đẹp <br />
            Liên hệ: 0366015815 <br />
            Địa chỉ: 69 Đường Hoàng Đạo, Hà Đông, Hà Nội
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}

export default Footer;
