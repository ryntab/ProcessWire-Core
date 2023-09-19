const fs = require('fs');

// Read environment variables
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;

// Path to your wp-config.php file
const configFile = 'site/config.php';

// Read the content of site/config.php
const content = fs.readFileSync(configFile, 'utf8');

// Replace the old credentials with new ones
const updatedContent = content
    .replace("define('DB_NAME', 'old_db_name');", `define('DB_NAME', 'test');`)
    .replace("define('DB_USER', 'old_db_user');", `define('DB_USER', 'test');`)
    .replace("define('DB_PASSWORD', 'old_db_password');", `define('DB_PASSWORD', 'test');`)
    .replace("define('DB_HOST', 'old_db_host');", `define('DB_HOST', 'test');`);

// Write the updated content back to wp-config.php
fs.writeFileSync(configFile, updatedContent);