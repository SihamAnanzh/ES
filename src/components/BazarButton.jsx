import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
const BazarButton = styled(Button)({
  minWidth: 0,
  minHeight: 0,
  color: "#000000",
  "&.selected": {
    backgroundColor: "#FFECDF",
    color: "#A8123E",
  },
  "&.selectedAmount": {
    backgroundColor: "#FFECDF",
    color: "#A8123E",
  },
  "&.add": {
    backgroundColor: "#FF8236",
    color: "#fff",
  },
});
export default BazarButton;
