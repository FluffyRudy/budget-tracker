export async function HashContent(content: string): Promise<string> {
  const msgUint8 = new TextEncoder().encode(content);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((buffer) => buffer.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}
