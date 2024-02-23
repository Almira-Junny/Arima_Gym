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
import SeverityPill from "../severity/SeverityPill";

const statusColorMap = {
  pending: "warning",
  paid: "success",
  fail: "error",
};

const statusMap = {
  pending: "Đang chờ",
  paid: "Đã thanh toán",
  fail: "Không thành công",
};

const methodMap = {
  card: "Thẻ",
  cash: "Tiền mặt",
};

function LatestPayments(props) {
  // eslint-disable-next-line react/prop-types
  const { payments = [], sx } = props;

  return (
    <Card sx={sx}>
      <CardHeader title="Thanh toán gần nhất" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tên Khách Hàng</TableCell>
                <TableCell>Tên Gói</TableCell>
                <TableCell sortDirection="desc">Ngày</TableCell>
                <TableCell>Giờ</TableCell>
                <TableCell>Tổng tiền</TableCell>
                <TableCell>Phương thức</TableCell>
                <TableCell>Trạng Thái</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payments.map((payment) => {
                const createdAt = format(new Date(payment.date), "dd/MM/yyyy");
                const time =
                  new Date(payment.date).getHours() +
                  ":" +
                  new Date(payment.date).getMinutes() +
                  ":" +
                  new Date(payment.date).getSeconds();

                return (
                  <TableRow hover key={payment._id}>
                    <TableCell>{`${payment.user.lastName} ${payment.user.firstName}`}</TableCell>
                    <TableCell>{payment.plan.name}</TableCell>
                    <TableCell>{createdAt}</TableCell>
                    <TableCell>{time}</TableCell>
                    <TableCell>{payment.amount}</TableCell>
                    <TableCell>{methodMap[payment.paymentMethod]}</TableCell>
                    <TableCell>
                      <SeverityPill color={statusColorMap[payment.status]}>
                        {statusMap[payment.status]}
                      </SeverityPill>
                    </TableCell>
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
          to="/payments"
        >
          Xem tất cả
        </Button>
      </CardActions>
    </Card>
  );
}

export default LatestPayments;

LatestPayments.prototype = {
  payments: PropTypes.array,
  sx: PropTypes.object,
};
