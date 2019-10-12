SC.initialize({
  client_id: "aa06b0630e34d6055f9c6f8beb8e02eb"
});

document
  .querySelector(".buscarCancionForm")
  .addEventListener("submit", function(event) {
    event.preventDefault(); // Para que no refresque la página.

    console.log(event.target.busqueda.value); // Mostramos por consola el valor del input con name="busqueda".

    SC.get("/tracks", {
      q: event.target.busqueda.value
    }).then(function(res) {

      // Imágen e ID de la canción.
      for (let i = 0; i < res.length; i++) {
        const imagen = document.createElement("img");
        
        imagen.src = res[i].artwork_url;
        imagen.id = res[i].id;

        document.querySelector(".results").append(imagen);
      }
    });
  });

function allowDrop(ev) {
  ev.preventDefault();
}

// Permite agarrar una imágen.
function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
  ev.dataTransfer.setData("srcSong", ev.target.src);
}

// Permite depositar una imágen.
function drop(ev) {
  ev.preventDefault();

  var data = ev.dataTransfer.getData("text");
  var srcSong = ev.dataTransfer.getData("srcSong");

  ev.target.src = srcSong;

  // Reproducir.
  SC.stream("/tracks/" + data).then(function(player) {
    player.play();
  });
}
