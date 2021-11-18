import React from 'react' 
import '../assets/Styles/components/RegistrarContrato.scss';
import ComboBox from '../components/ComboBox';
import Menu from '../components/Menu';
import Tabla from '../components/Tabla';
import Perfil from '../components/Usuario';
import IconButton from '@material-ui/core/IconButton';
import Boton from '../components/Buton';
import Inputs from '../components/Inputs';
import SearchIcon from '@material-ui/icons/Search';
import '../assets/Styles/components/Tabla.scss';
import perfil from '../assets/static/perfil.jpg';

const RegistrarContrato = () => {

    const configInput = {
        ancho: '100%',
        title: 'DNI Trabajador',
        type: 'text',
        name: 'Dni'
    }
    const configInput2 = {
        ancho: '100%',
        title: 'Fecha de Inicio',
        type: 'date',
        name: ''
    }
    const configInput3 = {
        ancho: '100%',
        title: 'Fecha de fin',
        type: 'date',
        name: ''
    }
    const configButon = {
        title: 'Guardar',
        ancho: '45%',
        marginTop:'50px',
        id:'contrato__guardar'
    }
    const configButon3 = {
        title: 'Cancelar',
        ancho: '45%',
        marginTop:'50px',
        id:'contrato__cancelar'
    }
    const configButon2 = {
        title: 'Agregar',
        ancho: '20%',
        marginTop:'0px',
        alto: '30px',
        id:'contrato__agregar'
    }
    const todoList = [
        { text: '10:00 AM', id:'500'},
        { text: '10:00 AM',id:'1'},
        { text: '10:00 AM', id:'2'},
        { text: '10:00 AM', id:'3'}
      ]
    return (
        <div className="RegistrarContrato">
             <div className="RegistrarContrato__menu">
                <Menu/> 
            </div>
            <div className="RegistrarContrato__cuerpo" style={{backgroundColor:"white",width:"100%",height:"100%"}}>
                <div className="RegistrarContrato__cuerpo-perfil">
                 <Perfil/>
                </div>
                <div className="RegistrarContrato__cuerpo-titulo">
                    <h1>Contratos</h1>
                </div>
                <div className="RegistrarContrato__cuerpo-contenido">
                    <div className="RegistrarContrato__registrar">
                        <div className="RegistrarContrato__registrar-titulo"><h2>Registrar Contratos</h2></div>
                        <div className="RegistrarContrato__Combos">
                            <div className="RegistrarContrato__fila1">
                                <Inputs
                                    configInput={configInput}
                                />
                                <div>
                                    <IconButton aria-label="Agregar">
                                        <SearchIcon fontSize="large" />
                                    </IconButton> 
                                </div>
                            </div> 
                            <div className="RegistrarContrato__fila">
                                <ComboBox
                                    text = {"Area"}
                                    todoList = {todoList}
                                    width = {'45%'}
                                />
                                <ComboBox
                                    text = {"Cargo"}
                                    todoList = {todoList}
                                    width = {'45%'}
                                />     
                            </div>  
                            <div className="RegistrarContrato__fila">
                                <Inputs
                                    configInput={configInput2}
                                /> 
                                <Inputs
                                    configInput={configInput3}
                                />
                            </div>
                            <div className="RegistrarContrato__fila">
                                <ComboBox
                                    text = {"Horario"}
                                    todoList = {todoList}
                                    width = {'70%'}
                                />   
                                <Boton configButon={configButon2}/>   
                            </div>
                            <div className="RegistrarContrato__fila"></div>
                            <div className="RegistrarContrato__fila">
                                <Boton configButon={configButon}/> 
                                <Boton configButon={configButon3}/> 
                            </div> 
                            
                        </div>                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegistrarContrato
