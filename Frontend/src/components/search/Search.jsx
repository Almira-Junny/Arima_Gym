import PropTypes from "prop-types";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Card, InputAdornment, OutlinedInput, SvgIcon } from "@mui/material";

function Search(props) {
  const { onKeyDown, placeholder } = props;
  return (
    <>
      <Card sx={{ p: 2 }}>
        <OutlinedInput
          defaultValue=""
          fullWidth
          placeholder={placeholder || "Tìm kiếm"}
          startAdornment={
            <InputAdornment position="start">
              <SvgIcon color="action" fontSize="small">
                <MagnifyingGlassIcon />
              </SvgIcon>
            </InputAdornment>
          }
          sx={{ maxWidth: 500 }}
          onKeyDown={onKeyDown}
        />
      </Card>
    </>
  );
}

Search.propTypes = {
  onKeyDown: PropTypes.func,
  placeholder: PropTypes.string,
};

export default Search;
