const fs = require('fs');

// Read environment variables
const env_DB_Name = process.env.DB_NAME;
const env_DB_User = process.env.DB_USER;
const env_DB_Pass = process.env.DB_PASS;
const env_DB_Host = process.env.DB_HOST;

if (!env_DB_Name || !env_DB_User || !env_DB_Pass || !env_DB_Host) {
    console.log(`Please provide all the required environment variables to connect to the database. \n
    DB_NAME: ${env_DB_Name} \n
    DB_USER: ${env_DB_User} \n
    DB_PASS: ${env_DB_Pass} \n
    DB_HOST: ${env_DB_Host} \n
    \n`);
    process.exit(1);
}

console.log('Searching site/config.php for database credentials...');

// Path to your wp-config.php file
const configFile = 'site/config.php';

// Read the content of site/config.php
const content = fs.readFileSync(configFile, 'utf8');

//Search Config file for DB_NAME, DB_USER, DB_Pass, DB_HOST
const db_name = content.match(/define\('dbName', '(.*)'\);/)[1];
const db_user = content.match(/define\('dbHost', '(.*)'\);/)[1];
const db_Pass = content.match(/define\('dbPass', '(.*)'\);/)[1];
const db_host = content.match(/define\('dbHost', '(.*)'\);/)[1];

console.log('Updating site/config.php with the enviroment database credentials:');

// Log the old credentials
if (!db_name || !db_user || !db_Pass || !db_host) {
    console.log('Configuration file does not contain database credentials \n Please check your site/config.php file');
    console.log(`DB_NAME: ${db_name} \n
    DB_USER: ${db_user} \n
    DB_PASS: ${db_Pass} \n
    DB_HOST: ${db_host} \n
    \n`);
    process.exit(1);
}

// Replace the old credentials with the new ones
const updatedContent = content
    .replace(db_name, env_DB_Name)
    .replace(db_user, env_DB_User)
    .replace(db_Pass, env_DB_Pass)
    .replace(db_host, env_DB_Host);

// Write the updated content back to wp-config.php
fs.writeFileSync(configFile, updatedContent);