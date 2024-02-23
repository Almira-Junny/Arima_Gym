import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAlert } from "../../redux/features/alertSlice";
import { Slide, Alert, Box } from "@mui/material";

const StyledAlertContainer = styled(Box)({
  position: "fixed",
  top: "50px",
  left: "50px",
  zIndex: 100000000,
});

function GlobalAlert() {
  const { severity, message } = useSelector((state) => state.alert);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setOpen(message !== "");
    const timer = setTimeout(() => {
      setOpen(false);
      dispatch(clearAlert());
    }, 3000);

    return () => clearTimeout(timer);
  }, [severity, message, dispatch]);

  return (
    <StyledAlertContainer>
      <Slide in={open}>
        <Alert variant="filled" severity={severity}>
          {message}
        </Alert>
      </Slide>
    </StyledAlertContainer>
  );
}

export default GlobalAlert;
