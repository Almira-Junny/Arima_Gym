import Layout from "../layouts/dashboard/Layout";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  SvgIcon,
} from "@mui/material";
import { QRCodeSVG } from "qrcode.react";
import { QrCodeIcon } from "@heroicons/react/24/solid";
import { useQuery } from "react-query";
import { createQr } from "../api/user";
import { useDispatch } from "react-redux";
import { showAlert } from "../redux/features/alertSlice";

function QRCreater() {
  const dispatch = useDispatch();
  const { data: qr, refetch } = useQuery("create-qr", createQr, {
    refetchOnWindowFocus: false,
    enabled: false,
    retry: 0,
    onError: (err) => {
      dispatch(
        showAlert({
          severity: "error",
          message: err.response.data.message,
        })
      );
    },
  });

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
              <Typography variant="h4">Tạo Mã QR</Typography>
            </div>

            {qr ? (
              <Stack spacing={5} alignItems="center">
                <QRCodeSVG
                  key={qr.token}
                  value={qr.token}
                  width="50%"
                  height="50%"
                  imageSettings={{
                    src: "/img/logo.jpg",
                    width: 30,
                    height: 30,
                    // excavate: true,
                  }}
                />
                ;
                <div>
                  <Button
                    endIcon={
                      <SvgIcon fontSize="small">
                        <QrCodeIcon />
                      </SvgIcon>
                    }
                    variant="contained"
                    onClick={refetch}
                  >
                    Bấm để tạo mới
                  </Button>
                </div>
              </Stack>
            ) : (
              <div>
                <Button
                  endIcon={
                    <SvgIcon fontSize="small">
                      <QrCodeIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  onClick={refetch}
                >
                  Bấm để tạo
                </Button>
              </div>
            )}
          </Stack>
        </Container>
      </Box>
    </Layout>
  );
}

export default QRCreater;
