import { type CnFunction } from 'cn'
import { createCn } from 'cn/config'

const animationNames = [
  'accordion-down',
  'accordion-up',
  'ui-surface-in',
  'ui-surface-out',
  'ui-overlay-in',
  'ui-overlay-out',
  'ui-ripple',
  'marquee-x',
  'marquee-y',
]

export const cn: CnFunction = createCn({
  extend: {
    classGroups: {
      animate: [{ animate: animationNames }],
    },
  },
})
