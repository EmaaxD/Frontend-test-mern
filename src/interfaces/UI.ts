import { clientResponse } from "./Client";

export interface MainCardIF {
  children: React.ReactNode;
}
export type OrderTblIF = "asc" | "desc";

export interface HeadCell {
  disablePadding: boolean;
  id: keyof clientResponse;
  label: string;
  numeric: boolean;
}

export interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof clientResponse
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: OrderTblIF;
  orderBy: string;
  rowCount: number;
}

export interface EnhancedTableToolbarProps {
  numSelected: number;
  onHandleRemoveClients: () => void;
}

export interface ModalClientIF {
  open: boolean;
  client: clientResponse;
  onHandleDeleteClient: Function;
  onHandleClose: () => void;
}

export interface CardLinkIF {
  path: string;
  text: string;
}

export interface DataFormClient {
  name: string;
  documentNum: string;
  address: string;
  phone: number;
}

export interface AlertFormIF {
  bgColor: string;
  text: string;
}

export interface LabelModalIF {
  title: string;
  text: string | number;
}

export type MyParamsEdit = {
  id: string;
};

export interface RegisterClientIF {
  edit: boolean;
}
