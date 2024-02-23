import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
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

function PaymentTable(props) {
  const {
    count = 0,
    payments = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;

  const selectedSome = selected.length > 0 && selected.length < count;
  const selectedAll = payments.length > 0 && selected.length === count;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={() => {
                      if (selectedAll) {
                        onDeselectAll?.();
                      }
                      if (selectedSome) {
                        onDeselectAll?.();
                      }
                      if (!selectedAll && !selectedSome) {
                        onSelectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>Số thứ tự</TableCell>
                <TableCell>Tên Khách Hàng</TableCell>
                <TableCell>Tên Gói</TableCell>
                <TableCell>Ngày</TableCell>
                <TableCell>Giờ</TableCell>
                <TableCell>Tổng tiền</TableCell>
                <TableCell>Phương thức</TableCell>
                <TableCell>Trạng Thái</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payments.map((payment, index) => {
                const isSelected = selected.includes(payment._id);
                const createdAt = format(new Date(payment.date), "dd/MM/yyyy");
                const time =
                  new Date(payment.date).getHours() +
                  ":" +
                  new Date(payment.date).getMinutes() +
                  ":" +
                  new Date(payment.date).getSeconds();

                return (
                  <TableRow hover key={payment._id} selected={isSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(payment._id);
                          } else {
                            onDeselectOne?.(payment._id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Avatar
                          src={`${
                            import.meta.env.VITE_APP_BE_SEVER_URL
                          }/img/users/${payment.user.photo}`}
                        />

                        <Typography variant="subtitle2">
                          {`${payment.user.lastName} ${payment.user.firstName}`}
                        </Typography>
                      </Stack>
                    </TableCell>
                    {/* <TableCell>{`${payment.user.lastName} ${payment.user.firstName}`}</TableCell> */}
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
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}

export default PaymentTable;

PaymentTable.propTypes = {
  count: PropTypes.number,
  payments: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};
