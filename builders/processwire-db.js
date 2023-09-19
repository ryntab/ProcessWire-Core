const fs = require('fs');

// Read environment variables
const env_DB_Name = process.env.DB_NAME;
const env_DB_User = process.env.DB_USER;
const env_DB_Password = process.env.DB_PASSWORD;
const env_DB_Host = process.env.DB_HOST;

if (!env_DB_Name || !env_DB_User || !env_DB_Password || !env_DB_Host) {
    console.log('Please provide all the required environment variables to connect to the database.');
    process.exit(1);
}

// Path to your wp-config.php file
const configFile = 'site/config.php';

// Read the content of site/config.php
const content = fs.readFileSync(configFile, 'utf8');

//Search Config file for DB_NAME, DB_USER, DB_PASSWORD, DB_HOST
const db_name = content.match(/define\('dbName', '(.*)'\);/)[1];
const db_user = content.match(/define\('dbHost', '(.*)'\);/)[1];
const db_password = content.match(/define\('dbPass', '(.*)'\);/)[1];
const db_host = content.match(/define\('dbHost', '(.*)'\);/)[1];

// Log the old credentials
if (!db_name || !db_user || !db_password || !db_host) {
    console.log('Configuration file does not contain database credentials \n Please check your site/config.php file');
    process.exit(1);
}

// Replace the old credentials with the new ones
const updatedContent = content
    .replace(db_name, env_DB_Name)
    .replace(db_user, env_DB_User)
    .replace(db_password, env_DB_Password)
    .replace(db_host, env_DB_Host);

// Write the updated content back to wp-config.php
fs.writeFileSync(configFile, updatedContent);