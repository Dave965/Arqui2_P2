import {useState, useEffect} from 'react';
import compassImage from './img/BRUJULA.png';
import Swal from 'sweetalert2';
import Chart from "react-apexcharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './App.css';

function App() {
  const endpoint = 'http://34.224.66.21:8080';
  const [habitacionActual, setHabitacionActual] = useState(10);
  const [datosGenerales, setDatosGenerales] = useState([0,0,0,0,0]);
  const [porcentajes, setPorcentajes] = useState(['p20','p20','p20','p20','p20']);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [habitacionModal, setHabitacionModal] = useState(10);
  const [dataHabitacion, setDataHabitacion] = useState(null);
  const [dataHistorico, setDataHistorico] = useState(null)
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const habitaciones = [0,1,2,3,4];
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



  useEffect(()=>{
    let nPorcentajes = [];
    for(let d of datosGenerales){
      let valor = '';
      if(d/5 <= 0.2){
        nPorcentajes.push('p20');
      }else if(d/5 <= 0.4){
        nPorcentajes.push('p40');
      }else if(d/5 <= 0.6){
        nPorcentajes.push('p60');
      }else if(d/5 <= 0.8){
        nPorcentajes.push('p80');
      }else{
        nPorcentajes.push('p100');
      }
    }
    setPorcentajes(nPorcentajes);
  },[datosGenerales]);

  useEffect(()=>{
    console.log(startDate)
  },[startDate]);

  useEffect(()=>{
    const interval = setInterval(()=> get_datos(), 1000);
    return () => clearInterval(interval);
  },[]);

  const expandirDatos = (num)=>{
    setHabitacionModal(num);
    setModalAbierto(true);
  }

  const get_datos =() => {
    fetch(endpoint+'/ultimos-registros')
      .then((res) => res.json())
      .then((d) => {
        setDatosGenerales(d);
      }).catch(error => {console.log(error);});
  };

  const showAlert = (nuevaHabitacion) => {
    let anterior = habitacionActual;
    setHabitacionActual(nuevaHabitacion);
    fetch(endpoint+'/cambiar-habitacion/'+nuevaHabitacion).catch(error => {console.log(error);});

    Swal.fire({
      title: 'Mueve la cámara a la habitación y presiona aceptar',
      showDenyButton: true,
      confirmButtonText: 'Aceptar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Cámara movida!', '', 'success');
        fetch(endpoint+'/confirmar-cambio').catch(error => {console.log(error);});
      } else if (result.isDenied) {
        Swal.fire('Cambio cancelado', '', 'info');
        setHabitacionActual(anterior);
        fetch(endpoint+'/cambiar-habitacion/'+anterior).catch(error => {console.log(error);});
        fetch(endpoint+'/confirmar-cambio').catch(error => {console.log(error);});
      }
    });
  };

  return (
    <div className="App">
      <h1 className="appTitle">Casa Inteligente Usac™</h1>
      <div className="appContent">
        <div className='wrapperIzq'>
          <div className="sidebar">
            <h3 className="sidebar-title">Vigilar habitaciones</h3>
            {habitaciones.map((digit, index)=>(
              <button className={habitacionActual == digit ? 'habitacionActual': ''} onClick={() => showAlert(digit)}>Habitación {digit+1}</button>
            ))}
          </div>
        </div>
        <div className='wrapperDer'>
          <div className="mapWrapper">
            <img src={compassImage} alt="Compass" className="compassImg"/>
            <div className='casa'>
              <div className='filaHabitaciones'>
                <button className={'habitacionCuadrada '+porcentajes[0]} onClick={()=>{expandirDatos(0)}}>
                  <h2 className='tituloHabitacion'>Habitacion 1</h2>
                  <div className='wrapperPersonas'>
                    <h1 className='numeroPersonas'>{datosGenerales[0]}</h1>
                    <h2 className='lblPersonas'>personas</h2>
                  </div>
                </button>

                <button className={'habitacionCuadrada '+porcentajes[1]} onClick={()=>{expandirDatos(1)}}>
                  <h2 className='tituloHabitacion '>Habitacion 2</h2>
                  <div className='wrapperPersonas'>
                    <h1 className='numeroPersonas'>{datosGenerales[1]}</h1>
                    <h2 className='lblPersonas'>personas</h2>
                  </div>
                </button>

                <button className={'habitacionCuadrada '+porcentajes[2]} onClick={()=>{expandirDatos(2)}}>                 
                  <h2 className='tituloHabitacion'>Habitacion 3</h2>
                  <div className='wrapperPersonas'>
                    <h1 className='numeroPersonas'>{datosGenerales[2]}</h1>
                    <h2 className='lblPersonas'>personas</h2>
                  </div>
                </button>
              </div>

              <div className='filaHabitaciones'>
                <button className={'habitacionRectangular '+porcentajes[3]} onClick={()=>{expandirDatos(3)}}>                 
                  <h2 className='tituloHabitacion'>Habitacion 4</h2>
                  <div className='wrapperPersonas'>
                    <h1 className='numeroPersonas'>{datosGenerales[3]}</h1>
                    <h2 className='lblPersonas'>personas</h2>
                  </div>
                </button>

                <button className={'habitacionRectangular '+porcentajes[4]} onClick={()=>{expandirDatos(4)}}>
                  <h2 className='tituloHabitacion'>Habitacion 5</h2>
                  <div className='wrapperPersonas'>
                    <h1 className='numeroPersonas'>{datosGenerales[4]}</h1>
                    <h2 className='lblPersonas'>personas</h2>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={"modalOverlay "+(modalAbierto ? "" : 'hidden')} onClick={()=>{setModalAbierto(false)}}>
      </div>
      <div className={"modal "+(modalAbierto ? "" : 'hidden')}>
        {
          dataHabitacion ? (
            <>
              <h3 className='cerrar' onClick={()=>{setModalAbierto(false)}}>&times;</h3>
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
              <Chart
              className='chart'
              options={options}
              series={dataHistorico.series}
              type="heatmap"
              width="500"
              height="500"
              />
            </>

            ) :(
            <>
              <h3 className='cerrar' onClick={()=>{setModalAbierto(false)}}>&times;</h3>
              <h1 className="appTitle letraBlanca">Cargando...</h1>
            </>
              
            )
        }
        
      </div>
    </div>
  );
}

export default App;
