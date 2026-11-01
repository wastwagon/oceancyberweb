/** DPC certificate ID from env — publish only when set; no public explainer copy. */
export function readDpcRegistrationNumber(): string | null {
  const fromPublic = process.env.NEXT_PUBLIC_OCEAN_DPC_REGISTRATION?.trim();
  if (fromPublic) return fromPublic;
  const fromServer = process.env.OCEAN_DPC_REGISTRATION?.trim();
  if (fromServer) return fromServer;
  return null;
}

/** One line for legal footer when a number is configured. */
export function formatDpcRegistrationLine(): string | null {
  const id = readDpcRegistrationNumber();
  if (!id) return null;
  return `Data Protection Commission registration number: ${id}`;
}
