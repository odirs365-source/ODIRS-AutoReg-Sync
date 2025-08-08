// auto-reg-sync-mock
const admin = require("./firebaseService");
const fs = require("fs");

module.exports = async function syncAutoRegMock() {
  // Load mock data from file
  const rawData = fs.readFileSync("mock-autoreg.json");
  const response = JSON.parse(rawData);
  const items = response.itemList || [];

  const db = admin.database();
  const year = new Date().getFullYear().toString();

  for (const item of items) {
    const regNumber = item.regNumber || `UNKNOWN-${Date.now()}`;
    const ref = db.ref(`motor_vehicle_registrations/mock/${year}/${regNumber}`);
    await ref.set(item);
  }

  return { success: true, total: items.length };
};
