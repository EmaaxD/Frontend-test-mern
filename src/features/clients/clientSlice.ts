import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { clienteAxios } from "src/config";

import {
  clientResponse,
  clientResponsePost,
  clientResponsePut,
  getClientResponse,
  initialStateType,
} from "src/interfaces";

const initialState: initialStateType = {
  loading: false,
  clients: [],
  error: "",
};

export const fetchClients = createAsyncThunk(
  "client/fetchClients",
  async () => {
    try {
      const { data } = await clienteAxios.get("/clients");
      return data || [];
    } catch (error) {
      console.log("error fetchclient", error);
    }
  }
);

export const saveClient: any = createAsyncThunk(
  "client/saveClient",
  async (client) => {
    try {
      const { data } = await clienteAxios.post("/clients", client);
      return data || {};
    } catch (error) {
      console.log("error saveClient", error);
    }
  }
);

export const updateClient: any = createAsyncThunk(
  "client/updateClient",
  async (dataClient) => {
    try {
      const { data } = await clienteAxios.put<clientResponsePut>(
        "/clients",
        dataClient
      );
      return data.client;
    } catch (error) {
      console.log("error updateClient", error);
    }
  }
);

export const removeClients: any = createAsyncThunk(
  "client/removeClients",
  async (clients) => {
    try {
      await clienteAxios.post("/remove-clients", { clients });

      return clients;
    } catch (error) {
      console.log("error removeClients", error);
    }
  }
);

export const deleteClient: any = createAsyncThunk(
  "client/deleteClient",
  async (clientId) => {
    try {
      await clienteAxios.delete(`/clients/${clientId}`);
      return clientId;
    } catch (error) {
      console.log("error deleteClient", error);
    }
  }
);

const clientSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchClients.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchClients.fulfilled,
      (state, actions: PayloadAction<getClientResponse>) => {
        state.loading = false;
        state.clients = actions.payload.clients.reverse();
        state.error = "";
      }
    );
    builder.addCase(fetchClients.rejected, (state, actions) => {
      state.loading = false;
      state.clients = [];
      state.error =
        actions.error.message || "Error interno, vuelva a intentarlo";
    });
    builder.addCase(
      saveClient.fulfilled,
      (state, actions: PayloadAction<clientResponsePost>) => {
        state.clients = [actions.payload.client, ...state.clients];
      }
    );
    builder.addCase(saveClient.rejected, (state, actions) => {
      state.clients = [];
      state.error =
        actions.error.message || "Error interno, vuelva a intentarlo";
    });
    builder.addCase(
      deleteClient.fulfilled,
      (state, actions: PayloadAction<string>) => {
        state.clients = state.clients.filter(
          (client) => client._id !== actions.payload
        );
      }
    );
    builder.addCase(deleteClient.rejected, (state, actions) => {
      state.error =
        actions.error.message || "Error interno, vuelva a intentarlo";
    });
    builder.addCase(
      updateClient.fulfilled,
      (state, actions: PayloadAction<clientResponse>) => {
        state.clients = state.clients.map((client) =>
          client._id === actions.payload._id ? { ...actions.payload } : client
        );
      }
    );
    builder.addCase(updateClient.rejected, (state, actions) => {
      state.error =
        actions.error.message || "Error interno, vuelva a intentarlo";
    });
    builder.addCase(
      removeClients.fulfilled,
      (state, actions: PayloadAction<[string]>) => {
        state.clients = state.clients.filter(
          (item) => !actions.payload.includes(item._id)
        );
      }
    );
    builder.addCase(removeClients.rejected, (state, actions) => {
      state.error =
        actions.error.message || "Error interno, vuelva a intentarlo";
    });
  },
});

export default clientSlice.reducer;
