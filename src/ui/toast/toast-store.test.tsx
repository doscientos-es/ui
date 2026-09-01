import { describe, expect, it, vi } from 'vitest'

import { toast } from './toast-store'
describe('toast API', () => {
  it('returns an id from shorthand methods', () => {
    const id = toast.success('Guardado', { duration: 0 })
    expect(typeof id).toBe('string')
    toast.dismiss(id)
  })
  it('returns the original promise', async () => {
    const promise = Promise.resolve('ok')
    expect(
      toast.promise(promise, { loading: 'Guardando', success: 'Guardado', error: 'Error' }),
    ).toBe(promise)
    toast.dismiss('missing')
  })
  it('supports actions without coupling callers to the renderer', () => {
    const onPress = vi.fn()
    const id = toast({ title: 'Aviso', action: { label: 'Abrir', onPress }, duration: 0 })
    expect(id).toBeTruthy()
    toast.dismiss(id)
    expect(onPress).not.toHaveBeenCalled()
  })
})
