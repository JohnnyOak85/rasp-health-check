import { writeFileSync } from "fs";
import { execSync } from "child_process";

const serviceName = `health_check`;
const currentDir = process.cwd();
const serviceFilePath = `/etc/systemd/system/${serviceName}.service`;

const template = `
[Unit]
Description=${serviceName.charAt(0).toUpperCase() + serviceName.slice(1)}
After=network.target

[Service]
ExecStart=/usr/bin/ts-node ${currentDir}/src/start.ts
Restart=always
User=${process.env.USER}
Environment=NODE_ENV=production
WorkingDirectory=${currentDir}
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=${serviceName}

[Install]
WantedBy=multi-user.target
`;

// Write the service file content to the specified path
try {
  writeFileSync(serviceFilePath, template);
  console.log(`Service file created at ${serviceFilePath}`);
} catch (error) {
  console.error(`Failed to create service file: ${error.message}`);
  process.exit();
}

// Reload the systemd daemon to recognize the new service
try {
  execSync("sudo systemctl daemon-reload");
  console.log("Systemd daemon reloaded");
} catch (error) {
  console.error(`Failed to reload systemd daemon: ${error.message}`);
  process.exit();
}

// Enable the service to start at boot
try {
  execSync(`sudo systemctl enable ${serviceName}`);
  console.log("Service enabled to start at boot");
} catch (error) {
  console.error(`Failed to enable service: ${error.message}`);
  process.exit();
}

// Start the service
try {
  execSync(`sudo systemctl start ${serviceName}`);
  console.log("Service started");
} catch (error) {
  console.error(`Failed to start service: ${error.message}`);
  process.exit();
}
