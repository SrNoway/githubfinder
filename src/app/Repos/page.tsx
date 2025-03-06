'use client';
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { BackBtn } from "@/components/BackBtn";
import { RepoProps } from "@/types/repo";
import { Loader } from "@/components/Loader";
import { Repo } from "@/components/Repo";

// Componente interno que usa useSearchParams
function ReposContent() {
    const searchParams = useSearchParams();
    const username = searchParams.get("username");

    const [repos, setRepos] = useState<RepoProps[] | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!username) return; // Evita chamada desnecessária se username for null

        const loadRepos = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://api.github.com/users/${username}/repos`, {
                    headers: {
                        Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
                    },
                });
                const data = await response.json();
                setRepos(data);
            } catch (error) {
                console.error("Erro ao carregar repositórios:", error);
                setRepos([]);
            } finally {
                setLoading(false);
            }
        };

        loadRepos();
    }, [username]); // Adiciona username como dependência

    return (
        <div className="bg-slate-900 mt-[2rem]">
            <BackBtn />
            <h2 className="text-white text-lg text-center mb-[2rem] font-semibold">
                {`Explore os repositórios do usuário: ${username || "..."}`}
            </h2>
            {loading && <Loader />}
            {repos && repos.length === 0 && <p className="text-white">Nenhum repositório encontrado</p>}
            {repos && repos.length > 0 && (
                <div className="bg-indigo-900 rounded-lg flex flex-col max-w-sm md:max-w-xl mx-auto justify-center flex-wrap p-[2rem] gap-6">
                    {repos.map((repo: RepoProps) => (
                        <Repo key={repo.name} {...repo} />
                    ))}
                </div>
            )}
        </div>
    );
}

// Componente principal com Suspense
export default function Repos() {
    return (
        <Suspense fallback={<div className="text-white text-center mt-[2rem]">Carregando...</div>}>
            <ReposContent />
        </Suspense>
    );
}