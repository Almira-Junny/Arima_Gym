/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
// import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import IconButton, { iconButtonClasses } from "@mui/material/IconButton";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

function PlanItem({ plan, index }) {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        px: 1,
        py: 4,
      }}
    >
      <Box
        sx={{
          p: 2,
          backgroundColor: "background.paper",
          borderRadius: 4,
          transition: (theme) => theme.transitions.create(["box-shadow"]),
          "&:hover": {
            boxShadow: 2,
            [`& .${iconButtonClasses.root}`]: {
              backgroundColor: "primary.main",
              color: "primary.contrastText",
              boxShadow: 2,
            },
          },
        }}
      >
        <Box
          sx={{
            lineHeight: 0,
            overflow: "hidden",
            borderRadius: 3,
            mb: 2,
          }}
        >
          <img
            src={`/img/plans/${index}.png`}
            width={250}
            height={250}
            alt={"Gói tập"}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography
            component="h2"
            variant="h5"
            sx={{ mb: 2, height: 56, overflow: "hidden", fontSize: "1.2rem" }}
          >
            {plan.name}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}></Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h5" color="primary.main">
              {`${plan.price} VNĐ`}
            </Typography>
          </Box>
          <IconButton
            color="primary"
            sx={{
              "&:hover": {
                backgroundColor: "primary.main",
                color: "primary.contrastText",
              },
            }}
            onClick={() => {
              navigate("/payment");
            }}
          >
            <ArrowForward />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default PlanItem;
