import Layout from "../layouts/dashboard/Layout";
import { useDispatch } from "react-redux";
import { showAlert } from "../redux/features/alertSlice";
import { Box, Container, Stack, Typography } from "@mui/material";
// import QRScan from "../components/qr/QRScan";
import { useZxing } from "react-zxing";
import { scanQr } from "../api/user";

function QRScanner() {
  const dispatch = useDispatch();

  const { ref } = useZxing({
    onDecodeResult: async (result) => {
      await onSuccess(result.getText());
    },
    onError: () => {
      dispatch(
        showAlert({
          severity: "error",
          message: "Đang có lỗi, vui lòng thử lại sau",
        })
      );
    },
    timeBetweenDecodingAttempts: 3000,
  });

  const onSuccess = async (result) => {
    try {
      await scanQr(result);
      dispatch(
        showAlert({
          severity: "success",
          message: "Quét QR thành công",
        })
      );
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
              <Typography variant="h4">Quét Mã QR</Typography>
            </div>

            {/* <QRScan
              fps={5}
              qrBox={{
                width: 250,
                height: 250,
              }}
              disableFlip={false}
              onSuccess={onSuccess}
              onError={onError}
            /> */}
            <video ref={ref} />
          </Stack>
        </Container>
      </Box>
    </Layout>
  );
}

export default QRScanner;
