import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const TOOLKIT = path.resolve(__dirname, 'weave-mui-toolkit/packages')

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
  },
  optimizeDeps: {
    // Only scan project's own entry points, not the weave-mui-toolkit subdirectory
    entries: ['index.html', 'src/**/*.{ts,tsx}'],
    // Exclude @weave-mui/* from pre-bundling — aliases point to source TSX files directly
    exclude: ['@weave-mui/*'],
  },
  resolve: {
    alias: [
      // === Components used directly in the project ===
      { find: '@weave-mui/box',                 replacement: `${TOOLKIT}/box/lib/box.tsx` },
      { find: '@weave-mui/paper',               replacement: `${TOOLKIT}/paper/lib/paper.tsx` },
      { find: '@weave-mui/typography',          replacement: `${TOOLKIT}/typography/lib/typography.tsx` },
      { find: '@weave-mui/accordion',           replacement: `${TOOLKIT}/accordion/lib/accordion.tsx` },
      { find: '@weave-mui/accordion-summary',   replacement: `${TOOLKIT}/accordion-summary/lib/accordionSummary.tsx` },
      { find: '@weave-mui/accordion-details',   replacement: `${TOOLKIT}/accordion-details/lib/accordionDetails.tsx` },
      { find: '@weave-mui/select',              replacement: `${TOOLKIT}/select/lib/select.tsx` },
      { find: '@weave-mui/menu-item',           replacement: `${TOOLKIT}/menu-item/lib/menuItem.tsx` },
      { find: '@weave-mui/form-control',        replacement: `${TOOLKIT}/form-control/lib/formControl.tsx` },
      { find: '@weave-mui/input-adornment',     replacement: `${TOOLKIT}/input-adornment/lib/inputAdornment.tsx` },
      { find: '@weave-mui/divider',             replacement: `${TOOLKIT}/divider/lib/divider.tsx` },
      { find: '@weave-mui/icon-button',         replacement: `${TOOLKIT}/icon-button/lib/iconButton.tsx` },
      { find: '@weave-mui/cssbaseline',         replacement: `${TOOLKIT}/cssbaseline/lib/cssbaseline.tsx` },
      { find: '@weave-mui/text-field',          replacement: `${TOOLKIT}/text-field/lib/textField.tsx` },
      // === Transitive dependencies ===
      { find: '@weave-mui/circular-progress',   replacement: `${TOOLKIT}/circular-progress/lib/circularProgress.tsx` },
      { find: '@weave-mui/checkbox',            replacement: `${TOOLKIT}/checkbox/lib/checkbox.tsx` },
      { find: '@weave-mui/styled',              replacement: `${TOOLKIT}/styled/lib/styled.tsx` },
      { find: '@weave-mui/enums',               replacement: `${TOOLKIT}/enums/lib/enums.tsx` },
      { find: '@weave-mui/internals',           replacement: `${TOOLKIT}/internals/lib/internals.tsx` },
      { find: '@weave-mui/responsive-hooks',    replacement: `${TOOLKIT}/responsive-hooks/lib/responsiveHooks.tsx` },
      { find: '@weave-mui/popper',              replacement: `${TOOLKIT}/popper/lib/popper.tsx` },
      { find: '@weave-mui/click-away-listener', replacement: `${TOOLKIT}/click-away-listener/lib/clickAwayListener.tsx` },
      { find: '@weave-mui/icons-weave',         replacement: `${TOOLKIT}/icons-weave/lib/icons/index.tsx` },
      { find: '@weave-mui/tooltip',             replacement: `${TOOLKIT}/tooltip/lib/tooltip.tsx` },
      // === Styles + design tokens (real Weave theme) ===
      { find: '@weave-mui/illustration',        replacement: `${TOOLKIT}/illustration/lib/illustration.tsx` },
      { find: '@weave-mui/styles',              replacement: `${TOOLKIT}/styles/lib/styles.tsx` },
      { find: '@weave/design-tokens',           replacement: '/Users/dongs1/node_modules/@weave/design-tokens/dist/es/index.js' },
    ],
  },
})
