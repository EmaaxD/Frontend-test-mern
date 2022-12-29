import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Autocomplete } from "@mui/material";

import { useAppSelector } from "src/app/hooks";

export interface AutocompleteOption {
  label: string;
  id: string;
}

export const MainSearch = () => {
  const [value, setValue] = useState<any>("");
  const [input, setInput] = useState<string>("");
  const [options, setOptions] = useState<AutocompleteOption[]>([]);

  const navigate = useNavigate();

  const clientsState = useAppSelector((state) => state.clients.clients);

  const handleChangeAutocomplete = (clientName: string) => {
    setInput(clientName);

    const client = clientsState.find(
      (item) => item.name.toLocaleLowerCase() === clientName.toLocaleLowerCase()
    );

    if (client) {
      navigate(`client/${client._id}`);
    }
  };

  useEffect(() => {
    (function () {
      clientsState.forEach((item: any) => {
        setOptions((c) => {
          if (!c.includes(item._id)) {
            return [...c, { label: item.name, id: item._id }];
          } else {
            return [];
          }
        });
      });
    })();
  }, [clientsState]);

  return (
    <>
      <Autocomplete
        disablePortal
        value={value || null}
        onChange={(event: any, newValue: string) => {
          setValue(newValue);
        }}
        inputValue={input}
        onInputChange={(event, newInputValue) =>
          handleChangeAutocomplete(newInputValue)
        }
        id="combo-box-client"
        options={options}
        sx={{ width: 300, mt: 0 }}
        renderInput={(params) => (
          <TextField {...params} label="Clientes" size="small" />
        )}
      />
    </>
  );
};
