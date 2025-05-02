<?php
// filepath: e:\Proyectos\Visual Studio Code\CUARTO\PROGRAMACION WEB\Aplicacion estudiante porcentaje asistencias\insertar_estudiante.php

// Incluir el archivo de conexión a la base de datos
include 'conexionDB.php';

// Obtener los datos enviados desde el frontend
$nombre = $_POST['nombre'];
$apellido = $_POST['apellido'];
$asignatura = $_POST['asignatura'];
$creditos = $_POST['creditos'];
$faltas = $_POST['faltas'];

// Preparar la consulta SQL
$sql = "INSERT INTO estudiantes (nombre, apellido, asignatura, creditos, faltas) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssii", $nombre, $apellido, $asignatura, $creditos, $faltas);

// Ejecutar la consulta
if ($stmt->execute()) {
    echo "Datos insertados correctamente.";
} else {
    echo "Error al insertar los datos: " . $stmt->error;
}

// Cerrar la conexión
$stmt->close();
$conn->close();
?>