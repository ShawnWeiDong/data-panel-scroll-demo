// Shim for @weave-mui/styles — avoids @weave/design-tokens (Autodesk private registry).
// Full Weave design tokens can be enabled later via getTheme() when registry is accessible.
export { ThemeProvider, createTheme, useTheme } from '@mui/material/styles'
export * from '@mui/material/styles'
