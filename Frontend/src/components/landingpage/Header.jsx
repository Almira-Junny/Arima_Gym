import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Menu, Close } from "@mui/icons-material";
import StyledButton from "../styledbutton/StyledButton";
import { useSelector } from "react-redux";

const navigations = [
  {
    label: "Trang chủ",
    path: "#",
  },
  {
    label: "Gói tập",
    path: "plan",
  },
  {
    label: "Giới thiệu",
    path: "introduction",
  },
  {
    label: "Huấn luyện viên",
    path: "pt",
  },
];

function Header() {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [visibleMenu, setVisibleMenu] = useState(false);
  const { breakpoints } = useTheme();
  const matchMobileView = useMediaQuery(breakpoints.down("md"));

  return (
    <Box sx={{ backgroundColor: "background.paper" }}>
      <Container sx={{ py: { xs: 2, md: 3 } }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            component={Link}
            to="/"
            sx={{
              display: "inline-flex",
              height: 70,
              width: 70,
            }}
          >
            <img alt="" src="/img/logo.jpg" />
          </Box>
          <Box sx={{ ml: "auto", display: { xs: "inline-flex", md: "none" } }}>
            <IconButton onClick={() => setVisibleMenu(!visibleMenu)}>
              <Menu />
            </IconButton>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: { xs: "column", md: "row" },

              transition: (theme) => theme.transitions.create(["top"]),
              ...(matchMobileView && {
                py: 6,
                backgroundColor: "background.paper",
                zIndex: "appBar",
                position: "fixed",
                height: { xs: "100vh", md: "auto" },
                top: visibleMenu ? 0 : "-120vh",
                left: 0,
              }),
            }}
          >
            <Box /> {/* Magic space */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              {navigations.map(({ path: destination, label }) => (
                <Box
                  component={ScrollLink}
                  key={destination}
                  activeClass="current"
                  to={destination}
                  spy={true}
                  smooth={true}
                  duration={350}
                  sx={{
                    position: "relative",
                    color: "text.disabled",
                    cursor: "pointer",
                    fontWeight: 600,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    px: { xs: 0, md: 3 },
                    mb: { xs: 3, md: 0 },
                    fontSize: { xs: "1.2rem", md: "inherit" },
                    ...(destination === "/" && {
                      color: "primary.main",
                    }),

                    "& > div": { display: "none" },

                    "&.current>div": { display: "block" },

                    "&:hover": {
                      color: "primary.main",
                      "&>div": {
                        display: "block",
                      },
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: 12,
                      transform: "rotate(3deg)",
                      "& img": { width: 44, height: "auto" },
                    }}
                  >
                    {/* eslint-disable-next-line */}
                    <img src="/img/headline-curve.svg" alt="Headline curve" />
                  </Box>
                  {label}
                </Box>
              ))}
            </Box>
            <Box sx={{ "& button:first-child": { mr: 2 } }}>
              {isLoggedIn ? (
                <StyledButton
                  disableHoverEffect={true}
                  onClick={() => {
                    navigate("/dashboard");
                  }}
                >
                  Tới trang quản lý
                </StyledButton>
              ) : (
                <>
                  <StyledButton
                    disableHoverEffect={true}
                    variant="outlined"
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Đăng Nhập
                  </StyledButton>
                  <StyledButton
                    disableHoverEffect={true}
                    onClick={() => {
                      navigate("/register");
                    }}
                  >
                    Đăng ký
                  </StyledButton>
                </>
              )}
            </Box>
            {visibleMenu && matchMobileView && (
              <IconButton
                sx={{
                  position: "fixed",
                  top: 10,
                  right: 10,
                }}
                onClick={() => setVisibleMenu(!visibleMenu)}
              >
                <Close />
              </IconButton>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Header;
