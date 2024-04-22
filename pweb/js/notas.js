document.addEventListener("DOMContentLoaded", function () {
  var loginStatus = JSON.parse(localStorage.getItem("login"));

  if (loginStatus && loginStatus.login) {
    window.location.href = "formulario_notas.html";
  } else {
    var notasData = JSON.parse(localStorage.getItem("notas")).notas;

    if (notasData && notasData.length > 0) {
      var tbody = document.getElementById("grades-table");
      var totalCredits = 0;
      var weightedSum = 0;

      notasData.forEach(function (nota) {
        var row = document.createElement("tr");
        var finalGrade =
          ((parseFloat(nota.n1) + parseFloat(nota.n2) + parseFloat(nota.n3)) /
            3) *
            0.7 +
          parseFloat(nota.ex) * 0.3;

        row.innerHTML = `
                    <td>${nota.asignatura}</td>
                    <td>${nota.creditos}</td>
                    <td>${nota.n1}</td>
                    <td>${nota.n2}</td>
                    <td>${nota.n3}</td>
                    <td>${nota.ex}</td>
                    <td>${finalGrade.toFixed(2)}</td>
                `;
        tbody.appendChild(row);

        totalCredits += parseInt(nota.creditos);
        weightedSum += finalGrade * parseInt(nota.creditos);
      });

      var weightedAverage = weightedSum / totalCredits;

      var promedioPonderado = document.getElementById("weighted-average");
      promedioPonderado.innerHTML = `${weightedAverage.toFixed(2)}`;
    } else {
      var tbody = document.getElementById("grades-table");
      tbody.innerHTML =
        "<tr><td colspan='7'>No hay notas disponibles</td></tr>";
    }

    var cerrarSesionBtn = document.getElementById("logout-btn");
    cerrarSesionBtn.addEventListener("click", function () {
      localStorage.clear();
      window.location.href = "index.html";
    });
  }
});
