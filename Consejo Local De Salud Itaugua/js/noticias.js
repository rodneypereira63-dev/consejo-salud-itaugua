document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedor-noticias");
  if (!contenedor) return;

  // Intentamos cargar el archivo
  fetch('./data/noticias.json')
    .then(res => {
      if (!res.ok) {
        throw new Error(`Error HTTP: ${res.status}. Revisa que el archivo esté en /data/noticias.json`);
      }
      return res.json();
    })
    .then(data => {
      contenedor.innerHTML = "";
      data.forEach(n => {
        contenedor.innerHTML += `
          <div class="card">
            <img src="${n.imagen}" alt="${n.titulo}" onerror="this.src='https://via.placeholder.com/400x250?text=Salud+Itauguá'">
            <div class="card-body" style="padding: 20px;">
              <p style="color: #198754; font-weight: bold; font-size: 0.8rem;">${n.fecha}</p>
              <h3>${n.titulo}</h3>
              <p style="font-size: 0.9rem; color: #555;">${n.contenido.substring(0, 100)}...</p>
              <a href="noticia.html?id=${n.id}" class="btn-noticia">Leer más</a>
            </div>
          </div>
        `;
      });
    })
    .catch(err => {
      console.error("Detalle del error:", err);
      contenedor.innerHTML = `
        <div style="grid-column: 1/-1; background: #ffeeee; border: 1px solid red; padding: 20px; border-radius: 10px; text-align: center;">
          <p style="color: red; font-weight: bold;">No se pudieron cargar las noticias.</p>
          <p style="font-size: 0.8rem;">${err.message}</p>
          <p style="font-size: 0.8rem; margin-top: 10px;">TIP: Si estás abriendo el archivo con doble clic, intenta usar un servidor local o sube tu carpeta a GitHub Pages.</p>
        </div>`;
    });
});