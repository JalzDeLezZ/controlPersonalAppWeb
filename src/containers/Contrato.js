import React,{useState,useEffect,forwardRef} from 'react';
import '../assets/Styles/components/Contrato.scss';
import Menu from '../components/Menu';
import Perfil from '../components/Usuario';
import '../assets/Styles/components/Tabla.scss';
import Tabla from '../components/Tabla';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Modal3 from '../components/Modal2';
import exportData from '../helpers/exportData';
import validar from '../helpers/validador';
import axios from 'axios';
import { async } from 'validate.js';
import {TextField,MenuItem} from '@material-ui/core';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };


const Contrato = () => {
    const [data, setData ] = useState([]);
    const [estadoModal2, cambiarEstadoModal2] = useState(false);
    const [idseleccionado, setIdSeleccionado] = useState(-1);
    const [respuesta, setRespuesta] = useState({status:'hola',message:'iniciando'});
    const hoy = new Date();
    const [filtro, setFiltro] = React.useState(0);
    const formatearFecha = (fecha) => {
        let fecha1= new Date(fecha);
        let dia = fecha1.getDate();
        let mes = fecha1.getMonth() + 1;
        let anio = fecha1.getFullYear();
        if (dia < 10) {
            dia = '0' + dia;
        }
        if (mes < 10) {
            mes = '0' + mes;
        }
        return anio + '/' + mes + '/' + dia;
    }

    const formatearFechaEspañol = (fecha) => {
        let fecha1= new Date(fecha);
        let dia = fecha1.getDate();
        let mes = fecha1.getMonth() + 1;
        let anio = fecha1.getFullYear();
        if (dia < 10) {
            dia = '0' + dia;
        }
        if (mes < 10) {
            mes = '0' + mes;
        }
        return dia + '/' + mes + '/' + anio;
    }

    useEffect(() => {
        fetch('http://127.0.0.1:3000/api/contratos')
        .then(response => response.json())
        .then(data=> setData(data[0]));
    },[]);
        
    const columns = [
        { title: "N°", field: "CON_id",align:"left",width: "50px" ,filtering: false},
        { title: "Personal", field: "PER_nombre" ,
        render: (rowData) => <p>{`${rowData.PER_nombre} ${rowData.PER_apaterno}`}</p>},
        { title: "Puesto", field: "TTR_cargo", align: "left"},
        {
          title: "Horario", field: "HOR_entrada",
          render: (rowData) => <p>{`${rowData.HOR_detalle}: ${rowData.HOR_entrada} - ${rowData.HOR_salida}`}</p>,width:'250px'},
        { title: "Incio", field: "CON_fecha_inn",render: (rowData) => <p>{ formatearFechaEspañol(rowData.CON_fecha_inn)}</p>},
        { title: "Finaliza", field: "CON_fecha_out",render: (rowData) => <p>{ formatearFechaEspañol(rowData.CON_fecha_out)}</p>},
        { title: "Estado", field: "CON_estado", lookup: { 0: "finalizado", 1: "vigente", 2: "cancelado" } ,},
      ]
    const deleteCerrar= async(id) => {
        const datas={
            opcion: 'T',
            fecha:'2021-01-01'

        };
        await cambiarEstadoModal2(!estadoModal2);
        await axios.post(`http://127.0.0.1:3000/api/contrato/delete/${id}`,datas)
        .then(res => {
            setRespuesta(res.data);})
        .catch(err => {
            console.log(err);
        });
        await fetch('http://127.0.0.1:3000/api/contrato/listaId')
        .then(response => response.json())
        .then(data=> setData(data));
        await console.log(data);
        
    }
    const deleteEliminar= async(id) => {
        await cambiarEstadoModal2(!estadoModal2);
        const datas= await {
            opcion: 'D',
            fecha: '2021-01-01'

        };
        await cambiarEstadoModal2(!estadoModal2);
        await axios.post(`http://127.0.0.1:3000/api/contrato/delete/${id}`,datas)
        .then(res => {
            setRespuesta(res.data);})
        .catch(err => {
            console.log(err);
        });
        await fetch('http://127.0.0.1:3000/api/contratos')
        .then(response => response.json())
        .then(data=> setData(data[0]));
        await console.log(data);
    }
    return (
        <div className="Contrato">
            {console.log(data[0])}
             <div className="Contrato__menu">
                <Menu/> 
            </div>
            <div className="Contrato__cuerpo" style={{backgroundColor:"white",width:"100%",height:"100%"}}>
                <div className="Contrato__cuerpo-perfil">
                 <Perfil/>
                </div>
                <div className="Contrato__cuerpo-titulo">
                    <h1>Contratos</h1>
                </div>
                <div className="Contrato__cuerpo-contenido">
                    <div className="Contrato__lista" style={{margin:"0"}}>
                        <div className="contenedor-tabla" style={{width:"100%", height:"100%",overflow:"auto"}}>
                            <MaterialTable columns={columns} data={data} title="Lista de personal"  icons={tableIcons} style={{background:'transparent'}}
                            // StickyHeader={true}
                            options={{
                                sorting: true,iconsSearch:false,search: false, paging:true,paginghideFilterIcons: true,pageSize:4,
                                rowStyle:{fontFamily:"mulish" ,fontSize:"13px",border: "0px",color:"#4E4D4D",height:"30px" },
                                headerStyle:{position: 'sticky',textAlign:'left', top: "0",color:"#7D0F2E",fontFamily:"mulish",backdropFilter: blur("2px") ,fontSize:"14px",border: "0px",background:"#E9F8F7",fontWeight:"700",zIndex:'9999' },
                                titleStyle:{padding:"0px"},paginationType:"normal",pageSizeOptions:[4,10,20],filtering: false, showFirstLastPageButtons: false,
                                filtering: filtro%2==0 ? false : true,maxBodyHeight: '400px'
                            }}
                            localization={{
                                header: {
                                actions: "",
                                },
                                rows:"fila"
                            }}
                            actions={[
                                {
                                icon: tableIcons.Filter,
                                tooltip: 'filtrar tabla' ,
                                onClick: () => setFiltro(filtro + 1),
                                isFreeAction: true,
                                
                                },
                                {
                                icon: tableIcons.Export,
                                tooltip: 'Descargar Datos' ,
                                onClick: () => exportData('datos',data[0]),
                                isFreeAction: true,
                                },
                                {
                                    icon: tableIcons.Edit,
                                    tooltip: 'Modificar' ,
                                    onClick: async (event, rowData) => {
                                        await cambiarEstadoModal1(true)
                                        await setGetData(()=>({ 
                                        id: rowData.id,
                                        dni: rowData.dni,
                                        nombre: rowData.nombre,
                                        paterno: rowData.apellidoPaterno,
                                        materno: rowData.apellidoMaterno,
                                        genero: rowData.sexo,
                                        fecha_nacimiento: formatearFecha(rowData.fechaNacimiento),
                                        telefono: rowData.telefono,
                                        url:'sdfcreghtukiyjthgrfedsfgrygt',
                                        estado:'1',
                                        direccion: rowData.direccion===null ? '' : rowData.direccion,
                                        idHuellas:0
                                        })); 
                                    
                                    },
                                },
                                {
                                icon: tableIcons.Delete,
                                tooltip: 'Desactivar',
                                onClick: async(event, rowData) =>  {
                                    await setIdSeleccionado(rowData.contratoid);
                                    await cambiarEstadoModal2(true);
                                },
                                },
                                {
                                icon: tableIcons.Add,
                                tooltip: 'Nuevo Registro' ,
                                onClick: (event, rowData) => window.location.href='/registro%20contratos',
                                isFreeAction: true,
                                },
                                {
                                icon: ()=>(<button className="boton" onClick={()=>window.location.href='/asistencias'}>Ver asistencia</button> ),
                                onClick: () => setFiltro(filtro + 1),
                                isFreeAction: true,
                                
                                },
                            ]}
                            />
                            {console.log(respuesta)}
                            {respuesta.message==="iniciando"? '':alert(`repuesta: ${respuesta.message}`, setRespuesta(()=>({message:"iniciando"})))}
                        </div>
                    </div>
                </div>
            </div>
            {console.log(idseleccionado)}
            <Modal3 estado={estadoModal2} cambiarEstado={cambiarEstadoModal2} alto='200px' ancho='400px'>
                <h1 style={{textAlign:"center"}} className="h1">¿Que desea realizar?</h1>
                <div style={{width:"100%",height:"100%",display:"flex",justifyContent:"space-around"}}>
                    <button type='button'onClick={()=>deleteCerrar(idseleccionado)} className="button"  style={{width:"30%",height:"30px"}}><h5>cerrar contrato</h5></button>
                    <button type='button'onClick={()=>deleteEliminar(idseleccionado)} className="button"  style={{width:"30%",height:"30px"}}><h5>eliminar contrato</h5></button>
                    <button type='button' className="button" onClick={() => cambiarEstadoModal2(!estadoModal2)} style={{width:"30%",height:"30px"}}><h5>cancelar</h5></button>
                </div>   
            </Modal3> 
        </div>
    )
}
export default Contrato;