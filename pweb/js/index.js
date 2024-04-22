const form = document.querySelector("form");
const mensajeDiv = document.getElementById("message");
const inputCodigo = document.getElementById("code");
const inputContra = document.getElementById("password");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const code = inputCodigo.value;
  const password = inputContra.value;

  const loginData = { code, password: "1234" };

  fetch(
    "https://24a0dac0-2579-4138-985c-bec2df4bdfcc-00-3unzo70c406dl.riker.replit.dev/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Credenciales inválidas");
      }
      return response.json();
    })
    .then((user) => {
      localStorage.setItem("user", JSON.stringify(user));

      fetch(
        `https://24a0dac0-2579-4138-985c-bec2df4bdfcc-00-3unzo70c406dl.riker.replit.dev/students/${code}/notas`
      )
        .then((response) => response.json())
        .then((notas) => {
          localStorage.setItem("notas", JSON.stringify(notas));
          window.location.href = "notas.html";
        })
        .catch((error) => {
          console.error(error);
          mensajeDiv.textContent = "Credenciales invalidas";
        });
    })
    .catch((error) => {
      console.error("Error:", error);
      mensajeDiv.textContent = error.message || "Error de inicio de sesión";
    });
});
