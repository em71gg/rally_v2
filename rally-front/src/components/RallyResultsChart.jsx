import './RallyResultsChart.css';
import { useContext, useEffect } from 'react';
import { Bar } from 'react-chartjs-2'; 
import { VoteContext } from '../context/vote.context';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Title,
} from "chart.js";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Title);
function RallyResultsChart(props) {
    const { id, nombre } = props;
    const {results, loading } = useContext(VoteContext);
    useEffect(() =>{
      console.log('Nuevos reultados');
    }, [results])
    if (loading) return <p>Cargando resultados del rally...</p>;
  if (!results.length) return <p>No hay resultados disponibles.</p>;

  const labels = results.map((r) => r.foto.nombre);
const values = results.map((r) => r.puntuacion);

  const data = {
    labels,
    datasets: [
      {
        label: "Puntuación",
        data: values,
        backgroundColor: "#4CAF50",
      },
    ],
  };

   const options = {
    indexAxis: "y", // Barras horizontales
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `Resultados de ${nombre}`,
        font: { size: 20 },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: Math.max(...values) + 5,
      },
    },
  };
  return (
    <div className="chart-container">
       <Bar data={data} options={options} />
    </div>
   
  )
}

export default RallyResultsChart