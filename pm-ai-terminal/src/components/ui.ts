import { Box, Text, t, bold, fg, bg } from '@opentui/core';

export interface MetricCardProps {
  title: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  icon?: string;
  color?: string;
  width?: number | string;
}

export function MetricCard(props: MetricCardProps) {
  const { title, value, trend, trendUp, icon, color = '#00AAFF', width = '100%' } = props;
  
  const trendText = trend 
    ? ` ${trendUp ? '▲' : '▼'} ${trend}` 
    : '';
  const iconText = icon ? `${icon} ` : '';

  return Box(
    {
      width,
      height: 6,
      borderStyle: 'rounded',
      borderColor: color,
      backgroundColor: '#1A1A2E',
      padding: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    Box(
      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
      Text({
        content: `${iconText}${title}`,
        fg: '#888888',
      }),
      Text({
        content: '●',
        fg: color,
      })
    ),
    Text({
      content: `${value}${trendText}`,
      fg: '#FFFFFF',
      attributes: 1,
    }),
    Box(
      { height: 1, backgroundColor: color, width: '30%' }
    )
  );
}

export interface StatusBadgeProps {
  text: string;
  color: string;
  bgColor?: string;
}

export function StatusBadge(props: StatusBadgeProps) {
  const { text, color, bgColor } = props;
  return Box(
    {
      paddingLeft: 1,
      paddingRight: 1,
      backgroundColor: bgColor || color + '33',
      borderStyle: 'rounded',
      borderColor: color,
    },
    Text({
      content: text,
      fg: color,
      attributes: 1,
    })
  );
}

export interface ProgressBarProps {
  progress: number;
  width?: number;
  color?: string;
  bgColor?: string;
  showPercent?: boolean;
}

export function ProgressBar(props: ProgressBarProps) {
  const { progress, width = 20, color = '#00AAFF', bgColor = '#333333', showPercent = true } = props;
  const filled = Math.round((progress / 100) * width);
  const empty = width - filled;
  
  return Box(
    { flexDirection: 'row', alignItems: 'center', gap: 1 },
    Box(
      { width, height: 1, backgroundColor: bgColor },
      Box({
        width: filled,
        height: 1,
        backgroundColor: color,
      })
    ),
    showPercent && Text({
      content: `${progress}%`,
      fg: '#AAAAAA',
      width: 5,
    })
  );
}

export interface TableProps<T> {
  columns: Array<{ key: string; header: string; width: number; render?: (item: T) => string }>;
  data: T[];
  selectedIndex?: number;
  onSelect?: (index: number, item: T) => void;
  height?: number;
}

export function Table<T>(props: TableProps<T>) {
  const { columns, data, selectedIndex = -1, onSelect, height } = props;
  
  const headerRow = Box(
    { flexDirection: 'row', backgroundColor: '#2A2A3E', paddingLeft: 1, paddingRight: 1 },
    ...columns.map(col => 
      Text({
        content: col.header.padEnd(col.width),
        fg: '#00FFFF',
        attributes: 1,
        width: col.width,
      })
    )
  );

  const rows = data.map((item, index) => {
    const isSelected = index === selectedIndex;
    return Box(
      {
        flexDirection: 'row',
        backgroundColor: isSelected ? '#3A3A5E' : (index % 2 === 0 ? '#1E1E2E' : '#1A1A2E'),
        paddingLeft: 1,
        paddingRight: 1,
        onMouseDown: () => onSelect?.(index, item),
      },
      ...columns.map(col => 
        Text({
          content: col.render ? col.render(item) : String(item[col.key as keyof T] || '').padEnd(col.width),
          fg: isSelected ? '#00FFFF' : '#FFFFFF',
          width: col.width,
        })
      )
    );
  });

  return Box(
    {
      borderStyle: 'single',
      borderColor: '#444444',
      flexDirection: 'column',
      height,
      overflow: 'hidden',
    },
    headerRow,
    ...rows
  );
}

export interface PanelProps {
  title: string;
  children: any;
  width?: number | string;
  height?: number | string;
  borderColor?: string;
  titleColor?: string;
}

export function Panel(props: PanelProps) {
  const { title, children, width = '100%', height, borderColor = '#444444', titleColor = '#00FFFF' } = props;
  
  return Box(
    {
      width,
      height,
      borderStyle: 'rounded',
      borderColor,
      title,
      titleColor,
      titleAlignment: 'left',
      padding: 1,
      flexDirection: 'column',
    },
    children
  );
}

export function Divider(color: string = '#444444') {
  return Box({ height: 1, backgroundColor: color });
}

export function Spacer(height: number = 1) {
  return Box({ height });
}