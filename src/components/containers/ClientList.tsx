import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
  Checkbox,
  Stack,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";

import { useClientList } from "src/hooks";

import {
  EnhancedTableHead,
  EnhancedTableToolbar,
  ModalClient,
} from "src/components/UI";

import { getComparator, stableSort } from "src/utils";

export const ClientList = () => {
  const {
    clientsState,
    selected,
    order,
    orderBy,
    emptyRows,
    rowsPerPage,
    dense,
    page,
    openMdl,
    clientSelected,
    isSelected,
    handleChangePage,
    handleChangeRowsPerPage,
    handleClick,
    handleRequestSort,
    handleSelectAllClick,
    handleViewInfo,
    handleClose,
    handleDeleteClient,
    handleRemoveClients,
    handleGoEdit,
  } = useClientList();

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper
          sx={{
            bgcolor: "transparent",
            width: "100%",
            mb: 2,
            boxShadow: "none",
          }}
        >
          <EnhancedTableToolbar
            numSelected={selected.length}
            onHandleRemoveClients={handleRemoveClients}
          />

          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={clientsState.length}
              />
              <TableBody>
                {stableSort(clientsState, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row._id.toString());
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row._id}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            onClick={(event) =>
                              handleClick(event, row._id.toString())
                            }
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>

                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.name}
                        </TableCell>

                        <TableCell align="right">{row.documentNum}</TableCell>

                        <TableCell align="right">
                          <Stack
                            direction="row"
                            justifyContent="flex-end"
                            spacing={2}
                          >
                            <IconButton
                              size="small"
                              onClick={() => handleViewInfo(row._id)}
                            >
                              <VisibilityIcon color="info" />
                            </IconButton>

                            <IconButton
                              size="small"
                              onClick={() => handleGoEdit(row._id)}
                            >
                              <EditIcon color="warning" />
                            </IconButton>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })}

                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={clientsState.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
      <ModalClient
        open={openMdl}
        client={clientSelected}
        onHandleDeleteClient={handleDeleteClient}
        onHandleClose={handleClose}
      />
    </>
  );
};
