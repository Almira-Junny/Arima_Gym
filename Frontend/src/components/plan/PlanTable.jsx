import PropTypes from "prop-types";
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
function PlanTable(props) {
  const {
    count = 0,
    plans = [],
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
  const selectedAll = plans.length > 0 && selected.length === count;

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
                <TableCell>Tên Gói</TableCell>
                <TableCell>Giá</TableCell>
                <TableCell>Số Ngày</TableCell>
                <TableCell>Chi Tiết</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {plans.map((plan, index) => {
                const isSelected = selected.includes(plan._id);

                return (
                  <TableRow hover key={plan._id} selected={isSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(plan._id);
                          } else {
                            onDeselectOne?.(plan._id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{plan.name}</TableCell>
                    <TableCell>{plan.price}</TableCell>
                    <TableCell>{plan.duration}</TableCell>
                    <TableCell>{plan.description}</TableCell>
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

export default PlanTable;

PlanTable.propTypes = {
  count: PropTypes.number,
  plans: PropTypes.array,
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
