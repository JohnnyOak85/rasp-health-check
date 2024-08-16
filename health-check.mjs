import { execSync } from "child_process";

/**
 *
 * @returns The CPU temperature in Celsius
 */
function getTemperature() {
  try {
    const stdout = execSync("vcgencmd measure_temp");
    const tempMatch = stdout.toString().match(/temp=([\d.]+)'C/);

    if (tempMatch) {
      return parseFloat(tempMatch[1]);
    } else {
      throw new Error("Could not parse temperature");
    }
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
}

/**
 * @returns CPU usage as a percentage number
 */
function getCPUUsage() {
  try {
    const stdout = execSync("top -bn1 | grep 'Cpu(s)'");
    const usageMatch = stdout.toString().match(/(\d+\.\d+) id/);
    if (usageMatch) {
      return (100 - parseFloat(usageMatch[1])).toFixed(2);
    } else {
      throw new Error("Could not parse CPU usage");
    }
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
}

/**
 *
 * @returns Memory usage as a percentage number
 */
function getMemoryUsage() {
  try {
    const stdout = execSync(
      "free -m | awk 'NR==2{printf \"Memory Usage: %.2f%%\", $3*100/$2 }'"
    );
    return parseFloat(stdout.toString());
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
}

/**
 *
 * @returns Available memory in MB
 */
function getAvailableMemory() {
  try {
    const stdout = execSync("free -m | awk 'NR==2{printf \"%s MB\", $7}'");
    return parseInt(stdout.toString(), 10);
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
}

export { getTemperature, getCPUUsage, getMemoryUsage, getAvailableMemory };
