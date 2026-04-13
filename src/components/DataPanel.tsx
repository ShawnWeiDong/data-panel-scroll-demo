import { useState, useRef, useEffect } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import { mockGroups, filterOptions } from '../data/mockData'
import TileContent from './TileContent'
import HorizontalTile from './HorizontalTile'
import type { AccordionItem, ScrollStrategy } from '../types'

const ExpandMoreSvg = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
  </svg>
)
const SearchSvg = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
)
const FilterSvg = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
  </svg>
)
const ChevronRightSvg = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
  </svg>
)
const ArrowBackSvg = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
  </svg>
)

const BOTTOM_RESERVE = 80

interface DataPanelProps {
  strategy: ScrollStrategy
  title?: string
}

const STRATEGY_LABELS: Record<ScrollStrategy, string> = {
  'panel-scroll': '① Panel Scroll',
  pagination: '② Pagination',
  'nested-scroll': '③ Nested Scroll',
  'drill-down': '④ Drill Down',
}

const STRATEGY_DESCRIPTIONS: Record<ScrollStrategy, string> = {
  'panel-scroll': 'Single scrollbar for everything',
  pagination: 'Tile area fills panel · ← → pages · scroll below to reach other items',
  'nested-scroll': 'Inner area scrolls when hovered · scroll below to reach other items',
  'drill-down': 'Click → to go into a section · ← to return',
}

