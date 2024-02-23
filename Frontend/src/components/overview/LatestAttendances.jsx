import { format } from "date-fns";
import PropTypes from "prop-types";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Scrollbar } from "../scrollbar/Scrollbar";

function LatestAttendances(props) {
  // eslint-disable-next-line react/prop-types
  const { attendances = [], sx } = props;

  return (
    <Card sx={sx}>
      <CardHeader title="Tham gia tập gần nhất" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Ngày</TableCell>
                <TableCell>Giờ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendances.map((attendance) => {
                const createdAt = format(
                  new Date(attendance.checkInTime),
                  "dd/MM/yyyy"
                );
                const time =
                  new Date(attendance.checkInTime).getHours() +
                  ":" +
                  new Date(attendance.checkInTime).getMinutes() +
                  ":" +
                  new Date(attendance.checkInTime).getSeconds();

                return (
                  <TableRow hover key={attendance._id}>
                    <TableCell>{createdAt}</TableCell>
                    <TableCell>{time}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          component={Link}
          color="inherit"
          endIcon={
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          }
          size="small"
          variant="text"
          to="/myAttendances"
        >
          Xem tất cả
        </Button>
      </CardActions>
    </Card>
  );
}

export default LatestAttendances;

LatestAttendances.prototype = {
  attendances: PropTypes.array,
  sx: PropTypes.object,
};
