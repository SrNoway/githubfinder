import { RepoProps } from "@/types/repo"
import { BsCodeSlash } from "react-icons/bs"
import { AiOutlineStar, AiOutlineFork } from "react-icons/ai"
import { RiGitRepositoryLine } from "react-icons/ri"
export const Repo = ({
    name,
    language,
    html_url,
    forks_count,
    stargazers_count }: RepoProps) => {
    return (
        <div className="bg-slate-900 rounded-xl p-[1rem] flex flex-1 flex-col gap-[2rem] border-solid border-2 border-indigo-300 items-start">
            <h3 className="font-semibold">{name}</h3>
            <p>
                <BsCodeSlash />
                {language}
            </p>
            <div className="flex gap-4">
                <div className="flex gap-1 items-center justify-center border rounded-[3px] pr-2">
                    <AiOutlineStar className="bg-teal-300 size-[1.5rem]" />
                    <span>{stargazers_count}</span>
                </div>
                <div className="flex gap-1 items-center justify-center border rounded-[3px] pr-2">
                    <AiOutlineFork className="bg-teal-300 size-[1.5rem]" />
                    <span>{forks_count}</span>
                </div>
            </div>
            <a className="bg-slate-700 flex items-center p-2 text-teal-100 rounded-lg gap-1" href={html_url} target="_blank">
                <span>Ver código</span>
                <RiGitRepositoryLine />
            </a>
        </div>


    )
}
