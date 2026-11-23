/** Coordinates are expressed in a fixed 600 × 240 viewBox, independently of screen size. */
export type SignaturePoint = { x: number; y: number }

/** Serializable drawing data. It does not identify the signer or constitute consent. */
export type SignatureValue = { version: 1; strokes: SignaturePoint[][] }

export const SIGNATURE_WIDTH = 600
export const SIGNATURE_HEIGHT = 240
export const SIGNATURE_STROKE_WIDTH = 3

const coordinate = (value: number, max: number) =>
  Number.isFinite(value) ? Math.round(Math.max(0, Math.min(max, value)) * 10) / 10 : 0

/** The same geometry is used for both the preview and the exported SVG. */
export function signatureStrokePath(stroke: SignaturePoint[]): string {
  if (!stroke.length) return ''
  const points = stroke.map(
    ({ x, y }) => `${coordinate(x, SIGNATURE_WIDTH)} ${coordinate(y, SIGNATURE_HEIGHT)}`,
  )
  return `M ${points.join(' L ')}${points.length === 1 ? ' h 0.01' : ''}`
}

/** Returns a transparent, standalone black SVG; persist it only in a trusted signing workflow. */
export function signatureToSvg(value: SignatureValue): string {
  const paths = value.strokes
    .map(signatureStrokePath)
    .filter(Boolean)
    .map((path) => `<path d="${path}"/>`)
    .join('')
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIGNATURE_WIDTH} ${SIGNATURE_HEIGHT}" width="${SIGNATURE_WIDTH}" height="${SIGNATURE_HEIGHT}" fill="none" stroke="#111827" stroke-width="${SIGNATURE_STROKE_WIDTH}" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`
}
