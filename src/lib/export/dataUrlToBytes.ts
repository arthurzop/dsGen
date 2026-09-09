export async function dataUrlToBytes(dataUrl: string): Promise<Uint8Array> {
  const res = await fetch(dataUrl);
  const buffer = await res.arrayBuffer();
  return new Uint8Array(buffer);
}
