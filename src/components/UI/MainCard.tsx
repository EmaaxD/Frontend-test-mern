import { Stack } from "@mui/material";

import { MainCardIF } from "src/interfaces";

export const MainCard = ({ children }: MainCardIF) => {
  return (
    <>
      <Stack
        bgcolor="#f7f7f745"
        p={2}
        spacing={3}
        borderRadius={1}
        boxShadow="rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px"
      >
        {children}
      </Stack>
    </>
  );
};
