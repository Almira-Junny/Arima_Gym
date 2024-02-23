import PropTypes from "prop-types";
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
import { format } from "date-fns";
import { Scrollbar } from "../scrollbar/Scrollbar";

const genderMap = {
  female: "Nữ",
  male: "Nam",
  other: "Khác",
};

function UserTable(props) {
  const {
    count = 0,
    users = [],
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
  const selectedAll = users.length > 0 && selected.length === count;

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
                <TableCell>Email</TableCell>
                <TableCell>Số điện thoại</TableCell>
                <TableCell>Ngày sinh</TableCell>
                <TableCell>Giới tính</TableCell>
                <TableCell>Ngày bắt đầu thành viên</TableCell>
                <TableCell>Ngày hết hạn thành viên</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => {
                const isSelected = selected.includes(user._id);

                return (
                  <TableRow hover key={user._id} selected={isSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(user._id);
                          } else {
                            onDeselectOne?.(user._id);
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
                          }/img/users/${user.photo}`}
                        />

                        <Typography variant="subtitle2">
                          {`${user.lastName} ${user.firstName}`}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phoneNumber}</TableCell>
                    <TableCell>
                      {format(new Date(user.dateOfBirth), "dd/MM/yyyy")}
                    </TableCell>
                    <TableCell>{genderMap[user.gender]}</TableCell>
                    <TableCell>
                      {format(new Date(user.membershipStartDate), "dd/MM/yyyy")}
                    </TableCell>
                    <TableCell>
                      {format(new Date(user.membershipEndDate), "dd/MM/yyyy")}
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

export default UserTable;

UserTable.propTypes = {
  count: PropTypes.number,
  users: PropTypes.array,
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
