const fs = require('fs');

// Read environment variables
const env_DB_Name = process.env.DB_NAME;
const env_DB_User = process.env.DB_USER;
const env_DB_Password = process.env.DB_PASSWORD;
const env_DB_Host = process.env.DB_HOST;

// Path to your wp-config.php file
const configFile = 'site/config.php';

// Read the content of site/config.php
const content = fs.readFileSync(configFile, 'utf8');

//Search Config file for DB_NAME, DB_USER, DB_PASSWORD, DB_HOST
const db_name = content.match(/define\('DB_NAME', '(.*)'\);/)[1];
const db_user = content.match(/define\('DB_USER', '(.*)'\);/)[1];
const db_password = content.match(/define\('DB_PASSWORD', '(.*)'\);/)[1];
const db_host = content.match(/define\('DB_HOST', '(.*)'\);/)[1];

// Log the old credentials


// Replace the old credentials with the new ones
const updatedContent = content
    .replace(db_name, env_DB_Name)
    .replace(db_user, env_DB_User)
    .replace(db_password, env_DB_Password)
    .replace(db_host, env_DB_Host);

// Write the updated content back to wp-config.php
fs.writeFileSync(configFile, updatedContent);