import { useEffect, useState} from 'react';
import ReactECharts from 'echarts-for-react';
import { Users, FileText, FileWarning, Calendar, Clock } from 'lucide-react';
import {searchforDashboard} from '../api/dashboardApi';
import {DashboardObjects} from '../Interfaces/DashboardObjects';
const DashboardContent = () => {
  const fechaActual = new Date();
  const año = fechaActual.getFullYear();
  const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
  const dia = String(fechaActual.getDate()).padStart(2, '0');
  const fechaFormateada = `${año}-${mes}-${dia}`;

  const [fechaInicio, setFechaInicio] = useState(fechaFormateada);
  const [fechaFin, setFechaFin] = useState(fechaFormateada);
  const [data,setData] = useState<DashboardObjects | null>();
  useEffect(() => {
    const fetchDocumento = async () => {
      try {
        const request = {
          parametro1: fechaInicio,
          parametro2: fechaFin,
          opcion: ''
        }
        const result = await searchforDashboard(request);
        setData(result.value);
      } catch (error) {
          console.error("Error cargando Documento:", error);
      }
    }
    fetchDocumento();
  }, [fechaInicio,fechaFin]);

  const kpiData = [
    {
      value: data?.empleadoCount,
      title: 'Ingresantes',
      icon: <Users className="h-8 w-8 text-gray-400" />,
      subtitle: 'Ingresantes en el rango seleccionado',
    },
    {
      value: data?.legajoCount,
      title: 'Legajos Fiscalizados',
      icon: <FileText className="h-8 w-8 text-gray-400" />,
      subtitle: 'Legajos con oficina validada',
    },
    {
      value: data?.observadoCount,
      title: 'Documentos Observados',
      icon: <FileWarning className="h-8 w-8 text-gray-400" />,
      subtitle: '12 legajos',
    }
  ];
  const month = [ 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic' ];
  const promediomes = data?.promediopormes.length ? data?.promediopormes.map(t => t.promedio).reduce((a, b) => a + b, 0) / data?.promediopormes.length : 0;
  const max = Math.max(
    ...(data?.promediopormes
      ?.map(t => t.promedio)
      .filter(v => v !== undefined && v !== null) || [])
  );
  const eficienciaChartOption = {
    grid: { left: '3%', right: '4%', bottom: '10%', top: '15%', containLabel: true },
    tooltip: {
      show: true, // Muestra siempre el tooltip
      trigger: "item", // o 'axis' si quieres que se muestre al pasar por el eje
      alwaysShowContent: false, // true si quieres que quede visible
      backgroundColor: "#fff",
      borderColor: "#ccc",
      borderWidth: 1,
      textStyle: { color: "#000" },
    },
    xAxis: {
      type: 'category',
      data: data?.promediopormes.map(t => month[t.mes - 1]),
      axisLine: { lineStyle: { color: '#888' } },
      axisLabel: { color: '#fff' }
    },
    yAxis: {
      type: 'value',
      max: (value:any) => value.max + 5,
      axisLine: { show: false },
      splitLine: { show: false },
      axisLabel: { color: '#fff'}
    },
    series: [{
      data: data?.promediopormes.map(t => t.promedio.toFixed(1)),
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 8,
      itemStyle: { color: '#2dd4bf' },
      lineStyle: { color: '#2dd4bf', width: 3 }
    }]
  };

  const motivoObservadoArray = [...new Set(data?.tasaobservacion.map(t=> { return t.estado == 'OBSERVADO' ? t.motivoobservacion : null }).filter(t => t != null))];
  const total = data?.tasaobservacion.length || 0;
  const estadoArray = motivoObservadoArray?.map(t=> {
    const count = data?.tasaobservacion.filter(to => to.motivoobservacion === t.toString()).length || 0;
    const porcentMotivo = (count / total) * 100;
    return { motivoestado : t, count: porcentMotivo.toFixed(1) }
    });
  const totalData = data?.tasaobservacion?.length || 0;
  const totalObservado = data?.tasaobservacion?.filter(t=> t.estado == 'OBSERVADO').length || 0;
  const porcentaje = (totalObservado / totalData) * 100;
  const totalNotificado = 100 - porcentaje;
  const controlBarChartOption = {
    grid: { left: '25%', right: '15%', bottom: '10%', top: '20%' },
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    xAxis: {
      type: 'value',
      axisLabel: { color: '#fff', formatter: '{value}%' },
      splitLine: { lineStyle: { color: '#374151' } }
    },
    yAxis: {
      type: 'category',
      data: estadoArray?.map(t => t.motivoestado) ,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#fff', fontSize: 10,margin: 6,    
        formatter: function (value:string) {
          const text = value.toString().replace('ERROR EN EL','').replace('ERROR EN','').replace('ERROR DE','');
        if (text.length > 6) {
          return text.split(' ')[1].toLowerCase() + ' ' +text.split(' ')[2].toLowerCase() + '\n' + text.split(' ')[3].toLowerCase();
        }
        return text;
      }}
    },
    series: [{
      name: 'Tasa',
      type: 'bar',
      data: estadoArray?.map(t => t.count) ,
      itemStyle: { color: '#2dd4bf' },
      barWidth: '50%',
      label: {
        show: true,
        position: 'right',
        color: '#fff',
        formatter: '{c}%'
      }
    }]
  };

  const controlPieChartOption = {
    tooltip: { trigger: 'item' },
    title: {
      text: `${porcentaje.toFixed(1)}%`,
      left: 'center',
      top: 'center',
      textStyle: { color: '#fff', fontSize: 30, fontWeight: 'bold' }
    },
    series: [
      {
        name: 'Observados',
        type: 'pie',
        radius: ['70%', '85%'],
        avoidLabelOverlap: false,
        label: { show: false },
        labelLine: { show: false },
        data: [
          { value: porcentaje.toFixed(1), name: 'Observados', itemStyle: { color: '#facc15' } },
          { value: totalNotificado.toFixed(1), name: 'Notificados', itemStyle: { color: '#374151' } }
        ]
      }
    ],
    graphic: {
      type: 'text',
      left: 'center',
      top: '65%',
      style: {
        text: `${totalNotificado.toFixed(1)}% NOTIFICADOS`,
        textAlign: 'center',
        fill: '#9ca3af',
        fontSize: 12
      }
    }
  };
  //(count / total) * 100;
  const totalCompleta = data?.trazaCompleta?.total || 0;
  const totalCumplido = data?.trazaCompleta?.cumplido || 0;
  const valor = totalCumplido / totalCompleta * 100;

  const totalCumplimientoTotal = data?.tasaCumplimiento?.total || 0;
  const totalCumplimiento = data?.tasaCumplimiento?.cumplido || 0;
  const valorCumplimiento = totalCumplimiento / totalCumplimientoTotal * 100;
  const cumplimientoGaugeOption = {
    tooltip: {
      show: true, // Muestra siempre el tooltip
      trigger: "item", // o 'axis' si quieres que se muestre al pasar por el eje
      alwaysShowContent: false, // true si quieres que quede visible
      backgroundColor: "#fff",
      borderColor: "#ccc",
      borderWidth: 1,
      textStyle: { color: "#000" },
    },
    series: [{
      type: 'gauge',
      center: ['50%', '60%'],
      startAngle: 180,
      endAngle: 0,
      min: 0,
      max: 100,
      itemStyle: {
        color: '#2dd4bf'
      },
      progress: {
        show: true,
        width: 30
      },
      pointer: { show: false },
      axisLine: {
        lineStyle: {
          width: 30,
          color: [[1, '#374151']]
        }
      },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: { show: false },
      detail: {
        valueAnimation: true,
        fontSize: 35,
        fontWeight: 'bold',
        offsetCenter: [0, '-10%'],
        formatter: '{value}%',
        color: '#fff'
      },
      data: [{
        value: valorCumplimiento.toFixed(1),
        name: '% de cumplimiento de plazos'
      }]
    }]
  };

  return (
    <main className="flex-1 p-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-black mb-6">Dashboard</h1>
      
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-6">
        <h2 className="text-2xl font-bold text-black mb-4">Indicadores por semestre</h2>
        <div className="flex flex-wrap items-center gap-4 md:gap-8">
          <div className="flex items-center space-x-2">
            <label htmlFor="desde" className="text-black font-medium">Desde</label>
            <div className="relative">
              <input 
                type="date" 
                id="desde" 
                defaultValue={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                className="bg-white border border-gray-300 text-black py-2 px-3 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="hasta" className="text-black font-medium">Hasta</label>
            <div className="relative">
              <input 
                type="date" 
                id="hasta" 
                defaultValue={fechaFin} 
                onChange={(e) => setFechaFin(e.target.value)}
                className="bg-white border border-gray-300 text-black py-2 px-3 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {kpiData.map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-5xl font-bold text-black">{item.value}</p>
                <p className="text-lg text-gray-600">{item.title}</p>
              </div>
              {item.icon}
            </div>
            <div className="mt-4">
              <p className="text-xs text-gray-500">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 p-6 rounded-lg shadow-sm text-white">
          <div className="flex items-center space-x-2 mb-4">
            <Clock className="h-5 w-5 text-gray-400"/>
            <h3 className="text-lg font-semibold">Tiempo medio de fiscalización de legajos</h3>
          </div>
          <div className="flex items-center justify-between">
            <div className="w-3/5">
              <h4 className="text-md font-semibold text-gray-300 mb-2">Eficiencia</h4>
              <ReactECharts option={eficienciaChartOption} style={{ height: '160px' }} notMerge={true} lazyUpdate={true} />
            </div>
            <div className="text-right">
              <p className="text-5xl font-bold">{promediomes.toFixed(1)}</p>
              <p className="text-xl text-gray-400">DÍAS</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg shadow-sm text-white">
          <h3 className="text-lg font-semibold mb-4">% Tasa de documentos observados</h3>
          <div className="flex items-center justify-between h-[200px]">
            <div className="w-1/2">
              <h4 className="text-md font-semibold text-gray-300 mb-2">Control</h4>
              <ReactECharts option={controlBarChartOption} style={{ height: '160px' }} notMerge={true} lazyUpdate={true} />
            </div>
            <div className="w-1/2">
              <ReactECharts option={controlPieChartOption} style={{ height: '200px' }} notMerge={true}  lazyUpdate={true}/>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg shadow-sm text-white">
          <h3 className="text-lg font-semibold mb-4">% Legajos con trazabilidad completa</h3>
          <div>
            <h4 className="text-md font-semibold text-gray-300 mb-2">Trazabilidad</h4>
            <p className="text-sm text-gray-400 mb-6">% de legajos con trazabilidad completa</p>
            <div className="w-full bg-slate-700 rounded-full h-2.5">
              <div className="bg-teal-400 h-2.5 rounded-full" title={`Progeso: ${valor}%`}  style={{ width: valor.toFixed(1) + '%' }}></div>
            </div>
            <p className="text-7xl font-bold text-center mt-6">{valor.toFixed(1)}%</p>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg shadow-sm text-white">
          <h3 className="text-lg font-semibold mb-4">% Tasa de cumplimiento de plazos</h3>
          <ReactECharts option={cumplimientoGaugeOption} style={{ height: '250px' }} notMerge={true} lazyUpdate={true} />
        </div>
      </div>
    </main>
  );
};

export default DashboardContent;
