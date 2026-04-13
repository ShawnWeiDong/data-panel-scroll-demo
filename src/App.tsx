import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import DataPanel from './components/DataPanel'

const theme = createTheme({ palette: { mode: 'light' } })

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: '#f0f2f5',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <Box sx={{ px: 3, pt: 3, pb: 1, flexShrink: 0 }}>
          <Typography variant="h5" sx={{ mb: 0.5, fontWeight: 700 }}>
            Data Panel — Scroll Strategy Comparison
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Expand "Bill of Materials (11)" in each panel to compare scroll strategies.
          </Typography>
        </Box>

        {/* Three panels — stretch to fill remaining height */}
        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            display: 'flex',
            gap: 2,
            px: 3,
            pb: 3,
            alignItems: 'stretch',
          }}
        >
          <DataPanel strategy="panel-scroll" />
          <DataPanel strategy="pagination" />
          <DataPanel strategy="nested-scroll" />
          <DataPanel strategy="drill-down" />
        </Box>
      </Box>
    </ThemeProvider>
  )
}
