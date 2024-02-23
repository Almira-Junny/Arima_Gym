/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const genderMap = {
  male: "Nam",
  female: "Nữ",
  other: "Khác",
};

const MentorCardItem = ({ item }) => {
  return (
    <Box
      sx={{
        px: 1.5,
        py: 5,
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
          },
        }}
      >
        <Box
          sx={{
            lineHeight: 0,
            overflow: "hidden",
            borderRadius: 3,
            height: 200,
            mb: 2,
          }}
        >
          <img
            src={`${import.meta.env.VITE_APP_BE_SEVER_URL}/img/users/${
              item.photo
            }`}
            width={328}
            height={245}
            alt={"Mentor " + item.id}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography component="h2" variant="h4" sx={{ fontSize: "1.4rem" }}>
            {`${item.lastName} ${item.firstName}`}
          </Typography>
          <Typography sx={{ mb: 2, color: "text.secondary" }}>
            {genderMap[item.gender]}
          </Typography>
          <Typography
            sx={{ mb: 2, color: "text.secondary" }}
            variant="subtitle1"
          >
            {item.bio}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default MentorCardItem;
