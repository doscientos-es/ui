import {
  SIGNATURE_HEIGHT,
  SIGNATURE_STROKE_WIDTH,
  SIGNATURE_WIDTH,
  signatureStrokePath,
  type SignaturePoint,
} from './signature-data'

export function SignatureInk({ strokes }: { strokes: SignaturePoint[][] }) {
  return (
    <svg
      aria-hidden="true"
      className="text-foreground pointer-events-none absolute inset-0 size-full"
      viewBox={`0 0 ${SIGNATURE_WIDTH} ${SIGNATURE_HEIGHT}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={SIGNATURE_STROKE_WIDTH}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {strokes.map((stroke, index) => (
        <path key={index} d={signatureStrokePath(stroke)} />
      ))}
    </svg>
  )
}
