import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { Scrollbar } from "../scrollbar/Scrollbar";

function AttendanceTable(props) {
  const {
    count = 0,
    attendances = [],
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
  const selectedAll = attendances.length > 0 && selected.length === count;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell padding="checkbox">
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
                </TableCell> */}
                <TableCell>Số thứ tự</TableCell>
                <TableCell>Ngày</TableCell>
                <TableCell>Giờ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendances.map((attendance, index) => {
                const isSelected = selected.includes(attendance._id);
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
                  <TableRow hover key={attendance._id} selected={isSelected}>
                    {/* <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(attendance._id);
                          } else {
                            onDeselectOne?.(attendance._id);
                          }
                        }}
                      />
                    </TableCell> */}
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{createdAt}</TableCell>
                    <TableCell>{time}</TableCell>
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

export default AttendanceTable;

AttendanceTable.propTypes = {
  count: PropTypes.number,
  attendances: PropTypes.array,
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
