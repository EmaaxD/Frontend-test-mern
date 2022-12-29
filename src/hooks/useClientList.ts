import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "src/app/hooks";
import {
  fetchClients,
  deleteClient,
  removeClients,
} from "src/features/clients/clientSlice";
import { clientResponse, OrderTblIF } from "src/interfaces";

export const useClientList = () => {
  const [order, setOrder] = useState<OrderTblIF>("desc");
  const [orderBy, setOrderBy] = useState<keyof clientResponse>("name");
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState<number>(0);
  const [dense, setDense] = useState<boolean>(false);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [openMdl, setOpenMdl] = useState<boolean>(false);
  const [clientSelected, setClientSelected] = useState<clientResponse>({
    __v: 0,
    _id: "",
    address: "",
    documentNum: "",
    name: "",
    phone: 0,
  });

  const navigate = useNavigate();

  const clientsState = useAppSelector((state) => state.clients.clients);
  const dispatch = useAppDispatch();

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof clientResponse
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = clientsState.map((n) => n._id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, _id: string) => {
    const selectedIndex = selected.indexOf(_id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, _id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewInfo = (clientId: string) => {
    const client: any = clientsState.find((item) => item._id === clientId);

    setClientSelected(client);
    setOpenMdl(true);
  };

  const handleClose = () => setOpenMdl(false);

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const handleRemoveClients = () => {
    dispatch(removeClients(selected));
    setSelected([]);
  };

  const handleDeleteClient = (clientId: string) => {
    dispatch(deleteClient(clientId));
    setOpenMdl(false);
  };

  const handleGoEdit = (clientId: string) => navigate(`client/${clientId}`);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - clientsState.length) : 0;

  useEffect(() => {
    (async function () {
      if (clientsState.length === 0) {
        dispatch(fetchClients());
      }
    })();
  }, []);

  return {
    clientsState,
    order,
    orderBy,
    selected,
    emptyRows,
    rowsPerPage,
    dense,
    page,
    openMdl,
    clientSelected,
    handleRequestSort,
    handleSelectAllClick,
    handleClick,
    handleChangePage,
    handleChangeRowsPerPage,
    isSelected,
    handleViewInfo,
    handleClose,
    handleRemoveClients,
    handleDeleteClient,
    handleGoEdit,
  };
};
