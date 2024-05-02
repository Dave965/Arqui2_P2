import {useState, useEffect} from 'react';
import Chart from "react-apexcharts";
import DatePicker from "react-datepicker";
import './Modal.css';
import "react-datepicker/dist/react-datepicker.css";

function Modal({abierto, setAbierto, habitacionModal, dataHabitacion}){
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  
	const options =  {
    chart: {
      id: "basic-bar"
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: 1
    },
    title: {
      text: 'Mapa de Calor'
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    xaxis: {
      labels: {
        show: false,
      },
    },
    tooltip: {
      enabled: false
    },
    plotOptions: {
      heatmap: {
        radius: 0,
        enableShades: false,
        distributed: false,
        useFillColorAsStroke: true,
        colorScale: {
          ranges: [{
              from: 0,
              to: 0.2,
              color: '#354fff',
              name: '0-20%',
            },
            {
              from: 0.2,
              to: 0.4,
              color: '#00eff6',
              name: '20-40%',
            },
            {
              from: 0.4,
              to: 0.6,
              color: '#00fe3a',
              name: '40-60%',
            },
            {
              from: 0.6,
              to: 0.8,
              color: '#fff800',
              name: '60-80%',
            },
            {
              from: 0.8,
              to: 1,
              color: '#ff1731',
              name: '80-100%',
            }
          ]
        }
      }
    }
  };

  return (
  	<>
  		<div className={"modalOverlay "+(abierto ? "" : 'hidden')} onClick={()=>{setAbierto(false)}}>
      </div>
      <div className={"modal "+(abierto ? "" : 'hidden')}>
        {
          dataHabitacion ? (
            <>
              <h3 className='cerrar' onClick={()=>{setAbierto(false)}}>&times;</h3>
              <h1 className="appTitle letraBlanca">Informacion de Habitacion {habitacionModal+1}</h1>
              <h2 className="subtitleLeft letraBlanca"> {dataHabitacion.cantidad_personas} persona(s) en la habitacion </h2>
              <h2 className="subtitleMid letraBlanca"> Tiempo real </h2>
              <Chart
              className='chart'
              options={options}
              series={dataHabitacion.series}
              type="heatmap"
              width="500"
              height="500"
              />

              <h2 className="subtitleMid letraBlanca"> Historico </h2>
              <div>
              <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="Fecha Inicio"
                className="cuadritoFecha"
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="MMMM d, yyyy HH:mm"
              />
              <DatePicker
                selected={endDate}
                onChange={date => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                placeholderText="Fecha Fin  "
                className="cuadritoFecha"
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="MMMM d, yyyy HH:mm"
              />
              </div>

              {
                dataHabitacion &&
                <Chart
              className='chart'
              options={options}
              series={dataHabitacion.series}
              type="heatmap"
              width="500"
              height="500"
              />
              }
              
            </>

            ) :(
            <>
              <h3 className='cerrar' onClick={()=>{setAbierto(false)}}>&times;</h3>
              <h1 className="appTitle letraBlanca">Cargando...</h1>
            </>
              
            )
        }
      </div>
  	</>
  )
}

export default Modal;