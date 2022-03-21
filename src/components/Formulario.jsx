import { useState, useEffect } from "react";
import { Error } from "./Error";

export const Formulario = ({
  pacientes,
  setPacientes,
  paciente,
  setPaciente,
}) => {
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState("");
  const [sintomas, setSintomas] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (Object.keys(paciente).length > 0) {
      //verificamos si el objeto esta vacio
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
    }
  }, [paciente]);

  const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = new Date().getTime().toString(36);

    return random + fecha;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //Validación del Formulario
    if ([nombre, propietario, email, fecha, sintomas].includes("")) {
      setError(true);
      return;
    }

    setError(false); //se deja en false para que elimine la alerta

    //Objeto de Paciente
    const objetoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas,
    };

    if (paciente.id) {
      //Editando registro
      objetoPaciente.id = paciente.id;

      const pacientesActualizados = pacientes.map((pacienteState) =>
        pacienteState.id === paciente.id ? objetoPaciente : pacienteState
      );

      setPacientes(pacientesActualizados);
      setPaciente({});
    } else {
      //Nuevo registro
      //nunca ocupar push para agregar un elemento por que lo sobrescribe, siempre ocupar el spread operator
      objetoPaciente.id = generarId(); //agregamos la propiedad id objetoPaciente
      setPacientes([...pacientes, objetoPaciente]);
    }

    //Reiniciar el form
    setNombre("");
    setPropietario("");
    setEmail("");
    setFecha("");
    setSintomas("");
  };

  return (
    <div className="md:w-1/2 lg:w-2/5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y{" "}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10 mx-5"
      >
        {error && <Error mensaje="Todos los campos son obligatorios" />}
        <div className="mb-5">
          <label
            htmlFor="mascota"
            className="block text-gray-700 uppercase font-bold mb-1"
          >
            Nombre Mascota
          </label>{" "}
          <input
            id="mascota"
            type="text"
            placeholder="Nombre de la mascota"
            className="border-2 w-full p-2 placeholder-gray-500 rounded-md"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)} //cada vez que escribimos en el input, se ejecuta el onchange
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="propietario"
            className="block text-gray-700 uppercase font-bold mb-1"
          >
            Nombre Propietario
          </label>{" "}
          <input
            id="propietario"
            type="text"
            placeholder="Nombre de la propietario"
            className="border-2 w-full p-2 placeholder-gray-500 rounded-md"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)} //cada vez que escribimos en el input, se ejecuta el onchange
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block text-gray-700 uppercase font-bold mb-1"
          >
            Email
          </label>{" "}
          <input
            id="email"
            type="email"
            placeholder="Email de contacto"
            className="border-2 w-full p-2 placeholder-gray-500 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)} //cada vez que escribimos en el input, se ejecuta el onchange
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="alta"
            className="block text-gray-700 uppercase font-bold mb-1"
          >
            Alta
          </label>{" "}
          <input
            id="alta"
            type="date"
            className="border-2 w-full p-2 placeholder-gray-500 rounded-md"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)} //cada vez que escribimos en el input, se ejecuta el onchange
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="sintomas"
            className="block text-gray-700 uppercase font-bold mb-1"
          >
            Síntomas
          </label>
          <textarea
            id="sintomas"
            className="border-2 w-full p-2 placeholder-gray-500 rounded-md"
            placeholder="Describe los síntomas"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)} //cada vez que escribimos en el input, se ejecuta el onchange
          ></textarea>
        </div>

        <input
          type="submit"
          value={paciente.id ? "Editar Paciente" : "Agregar Paciente"}
          className="bg-indigo-600 text-white uppercase font-bold w-full p-3 rounded-lg hover:bg-indigo-700 cursor-pointer transition-all"
        />
      </form>
    </div>
  );
};
