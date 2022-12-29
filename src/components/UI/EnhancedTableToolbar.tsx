import { alpha } from "@mui/material/styles";
import { Toolbar, Typography, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { CardLink } from "src/components/UI";

import { EnhancedTableToolbarProps } from "src/interfaces";

export const EnhancedTableToolbar = ({
  numSelected,
  onHandleRemoveClients,
}: EnhancedTableToolbarProps) => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.dark,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} Seleccionados
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 90%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Lista de clientes
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={onHandleRemoveClients}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <CardLink path="register" text="Crear Cliente" />
      )}
    </Toolbar>
  );
};
