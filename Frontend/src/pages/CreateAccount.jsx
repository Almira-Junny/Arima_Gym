import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import Layout from "../layouts/dashboard/Layout";
import AccountProfile from "../components/account/AccountProfile";
import AccountProfileDetails from "../components/account/AccountProfileDetail";
import { useState } from "react";

function CreateAccount() {
  const [file, setFile] = useState(null);
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: null,
    gender: "",
    role: "",
    bio: "",
    password: "",
    passwordConfirm: "",
  });
  return (
    <>
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
                <Typography variant="h4">Tạo tài khoản</Typography>
              </div>
              <div>
                <Grid container spacing={3}>
                  <Grid xs={12} md={6} lg={4}>
                    <AccountProfile setFile={setFile} values={values} />
                  </Grid>
                  <Grid xs={12} md={6} lg={8}>
                    <AccountProfileDetails
                      file={file}
                      values={values}
                      setValues={setValues}
                    />
                  </Grid>
                </Grid>
              </div>
            </Stack>
          </Container>
        </Box>
      </Layout>
    </>
  );
}

export default CreateAccount;
