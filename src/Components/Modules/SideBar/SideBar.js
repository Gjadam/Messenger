import React, { useEffect, useState } from 'react'
import Contact from '../Contact/Contact'
import { MdErrorOutline } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import { PiChatsCircleDuotone } from "react-icons/pi";
import { RiContactsBookFill } from "react-icons/ri";
import { IoClose } from 'react-icons/io5';
import ContactAlert from '../ContactAlert/ContactAlert';
import HeaderSideBar from '../HeaderSideBar/HeaderSideBar';
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
                    <HeaderSideBar icon={<PiChatsCircleDuotone className='text-2xl mr-1 ' />} text={'chats'} />
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
                <div className=" group fixed left-6  bottom-6 z-50 p-3 rounded-full  bg-blue-600 dark:bg-zinc-700 dark:hover:bg-zinc-800 hover:bg-blue-700 cursor-pointer transition-colors " onClick={openContactsBox}>
                    {
                        isContactBoxOpen ? (
                            <IoClose className='text-2xl text-white' />
                        ) : (
                            <>
                                <RiContactsBookFill className={` text-2xl text-white`} />
                            </>
                        )
                    }
                    <div className=" absolute left-0 opacity-0 top-3 group-hover:left-12 group-hover:opacity-100  transition-all delay-75 ease-out ">
                        <span className=' text-sm ml-1 font-bold text-blue-600 dark:text-zinc-100'>Contacts</span>
                    </div>
                </div>
                <div className={` absolute top-0 bottom-0 ${isContactBoxOpen ? " -left-0" : " -left-[50rem]"}    w-full  transition-all`}>
                    <div className="bg-white dark:bg-zinc-900 w-full h-full">

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
                    <HeaderSideBar icon={<RiContactsBookFill className='text-2xl mr-1 ' />} text={'Contacts'} />
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
            </div>
        </>
    )
}
