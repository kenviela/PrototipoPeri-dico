const btnAccesabilidad = document.getElementById("btnAccesibilidad");

let tamanoAumentado = false;

function cambiarTamanoFuente() {
  var body = document.body;
  var fontSize = window
    .getComputedStyle(body, null)
    .getPropertyValue("font-size");
  var currentSize = parseFloat(fontSize);

  var newSize;

  if (tamanoAumentado) {
    newSize = currentSize - 2;
  } else {
    newSize = currentSize + 2;
  }

  newSize = Math.min(24, Math.max(12, newSize));

  body.style.fontSize = newSize + "px";

  // Cambiar el estado para el siguiente clic
  tamanoAumentado = !tamanoAumentado;
}

btnAccesabilidad.addEventListener("click", cambiarTamanoFuente);

let isLoading = false;
let page = 1;

function cargarMasContenido() {
  if (!isLoading) {
    isLoading = true;

    setTimeout(function () {
      const rutasDeImagenes = [
        "https://academy.bit2me.com/wp-content/uploads/2022/06/Curso-sobre-finanzas-personales.jpg",
        "https://cdn.kambista.com/wp-content/uploads/2020/08/Imagen-1-1-e1597769103370.jpg",
        "https://cdn.kambista.com/wp-content/uploads/2020/08/Imagen-1-1-e1597769103370.jpg",
      ];

      const rutaDeImagen = rutasDeImagenes[page - 1];

      const nuevoArticulo = document.createElement("article");
      nuevoArticulo.innerHTML = `<a href="https://www.eltiempo.com/"><h2>Artículo ${page}</h2><img src="${rutaDeImagen}"alt="noticiasDelDía"/><p>Contenido del artículo ${page}...</p></a>`;
      document.getElementById("article").appendChild(nuevoArticulo);
      isLoading = false;
      page++;
      verificarFinDeLista();
    }, 1000);
  }
}

function verificarFinDeLista() {
  const listaArticulos = document.getElementById("article");
  let alturaDelContenido;
  if (listaArticulos) {
    alturaDelContenido = listaArticulos.offsetHeight;
  }
  const alturaDeLaVentana = window.innerHeight;
  const scrollVertical = window.scrollY;
  if (alturaDelContenido - alturaDeLaVentana - scrollVertical < 200) {
    cargarMasContenido();
  }
}

window.addEventListener("scroll", function () {
  verificarFinDeLista();
});

function realizarBusqueda() {
  var valorBusqueda = document
    .getElementById("inputBusqueda")
    .value.toLowerCase();
  var articulos = document.querySelectorAll("#article article");
  articulos.forEach(function (articulo) {
    var textoArticulo = articulo.textContent.toLowerCase();
    if (textoArticulo.includes(valorBusqueda)) {
      articulo.style.display = "block";
    } else {
      articulo.style.display = "none";
    }
  });
}
