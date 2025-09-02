import { definePreset } from '@primeng/themes';
import Aura from '@primeuix/themes/aura';

export const LightTheme = definePreset(Aura, {
  primitive: {
    // COLORS
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

    // TYPOGRAPHY
    typography: {
      fontFamily: {
        sans: "'Inter', 'Helvetica Neue', Arial, sans-serif",
        mono: "'Fira Code', monospace",
      },
      fontSize: {
        xs: '0.75rem', // 12px
        sm: '0.875rem', // 14px
        md: '1rem', // 16px
        lg: '1.125rem', // 18px
        xl: '1.25rem', // 20px
        '2xl': '1.5rem', // 24px
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      lineHeight: {
        normal: '1.5',
        relaxed: '1.625',
        snug: '1.375',
      },
    },

    // SPACING
    spacing: {
      0: '0px',
      1: '0.25rem', // 4px
      2: '0.5rem', // 8px
      3: '0.75rem', // 12px
      4: '1rem', // 16px
      5: '1.25rem', // 20px
      6: '1.5rem', // 24px
      8: '2rem', // 32px
      10: '2.5rem', // 40px
      12: '3rem', // 48px
      16: '4rem', // 64px
    },

    // SIZING
    sizing: {
      xs: '16rem', // 256px
      sm: '20rem', // 320px
      md: '24rem', // 384px
      lg: '28rem', // 448px
      xl: '32rem', // 512px
      full: '100%',
    },

    // RADIUS
    radius: {
      none: '0px',
      sm: '0.125rem', // 2px
      md: '0.375rem', // 6px
      lg: '0.5rem', // 8px
      xl: '0.75rem', // 12px
      '2xl': '1rem', // 16px
      full: '9999px', // pill/circle
    },

    // SHADOWS
    elevation: {
      sm: '0px 1px 2px rgba(0,0,0,0.05)',
      md: '0px 4px 6px rgba(0,0,0,0.1)',
      lg: '0px 10px 15px rgba(0,0,0,0.15)',
      xl: '0px 20px 25px rgba(0,0,0,0.2)',
    },

    // BREAKPOINTS
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
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
