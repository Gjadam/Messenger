import React, { useEffect, useState } from 'react'
import Contact from '../Contact/Contact'
import { MdErrorOutline } from "react-icons/md";
export default function SideBar() {
    const [searchValue, setSearchValue] = useState('')
    const [searchData, setSearchData] = useState([])
    const localStorageData = JSON.parse(localStorage.getItem("user"))

    const getSearchData = () => {
        fetch(`https://chattak-alirh.koyeb.app/users/search/?username=${searchValue}`, {
            headers: {
                'Authorization': `Bearer ${localStorageData.token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setSearchData(data)
            })
    }


    useEffect(() => {
        // Get Search Datas from server
        if (searchValue.length > 0) {
            getSearchData()
        }
    }, [searchValue])

    console.log(searchData);
    return (
        <>
            <div className="">
                <input type="search" placeholder='Search' onChange={(e) => setSearchValue(e.target.value)} className='  sticky top-0 w-full border-b-1 outline-none px-5 py-6 dark:bg-zinc-900 dark:border-zinc-950 dark:text-white' />
                {
                    searchValue.length ? (
                        searchData.length > 0 ? (
                        <div className=" bg-zinc-100">
                            {
                                searchData?.map(search => (
                                    <Contact username={search.username} lastOnline={search.last_online} />
                                ))
                            }

                        </div>

                        ) : (
                            <div className=" flex justify-center items-center flex-col gap-2 mt-10">
                                <MdErrorOutline className=' text-zinc-400 text-6xl' />
                                <span className=' text-zinc-400'>This user could not be found</span>
                            </div>
                        )
                    ) : (
                        <>
                            <Contact username={'test name'} lastOnline={"long time ago"} />
                            <Contact username={'test name'} lastOnline={"long time ago"} />
                            <Contact username={'test name'} lastOnline={"long time ago"} />
                            <Contact username={'test name'} lastOnline={"long time ago"} />
                            <Contact username={'test name'} lastOnline={"long time ago"} />
                            <Contact username={'test name'} lastOnline={"long time ago"} />
                            <Contact username={'test name'} lastOnline={"long time ago"} />
                        </>

                    )
                }
            </div>
        </>
    )
}
