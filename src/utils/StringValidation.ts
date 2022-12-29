export const validationString = (value: string) =>
  new Promise((resolve, reject) => {
    if (value.trim() === "") {
      reject({ message: "Todos los campos son requeridos" });
      return;
    }

    if (/(<[a-z>(')/<!]*)/.exec(value)) {
      reject({ message: "No se aceptan caracteres especiales" });
      return;
    }

    resolve(value.trim().toLowerCase());
  });

export const validationNumber = (value: number) =>
  new Promise((resolve, reject) => {
    if (value === 0) {
      reject({ message: "Todos los campos son requeridos" });
      return;
    }

    resolve(value);
  });
