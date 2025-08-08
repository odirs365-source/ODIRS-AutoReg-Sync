// auto-reg-real-sync
const axios = require("axios");
const admin = require("./firebaseService");

const API_KEY = process.env.API_KEY;
const BASE_URL = process.env.BASE_URL;

module.exports = async function syncAutoRegReal(startDate, endDate) {
  const url = `${BASE_URL}/${startDate}/${endDate}/${API_KEY}`;
  console.log("Fetching from:", url);

  const response = await axios.get(url);
  const items = response.data.itemList || [];

  const db = admin.database();
  const year = new Date().getFullYear().toString();

  for (const item of items) {
    const regNumber = item.regNumber || `UNKNOWN-${Date.now()}`;
    const ref = db.ref(
      `motor_vehicle_registrations/autoreg_${year}/${regNumber}`
    );
    await ref.set(item);
  }

  return { success: true, total: items.length };
};
