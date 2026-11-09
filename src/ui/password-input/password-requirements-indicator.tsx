/** Generic circular progress indicator for consumer-owned password requirements. */
export function PasswordRequirementsIndicator({
  isValid,
  label,
  progress,
}: {
  isValid: boolean
  label: string
  progress: number
}) {
  const normalizedProgress = Number.isFinite(progress) ? Math.max(0, Math.min(100, progress)) : 0
  const color = isValid ? 'var(--ui-success)' : 'var(--ui-primary)'

  return (
    <output
      aria-label={label}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={normalizedProgress}
      className="grid size-4 place-items-center rounded-full"
      data-slot="password-requirements-indicator"
      style={{
        background: `conic-gradient(${color} ${normalizedProgress}%, var(--ui-border) ${normalizedProgress}% 100%)`,
      }}
      title={label}
    >
      <span aria-hidden="true" className="bg-background size-2 rounded-full" />
    </output>
  )
}
