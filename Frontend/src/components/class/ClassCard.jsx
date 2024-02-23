import PropTypes from "prop-types";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import ClockIcon from "@heroicons/react/24/solid/ClockIcon";
import ArrowPathIcon from "@heroicons/react/24/solid/ArrowPathIcon";
import CheckCircleIcon from "@heroicons/react/24/solid/CheckCircleIcon";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { useMutation, useQueryClient } from "react-query";
import { createRegistration } from "../../api/registration";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "../../redux/features/alertSlice";

function ClassCard(props) {
  const { item, userId, classArray } = props;
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { userInfo } = useSelector((state) => state.auth);

  const { isLoading: isLoadingAdd, mutate: addRegistration } = useMutation(
    createRegistration,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("all-classes");
        queryClient.invalidateQueries("class-by-user");
      },
      onError: (err) => {
        dispatch(
          showAlert({
            severity: "error",
            message: err.response.data.message,
          })
        );
      },
    }
  );

  const time =
    new Date(item?.date).getHours() + ":" + new Date(item?.date).getMinutes();

  const handleAddRegistration = () => {
    addRegistration({
      classId: item?._id,
      userId,
    });
  };

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
              item?.trainer?.photo
            }`}
            // variant="square"
            height="70px"
            width="70px"
          />
        </Box>
        <Typography align="center" gutterBottom variant="h5">
          {item?.name}
        </Typography>
        <Typography align="center" variant="body1">
          {format(new Date(item?.date), "dd/MM/yyyy")}
        </Typography>
      </CardContent>
      <Stack direction="column" spacing={1}>
        <Typography align="center" variant="body1">
          Huấn luyện viên: {item?.trainer?.lastName} {item?.trainer?.firstName}
        </Typography>
        <Typography align="center" variant="body1">
          Thời gian tập: {item?.duration} tiếng
        </Typography>
        {/* <Button
          startIcon={
            <SvgIcon fontSize="small">
              <CheckCircleIcon />
            </SvgIcon>
          }
          variant="contained"
          size="medium"
          disabled
        >
          Đã đăng ký
        </Button>
        <Button
          startIcon={
            <SvgIcon fontSize="small">
              <ArrowPathIcon />
            </SvgIcon>
          }
          variant="contained"
          size="medium"
          disabled
        >
          Đang đăng ký
        </Button>
        <Button
          startIcon={
            <SvgIcon fontSize="small">
              <PlusIcon />
            </SvgIcon>
          }
          variant="contained"
          size="medium"
          onClick={() => {
            handleAddRegistration();
          }}
        >
          Đăng ký
        </Button> */}
        <Stack alignItems="center" sx={{ padding: "10px 0 20px" }}>
          {userInfo?.role === "admin" ? null : item?.registration >=
            item?.capacity ? (
            <Button
              startIcon={
                <SvgIcon fontSize="small">
                  <CheckCircleIcon />
                </SvgIcon>
              }
              variant="contained"
              size="medium"
              disabled
            >
              Đã đủ số lượng
            </Button>
          ) : classArray?.includes(item._id) ? (
            <Button
              startIcon={
                <SvgIcon fontSize="small">
                  <CheckCircleIcon />
                </SvgIcon>
              }
              variant="contained"
              size="medium"
              disabled
            >
              Đã đăng ký
            </Button>
          ) : isLoadingAdd ? (
            <Button
              startIcon={
                <SvgIcon fontSize="small">
                  <ArrowPathIcon />
                </SvgIcon>
              }
              variant="contained"
              size="medium"
              disabled
            >
              Đang đăng ký
            </Button>
          ) : (
            <Button
              startIcon={
                <SvgIcon fontSize="small">
                  <PlusIcon />
                </SvgIcon>
              }
              variant="contained"
              size="medium"
              onClick={() => {
                handleAddRegistration();
              }}
            >
              Đăng ký
            </Button>
          )}
        </Stack>
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
            Số lượng: {item?.registration}/{item?.capacity}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}

export default ClassCard;

ClassCard.propTypes = {
  item: PropTypes.object.isRequired,
  userId: PropTypes.string,
  classArray: PropTypes.array,
};
