import React, { useEffect, useState } from 'react'
import Contact from '../Contact/Contact'
import { MdErrorOutline } from "react-icons/md";
import { BsEmojiSmile } from "react-icons/bs";
import { NavLink } from 'react-router-dom';
export default function SideBar() {
    const [searchValue, setSearchValue] = useState('')
    const [searchData, setSearchData] = useState([])
    const [contacts, setContacts] = useState([])
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

    useEffect(() => {
        fetch(`https://chattak-alirh.koyeb.app/users/contacts/`, {
            headers: {
                'Authorization': `Bearer ${localStorageData.token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setContacts(data)
            })
    }, [searchValue])





    return (
        <>
            <div className="">
                <input type="search" placeholder='Search' onChange={(e) => setSearchValue(e.target.value)} className='  sticky top-0 w-full border-b-1 outline-none px-5 py-6 dark:bg-zinc-900 dark:border-zinc-950 dark:text-white' />
                {
                    searchValue.length ? (
                        searchData.length > 0 ? (
                            <div className=" bg-zinc-100 dark:bg-zinc-800">
                                {
                                    searchData?.map(search => (
                                        <Contact key={search.id} userID={search.id} username={search.username} lastOnline={search.last_online} type={'search'} />
                                    ))
                                }

                            </div>

                        ) : (
                            <div className=" flex justify-center items-center flex-col gap-2 mt-10 p-5">
                                <MdErrorOutline className=' text-zinc-600 text-6xl' />
                                <span className=' text-zinc-600'>This user could not be found</span>
                            </div>
                        )
                    ) : (
                        <>
                            {
                                contacts.length ? (
                                    contacts.map(contact => (
                                        <Contact key={contact.id} userID={contact.id} username={contact.username} lastOnline={contact.last_online} type={'contact'} />
                                    ))
                                ) : (
                                    <div className=" flex justify-center items-center flex-col gap-2 mt-10 p-5">
                                        <BsEmojiSmile className=' text-zinc-700 text-6xl dark:text-zinc-300' />
                                        <span className=' text-zinc-700 font-bold text-center dark:text-zinc-300'>You have no contacts on OnlyChat yet</span>
                                        <ul className=' list-disc mt-3'>
                                            <li className='text-zinc-500 dark:text-zinc-400 text-sm leading-6'>Search people by username </li>
                                            <li className='text-zinc-500 dark:text-zinc-400 text-sm leading-6'>Invite friends to try OnlyChat</li>
                                        </ul>
                                    </div>
                                )
                            }
                        </>

                    )
                }
            </div>
        </>
    )
}
