/* eslint-disable react/prop-types */
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { useState } from "react";

function AccountProfile(props) {
  const { setFile, values } = props;

  const [image, setImage] = useState(null);

  const handleChange = (event) => {
    if (event.target.files.length > 0) {
      const file = URL.createObjectURL(event.target.files[0]);
      setImage(file);
      setFile(event.target.files[0]);
    }
  };
  return (
    <>
      <Card>
        <CardContent>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Avatar
              src={
                image
                  ? image
                  : `${
                      import.meta.env.VITE_APP_BE_SEVER_URL
                    }/img/users/default.jpg`
              }
              sx={{
                height: 80,
                mb: 2,
                width: 80,
              }}
            />
            <Typography gutterBottom variant="h5">
              {values?.lastName || values?.firstName
                ? values?.lastName + " " + values?.firstName
                : "Tên người dùng"}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {values?.phoneNumber || "Số điện thoại"}
            </Typography>
          </Box>
        </CardContent>
        <Divider />
        <CardActions>
          <Button fullWidth variant="text" component="label">
            Đăng tải avatar
            <input
              type="file"
              onChange={handleChange}
              id="upload"
              accept="image/*"
              style={{ display: "none" }}
            />
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

export default AccountProfile;
