import { definePreset } from '@primeng/themes';
import Aura from '@primeuix/themes/aura';
import { BASE_PRIMITIVES } from './base.primitives';

export const LightTheme = definePreset(Aura, {
  primitive: {
    ...BASE_PRIMITIVES,

    // COLORS — light palette
    amber: {
      500: '#D49A38', // primary
      600: '#BA812E', // active bg
    },
    slate: {
      800: '#3A3631', // text
      700: '#5B554D', // text secondary
      500: '#AFA9A0', // disabled text
      300: '#D9D0C6', // border
      200: '#E6DED2', // surface ground, disabled bg
    },
    green: {
      300: '#C3D5B3', // success
    },
    blue: {
      300: '#9BB8CB', // info
    },
    yellow: {
      500: '#E6B85C', // warning
    },
    red: {
      500: '#CF6E5A', // error
    },
    white: {
      500: '#FFFFFF', // primary text, surface card
    },
  },
  semantic: {
    primary: {
      500: '{amber.500}',
      600: '{amber.600}',
    },
    text: {
      800: '{slate.800}',
      700: '{slate.700}',
      500: '{slate.500}',
    },
    surface: {
      500: '{white.500}',
      200: '{slate.200}',
      300: '{slate.300}',
    },
    success: {
      300: '{green.300}',
    },
    info: {
      300: '{blue.300}',
    },
    warning: {
      500: '{yellow.500}',
    },
    error: {
      500: '{red.500}',
    },
  },
  component: {},
});
