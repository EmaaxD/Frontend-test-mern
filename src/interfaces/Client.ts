export type clientResponse = {
  _id: string;
  name: string;
  documentNum: string;
  address: string;
  phone: number;
  __v: number;
};

export type initialStateType = {
  loading: boolean;
  clients: clientResponse[];
  error: string;
};

export type getClientResponse = {
  amount: number;
  clients: clientResponse[];
};

export type clientResponsePost = {
  client: clientResponse;
};

export type clientResponsePut = {
  client: clientResponse;
  message: string;
};
