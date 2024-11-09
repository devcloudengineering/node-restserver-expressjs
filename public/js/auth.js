const miFormulario = document.querySelector("form");

miFormulario.addEventListener("submit", (ev) => {
  ev.preventDefault();
  const url = "http://localhost:3000/api/auth/";

  // Metodo para capturar valores de los inputs de un formulario
  const formData = {};
  for (let el of miFormulario.elements) {
    if (el.name.length > 0) {
      formData[el.name] = el.value;
    }
  }

  fetch(url + "login", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (!data.token) {
        return console.log("No existe token para grabar, revisa los errores");
      }
      localStorage.setItem("token", data.token);
      window.location = "chat.html";
    })
    .catch((err) => console.log(err));
});

function handleCredentialResponse(response) {
  // Google Token: ID_TOKEN
  const body = { id_token: response.credential };

  console.log("El token de Google es: ", response.credential);

  fetch("http://localhost:3000/api/auth/google", {
    method: "POST", // Corrige de "POSRT" a "POST"
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((resp) => resp.json())
    .then(({ token, usuario, msg }) => {
      localStorage.setItem("email", usuario.correo);
      localStorage.setItem("token", token);
      window.location = "chat.html";
      console.log(
        `Token del JWT servidor: ${token} y Status del Login: ${msg}`
      );
      console.log(usuario);
    })
    .catch(console.warn);
}
const button = document.getElementById("google_signout");
button.onclick = () => {
  google.accounts.id.disableAutoSelect();

  google.accounts.id.revoke(localStorage.getItem("email"), (done) => {
    localStorage.clear();
    location.reload();
  });
};
