import { createTheme } from '@mui/material/styles';
import { tokens } from './theme/tokens';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      light: tokens.colors.primary[400],
      main: tokens.colors.primary[500], // #0D3B75 Deep Royal Navy
      dark: tokens.colors.primary[600],
      contrastText: tokens.colors.primary.contrastText,
    },
    secondary: {
      light: tokens.colors.secondary[400],
      main: tokens.colors.secondary[500], // #16A34A Vibrant Emerald Green
      dark: tokens.colors.secondary[600],
      contrastText: tokens.colors.secondary.contrastText,
    },
    info: {
      light: tokens.colors.accent[400],
      main: tokens.colors.accent[500], // #0284C7 Tech Cyan
      dark: tokens.colors.accent[600],
      contrastText: tokens.colors.accent.contrastText,
    },
    success: {
      light: tokens.colors.secondary[300],
      main: tokens.colors.semantic.success,
      dark: tokens.colors.secondary[700],
      contrastText: '#FFFFFF',
    },
    warning: {
      main: tokens.colors.semantic.warning,
      contrastText: '#FFFFFF',
    },
    error: {
      main: tokens.colors.semantic.error,
      contrastText: '#FFFFFF',
    },
    background: {
      default: tokens.colors.neutral[50], // #F8FAFC
      paper: '#FFFFFF',
      subtle: tokens.colors.neutral[100], // #F1F5F9
      darkNavy: tokens.colors.surface.darkNavy, // #0A192F
    },
    text: {
      primary: tokens.colors.neutral[900], // #0F172A
      secondary: tokens.colors.neutral[600], // #475569
      disabled: tokens.colors.neutral[400],
    },
    divider: tokens.colors.neutral[200], // #E2E8F0
  },
  typography: {
    fontFamily: tokens.typography.fontFamily,
    // 1.25x Major Third Typography Scale per alirezarezvani-ui-design-system
    h1: {
      fontSize: 'clamp(2rem, 1rem + 3.6vw, 3.8125rem)',
      fontWeight: 800,
      letterSpacing: '-0.025em',
      lineHeight: 1.15,
      color: tokens.colors.neutral[900],
    },
    h2: {
      fontSize: 'clamp(1.75rem, 1rem + 2.3vw, 2.75rem)',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      lineHeight: 1.22,
      color: tokens.colors.neutral[900],
    },
    h3: {
      fontSize: 'clamp(1.375rem, 1rem + 1.4vw, 2rem)',
      fontWeight: 700,
      letterSpacing: '-0.015em',
      lineHeight: 1.28,
      color: tokens.colors.neutral[900],
    },
    h4: {
      fontSize: 'clamp(1.15rem, 0.95rem + 0.8vw, 1.5625rem)', // ~25px
      fontWeight: 600,
      letterSpacing: '-0.01em',
      lineHeight: 1.35,
    },
    h5: {
      fontSize: '1.25rem', // 20px
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1rem', // 16px
      fontWeight: 600,
      lineHeight: 1.45,
    },
    body1: {
      fontSize: '1rem', // 16px base
      lineHeight: 1.65,
      color: tokens.colors.neutral[700],
    },
    body2: {
      fontSize: '0.875rem', // 14px
      lineHeight: 1.6,
      color: tokens.colors.neutral[600],
    },
    subtitle1: {
      fontSize: '1.125rem',
      lineHeight: 1.5,
      color: tokens.colors.neutral[600],
    },
    subtitle2: {
      fontSize: '0.8125rem', // 13px (sm)
      fontWeight: 600,
      color: tokens.colors.neutral[500],
    },
    caption: {
      fontSize: '0.75rem', // 12px
      lineHeight: 1.4,
      color: tokens.colors.neutral[500],
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.01em',
    },
  },
  shape: {
    borderRadius: tokens.radius.md, // 8px default modern preset
  },
  spacing: 8, // 8pt grid system
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: tokens.colors.neutral[50],
          color: tokens.colors.neutral[900],
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: tokens.radius.md, // 8px
          fontWeight: 600,
          transition: 'all 200ms cubic-bezier(0.16, 1, 0.3, 1)',
          '&:focus-visible': {
            outline: `3px solid ${tokens.colors.primary[200]}`,
            outlineOffset: '2px',
          },
        },
        sizeSmall: {
          height: 32,
          padding: '6px 14px',
          fontSize: '0.8125rem',
        },
        sizeMedium: {
          height: 40,
          padding: '8px 18px',
          fontSize: '0.9375rem',
        },
        sizeLarge: {
          height: 48,
          padding: '12px 24px',
          fontSize: '1rem',
        },
        containedPrimary: {
          backgroundColor: tokens.colors.primary[500],
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: tokens.colors.primary[600],
            transform: 'translateY(-1px)',
            boxShadow: tokens.shadows.brandGlow,
          },
        },
        containedSecondary: {
          backgroundColor: tokens.colors.secondary[500],
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: tokens.colors.secondary[600],
            transform: 'translateY(-1px)',
            boxShadow: tokens.shadows.emeraldGlow,
          },
        },
        outlinedPrimary: {
          borderColor: tokens.colors.primary[300],
          color: tokens.colors.primary[500],
          '&:hover': {
            borderColor: tokens.colors.primary[500],
            backgroundColor: tokens.colors.primary[50],
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: tokens.radius.lg, // 12px
          backgroundColor: '#FFFFFF',
          border: `1px solid ${tokens.colors.neutral[200]}`,
          boxShadow: tokens.shadows.sm,
          transition: 'all 250ms cubic-bezier(0.16, 1, 0.3, 1)',
          '&:hover': {
            boxShadow: tokens.shadows.lg,
            borderColor: tokens.colors.accent[300],
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: tokens.radius.lg,
        },
        elevation1: {
          boxShadow: tokens.shadows.sm,
          border: `1px solid ${tokens.colors.neutral[200]}`,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: tokens.radius.sm, // 6px
          fontWeight: 600,
          fontSize: '0.75rem',
          height: 26,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: tokens.radius.md,
          backgroundColor: '#FFFFFF',
          transition: 'border-color 150ms ease, box-shadow 150ms ease',
          '& fieldset': {
            borderColor: tokens.colors.neutral[200],
          },
          '&:hover fieldset': {
            borderColor: tokens.colors.neutral[400],
          },
          '&.Mui-focused fieldset': {
            borderColor: tokens.colors.primary[500],
            borderWidth: '2px',
          },
        },
        input: {
          padding: '10px 14px',
          fontSize: '0.9375rem',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${tokens.colors.neutral[200]}`,
          boxShadow: tokens.shadows.xs,
          color: tokens.colors.neutral[900],
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: tokens.radius.xl,
          boxShadow: tokens.shadows['2xl'],
          border: `1px solid ${tokens.colors.neutral[200]}`,
        },
      },
    },
  },
});
