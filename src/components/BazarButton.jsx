import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
const BazarButton = styled(Button)({
  minWidth: 0,
  minHeight: 0,
  "&.selected": {
    backgroundColor: "#0F3460",
    color: "#fff",
  },
  "&.selectedAmount": {
    backgroundColor: "#0F3460",
    color: "#fff",
  },
});
export default BazarButton;
