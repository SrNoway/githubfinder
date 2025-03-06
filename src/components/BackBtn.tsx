'use client'
import { useRouter } from "next/navigation"

export const BackBtn = () => {
    const router = useRouter()
  return (
<button onClick={()=> router.back()} 
className="text-gray bg-indigo-700 transition p-1 hover:bg-indigo-500 rounded-lg px-2 md:px-4 md:p-2 position-absolute top-0 left-0 mt-5 ml-5 absolute">
    Voltar</button>

 
)
}
