SC.initialize({
  client_id: "aa06b0630e34d6055f9c6f8beb8e02eb"
});

document
  .querySelector(".buscarCancionForm")
  .addEventListener("submit", function(event) {
    event.preventDefault(); // Avoid page refresh

    console.log(event.target.busqueda.value); // We show by console the value of the input with name = "search"

    SC.get("/tracks", {
      q: event.target.busqueda.value
    }).then(function(res) {

      // Song image and ID
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

// Grab image
function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
  ev.dataTransfer.setData("srcSong", ev.target.src);
}

// Drag image
function drop(ev) {
  ev.preventDefault();

  var data = ev.dataTransfer.getData("text");
  var srcSong = ev.dataTransfer.getData("srcSong");

  ev.target.src = srcSong;

  // Play
  SC.stream("/tracks/" + data).then(function(player) {
    player.play();
  });
}
