import starLine from "../CursoCard/star-line.svg";
import starFill from "../CursoCard/star-fill.svg";

import { useEffect, useState } from "react"

import axios from "axios";

export default function TeacherCardContainer() {

  const [cursos,setCursos]=useState([])

  const [dataLoaded, setDataLoaded] = useState(false);
  
  useEffect(()=> {
    const fetchCourses = async () => {
      const RUTA = 'https://s14-11-m-java.onrender.com/api/v1/teachers/courses'

      const token = localStorage.getItem("jwt");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const {data} =  await axios(RUTA, config)
        console.log(data)
        setCursos(data)

        setDataLoaded(true);
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchCourses()
  },[])


  return(
    <>
      {dataLoaded? (
        <div className="w-full mb-5">
        <h1 className="font-bold text-3xl italic mb-5">Cursos creados</h1>
  
        {
          cursos.length === 0 && <h1 className="font-semibold text-2xl italic text-center">No tienes cursos creados</h1>
        }
  
        {
          cursos.length !== 0 && 
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {
                cursos.map(item =>(
                  <div className="hover:shadow-md w-full h-full card-container flex flex-col items-center justify-between border border-gray-300 rounded-xl shadow-xl shadow-slate-300 cursor-pointer overflow-hidden mb-4">
                    <div className="w-full h-40 overflow-hidden flex items-center">
                      <img src={item.image} className="w-full" alt="Course" />
                    </div>
                    <h3 className="font-bold text-center">{item.title}</h3>
                    <div className="stars flex my-2">
                      <img src={starFill} width="30" alt="Filled Star" />
                      <img src={starFill} width="30" alt="Filled Star" />
                      <img src={starFill} width="30" alt="Filled Star" />
                      <img src={starFill} width="30" alt="Filled Star" />
                      <img src={starLine} width="30" alt="Empty Star" />
                    </div>
                  </div>
                ))
              }
            </div>
        }
  
       </div>
      ) : (
        <div>
          <h1 className="text-center text-2xl text-gray-500">
              Cargando cursos creados...
            </h1>
        </div>
      )}
    </>
  )
}