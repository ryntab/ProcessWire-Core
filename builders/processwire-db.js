const fs = require('fs');

// Read environment variables
const env_DB_Name = process.env.DB_NAME;
const env_DB_User = process.env.DB_USER;
const env_DB_Pass = process.env.DB_PASS;
const env_DB_Host = process.env.DB_HOST;

// Exit if database config env is missing
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

// Read the config of site/config.php
let config = fs.readFileSync(configFile, 'utf8');

//Search Config file for DB_NAME, DB_USER, DB_Pass, DB_HOST and write to artifact
const newConfig = config
    .replace(/^\s*\$config->dbName\s*=\s*'.*?';\s*$/m, `$config->dbName ='${env_DB_Name}';`)
    .replace(/^\s*\$config->dbUser\s*=\s*'.*?';\s*$/m, `$config->dbUser ='${env_DB_User}';`)
    .replace(/^\s*\$config->dbPass\s*=\s*'.*?';\s*$/m, `$config->dbPass ='${env_DB_Pass}';`)
    .replace(/^\s*\$config->dbHost\s*=\s*'.*?';\s*$/m, `$config->dbHost ='${env_DB_Host}';`)


console.log('Updating site/config.php with the enviroment database credentials:');

// Write the updated config back to wp-config.php
fs.writeFileSync(configFile, newConfig);
