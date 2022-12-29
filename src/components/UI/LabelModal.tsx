import { Stack, Typography } from "@mui/material";

import { LabelModalIF } from "src/interfaces";

export const LabelModal = ({ title, text }: LabelModalIF) => {
  return (
    <>
      <Stack flex={1}>
        <Typography color="GrayText" variant="h6" fontWeight={500}>
          {title}
        </Typography>
        <Typography color="gray" variant="subtitle1">
          {text}
        </Typography>
      </Stack>
    </>
  );
};
