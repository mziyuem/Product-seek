
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { ProductMetrics } from '../types';

interface RadarChartProps {
  metrics: ProductMetrics;
  size?: number;
  mini?: boolean;
}

const RadarChart: React.FC<RadarChartProps> = ({ metrics, size = 300, mini = false }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    
    const chart = echarts.init(chartRef.current);
    
    const option = {
      backgroundColor: 'transparent',
      radar: {
        indicator: [
          { name: 'Demand', max: 100 },
          { name: 'Diff.', max: 100 },
          { name: 'Feas.', max: 100 },
          { name: 'Monet.', max: 100 },
          { name: 'Stick.', max: 100 },
          { name: 'Comp.', max: 100 },
        ],
        shape: 'circle',
        splitNumber: 5,
        axisName: {
          show: !mini,
          color: '#94a3b8',
          fontSize: 11,
          fontWeight: 300
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.05)',
            width: 1
          }
        },
        splitArea: {
          areaStyle: {
            color: ['rgba(255, 255, 255, 0.02)', 'transparent']
          }
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.1)'
          }
        }
      },
      series: [
        {
          type: 'radar',
          data: [
            {
              value: [
                metrics.demand,
                metrics.differentiation,
                metrics.feasibility,
                metrics.monetization,
                metrics.stickiness,
                metrics.competition,
              ],
              name: 'DNA Profile',
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: 'rgba(99, 102, 241, 0.6)' },
                  { offset: 1, color: 'rgba(168, 85, 247, 0.2)' }
                ])
              },
              lineStyle: {
                color: '#818cf8',
                width: 2,
                shadowBlur: 10,
                shadowColor: 'rgba(99, 102, 241, 0.5)'
              },
              itemStyle: {
                color: '#818cf8',
                borderWidth: 0
              },
              symbol: 'none'
            }
          ]
        }
      ]
    };

    chart.setOption(option);

    const handleResize = () => chart.resize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, [metrics, mini]);

  return <div ref={chartRef} style={{ width: size, height: size }} className="animate-in fade-in zoom-in duration-700" />;
};

export default RadarChart;
