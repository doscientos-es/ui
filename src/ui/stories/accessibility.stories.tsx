import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor, within } from 'storybook/test'

import { Checkbox } from '../checkbox/checkbox'
import { InputGroup, InputGroupAddon, InputGroupInput } from '../input-group/input-group'
import { Input } from '../input/input'
import { QuantityInput } from '../quantity-input/quantity-input'
import { Switch } from '../switch/switch'
import { Textarea } from '../textarea/textarea'

const meta = { title: 'Foundations/Accessibility', parameters: { layout: 'padded' } } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>
type Color = [number, number, number, number]

function required<T>(value: T | null | undefined): T {
  if (value === null || value === undefined)
    throw new Error('Required element or color value is missing')
  return value
}

// Canvas converts browser-resolved OKLCH and RGB to sRGB, including alpha.
function colorReader(document: Document) {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = 1
  const context = required(canvas.getContext('2d'))
  return (color: string): Color => {
    if (!CSS.supports('color', color)) throw new Error(`Unresolved CSS color: ${color}`)
    context.clearRect(0, 0, 1, 1)
    context.fillStyle = color
    context.fillRect(0, 0, 1, 1)
    const data = context.getImageData(0, 0, 1, 1).data
    return [required(data[0]), required(data[1]), required(data[2]), required(data[3]) / 255]
  }
}

function composite(front: Color, back: Color): Color {
  return [
    front[0] * front[3] + back[0] * (1 - front[3]),
    front[1] * front[3] + back[1] * (1 - front[3]),
    front[2] * front[3] + back[2] * (1 - front[3]),
    1,
  ]
}

function background(element: Element, readColor: ReturnType<typeof colorReader>): Color {
  const parents: Element[] = []
  for (let node: Element | null = element; node; node = node.parentElement) parents.unshift(node)
  return parents.reduce<Color>(
    (result, node) => composite(readColor(getComputedStyle(node).backgroundColor), result),
    [255, 255, 255, 1],
  )
}

function luminance(color: Color) {
  const linear = (channel: number) => {
    const value = channel / 255
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
  }
  return linear(color[0]) * 0.2126 + linear(color[1]) * 0.7152 + linear(color[2]) * 0.0722
}

function contrast(color: Color, surface: Color) {
  const foreground = luminance(composite(color, surface))
  const behind = luminance(surface)
  return (Math.max(foreground, behind) + 0.05) / (Math.min(foreground, behind) + 0.05)
}

export const ControlBoundaries: Story = {
  render: () => (
    <section
      aria-label="Contraste de controles"
      className="bg-card text-card-foreground grid max-w-md gap-5 rounded-xl p-5"
    >
      <h2 className="text-lg font-semibold">Controles distinguibles</h2>
      <Input aria-label="Nombre" placeholder="Nombre" />
      <Textarea aria-label="Notas" placeholder="Notas" />
      <InputGroup>
        <InputGroupAddon>€</InputGroupAddon>
        <InputGroupInput aria-label="Importe" />
      </InputGroup>
      <QuantityInput aria-label="Cantidad" />
      <Checkbox>Recibir avisos</Checkbox>
      <Switch>Notificaciones</Switch>
    </section>
  ),
  play: async ({ canvasElement, globals }) => {
    const document = canvasElement.ownerDocument
    await waitFor(() =>
      expect(document.documentElement.classList.contains('dark')).toBe(globals.theme === 'dark'),
    )
    const readColor = colorReader(document)
    const boundaries = canvasElement.querySelectorAll(
      '[data-slot="input"], [data-slot="textarea"], [data-slot="input-group"], [data-slot="quantity-input-group"], [data-slot="checkbox-control"], [data-slot="switch-control"]',
    )
    await expect(boundaries).toHaveLength(6)
    for (const control of boundaries) {
      const border = readColor(getComputedStyle(control).borderTopColor)
      await expect(
        contrast(border, background(required(control.parentElement), readColor)),
        `${control.getAttribute('data-slot')} outer boundary`,
      ).toBeGreaterThanOrEqual(3)
      if (control.getAttribute('data-slot') !== 'switch-control') {
        await expect(
          contrast(border, background(control, readColor)),
          `${control.getAttribute('data-slot')} inner boundary`,
        ).toBeGreaterThanOrEqual(3)
      }
    }
    const thumb = required(canvasElement.querySelector('[data-slot="switch-thumb"]'))
    await expect(
      contrast(
        readColor(getComputedStyle(thumb).backgroundColor),
        background(required(thumb.parentElement), readColor),
      ),
    ).toBeGreaterThanOrEqual(3)
    const input = within(canvasElement).getByRole('textbox', { name: 'Nombre' })
    input.focus()
    await expect(input).toHaveFocus()
    await expect(input.matches(':focus-visible')).toBe(true)
    await expect(
      contrast(
        readColor(getComputedStyle(input).getPropertyValue('--tw-ring-color')),
        background(required(input.parentElement), readColor),
      ),
    ).toBeGreaterThanOrEqual(3)
    await expect(document.documentElement.scrollWidth).toBeLessThanOrEqual(
      required(document.defaultView).innerWidth,
    )
  },
}
