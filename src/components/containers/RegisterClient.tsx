import { Stack, Typography, TextField, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { AlertForm, CardLink } from "src/components/UI";
import { RegisterClientIF } from "src/interfaces";
import { useRegisterClient } from "src/hooks";

export const RegisterClient = ({ edit }: RegisterClientIF) => {
  const {
    form,
    nameClient,
    loading,
    error,
    success,
    message,
    handleChange,
    handleSubmit,
  } = useRegisterClient(edit);

  return (
    <>
      <Stack p={2} spacing={3}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            sx={{ flex: "1 1 80%" }}
            color="inherit"
            variant="h6"
            textTransform="capitalize"
          >
            {edit ? `Editando: ${nameClient}` : "crear cliente"}
          </Typography>

          <CardLink path="/" text="Listado de clientes" />
        </Stack>

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Stack direction="row" spacing={3}>
              <TextField
                id="name"
                name="name"
                label="Nombre cliente"
                variant="outlined"
                size="small"
                style={{ flex: 1 }}
                value={form.name}
                onChange={handleChange}
              />
              <TextField
                id="documentNum"
                name="documentNum"
                type="number"
                label="Numero de documento"
                variant="outlined"
                size="small"
                style={{ flex: 1 }}
                value={form.documentNum}
                onChange={handleChange}
              />
            </Stack>

            <Stack spacing={3}>
              <TextField
                id="address"
                name="address"
                label="Direccion"
                variant="outlined"
                size="small"
                value={form.address}
                onChange={handleChange}
              />
              <TextField
                id="phone"
                name="phone"
                type="number"
                label="Telefono"
                variant="outlined"
                size="small"
                value={form.phone}
                onChange={handleChange}
              />
            </Stack>

            {error && <AlertForm bgColor="#e926268a" text={message} />}
            {success && <AlertForm bgColor="#2cad578a" text={message} />}

            {loading ? (
              <LoadingButton loading variant="outlined" size="large">
                Submit
              </LoadingButton>
            ) : (
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                fullWidth
              >
                {edit ? "Guardar" : "Enviar"}
              </Button>
            )}
          </Stack>
        </form>
      </Stack>
    </>
  );
};
