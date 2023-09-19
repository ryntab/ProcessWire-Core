const fs = require('fs');

console.log(process)

// Read environment variables
const env_DB_Name = 'teawdawd';
const env_DB_User = 'zzzzteawdawd';
const env_DB_Pass = '324234';
const env_DB_Host = '23423423';

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
const config = fs.readFileSync(configFile, 'utf8');

//Search Config file for DB_NAME, DB_USER, DB_Pass, DB_HOST
const db_name = content.match(/^\s*\$config->dbname\s*=\s*'.*?';\s*$/m);
const db_user = content.match(/^\s*\$config->dbUser\s*=\s*'.*?';\s*$/m);
const db_Pass = content.match(/^\s*\$config->dbPass\s*=\s*'.*?';\s*$/m);
const db_host = content.match(/^\s*\$config->dbHost\s*=\s*'.*?';\s*$/m);

let updatedConfig = config;

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

if (db_name[0] === env_DB_Name && db_user[0] === env_DB_User && db_Pass[0] === env_DB_Pass && db_host[0] === env_DB_Host) {
    console.log('Database credentials are already up to date');
    process.exit(0);
}

if (db_name && db_name[1]) {
    updatedConfig.replace(db_name[1], env_DB_Name); 
} else {
    console.log("No match found");
}

if (db_user && db_user[1]) {
    updatedConfig.replace(db_user[1], env_DB_User);
} else {
    console.log("No match found");
}

if (db_Pass && db_Pass[1]) {
    updatedConfig.replace(db_Pass[1], env_DB_Pass);
} else {
    console.log("No match found");
}

if (db_host && db_host[1]) {
    updatedConfig.replace(db_host[1], env_DB_Host);
} else {
    console.log("No match found");
}

// Replace the old credentials with the new ones
const updatedContent = content
    .replace(db_name, env_DB_Name)
    .replace(db_user, env_DB_User)
    .replace(db_Pass, env_DB_Pass)
    .replace(db_host, env_DB_Host);

// Write the updated content back to wp-config.php
fs.writeFileSync(configFile, updatedContent);
