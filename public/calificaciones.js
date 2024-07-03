
class Calificaciones {
  constructor() {
      const commentForm = document.querySelector('#comment-form');
      commentForm.addEventListener('submit', this.saveCalificacion.bind(this));
  }

  saveCalificacion(event) {
      event.preventDefault();
      const calificacion = event.target.elements.rating.value;
  
      fetch('/calificacion', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            calificacion: calificacion
          })
      })
      .then(response => {
        return response.json()
      })
      .then(result => {
          if (result.success) {
              alert('Comentario enviado y guardado');
              window.location.reload();
          } else {
              throw new Error('Error al guardar comentario');
          }
      })
      .catch(error => {
          console.error('Error:', error);
      });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Calificaciones();
});
