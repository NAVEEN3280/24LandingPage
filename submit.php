<?php
$data = json_decode(file_get_contents("php://input"), true);

error_log(print_r($data, true)); // Logs to Apache error log

if ($data) {
  $file = fopen("form_submissions.csv", "a");

  // Add headers if file is empty
  if (filesize("form_submissions.csv") === 0) {
    fputcsv($file, ["Name", "Email", "Phone", "City", "Role", "Timestamp"]);
  }

  fputcsv($file, [
    $data["name"] ?? '',
    $data["email"] ?? '',
    $data["phone"] ?? '',
    $data["city"] ?? '',
    $data["role"] ?? '',
    $data["timestamp"] ?? ''
  ]);

  fclose($file);
  echo "Form submission saved.";
} else {
  echo "Invalid data.";
}
?>
