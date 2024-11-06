const path = require("path");
const { v4: uuidv4 } = require("uuid");

const subirArchivo = (
  files,
  extensionesPermitidas = ["jpg", "png", "jpeg", "gif"],
  carpeta = ""
) => {
  return new Promise((resolve, rejected) => {
    const { archivo } = files;

    const archivoSplit = archivo.name.split(".");
    const extension = archivoSplit[archivoSplit.length - 1];

    if (!extensionesPermitidas.includes(extension)) {
      return rejected(
        `La extension ${extension} no es permitida (${extensionesPermitidas})`
      );
    }

    const nombreTemp = uuidv4() + "." + extension;

    const uploadPath = path.join(__dirname, "../uploads/", carpeta, nombreTemp);

    archivo.mv(uploadPath, (err) => {
      if (err) {
        return rejected(err);
      }
      resolve(nombreTemp);
    });
  });
};

module.exports = {
  subirArchivo,
};
