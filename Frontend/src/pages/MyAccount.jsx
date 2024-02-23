import Layout from "../layouts/dashboard/Layout";
import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import MyAccountProfileDetails from "../components/account/MyAccountProfileDetail";
import MyAccountProfile from "../components/account/MyAccountProfile";
import { useState } from "react";

function MyAccount() {
  const [file, setFile] = useState(null);
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
              <Typography variant="h4">Tài khoản</Typography>
            </div>
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} md={6} lg={4}>
                  <MyAccountProfile setFile={setFile} />
                </Grid>
                <Grid xs={12} md={6} lg={8}>
                  <MyAccountProfileDetails file={file} />
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </Layout>
  );
}

export default MyAccount;