export default function DataPanel({
  strategy,
  title = 'Connected data for "Air Fryer Main Assembly"',
}: DataPanelProps) {
  const [filter, setFilter] = useState(filterOptions[0])
  const [expandedId, setExpandedId] = useState<string | false>(false)
  const [drillItem, setDrillItem] = useState<AccordionItem | null>(null)

  const listRef = useRef<HTMLDivElement>(null)
  const [listHeight, setListHeight] = useState(0)

  useEffect(() => {
    const el = listRef.current
    if (!el) return
    const ro = new ResizeObserver(() => setListHeight(el.clientHeight))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const tileAreaHeight = Math.max(60, listHeight - BOTTOM_RESERVE - 36)
  const handleChange = (id: string) => (_: React.SyntheticEvent, expanded: boolean) => {
    setExpandedId(expanded ? id : false)
  }
  const usesFillHeight = strategy === 'pagination' || strategy === 'nested-scroll'
  const isDrillDown = strategy === 'drill-down'

  return (
    <Paper
      elevation={2}
      sx={{
        flex: 1,
        minWidth: 260,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      {/* Strategy banner */}
      <Box sx={{ px: 2, py: 0.75, bgcolor: 'primary.main', color: 'primary.contrastText', flexShrink: 0 }}>
        <Typography variant="caption" sx={{ fontWeight: 700, fontSize: '0.7rem', display: 'block' }}>
          {STRATEGY_LABELS[strategy]}
        </Typography>
        <Typography variant="caption" sx={{ fontSize: '0.63rem', opacity: 0.85 }}>
          {STRATEGY_DESCRIPTIONS[strategy]}
        </Typography>
      </Box>

      {/* ── Drill-down detail view ── */}
      {isDrillDown && drillItem ? (
        <>
          {/* Back header */}
          <Box
            sx={{
              px: 1, py: 0.75, flexShrink: 0,
              display: 'flex', alignItems: 'center', gap: 0.5,
              borderBottom: '1px solid', borderColor: 'divider',
            }}
          >
            <IconButton size="small" onClick={() => setDrillItem(null)} sx={{ p: 0.5 }}>
              <ArrowBackSvg />
            </IconButton>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.85rem' }}>
              {drillItem.label}
            </Typography>
            {drillItem.count !== undefined && (
              <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                ({drillItem.count})
              </Typography>
            )}
          </Box>

          {/* Full tile list */}
          <Box
            sx={{
              flex: 1, minHeight: 0, overflowY: 'auto',
              '&::-webkit-scrollbar': { width: 6 },
              '&::-webkit-scrollbar-thumb': { bgcolor: 'divider', borderRadius: 3 },
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, p: 1.5 }}>
              {drillItem.tiles.map((tile) => (
                <HorizontalTile key={tile.id} item={tile} />
              ))}
            </Box>
          </Box>
        </>
      ) : (
        <>
          {/* ── Normal header + filters ── */}
          <Box sx={{ px: 2, pt: 1.5, pb: 1, flexShrink: 0 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, lineHeight: 1.3, fontSize: '0.82rem' }}>
              {title}
            </Typography>
          </Box>

          <Box sx={{ px: 2, pb: 1, flexShrink: 0 }}>
            <FormControl fullWidth size="small">
              <Select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                startAdornment={<InputAdornment position="start"><FilterSvg /></InputAdornment>}
                sx={{ fontSize: '0.8rem', '& .MuiSelect-select': { py: '6px' } }}
              >
                {filterOptions.map((opt) => (
                  <MenuItem key={opt} value={opt} sx={{ fontSize: '0.8rem' }}>{opt}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ px: 2, pb: 1, flexShrink: 0 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search connected data..."
              InputProps={{ startAdornment: <InputAdornment position="start"><SearchSvg /></InputAdornment> }}
              sx={{ fontSize: '0.8rem', '& .MuiInputBase-input': { py: '6px' } }}
            />
          </Box>

          <Divider sx={{ flexShrink: 0 }} />

          {/* ── Accordion list ── */}
          <Box
            ref={listRef}
            sx={{
              flex: 1, minHeight: 0, overflowY: 'auto',
              '&::-webkit-scrollbar': { width: 6 },
              '&::-webkit-scrollbar-thumb': { bgcolor: 'divider', borderRadius: 3 },
            }}
          >
            {mockGroups.map((group) => (
              <Box key={group.id}>
                <Typography
                  variant="caption"
                  sx={{
                    display: 'block', px: 2, pt: 1.5, pb: 0.5,
                    color: 'text.secondary', fontWeight: 700,
                    fontSize: '0.63rem', letterSpacing: '0.08em',
                  }}
                >
                  {group.groupLabel}
                </Typography>

                {group.items.map((item) => (
                  <Accordion
                    key={item.id}
                    expanded={isDrillDown ? false : expandedId === item.id}
                    onChange={isDrillDown ? undefined : handleChange(item.id)}
                    disableGutters
                    elevation={0}
                    sx={{ '&:before': { display: 'none' }, bgcolor: 'transparent' }}
                  >
                    <AccordionSummary
                      expandIcon={isDrillDown ? <ChevronRightSvg /> : <ExpandMoreSvg />}
                      onClick={isDrillDown ? () => setDrillItem(item) : undefined}
                      sx={{
                        px: 2, minHeight: 36,
                        '& .MuiAccordionSummary-content': { my: 0, alignItems: 'center', gap: 1 },
                        '&:hover': { bgcolor: 'action.hover' },
                        ...(isDrillDown && { cursor: 'pointer' }),
                      }}
                    >
                      <Typography variant="body2" sx={{ fontSize: '0.82rem', fontWeight: 500 }}>
                        {item.label}
                      </Typography>
                      {item.count !== undefined && (
                        <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                          ({item.count})
                        </Typography>
                      )}
                    </AccordionSummary>

                    {!isDrillDown && (
                      <AccordionDetails sx={{ p: 0 }}>
                        <TileContent
                          tiles={item.tiles}
                          strategy={strategy}
                          fillHeight={usesFillHeight ? tileAreaHeight : undefined}
                        />
                      </AccordionDetails>
                    )}
                  </Accordion>
                ))}
              </Box>
            ))}

            {usesFillHeight && expandedId && (
              <Box
                sx={{
                  height: BOTTOM_RESERVE, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.6rem', userSelect: 'none' }}>
                  ↕ scroll here to navigate panel
                </Typography>
              </Box>
            )}
          </Box>
        </>
      )}
    </Paper>
  )
}
