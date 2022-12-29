import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { saveClient, updateClient } from "src/features/clients/clientSlice";

import {
  clientResponsePost,
  DataFormClient,
  MyParamsEdit,
} from "src/interfaces";

import { validationNumber, validationString } from "src/utils";
import { clienteAxios } from "src/config";

export const useRegisterClient = (edit: boolean) => {
  const [form, setForm] = useState<DataFormClient>({
    name: "",
    documentNum: "",
    address: "",
    phone: 0,
  });
  const [nameClient, setnameClient] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const { id } = useParams<keyof MyParamsEdit>() as MyParamsEdit;

  const clientsState = useAppSelector((state) => state.clients.clients);
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((c) => ({
      ...c,
      [e.target.name]:
        e.target.name === "phone" ? Number(e.target.value) : e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setError(false);
      setLoading(true);

      await validationString(form.name);
      await validationString(form.documentNum);
      await validationString(form.address);
      await validationNumber(form.phone);

      if (edit) {
        dispatch(updateClient({ _id: id, ...form }));
        setnameClient(form.name);
      } else {
        dispatch(saveClient(form));
      }

      setLoading(false);
      setSuccess(true);

      setMessage(
        edit
          ? "Edicion guardada correctamente!"
          : "Cliente creado correctamente!"
      );

      if (!edit) {
        setForm({
          address: "",
          documentNum: "",
          name: "",
          phone: 0,
        });
      }

      setTimeout(() => {
        setSuccess(false);
        setMessage("");
      }, 3000);
    } catch (error: any) {
      setLoading(false);
      setError(true);
      setMessage(error.message);
    }
  };

  useEffect(() => {
    (async function () {
      if (edit) {
        const client = clientsState.find((item) => item._id === id);

        if (client) {
          setForm({
            name: client.name,
            documentNum: client.documentNum,
            address: client.address,
            phone: client.phone,
          });
          setnameClient(client.name);
        } else {
          const { data } = await clienteAxios.get<clientResponsePost>(
            `/clients/${id}`
          );

          if (data.client) {
            setForm({
              name: data.client.name,
              documentNum: data.client.documentNum,
              address: data.client.address,
              phone: data.client.phone,
            });
            setnameClient(data.client.name);
          }
        }
      }
    })();
  }, []);

  return {
    form,
    nameClient,
    loading,
    error,
    success,
    message,
    handleChange,
    handleSubmit,
  };
};
