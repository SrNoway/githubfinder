type SearchProps = {
    loadUser: (username: string) => Promise<void>
};
import { useState, KeyboardEvent } from "react"
import { BsSearch } from "react-icons/bs"
export const Search = ({ loadUser }: SearchProps) => {
    const [username, setUsername] = useState("");

    const handlekeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            loadUser(username)
        }
    }

    return (
        <div className="flex flex-col items-center rounded-xl space-y-4 text-white bg-indigo-900 p-6 md:p-10 md:px-20">
            <h2 className="font-bold text-[1.2rem] md:text-3xl ">Busque por um usuário:</h2>
            <p className="text-center text-gray-300">Conheça seus melhores repositórios</p>
            <div className="flex flex-row md:flex-row gap-2 md:w-auto" >
                <input
                    className="py-1 rounded-xl p-4 text-slate-600"
                    type="text"
                    placeholder="Digite o nome do usuário"
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={handlekeyDown}
                />
                <button
                    className="bg-gray-300 rounded-lg p-2 hover:text-gray-100 hover:bg-gray-300"
                    onClick={() => loadUser(username)}
                >
                    <BsSearch />
                </button>

            </div>
        </div>
    )
}
