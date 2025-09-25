import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Users, ClipboardCheck, Frown, Info, TrendingUp, TrendingDown, ChevronDown } from 'lucide-react';

const DashboardContent = () => {
  const kpiData = [
    {
      value: '61',
      title: 'Total Ingresantes',
      icon: <Users className="h-8 w-8 text-gray-500" />,
      change: '+8%',
      changeText: 'Más que el semestre anterior',
      trend: 'up'
    },
    {
      value: '26%',
      title: 'Fiscalizados',
      icon: <ClipboardCheck className="h-8 w-8 text-gray-500" />,
      change: '+1%',
      changeText: 'Más que el semestre anterior',
      trend: 'up'
    },
    {
      value: '2%',
      title: 'Observados',
      icon: <Frown className="h-8 w-8 text-gray-500" />,
      change: '-1%',
      changeText: 'Menos que el semestre anterior',
      trend: 'down'
    },
    {
      value: '37',
      title: 'Ingresantes en espera de fiscalización',
      icon: <Info className="h-8 w-8 text-gray-500" />,
      change: '-4%',
      changeText: 'Menos que el semestre anterior',
      trend: 'down'
    }
  ];

  const lineChartOption = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Funcionarios', 'Servidores Civile'],
      bottom: 0,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Funcionarios',
        type: 'line',
        smooth: true,
        data: [30, 45, 62, 55, 70, 90],
        lineStyle: { color: '#3b82f6' }
      },
      {
        name: 'Servidores Civile',
        type: 'line',
        smooth: true,
        data: [20, 32, 40, 65, 60, 75],
        lineStyle: { color: '#a1a1aa' }
      }
    ]
  };

  const barChartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['Direcc. Licenc.', 'Direcc. Superv.', 'Ofic. Admin.', 'Ofic. Ases. Jurid.', 'Proc. Público', 'Secret. Gral.'],
      axisLabel: {
        interval: 0,
        rotate: 0,
        fontSize: 10,
      }
    },
    yAxis: {
      type: 'value',
      name: 'Total Fiscalizados',
      nameLocation: 'middle',
      nameGap: 35
    },
    series: [
      {
        name: 'Funcionarios',
        type: 'bar',
        data: [85, 40, 65, 45, 60, 42],
        itemStyle: { color: '#3b82f6' }
      }
    ]
  };

  const pieChartOption = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'right',
      top: 'center',
      data: ['Funcionarios', 'Directivos Públicos', 'Personal de Confianza', 'Servidor']
    },
    series: [
      {
        name: 'Tipo de Servidor',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '20',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 45, name: 'Funcionarios' },
          { value: 25, name: 'Directivos Públicos' },
          { value: 15, name: 'Personal de Confianza' },
          { value: 15, name: 'Servidor' }
        ]
      }
    ]
  };

  return (
    <main className="flex-1 p-6 bg-gray-50">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-black">Dashboard</h1>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold text-black mb-2">Indicadores por semestre</h2>
        <div className="relative inline-block w-64">
          <select className="appearance-none w-full bg-white border border-gray-300 text-black py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500">
            <option>2025 ENERO - JUNIO</option>
            <option>2024 JULIO - DICIEMBRE</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
        {kpiData.map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-3xl font-bold text-black">{item.value}</p>
                <p className="text-sm text-gray-600">{item.title}</p>
              </div>
              {item.icon}
            </div>
            <div className="mt-4 flex items-center space-x-1 text-xs">
              {item.trend === 'up' ? 
                <TrendingUp className="h-4 w-4 text-green-500" /> : 
                <TrendingDown className="h-4 w-4 text-red-500" />
              }
              <span className={item.trend === 'up' ? 'text-green-600' : 'text-red-600'}>{item.change}</span>
              <span className="text-gray-500">{item.changeText}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-black mb-4">Fiscalizados</h3>
          <ReactECharts option={lineChartOption} style={{ height: '300px' }} />
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-black">Fiscalizados por Órgano</h3>
            <div className="relative inline-block w-40">
              <select className="appearance-none w-full bg-white border border-gray-300 text-black py-1 px-3 pr-8 rounded text-sm leading-tight focus:outline-none focus:bg-white focus:border-blue-500">
                <option>Funcionarios</option>
                <option>Servidores Civile</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>
          <ReactECharts option={barChartOption} style={{ height: '300px' }} />
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm lg:col-span-2">
          <h3 className="text-lg font-semibold text-black mb-4">% Fiscalizaciones por tipo de Servidor</h3>
          <ReactECharts option={pieChartOption} style={{ height: '300px' }} />
        </div>
      </div>
    </main>
  );
};

export default DashboardContent;
