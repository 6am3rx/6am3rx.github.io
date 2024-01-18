/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

export const EXTENSIONS = {
  effects: {
    label: __('Effects', 'ghostkit'),
    attributes: ['effects'],
  },
  position: {
    label: __('Position', 'ghostkit'),
    styles: [
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'width',
      'height',
      'min-width',
      'min-height',
      'max-width',
      'max-height',
      'z-index',
    ],
    responsive: true,
    selectors: [''],
  },
  spacings: {
    label: __('Spacings', 'ghostkit'),
    styles: [
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
    ],
    responsive: true,
    selectors: [''],
  },
  frame: {
    label: __('Frame', 'ghostkit'),
    styles: [
      'border-style',
      'border-width',
      'border-color',
      'border-top-left-radius',
      'border-top-right-radius',
      'border-bottom-left-radius',
      'border-bottom-right-radius',
      'box-shadow',
    ],
    responsive: true,
    selectors: ['', '&:hover'],
  },
  transform: {
    label: __('Transform', 'ghostkit'),
    styles: [
      '--gkt-transform-perspective',
      '--gkt-transform-x',
      '--gkt-transform-y',
      '--gkt-transform-scale',
      '--gkt-transform-rotate',
      '--gkt-transform-rotate-x',
      '--gkt-transform-rotate-y',
      '--gkt-transform-rotate-z',
      '--gkt-transform-skew-x',
      '--gkt-transform-skew-y',
      '--gkt-transform-origin',
    ],
    responsive: true,
    selectors: ['', '&:hover'],
  },
  customCSS: {
    label: __('Custom CSS', 'ghostkit'),
    styles: [
      'opacity',
      'overflow-x',
      'overflow-y',
      'cursor',
      'user-select',
      'clip-path',
      'custom',

      // Pro.
      'transition-property',
      'transition-duration',
      'transition-delay',
      'transition-timing-function',
    ],
    responsive: true,
    selectors: [''],
  },
};
