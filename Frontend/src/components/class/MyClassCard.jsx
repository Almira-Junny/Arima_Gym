import PropTypes from "prop-types";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ClockIcon from "@heroicons/react/24/solid/ClockIcon";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { format } from "date-fns";

const statusMap = {
  registered: "Đăng ký",
  attended: "Đã tham gia",
  canceled: "Đã hủy",
};

function ClassCard(props) {
  const { item } = props;

  const time =
    new Date(item?.class?.date).getHours() +
    ":" +
    new Date(item?.class?.date).getMinutes();

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <CardContent sx={{ paddingBottom: "10px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pb: 3,
          }}
        >
          <img
            src={`${import.meta.env.VITE_APP_BE_SEVER_URL}/img/users/${
              item?.class?.trainer?.photo
            }`}
            // variant="square"
            height="70px"
            width="70px"
          />
        </Box>
        <Typography align="center" gutterBottom variant="h5">
          {item?.class?.name}
        </Typography>
        <Typography align="center" variant="body1">
          {format(new Date(item?.class?.date), "dd/MM/yyyy")}
        </Typography>
      </CardContent>
      <Stack direction="column" spacing={1}>
        <Typography align="center" variant="body1">
          Huấn luyện viên: {item?.class?.trainer?.lastName}{" "}
          {item?.class?.trainer?.firstName}
        </Typography>
        <Typography align="center" variant="body1">
          Thời gian tập: {item?.class?.duration} tiếng
        </Typography>
        <Typography align="center" variant="body1">
          Ngày đăng ký: {format(new Date(item?.date), "dd/MM/yyyy")}
        </Typography>
        <Typography align="center" variant="body1">
          Trạng thái: {statusMap[item?.status]}
        </Typography>
      </Stack>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 2 }}
      >
        <Stack alignItems="center" direction="row" spacing={1}>
          <SvgIcon color="action" fontSize="small">
            <ClockIcon />
          </SvgIcon>
          <Typography color="text.secondary" display="inline" variant="body2">
            Bắt đầu: {time}
          </Typography>
        </Stack>
        <Stack alignItems="center" direction="row" spacing={1}>
          <SvgIcon color="action" fontSize="small">
            <ArrowDownOnSquareIcon />
          </SvgIcon>
          <Typography color="text.secondary" display="inline" variant="body2">
            Số lượng: {item?.class?.registration}/{item?.class?.capacity}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}

export default ClassCard;

ClassCard.propTypes = {
  item: PropTypes.object.isRequired,
};
