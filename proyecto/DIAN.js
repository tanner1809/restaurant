// Importar los módulos necesarios de la biblioteca camunda-external-task-client-js
import { Client, Variables, logger } from "camunda-external-task-client-js";

// Objeto de configuración para el Cliente de Tareas Externas de Camunda
const config = { baseUrl: "http://localhost:8080/engine-rest", use: logger };

// Crear una instancia del Cliente de Tareas Externas de Camunda con la configuración especificada
const client = new Client(config);

// Suscribirse al tipo de tarea "SendLetter" y definir la función a ejecutar cuando se recibe una tarea
client.subscribe("DIANCode", async function({ task, taskService }) {


    const ID_client = parseInt(task.variables.get("id_name"), 10);  //Traer el cc del cliente 
    
    const name_client = task.variables.get("titular_name");  //Traer el cc del cliente 


    const codigo = ID_client+name_client;
    
    
    // Imprimir el resultado
    console.log(`El codigo asignado es el siguiente ${codigo}`);


    const processVariables = new Variables();s
    
    processVariables.set("DIANCode",codigo);
    
    
    // Completar la tarea, proporcionando las variables del proceso
    await taskService.complete(task, processVariables);

});
