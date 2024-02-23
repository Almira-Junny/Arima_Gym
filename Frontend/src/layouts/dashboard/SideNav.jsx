import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import ChevronUpDownIcon from "@heroicons/react/24/solid/ChevronUpDownIcon";
import ArrowUturnLeftIcon from "@heroicons/react/24/solid/ArrowUturnLeftIcon";
import {
  Box,
  Button,
  Divider,
  Drawer,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Scrollbar } from "../../components/scrollbar/Scrollbar";
import { userItems, ptItems, adminItems } from "./Config";
import SideNavItem from "./SideNavItem";
import { useSelector } from "react-redux";

const roles = {
  user: "Người dùng",
  pt: "Huấn luyện viên",
  admin: "Quản lý",
};

function SideNav(props) {
  const { open, onClose } = props;
  const { userInfo } = useSelector((state) => state.auth);
  const pathname = useLocation().pathname;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const itemForEachRole = () => {
    if (userInfo?.role === "user") {
      return userItems.map((item) => {
        const active = item.path ? pathname === item.path : false;

        return (
          <SideNavItem
            active={active}
            disabled={item.disabled}
            external={item.external}
            icon={item.icon}
            key={item.title}
            path={item.path}
            title={item.title}
          />
        );
      });
    }
    if (userInfo?.role === "pt") {
      return ptItems.map((item) => {
        const active = item.path ? pathname === item.path : false;

        return (
          <SideNavItem
            active={active}
            disabled={item.disabled}
            external={item.external}
            icon={item.icon}
            key={item.title}
            path={item.path}
            title={item.title}
          />
        );
      });
    }

    if (userInfo?.role === "admin") {
      return adminItems.map((item) => {
        const active = item.path ? pathname === item.path : false;

        return (
          <SideNavItem
            active={active}
            disabled={item.disabled}
            external={item.external}
            icon={item.icon}
            key={item.title}
            path={item.path}
            title={item.title}
          />
        );
      });
    }
  };

  const content = (
    <Scrollbar
      sx={{
        height: "100%",
        "& .simplebar-content": {
          height: "100%",
        },
        "& .simplebar-scrollbar:before": {
          background: "neutral.400",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box
            component={Link}
            to="/"
            sx={{
              display: "inline-flex",
              height: 32,
              width: 32,
            }}
          >
            <img alt="" src="/img/logo.jpg" />
          </Box>
          <Box
            sx={{
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              borderRadius: 1,
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              mt: 2,
              p: "12px",
            }}
          >
            <div>
              <Typography color="inherit" variant="subtitle1">
                {userInfo?.lastName} {userInfo?.firstName}
              </Typography>
              <Typography color="neutral.400" variant="body2">
                {roles[userInfo?.role]}
              </Typography>
            </div>
            <SvgIcon fontSize="small" sx={{ color: "neutral.500" }}>
              <ChevronUpDownIcon />
            </SvgIcon>
          </Box>
        </Box>
        <Divider sx={{ borderColor: "neutral.700" }} />
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3,
          }}
        >
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: "none",
              p: 0,
              m: 0,
            }}
          >
            {itemForEachRole()}
          </Stack>
        </Box>
        <Divider sx={{ borderColor: "neutral.700" }} />
        <Box
          sx={{
            px: 2,
            py: 3,
          }}
        >
          <Typography color="neutral.100" variant="subtitle2">
            Arima Gym
          </Typography>
          <Typography color="neutral.500" variant="body2">
            69 Đường Hoàng Hà, Quận Hà Đông
          </Typography>
          <Box
            sx={{
              display: "flex",
              mt: 2,
              mx: "auto",
              width: "160px",
              "& img": {
                width: "100%",
              },
            }}
          >
            <img alt="" src="/img/kit.png" />
          </Box>
          <Button
            component={Link}
            endIcon={
              <SvgIcon fontSize="small">
                <ArrowUturnLeftIcon />
              </SvgIcon>
            }
            fullWidth
            to="/"
            sx={{ mt: 2 }}
            target="_blank"
            variant="contained"
          >
            Quay lại trang chủ
          </Button>
        </Box>
      </Box>
    </Scrollbar>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.800",
            color: "common.white",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.800",
          color: "common.white",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
}

export default SideNav;

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
