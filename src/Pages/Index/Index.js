import React, { useEffect, useState } from 'react'
import NavBarChat from '../../Components/Modules/NavBarChat/NavBarChat'
import { IoClose } from "react-icons/io5";
import SideBar from '../../Components/Modules/SideBar/SideBar';
import ChatPage from '../../Components/Templates/ChatPage/ChatPage';
export default function Index() {

    const [chats, setChats] = useState([])
    const localStorageData = JSON.parse(localStorage.getItem("user"))

    // Get All Chats From Server
    useEffect(() => {
        if (localStorageData) {
            fetch(`https://chattak-alirh.koyeb.app/chats/`, {
                headers: {
                    'Authorization': `Bearer ${localStorageData.token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setChats(data)
                })
        }
    }, [])


    const openChat = () => {
        const chatSideBar = document.querySelector(".chatSideBar")
        const chatPage = document.querySelector(".chatPage")
        chatSideBar.classList.remove("right-0")
        chatSideBar.classList.add('right-[50rem]')
        chatPage.classList.remove('left-[50rem]')
        chatPage.classList.add("left-0")
    }

    return (
        <>
            <NavBarChat />
            <div className=" flex h-lvh max-h-screen bg-zinc-100 dark: dark:bg-zinc-950  ">
                {/* Start SideBar */}
                <div className=" w-96 md:inline-block hidden overflow-auto bg-white dark:bg-zinc-900 rounded-tr-2xl border-t-2 border-blue-600">
                    <SideBar chats={chats} />
                </div>
                {/* End SideBar */}
                {/* Start Mobile version */}
                <div className=" relative md:hidden w-full h-full overflow-hidden  z-20 ">
                    <div className="chatSideBar absolute top-0 right-0  w-full h-full overflow-auto bg-white dark:bg-zinc-900 rounded-t-2xl border-t-2 border-blue-600 transition-all  ">
                        <SideBar chats={chats} openChat={openChat} />
                    </div>
                    <div className="chatPage absolute top-0 left-[50rem] z-50  w-full h-full transition-all">
                        <ChatPage chatType={'mobile'} />
                    </div>
                </div>
                {/* End Mobile version */}
                <ChatPage chatType={'desktop'} />
            </div >

        </>
    )
}
