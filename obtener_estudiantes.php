<?php
// filepath: e:\Proyectos\Visual Studio Code\CUARTO\PROGRAMACION WEB\Aplicacion estudiante porcentaje asistencias\obtener_estudiantes.php

// Incluir el archivo de conexión a la base de datos
include 'conexionDB.php';

// Consultar los datos de la tabla estudiantes
$sql = "SELECT nombre, apellido, asignatura, creditos, faltas FROM estudiantes";
$result = $conn->query($sql);

$estudiantes = [];

// Recorrer los resultados y almacenarlos en un array
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $estudiantes[] = $row;
    }
}

// Devolver los datos en formato JSON
header("Content-Type: application/json");
echo json_encode($estudiantes);

// Cerrar la conexión
$conn->close();
?>