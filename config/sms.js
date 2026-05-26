// Aap yahan apne SMS aggregator ka SDK / HTTP call implement kar sakte ho.
export async function sendSMS({ phone, message }) {
  console.log("[SMS-STUB]", phone, message);
  return { ok: true };
}
