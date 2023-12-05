// Importar los módulos necesarios de la biblioteca camunda-external-task-client-js
import { Client, Variables, logger } from "camunda-external-task-client-js";

// Objeto de configuración para el Cliente de Tareas Externas de Camunda
const config = { baseUrl: "http://localhost:8080/engine-rest", use: logger };

// Crear una instancia del Cliente de Tareas Externas de Camunda con la configuración especificada
const client = new Client(config);

// Suscribirse al tipo de tarea "SendLetter" y definir la función a ejecutar cuando se recibe una tarea
client.subscribe("checkRUT", async function({ task, taskService }) {

    const ID_client = parseInt(task.variables.get("id_name"), 10);  //Traer el cc del cliente 

    //Crear arreglo con la respuesta de la consulta a la BD 
    const miArreglo = [1006776741, 2222222222, 3333333333];

    // Verificar si la variable está en el arreglo y devolver un booleano
    const estaEnArreglo = miArreglo.includes(ID_client);
    
    // Imprimir el resultado
    console.log(`La variable ${ID_client} ${estaEnArreglo ? 'está' : 'no está'} en el arreglo.`);
    console.log({estaEnArreglo});

    // Crear un objeto Variables para almacenar variables del proceso
    const processVariables = new Variables();
    
    processVariables.set("rut_check",estaEnArreglo);
    
    // Completar la tarea, proporcionando las variables del proceso
    await taskService.complete(task, processVariables);
});
