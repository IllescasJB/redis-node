# Docker + Redis + Express (Cache de peticiones)

> Requisitos previos(opcionales):
>
> - **Herramienta para enviar solicitudades HTTP desde Visual Studio Code** https://marketplace.visualstudio.com/items?itemName=humao.rest-client
> - **Herramienta de administración Web Redis** ```npm i -g redis-commander```

Para iniciar la aplicación ejecutar el siguiente comando desde la raíz del proyecto

```
docker-compose -f docker-compose.yml up
```

Si la operación fue exitosa debe tener el siguiente resultado en consola
![image](https://user-images.githubusercontent.com/44520170/188287359-ff78fca4-9040-436a-aa9d-6f907811133c.png)

### Pruebas de cache de peticiones

Está aplicación cuenta con solo dos peticiones **GET** que envían la información obtenida de la siguiente API https://rickandmortyapi.com/

https://user-images.githubusercontent.com/44520170/188287439-03daf82c-558c-4ef0-8d3e-c192d7e95f93.mp4

Como puede observarse en la primer llamada el tiempo de respuesta indicado en **X-Response-Time** es mayor, pero en la segunda llamada y posteriores
el tiempo es menor y esto es debido a que en la primer llamada la información es recuperada de la API anteriomente mencionada, una vez obtenida está
información es almacenada para que en la siguiente llamada la información sea obtenida de Redis(si es que la información existe) en lugar del API.

![image](https://user-images.githubusercontent.com/44520170/188287587-b243d523-33f6-469b-a98a-c38ea73b26fc.png)
 
