const STORAGE_KEY = "qinghe-reservations";

function readStoredReservations() {
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveReservationLocally(reservation) {
  const reservations = readStoredReservations();
  reservations.unshift({
    ...reservation,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  });
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(reservations.slice(0, 20)));
}

export async function submitReservation(reservation) {
  const endpoint = import.meta.env.VITE_RESERVATION_ENDPOINT;

  if (endpoint) {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservation),
    });

    if (!response.ok) {
      throw new Error("预约提交失败，请稍后再试。");
    }

    return response.json().catch(() => ({ ok: true }));
  }

  await new Promise((resolve) => window.setTimeout(resolve, 650));
  saveReservationLocally(reservation);
  return { ok: true };
}
