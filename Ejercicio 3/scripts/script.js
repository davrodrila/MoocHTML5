var tabla = document.getElementById("tabla"); //guardamos la referencia de la tabla para más tarde.
var sentencia = "";
var esPar = false;
for (i in this.location)
{
	sentencia = (esPar)?"<tr class='par'>": "<tr class='impar'>"; //si es par o impar, añadimos la clase CSS correspondiente para dar un estilo visual diferente para cada fila de la tabla
	sentencia += "<td class='nombre'>"+i+"</td>";//Columna con el nombre de la propiedad
	if (typeof(i)==="object")
	{
		sentencia += "<td>"+ "\"object\""+"</td>"; //columna con el valor o con la string object si es un objeto
	}
	else
	{
		sentencia += "<td>" + location[i] + "</td>";
	}
	sentencia +="</tr>";
	tabla.innerHTML += sentencia; //añadimos todo al cuerpo HTML 
	esPar = !esPar; //indicamos que la próxima columna sera
}