import { bgcolor, borderRadius, compose, spacing, styled } from "@mui/system";
import Image from "next/image";
import React from "react";
const LazyImage = styled(({ borderRadius, ...rest }) => <Image {...rest} />)(
  compose(spacing, borderRadius, bgcolor)
);
export default LazyImage;
