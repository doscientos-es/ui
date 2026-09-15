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
  const normalizedProgress = Math.max(0, Math.min(100, progress))
  const color = isValid ? 'var(--success)' : 'var(--primary)'

  return (
    <output
      aria-label={label}
      className="grid size-4 place-items-center rounded-full"
      data-slot="password-requirements-indicator"
      role="status"
      style={{
        background: `conic-gradient(${color} ${normalizedProgress}%, var(--border) ${normalizedProgress}% 100%)`,
      }}
      title={label}
    >
      <span aria-hidden="true" className="size-2 rounded-full bg-white" />
    </output>
  )
}
