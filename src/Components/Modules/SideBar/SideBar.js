import React, { useEffect, useState } from 'react'
import Contact from '../Contact/Contact'
import { MdErrorOutline } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import { PiChatsCircleDuotone } from "react-icons/pi";
import { RiContactsBookFill } from "react-icons/ri";
import { IoClose } from 'react-icons/io5';
import ContactAlert from '../ContactAlert/ContactAlert';
export default function SideBar({ chats }) {
    const [searchValue, setSearchValue] = useState('')
    const [searchData, setSearchData] = useState([])
    const [contacts, setContacts] = useState([])
    const [isContactBoxOpen, setIsContactBoxOpen] = useState(false)
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


    const openContactsBox = () => {
        setIsContactBoxOpen(!isContactBoxOpen)
    }

    return (
        <>
            <div className=" relative">
                <div className="">
                    <div className=" flex justify-start items-center text-blue-600  p-3 border-b-1 dark:border-zinc-950">
                        <span className=' flex items-center font-bold'><PiChatsCircleDuotone className='text-2xl mr-1 ' />Chats</span>
                    </div>
                    {
                        chats.length ? (
                            chats.map(chat => (
                                <Contact key={chat.id} chatID={chat.id} userID={chat.target_user_id} username={chat.target_username} lastOnline={''} type={'contact'} />
                            ))
                        ) : (
                            <ContactAlert text={'chats'} />
                        )
                    }
                </div>
                {/* {
                    searchValue.length ? (
                        searchData.length > 0 ? (
                            <div className=" bg-red-800 dark:bg-zinc-800">
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
                                chats.length ? (
                                    chats.map(chat => (
                                        <Contact key={chat.id} chatID={chat.id} userID={chat.target_user_id} username={chat.target_username} lastOnline={''} type={'contact'} />
                                    ))
                                ) : (
                                    <ContactAlert text={'chats'} />
                                )
                            }
                        </>

                    )
                } */}
                <div className=" fixed left-6  bottom-6 z-50 p-3 rounded-full  bg-blue-600 dark:bg-zinc-700 dark:hover:bg-zinc-800 hover:bg-blue-700 cursor-pointer transition-colors " onClick={openContactsBox}>
                    {
                        isContactBoxOpen ? (
                            <IoClose className='text-2xl text-white' />
                        ) : (
                            <RiContactsBookFill className={` text-2xl text-white`} />
                        )
                    }
                </div>
                <div className={` absolute top-0 bottom-0 ${isContactBoxOpen ? " -left-0" : " -left-[50rem]"}   bg-white dark:bg-zinc-900  w-full  transition-all`}>
                    <div className="  m-2">
                        <input type="search" placeholder='Search' onChange={(e) => setSearchValue(e.target.value)} className=' rounded-full sticky top-0  w-full outline-none px-5 py-2  bg-zinc-100 dark:bg-zinc-800 dark:text-white' />
                        {
                            searchValue.length &&
                                searchData.length > 0 ? (
                                <div className=" rounded-xl mt-1  w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                                    {
                                        searchData?.map(search => (
                                            <Contact key={search.id} userID={search.id} username={search.username} lastOnline={search.last_online} type={'search'} />
                                        ))
                                    }

                                </div>

                            ) : null
                        }
                    </div>
                    <div className=" flex justify-start items-center text-blue-600 mt-5 p-3 border-b-1 dark:border-zinc-950">
                        <span className=' flex items-center font-bold'><RiContactsBookFill className='text-2xl mr-1 ' />Contacts</span>
                    </div>
                    {
                        contacts.length ? (
                            contacts.map(contact => (
                                <Contact key={contact.id} userID={contact.id} username={contact.username} lastOnline={contact.last_online} type={'contact'} />
                            ))
                        ) : (
                            <ContactAlert text={'contacts'} />
                        )
                    }
                </div>
            </div>
        </>
    )
}
