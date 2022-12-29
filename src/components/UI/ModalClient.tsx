import { Backdrop, Box, Modal, Fade, Button, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { ModalClientIF } from "src/interfaces";
import { LabelModal } from "./LabelModal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

export const ModalClient = ({
  open,
  client,
  onHandleDeleteClient,
  onHandleClose,
}: ModalClientIF) => {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={onHandleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Stack flex={1} spacing={4}>
              <Stack direction="row" flex={1} flexWrap="wrap">
                <LabelModal title="Nombre cliente" text={client.name} />
                <LabelModal title="Numero de doc." text={client.documentNum} />
              </Stack>

              <Stack direction="row" flex={1} flexWrap="wrap">
                <LabelModal title="Dirección" text={client.address} />
                <LabelModal title="Telefono" text={client.phone} />
              </Stack>

              <Box textAlign="center">
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => onHandleDeleteClient(client._id)}
                >
                  Borrar cliente
                </Button>
              </Box>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
