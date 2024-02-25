import { Box, CircularProgress } from "@mui/material";

function LoadingPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flex: "1 1 auto",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <CircularProgress color="secondary" />
    </Box>
  );
}

export default LoadingPage;
