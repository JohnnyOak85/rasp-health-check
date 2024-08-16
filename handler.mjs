import {
  getAvailableMemory,
  getCPUUsage,
  getMemoryUsage,
  getTemperature,
} from "./health-check.mjs";

const handler = () => {
  try {
    const temperature = getTemperature();
    const cpuUsage = getCPUUsage();
    const memoryUsage = getMemoryUsage();
    const availableMemory = getAvailableMemory();

    return {
      temperature,
      cpuUsage,
      memoryUsage,
      availableMemory,
    };
  } catch (error) {
    throw error;
  }
};

export default handler;
