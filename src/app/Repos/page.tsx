'use client'
import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { BackBtn } from "@/components/BackBtn"
import { RepoProps } from "@/types/repo"
import { Loader } from "@/components/Loader"
import { Repo } from "@/components/Repo"

function ReposContent() {
    const searchParams = useSearchParams()
    const username = searchParams.get("username")


    const [user, setUser] = useState<string | null>(null)

    useEffect(() => {
        if (username) {
            setUser(username)
        }
    }, [])

    const [repos, setRepos] = useState<RepoProps[] | [] | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        setLoading(true);

        const loadRepos = async function (username: string | null) {
            const repos = await fetch(`https://api.github.com/users/${username}/repos`, {
                headers: {
                    Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
                }
            });

            const data = await repos.json();
            setLoading(false);
            setRepos(data);

            console.log(data);
        }


        loadRepos(username);

    }, [username]);

    return (
        <div className="bg-slate-900 mt-[2rem]" >
            <BackBtn />
            <h2 className="text-white text-lg text-center mb-[2rem] font-semibold">
                {`Explore os repositórios do usuário: ${username}`}
            </h2>
            {loading && <Loader />}
            {repos && repos.length === 0 && <p className="text-white">Nenhum repositório encontrado</p>}
            {repos && repos.length > 0 && (
                <div className="bg-indigo-900 rounded-lg flex flex-col max-w-sm md:max-w-xl  mx-auto justify-center flex-wrap p-[2rem] gap-6">
                    {repos.map((repo: RepoProps) => (
                        <Repo key={repo.name} {...repo} />

                    ))}
                </div>
            )}
        </div>
    )
}
export default function Repos() {
    return (
        <Suspense fallback={<div className="text-white text-center mt-[2rem]">Carregando...</div>}>
            <ReposContent />
        </Suspense>
    );
}