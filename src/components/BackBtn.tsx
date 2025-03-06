'use client'
import { useRouter } from "next/navigation"

export const BackBtn = () => {
    const router = useRouter()
  return (
<button onClick={()=> router.back()} 
className="text-gray bg-indigo-700 transition p-1.5 hover:bg-indigo-500 rounded-lg px-4 position-absolute top-0 left-0 mt-5 ml-5 absolute">
    Voltar</button>

 
)
}
