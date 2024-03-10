import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Form, Modal, FormGroup } from 'react-bootstrap';
import AxiosClient from '../../../shared/plugins/axios';
import Alert, { confirmMsj, confirmTitle, succesMsj, successTitle, errorMsj, errorTitle } from '../../../shared/plugins/alerts';
import '../../../utils/styles/UserNuevoTrabajo.css';
import * as XLSX from 'xlsx';

export const MaestroPayment = ({ isOpen, cargarDatos, onClose, option, objeto }) => {
  const [descuentos2, setDescuentos2] = useState([]);
  const [talleres, setTalleres] = useState([]);
  const [reposiciones, setReposiciones] = useState([]);
  const [alumnosMaestro, setAlumnosMaestro] = useState([]);
  const [teacherRepo, setTeacherRepo] = useState([]);
  // useEffect(() => {
  //   const fetchMaterial = async () => {
  //     const response = await AxiosClient({
  //       method: "GET",
  //       url: "/personal/teacher",
  //     });
  //     if (!response.error) {
  //       setMaestros(response);
  //       return response;
  //     }
  //   };
  //   fetchMaterial();
  // }, []);
  // useEffect(() => {setDescuentos2([{ cantidad: 100, comentario: "Descueento Prestamos 4/6" }, { cantidad: 100, comentario: "Descueento Prestamos 4/6" }, { cantidad: 100, comentario: "Descueento Prestamos 4/6" }])}, []);
  const cargarStats = async () => {
    try {
      const response = await AxiosClient({
        url: "/personal/teacher/stats/" + objeto.user_id,
        method: "GET",
      });
      console.log(response);
      if (!response.error) {
        setDescuentos2(response[0]);
        setTalleres(response[2]);
      }
    } catch (err) {
      Alert.fire({
        title: "VERIFICAR DATOS",
        text: "USUARIO Y/O CONTRASEÑA INCORRECTOS",
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
      });
      console.log(err);
    }
  }

  const cargarTeacherRepo = async () => {
    try {
        const response = await AxiosClient({
            url: "/personal/teacher/repo/" + objeto.user_id,
            method: "GET",
        });
        console.log(response);
        if (!response.error) {
            setReposiciones(response);
        }
    } catch (err) {

        console.log(err);
    }
}

  const exportToExcel = async(descuentosEx, repoEx, talleresEx) => {
    const tablaAlumnos = [
      ['Pago Por Alumnos'],
      [`Total Pago Por Alumnos`, alumnosMaestro.length * 300]
    ]
    alumnosMaestro.forEach((item, index)=>{
      tablaAlumnos.splice(tablaAlumnos.length - 1, 0, [item.name, 300]);
    });

    const tablaDescuentos = [
      ['Descuentos'],
      ['Observaciones', 'Descuento'],
      [`Total Descuentos`, descuentosEx.reduce((contador, item)=> contador = contador + parseFloat(item.cantidad),0)]
    ]
    descuentosEx.forEach((item, index)=>{
      tablaDescuentos.splice(tablaDescuentos.length - 1, 0, [item.comentario, parseFloat(item.cantidad)]);
    });

    const tablaRepos = [
      ['Reposiciones Externas'],
      ['Nombre del Alumno', 'Pago Por Alumno'],
      [`Total Pago De Reposiciones`, repoEx.reduce((contador, item)=> contador = contador + parseFloat(item.cantidad),0)]
    ]
    repoEx.forEach((item, index)=>{
      tablaRepos.splice(tablaRepos.length - 1, 0, [item.nombre, parseFloat(item.cantidad)]);
    });

    const tablaTalleres = [
      ['Talleres'],
      ['Nombre del Taller', 'Pago Por Taller'],
      [`Total Pago De Talleres`, talleresEx.reduce((contador, item)=> contador = contador + parseFloat(item.cantidad),0)]
    ]
    talleresEx.forEach((item, index)=>{
      tablaTalleres.splice(tablaTalleres.length - 1, 0, [item.taller, parseFloat(item.cantidad)]);
    });

    const tables = [
      // Datos de la primera tabla
      [
        ['CAMPUS CENTRO', 'TOTAL PAGO'],
        [`${objeto.name}`, ((alumnosMaestro.length * 300) + repoEx.reduce((contador, item)=> contador = contador + parseFloat(item.cantidad),0) + talleresEx.reduce((contador, item)=> contador = contador + parseFloat(item.cantidad),0) ) - descuentosEx.reduce((contador, item)=> contador = contador + parseFloat(item.cantidad),0)],
      ],
      tablaAlumnos,
      tablaDescuentos,
      tablaRepos,
      tablaTalleres
      // ... Datos de otras tablas
    ];

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([]);
    let contador = 0;
    let anterior = 0;
    tables.forEach((table, index) => {
      
      XLSX.utils.sheet_add_aoa(ws, table, { origin: `A${index === 0 ? 0 : contador + 2}` });
      contador=contador + table.length + 2;
    });


    XLSX.utils.book_append_sheet(wb, ws, 'Nomina');
    XLSX.writeFile(wb, `${objeto.name}${new Date().toISOString().slice(0,10)}.xlsx`);
  };


  const actualizeDatos = async (descuentosList, repoList, tallerList) => {
    try {
      const response = await AxiosClient({
        url: "/personal/teacher/stats",
        method: "PUT",
        data: JSON.stringify({ descuentos: descuentosList, repos: repoList, talleres: tallerList, user_id: objeto.user_id })
      });
      console.log(response);
      if (!response.error) {
        cargarStats();
        Alert.fire({
          title: "EXITO",
          text: "Actualización Exitosa",
          icon: "success",
        });
      }
    } catch (err) {
      Alert.fire({
        title: "VERIFICAR DATOS",
        text: "USUARIO Y/O CONTRASEÑA INCORRECTOS",
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
      });
      console.log(err);
    }
  }
  useEffect(() => {
    const fetchMaterial = async () => {
      const response = await AxiosClient({
        method: "GET",
        url: "/personal/alumno/clases/" + objeto.user_id,
      });
      if (!response.error) {
        console.log(response)
        setAlumnosMaestro(response);
        return response;
      }
    };
    cargarStats();
    fetchMaterial();
    cargarTeacherRepo();
  }, [isOpen]);

  const obtenerContenidoDivs = () => {
    var sumaDesc = 0;
    const descTotal = document.querySelector('.TotalDesc');
    const divsDescuentoObservaciones = document.querySelectorAll('.DescObservaciones');
    const divsDescuentoCantidad = document.querySelectorAll('.DescCantidad');
    const contenidoDivs = [];
    const contenidoDivsL = [];
    divsDescuentoObservaciones.forEach((div) => {
      contenidoDivs.push(div.textContent.trim());
    });
    divsDescuentoCantidad.forEach((div) => {
      contenidoDivsL.push(div.textContent.trim());
    });
    const listaDescuentos = contenidoDivs.map((item, index) => { return { cantidad: contenidoDivsL[index], comentario: item }; })
    console.log(listaDescuentos);

    const divsDescuentoObservaciones2 = document.querySelectorAll('.repoName');
    const divsDescuentoCantidad2 = document.querySelectorAll('.repoCant');
    const contenidoDivs2 = [];
    const contenidoDivsL2 = [];
    divsDescuentoObservaciones2.forEach((div) => {
      contenidoDivs2.push(div.textContent.trim());
    });
    divsDescuentoCantidad2.forEach((div) => {
      contenidoDivsL2.push(div.textContent.trim());
    });
    const listaDescuentos2 = contenidoDivs2.map((item, index) => { return { cantidad: contenidoDivsL2[index], name: item }; })

    const divsDescuentoObservaciones3 = document.querySelectorAll('.tallerName');
    const divsDescuentoCantidad3 = document.querySelectorAll('.tallerCant');
    const contenidoDivs3 = [];
    const contenidoDivsL3 = [];
    divsDescuentoObservaciones3.forEach((div) => {
      contenidoDivs3.push(div.textContent.trim());
    });
    divsDescuentoCantidad3.forEach((div) => {
      contenidoDivsL3.push(div.textContent.trim());
    });
    const listaDescuentos3 = contenidoDivs3.map((item, index) => { return { cantidad: contenidoDivsL3[index], taller: item }; })

    actualizeDatos(listaDescuentos, listaDescuentos2, listaDescuentos3);
    return listaDescuentos;
  }

  const obtenerContenidoDivsExcel = () => {
    var sumaDesc = 0;
    const descTotal = document.querySelector('.TotalDesc');
    const divsDescuentoObservaciones = document.querySelectorAll('.DescObservaciones');
    const divsDescuentoCantidad = document.querySelectorAll('.DescCantidad');
    const contenidoDivs = [];
    const contenidoDivsL = [];
    divsDescuentoObservaciones.forEach((div) => {
      contenidoDivs.push(div.textContent.trim());
    });
    divsDescuentoCantidad.forEach((div) => {
      contenidoDivsL.push(div.textContent.trim());
    });
    const listaDescuentos = contenidoDivs.map((item, index) => { return { cantidad: contenidoDivsL[index], comentario: item }; })
    console.log(listaDescuentos);

    const divsDescuentoObservaciones2 = document.querySelectorAll('.repoName');
    const divsDescuentoCantidad2 = document.querySelectorAll('.repoCant');
    const contenidoDivs2 = [];
    const contenidoDivsL2 = [];
    divsDescuentoObservaciones2.forEach((div) => {
      contenidoDivs2.push(div.textContent.trim());
    });
    divsDescuentoCantidad2.forEach((div) => {
      contenidoDivsL2.push(div.textContent.trim());
    });
    const listaDescuentos2 = contenidoDivs2.map((item, index) => { return { cantidad: contenidoDivsL2[index], name: item }; })

    const divsDescuentoObservaciones3 = document.querySelectorAll('.tallerName');
    const divsDescuentoCantidad3 = document.querySelectorAll('.tallerCant');
    const contenidoDivs3 = [];
    const contenidoDivsL3 = [];
    divsDescuentoObservaciones3.forEach((div) => {
      contenidoDivs3.push(div.textContent.trim());
    });
    divsDescuentoCantidad3.forEach((div) => {
      contenidoDivsL3.push(div.textContent.trim());
    });
    const listaDescuentos3 = contenidoDivs3.map((item, index) => { return { cantidad: contenidoDivsL3[index], taller: item }; })

    actualizeDatos(listaDescuentos, listaDescuentos2, listaDescuentos3);
    exportToExcel(listaDescuentos, listaDescuentos2, listaDescuentos3);
    return listaDescuentos;
  }

  const addDescRow = () => {
    const divsDescuentoObservaciones = document.querySelectorAll('.DescObservaciones');
    const divsDescuentoCantidad = document.querySelectorAll('.DescCantidad');
    const contenidoDivs = [];
    const contenidoDivs2 = [];
    divsDescuentoObservaciones.forEach((div) => {
      contenidoDivs.push(div.textContent.trim());
    });
    divsDescuentoCantidad.forEach((div) => {
      contenidoDivs2.push(div.textContent.trim());
    });

    const listaDescuentos = contenidoDivs.map((item, index) => { return { cantidad: contenidoDivs2[index], comentario: item }; })

    setDescuentos2([...listaDescuentos, { cantidad: 0, comentario: "N/A" }]);
  }

  const subDescRow = (index) => {
    const temp = descuentos2.slice();
    temp.splice(index, 1);
    setDescuentos2(temp);
  }

  const obtenerContenidoTalleres = () => {
    var sumaDesc = 0;
    const descTotal = document.querySelector('.tallerTotal');
    const divsDescuentoObservaciones = document.querySelectorAll('.tallerName');
    const divsDescuentoCantidad = document.querySelectorAll('.tallerCant');
    const contenidoDivs = [];
    const contenidoDivs2 = [];
    divsDescuentoObservaciones.forEach((div) => {
      contenidoDivs.push(div.textContent.trim());
    });
    divsDescuentoCantidad.forEach((div) => {
      contenidoDivs2.push(div.textContent.trim());
      sumaDesc = sumaDesc + parseFloat(div.textContent.trim());
    });
    descTotal.textContent = sumaDesc;
    const listaDescuentos = contenidoDivs.map((item, index) => { return { cantidad: contenidoDivs2[index], taller: item }; })
    console.log(listaDescuentos);
    return listaDescuentos;
  }

  const addTallerRow = () => {
    const divsDescuentoObservaciones = document.querySelectorAll('.tallerName');
    const divsDescuentoCantidad = document.querySelectorAll('.tallerCant');
    const contenidoDivs = [];
    const contenidoDivs2 = [];
    divsDescuentoObservaciones.forEach((div) => {
      contenidoDivs.push(div.textContent.trim());
    });
    divsDescuentoCantidad.forEach((div) => {
      contenidoDivs2.push(div.textContent.trim());
    });

    const listaDescuentos = contenidoDivs.map((item, index) => { return { cantidad: contenidoDivs2[index], taller: item }; })

    setTalleres([...listaDescuentos, { cantidad: 0, taller: "N/A" }]);
  }

  const subTallerRow = (index) => {
    const temp = talleres.slice();
    temp.splice(index, 1);
    setTalleres(temp);
  }

  const obtenerContenidoRepo = () => {
    var sumaDesc = 0;
    const descTotal = document.querySelector('.repoTotal');
    const divsDescuentoObservaciones = document.querySelectorAll('.repoName');
    const divsDescuentoCantidad = document.querySelectorAll('.repoCant');
    const contenidoDivs = [];
    const contenidoDivs2 = [];
    divsDescuentoObservaciones.forEach((div) => {
      contenidoDivs.push(div.textContent.trim());
    });
    divsDescuentoCantidad.forEach((div) => {
      contenidoDivs2.push(div.textContent.trim());
      sumaDesc = sumaDesc + parseFloat(div.textContent.trim());
    });
    descTotal.textContent = sumaDesc;
    const listaDescuentos = contenidoDivs.map((item, index) => { return { cantidad: contenidoDivs2[index], name: item }; })
    console.log(listaDescuentos);
    return listaDescuentos;
  }

  const addRepoRow = () => {
    const divsDescuentoObservaciones = document.querySelectorAll('.repoName');
    const divsDescuentoCantidad = document.querySelectorAll('.repoCant');
    const contenidoDivs = [];
    const contenidoDivs2 = [];
    divsDescuentoObservaciones.forEach((div) => {
      contenidoDivs.push(div.textContent.trim());
    });
    divsDescuentoCantidad.forEach((div) => {
      contenidoDivs2.push(div.textContent.trim());
    });

    const listaDescuentos = contenidoDivs.map((item, index) => { return { cantidad: contenidoDivs2[index], name: item }; })

    setReposiciones([...listaDescuentos, { cantidad: 0, name: "N/A" }]);
  }

  const subRepoRow = (index) => {
    const temp = reposiciones.slice();
    temp.splice(index, 1);
    setReposiciones(temp);
  }

  const handleClose = () => {
    onClose();
  }
  return <Modal
    backdrop='static'
    keyboard={false}
    show={isOpen}
    onHide={handleClose}
    style={{ width: "90vw", display: "flex", alignContent: "start", justifyItems: "start", marginLeft: "5vw", padding: "0", height: "auto", backgroundColor: "white", borderRadius: "1rem", marginTop: "1rem" }}
    dialogClassName="modalAlumnoActualizar"
    id="modalAlumnoR"
  >
    <Modal.Header closeButton >
      <Modal.Title>
        Larghetto Nomina
      </Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <div className='AlumnoInfoMain' style={{ paddingRight: "0px" }}>
        <div className="AlumnoInfoLeft"  >
          <div className="AlumnoInfoMain" style={{ padding: 0 }}>
            {/* <div className="AlumnoInfoRight" style={{ flexDirection: "column" }}>
              <div className="AlumnoInfoBottomInfo">
                <div className="AlumnoInfoTitleInfo">
                  <p>Fecha de Nacimiento</p>
                  <p>{objeto.fechaNacimiento && objeto.fechaNacimiento.substring(0, 10)}</p>
                </div>
                <div className="AlumnoInfoTitleInfo">
                  <p>Domicilio</p>
                  <p>{objeto.domicilio}</p>
                </div>
                <div className="AlumnoInfoTitleInfo">
                  <p>Municipio</p>
                  <p>{objeto.municipio}</p>
                </div>
                <div className="AlumnoInfoTitleInfo">
                  <p>Telefono</p>
                  <p>{objeto.telefono}</p>
                </div>
                <div className="AlumnoInfoTitleInfo">
                  <p>Contacto de Emergencia</p>
                  <p>{objeto.contactoEmergencia}</p>
                </div>
              </div>
            </div> */}
            <div className="AlumnoInfoMain" style={{ flexDirection: "column", paddingTop: "0.5rem" }}>
              <div className="MaestroTablaPagoMain">
                <div className="MaestroPagoLeft">
                  <div>CAMPUS {objeto && objeto.campus.toUpperCase()}</div>
                  <div>{objeto.name && objeto.name}</div>
                </div>
                <div className="MaestroPagoRight">
                  <div>TOTAL PAGO</div>
                  <div className='MaestroPago'>
                    <div>$</div>
                    <div>{((alumnosMaestro.length * 300) + (talleres.reduce((acumulador, elemento) => acumulador + parseFloat(elemento.cantidad), 0)) + (reposiciones.reduce((acumulador, elemento) => acumulador + parseFloat(elemento.cantidad), 0))) - descuentos2.reduce((acumulador, elemento) => acumulador + parseFloat(elemento.cantidad), 0)}</div>
                  </div>
                </div>
              </div>

              <div className="PagoPorAlumnosMain">
                <div className="PagoPorAlumnosTitulo">Pago Por Alumnos</div>
                <div className="PagoAlumnosHeaders">
                  <div>N°</div>
                  <div>Nombre del Alumno</div>
                  <div>Pago Por Alumno</div>
                  <div></div>
                </div>
                {alumnosMaestro.map((item, index) => (
                  <div className="PagoAlumnoRow" key={index * 23}>
                    <div>{index + 1}</div>
                    <div>{item.name}</div>
                    <div>300</div>
                    <div></div>
                  </div>
                ))}
                <div className="PagoAlumnoTotal">
                  <div></div>
                  <div>Total Pago de Alumnos</div>
                  <div>{alumnosMaestro.length * 300}</div>
                </div>
              </div>

              <div className="PagoPorAlumnosMain">
                <div className="PagoPorAlumnosTitulo" style={{ backgroundColor: "#37448A" }}>Reposiciones Externas</div>
                <div className="PagoAlumnosHeaders" style={{ backgroundColor: "#8A9AEE" }}>
                  <div>N°</div>
                  <div>Nombre del Alumno</div>
                  <div style={{ width: "35%" }}>Pago Por Alumno</div>
                  <div style={{ width: "20%" }}>Fecha</div>
                </div>
                {reposiciones && reposiciones.map((item, index) => (
                  <div className="PagoAlumnoRow" style={{ backgroundColor: "#CCD2F1" }} key={index * 17}>
                    <div>{index + 1}</div>
                    <div className='repoName' >{item.name}</div>
                    <div className='repoCant' style={{ width: "35%" }}>70</div>
                    <div style={{ width: "20%" }}>{item.fecha? item.fecha.slice(0,10) : ""}</div>
                  </div>
                ))}
                <div className="PagoAlumnoTotal" style={{ backgroundColor: "#8A9AEE" }}>
                  <div></div>
                  <div style={{ backgroundColor: "#8A9AEE" }}>Total Pago de Reposiciones</div>
                  <div className='repoTotal' style={{ width: "35%", backgroundColor: "#8A9AEE" }} >{reposiciones.length * 70}</div>
                </div>
              </div>

              <div className="PagoPorAlumnosMain">
                <div className="PagoPorAlumnosTitulo" style={{ backgroundColor: "#5D6FB5" }}>Talleres</div>
                <div className="PagoAlumnosHeaders" style={{ backgroundColor: "#76A5B9" }}>
                  <div>N°</div>
                  <div>Nombre del Taller</div>
                  <div style={{ width: "35%" }}>Pago Por Taller</div>
                  <div style={{ width: "20%" }}></div>
                  <div style={{ width: "5%" }} onClick={() => addTallerRow()}>+</div>
                </div>

                {talleres && talleres.map((item, index) => (
                  <div className="PagoAlumnoRow" style={{ backgroundColor: "#D4DEFE" }} key={index * 17}>
                    <div onClick={() => subTallerRow(index)}>{index + 1}</div>
                    <div className='tallerName' contentEditable="true">{item.taller}</div>
                    <div className='tallerCant' contentEditable="true">{item.cantidad}</div>
                  </div>
                ))}

                <div className="PagoAlumnoTotal" style={{ backgroundColor: "#76A5B9" }}>
                  <div></div>
                  <div style={{ backgroundColor: "#76A5B9" }}>Total Pago de Talleres</div>
                  <div className='tallerTotal' style={{ width: "35%", backgroundColor: "#76A5B9" }} >{talleres.reduce((acumulador, elemento) => acumulador + parseFloat(elemento.cantidad), 0)}</div>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className="AlumnoInfoRight" style={{ borderLeft: "solid 2px #333", flexDirection: "column", justifyContent: "start", paddingLeft: "0.5rem", paddingBottom: "0.5rem" }}>
          <div className="PagoPorAlumnosMain">
            <div className="PagoPorAlumnosTitulo" style={{ backgroundColor: "#E24444" }}>Descuentos</div>
            <div className="PagoAlumnosHeaders" style={{ backgroundColor: "#FE7F70" }}>
              <div>N°</div>
              <div>Descuento</div>
              <div style={{ width: "55%" }}>Observaciones</div>
              <div style={{ width: "5%", cursor: "pointer" }} onClick={() => {
                addDescRow();
              }}>+</div>
            </div>
            {descuentos2 && descuentos2.map((item, index) => (
              <div className="DescuentoRow" key={index * 13}>
                <div onClick={() => subDescRow(index)}>{index + 1}</div>
                <div className='DescCantidad' contentEditable="true">{item.cantidad}</div>
                <div className='DescObservaciones' contentEditable="true">{item.comentario}</div>
              </div>
            ))}
            <div className="DescuentoTotal">
              <div style={{ width: "5%" }}>T.</div>
              <div style={{ width: "25%", textAlign: "center" }} className='TotalDesc'>{descuentos2.reduce((acumulador, elemento) => acumulador + parseFloat(elemento.cantidad), 0)}</div>

            </div>

          </div>
        </div>
      </div>
    </Modal.Body>

    <div style={{ height: "10%", width: "100%", display: "flex", justifyContent: "end", color: "#f2f2f2", position: "absolute", bottom: 0, fontSize: "25px", fontWeight: "bold" }}>
      <div style={{ width: "68%" }}></div>
      <div style={{ width: "30%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ width: "40%", textAlign: "right", cursor: "pointer", paddingInline: "0.5rem", backgroundColor: "green", borderRadius: "1rem", display: "flex", justifyContent: "center", alignItems: "center", marginLeft: "3rem" }} onClick={() => obtenerContenidoDivs()}>
          Save
        </div>
        <div style={{ width: "40%", textAlign: "right", cursor: "pointer", paddingInline: "0.5rem", backgroundColor: "green", borderRadius: "1rem", display: "flex", justifyContent: "center", alignItems: "center", marginLeft: "3rem" }} onClick={() => obtenerContenidoDivsExcel()}>
          Excel
        </div>
      </div>

    </div>
  </Modal>
};
