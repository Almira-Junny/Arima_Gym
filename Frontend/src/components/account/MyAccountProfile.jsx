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
import { useSelector } from "react-redux";

function MyAccountProfile(props) {
  const { userInfo } = useSelector((state) => state.auth);
  const { setFile } = props;
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
                  : `${import.meta.env.VITE_APP_BE_SEVER_URL}/img/users/${
                      userInfo?.photo
                    }`
              }
              sx={{
                height: 80,
                mb: 2,
                width: 80,
              }}
            />
            <Typography gutterBottom variant="h5">
              {userInfo?.lastName} {userInfo?.firstName}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {userInfo?.phoneNumber}
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

export default MyAccountProfile;
