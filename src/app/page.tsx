'use client'
import { Search } from "@/components/Search";
import { UserProps } from "@/types/user";
import { useState } from "react";
import { User } from "@/components/User";
import { Error } from "@/components/Error";
import { Loader } from "@/components/Loader";
export default function Home() {
  const [error, setError] = useState(false)
  const [user, setUser] = useState<UserProps | null>(null)
  const [loading, setLoading] = useState(false)

  const loadUser = async (username: string) => {
    setLoading(true)
    setError(false)
    setUser(null)


    const res = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
      }
    })

    const data = await res.json()

    setLoading(false)

    if(res.status === 404){
      setError(true)
      return
    }

    const {avatar_url, login, location, followers, following} = data

    const userData: UserProps = {
      avatar_url,
      login,
      location,
      followers,
      following
    };

    setUser(userData)
  };


  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      
      
      <Search loadUser={loadUser} />
      {loading && <Loader />}
      <div className="text-white">
        {user && <User{...user}/>}
        {error && <Error />}
      </div>


    </div>
  );
}