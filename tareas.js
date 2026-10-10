// Arreglo de objetos
let tareas = [];

const form = document.getElementById("formTareas");
const descripcion = document.getElementById("descripcion");
const lista = document.getElementById("listaTareas");
const resumen = document.getElementById("resumen");

// Dibujar nuevamente la lista
function renderTasks() {
    lista.innerHTML = "";

    // Pendientes primero, completadas al final
    const ordenadas = tareas
        .map((tarea, indice) => ({
            ...tarea,
            indiceOriginal: indice
        }))
        .sort((a, b) =>
            Number(a.completada) - Number(b.completada)
        );

    ordenadas.forEach(tarea => {
        const elemento = document.createElement("li");

        const casilla = document.createElement("input");
        casilla.type = "checkbox";
        casilla.checked = tarea.completada;

        const texto = document.createElement("span");
        texto.textContent = tarea.descripcion;

        if (tarea.completada) {
            texto.classList.add("completada");
        }

        // Completar o desmarcar una tarea
        casilla.addEventListener("change", function() {
            tareas[tarea.indiceOriginal].completada =
                casilla.checked;

            renderTasks();
        });

        const eliminar = document.createElement("button");
        eliminar.textContent = "Eliminar";
        eliminar.type = "button";

        eliminar.addEventListener("click", function() {
            tareas.splice(tarea.indiceOriginal, 1);
            renderTasks();
        });

        elemento.append(casilla, texto, eliminar);
        lista.appendChild(elemento);
    });

    const completadas =
        tareas.filter(tarea => tarea.completada).length;

    resumen.textContent =
        `Total: ${tareas.length} | ` +
        `Pendientes: ${tareas.length - completadas} | ` +
        `Completadas: ${completadas}`;
}

// Agregar una actividad
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const texto = descripcion.value.trim();

    if (texto === "") {
        return;
    }

    tareas.push({
        descripcion: texto,
        completada: false
    });

    descripcion.value = "";
    renderTasks();
    descripcion.focus();
});

renderTasks();