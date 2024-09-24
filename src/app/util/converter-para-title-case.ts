export function converterParaTitleCase(texto: string): string {
  if (texto.length < 1) return texto;

  return (
    texto[0].toUpperCase() + texto.substring(1, texto.length).toLowerCase()
  );
}
