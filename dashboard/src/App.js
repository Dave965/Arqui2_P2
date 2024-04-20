import {useState, useEffect} from 'react';
import compassImage from './img/BRUJULA.png';
import Swal from 'sweetalert2';
import Chart from "react-apexcharts";
import './App.css';

function App() {
  const [habitacionActual, setHabitacionActual] = useState(10);
  const [datosGenerales, setDatosGenerales] = useState([3,0,0,0,0]);
  const [porcentajes, setPorcentajes] = useState(['p20','p20','p20','p20','p20']);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [habitacionModal, setHabitacionModal] = useState(10);
  const [dataHabitacion, setDataHabitacion] = useState(null);
  const habitaciones = [0,1,2,3,4];
  
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
    console.log(habitacionModal)
  },[habitacionModal]);

  useEffect(()=>{
    const interval = setInterval(()=> get_datos(), 1000);
    return () => clearInterval(interval);
  },[]);

  const expandirDatos = (num)=>{
    setHabitacionModal(num);
    setModalAbierto(true);
  }

  const get_datos =() => {
    fetch('http://localhost:8080/ultimos-registros')
      .then((res) => res.json())
      .then((d) => {
        setDatosGenerales(d);
      }).catch(error => {console.log(error);});
  };

  const showAlert = (nuevaHabitacion) => {
    let anterior = habitacionActual;
    setHabitacionActual(nuevaHabitacion);
    fetch('http://localhost:8080/cambiar-habitacion/'+nuevaHabitacion).catch(error => {console.log(error);});

    Swal.fire({
      title: 'Mueve la cámara a la habitación y presiona aceptar',
      showDenyButton: true,
      confirmButtonText: 'Aceptar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Cámara movida!', '', 'success');
        fetch('http://localhost:8080/confirmar-cambio').catch(error => {console.log(error);});
      } else if (result.isDenied) {
        Swal.fire('Cambio cancelado', '', 'info');
        setHabitacionActual(anterior);
        fetch('http://localhost:8080/cambiar-habitacion/'+anterior).catch(error => {console.log(error);});
        fetch('http://localhost:8080/confirmar-cambio').catch(error => {console.log(error);});
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
              <h2>Personas en habitacion </h2>
            </>

            ) :(
              <h1 className="appTitle letraBlanca">Cargando...</h1>
            )
        }
        
      </div>
    </div>
  );
}

export default App;
