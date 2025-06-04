'use client'
 
import ComponentCard from '@/components/common/ComponentCard'
import PageBreadcrumb from '@/components/common/PageBreadCrumb'
import Input from '@/components/form/input/InputField'
import Label from '@/components/form/Label'
import Select from '@/components/form/Select'
import { BoxIcon, ChevronDownIcon } from '@/icons'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import {graus, classes, aluno, createAluno, lote300} from "@/fetchInfo/AlunosInfo";
import { use } from 'react'
import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import Submit from '@/components/ui/button/Submit'
import {useRouter} from 'next/navigation'
import Button from '@/components/ui/button/Button'


 type graus = {
    id:string;
    nome:string;
  }

  type classes = {
    id:string;
    nome:string;
  }

  type aluno = {
    id:string;
    nome:string;
    ra:string;
    classId:string;
    grauId:string;

  }
 
 
export default function AlunosInfo() {
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false);
  const [optionG, setOptionsG] = useState([]);
  const [optionC, setOptionsC] = useState([]);
  const [alunoInfo, setAlunoInfo] = useState({});
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedGrau, setSelectedGrau] = useState("");

  const { register, handleSubmit, control, setValue } = useForm();


  useEffect(() =>{
    async function fetchGraus() {
        const grs = await graus();
        const optionsG = grs.map((gr:graus) =>{
            return {value:gr.id, label:gr.nome}
        })  

       // console.log(optionsG);
        setOptionsG(optionsG); 
    }

    async function fetchClass() {
        const cls = await classes();
        const optionsC = cls.map((cl:classes) =>{
            return {value:cl.id, label:cl.nome}
        })  

       // console.log(optionsG);
        setOptionsC(optionsC); 
    }

    fetchGraus()
    fetchClass()
  }, []);

  
    const handleSelectChange = (value: string) => {
      console.log("Selected value:", value);
    };

    
 
    async function handleInsert(data:aluno) {
        
        try {
          const resp = createAluno(data)
          router.push("/")
  
        } catch (error) {
          console.error("Login error:", error);
          
        }
      }

  const handleChangeClass = (event) => {
    const selectedValue = event.target.value;
    setSelectedClass(selectedValue)
    
  }; 

  const handleChangeGrau= (event) => {
    const selectedValue = event.target.value;
    console.log(selectedValue)
    setSelectedGrau(selectedValue)
  };
  
 
  return (
    <div>
        <PageBreadcrumb pageTitle="Aluno" />
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <div className="space-y-6">

              <Button size="md" variant="primary" startIcon={<BoxIcon />} onClick={()=>{const del = lote300();
                    router.push('/home')}} >
                                          Gerar Lote 300
                                        </Button><br/>

            <ComponentCard title="Perfil do Aluno">
            <form  onSubmit={handleSubmit(handleInsert)}>
                <div className="space-y-6">
                    <div>
                        <Label>Nome</Label>
                        <input type="text" placeholder="nome"  {...register("nome")}
                         className={`h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800`}
                        />
                    </div>
                    <div>
                        <Label>RA</Label>
                        <input type="text" placeholder="ra" {...register("ra")} 
                        className={`h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800`}
                        />
                    </div>

                    <div>
                        <Label>Grau</Label>
                        <div className="relative">
                          <select {...register("grauId")} onChange={handleChangeGrau}
                          className={`h-11 w-full appearance-none rounded-lg border border-gray-300  px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 text-gray-800 dark:text-white/90`}
                          >

                            {optionG.map((option) => (
                              <option key={option.value} value={option.value} className="text-gray-700 dark:bg-gray-900 dark:text-gray-400">
                                {option.label}
                              </option>
                            ))}

                          </select>
                            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                            <ChevronDownIcon/>
                            </span>
                        </div>
                    </div>

                     <div>
                        <Label>Class</Label>
                        <div className="relative">
                          <select {...register("classId")} onChange={handleChangeClass}
                          className={`h-11 w-full appearance-none rounded-lg border border-gray-300  px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 text-gray-800 dark:text-white/90`}
                          >

                            {optionC.map((option) => (
                              <option key={option.value} value={option.value} className="text-gray-700 dark:bg-gray-900 dark:text-gray-400">
                                {option.label}
                              </option>
                            ))}

                          </select>
                            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                            <ChevronDownIcon/>
                            </span>
                        </div>
                    </div>
                   
                   

                     <div>
                      <Submit className="w-full" size="sm">
                        Enviar
                      </Submit>
                    </div>
                </div>    
                </form>
            </ComponentCard>
               

            </div>
        </div>
    </div>
  )
}