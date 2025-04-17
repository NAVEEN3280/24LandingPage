<?php
$data = json_decode(file_get_contents("php://input"), true);

if ($data) {
  $file = fopen("form_submissions.csv", "a");

  if (filesize("form_submissions.csv") === 0) {
    // Add headers if file is empty
    fputcsv($file, ["Name", "Email", "Phone", "City", "Role", "Timestamp"]);
  }

  fputcsv($file, [
    $data["name"],
    $data["email"],
    $data["phone"],
    $data["city"],
    $data["role"],
    $data["timestamp"]
  ]);

  fclose($file);
  echo "Form submission saved.";
} else {
  echo "Invalid data.";
}
?>
