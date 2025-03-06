import { UserProps } from "@/types/user"
import { MdLocationPin } from "react-icons/md"
import Link from "next/link"

export const User = ({ login, avatar_url, location, followers, following }: UserProps) => {
    return (
        <div className="flex flex-col items-center rounded-xl space-y-4 text-white bg-indigo-900 p-[4rem] mt-2 md:p-[8.5rem] ">
            <img className="rounded-full w-32 h-32 md:w-48 md:h-48 border-4 border-indigo-500"
                src={avatar_url}
                alt={login} />
            <h2 className="text-xl md:text-2xl">
                {login}
            </h2>
            {location && (
                <p className="flex items-center text-sm md:text-base">
                    <MdLocationPin className="mr-1 text-teal-300" />
                    <span className="font-semibold text-sm md:text-lg">{location}</span>
                </p>
            )}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-col items-center border-b md:border-b-0 md:border-r border-gray-300 pb-4 md:pb-0 md:pr-4">
                    <p className="font-bold text-sm md:text-lg">Seguidores: </p>
                    <p className="bg-teal-300 px-3 rounded-[3px] mt-1">{followers}</p>
                </div>
                <div className="flex flex-col items-center">
                    <p className="font-bold text-sm md:text-lg">Seguindo:</p>
                    <p className="bg-teal-300 px-3 rounded-[3px] mt-1">{following}</p>
                </div>
            </div>
            <Link href={`/Repos?username=${login}`} className="text-white hover:bg-indigo-600 transition bg-indigo-700 p-4 rounded-xl font-semibold no-underline">Ver melhores projetos</Link>
        </div>
    )
}