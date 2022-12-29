import { Stack, Typography } from "@mui/material";

import { AlertFormIF } from "src/interfaces";

export const AlertForm = ({ bgColor, text }: AlertFormIF) => {
  return (
    <>
      <Stack
        bgcolor={bgColor}
        p={2}
        borderRadius={1}
        boxShadow="rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px"
      >
        <Typography color="white" variant="subtitle1" textAlign="center">
          {text}
        </Typography>
      </Stack>
    </>
  );
};
