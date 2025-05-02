<?php
// Configuración de la conexión a la base de datos
$host = "localhost";
$user = "root";
$password = "";
$dbname = "asistencias";

$conn = new mysqli($host, $user, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}
?>