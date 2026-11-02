
const STORAGE_KEY = "timecapsule_capsules";

export function getCapsules() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Could not load capsules:", error);
    return [];
  }
}

export function getCapsuleById(id) {
  return getCapsules().find(
    (capsule) => String(capsule.id) === String(id)
  );
}

export function saveCapsule(capsule) {
  const capsules = getCapsules();

  const existingIndex = capsule.id
    ? capsules.findIndex(
        (item) => String(item.id) === String(capsule.id)
      )
    : -1;

  const savedCapsule = {
    ...capsule,
    id: capsule.id || crypto.randomUUID(),
    createdAt:
      existingIndex >= 0
        ? capsules[existingIndex].createdAt
        : capsule.createdAt || new Date().toISOString(),
    status:
      existingIndex >= 0
        ? capsules[existingIndex].status || "Scheduled"
        : capsule.status || "Scheduled",
    updatedAt: new Date().toISOString(),
  };

  let updatedCapsules;

  if (existingIndex >= 0) {
    updatedCapsules = [...capsules];
    updatedCapsules[existingIndex] = savedCapsule;
  } else {
    updatedCapsules = [...capsules, savedCapsule];
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedCapsules)
  );

  return savedCapsule;
}

export function deleteCapsule(id) {
  const remaining = getCapsules().filter(
    (capsule) => String(capsule.id) !== String(id)
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(remaining)
  );

  return remaining;
}
