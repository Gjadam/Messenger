import React, { useContext, useEffect, useState } from 'react'
import NavBarChat from '../../Components/Modules/NavBarChat/NavBarChat'
import { PiUserCircleFill } from "react-icons/pi";
import { IoMdSend } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { RiMenuUnfoldLine } from "react-icons/ri";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import SideBar from '../../Components/Modules/SideBar/SideBar';
import { useNavigate, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import AuthContext from '../../context/authContext';
import ChatAlert from '../../Components/Modules/ChatAlert/ChatAlert';
import UserMessage from '../../Components/Modules/UserMessage/UserMessage';
import ContactMessage from '../../Components/Modules/ContactMessage/ContactMessage';

export default function Index() {

    const authContext = useContext(AuthContext)
    const { userID, chatID } = useParams()
    const [chatScrollTarget, setChatScrollTarget] = useState('')
    const [chatScrollTop, setChatScrollTop] = useState('')
    const [chats, setChats] = useState([])
    const [contactDatas, setContactDatas] = useState([])
    const [prevMessages, setPrevMessages] = useState([])
    const [messages, setMessages] = useState([])
    const [inputMessage, setInputMessage] = useState('');
    const [ws, setWs] = useState({})
    const [wsUserOnline, setWsUserOnline] = useState(false)
    const host = 'chattak-alirh.koyeb.app';
    const protocol = window.location.protocol;
    const webSocketProtocol = protocol === "http:" ? "ws" : "wss";
    const localStorageData = JSON.parse(localStorage.getItem("user"))
    // Get time
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();




    // Create Web Socket
    useEffect(() => {

        const newWs = new WebSocket(`${webSocketProtocol}://${host}/chats/${authContext.userInfos.id}/${userID}`);
        newWs.onmessage = (event) => {
            setMessages(prevState => [...prevState, { role: "Contact", text: event.data, date_send: `${hours}:${minutes}` }]);
        }
        newWs.onopen = () => {
            setWs(newWs);
        };

        const newUserOnlineWs = new WebSocket(`${webSocketProtocol}://${host}/chats/check_connection/${authContext.userInfos.id}/${userID}`);
        newUserOnlineWs.onmessage = (event) => {
            setWsUserOnline(event.data);
        }
    }, [userID])


    const sendMessage = (event) => {
        event.preventDefault()
        if (ws.readyState === WebSocket.OPEN) {
            if (inputMessage.length > 0) {
                ws.send(inputMessage)
                setMessages(prevState => [...prevState, { role: "User", text: inputMessage, date_send: `${hours}:${minutes}` }]);
                setInputMessage('')
            }
        }
    }


    // Sidebar opening classes
    const openSideBar = () => {
        const sideBar = document.querySelector(".side-bar")
        sideBar.classList.remove("opacity-0")
        sideBar.classList.remove("w-0")
        sideBar.classList.add("opacity-100")
        sideBar.classList.add("w-full")
    }

    // Sidebar closing classes
    const closeSideBar = () => {
        const sideBar = document.querySelector(".side-bar")
        sideBar.classList.add("opacity-0")
        sideBar.classList.add("w-0")
        sideBar.classList.remove("opacity-100")
        sideBar.classList.remove("w-full")
    }

    // Get Contact information from server
    useEffect(() => {
        if (userID) {
            fetch(`https://chattak-alirh.koyeb.app/users/get-by-id/${userID}/`, {
                headers: {
                    'Authorization': `Bearer ${localStorageData.token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setContactDatas(data)
                })
        }
    }, [userID])


    // Get All Chats From Server
    useEffect(() => {
        fetch(`https://chattak-alirh.koyeb.app/chats/`, {
            headers: {
                'Authorization': `Bearer ${localStorageData.token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setChats(data)
            })
    }, [])

    // Get All Chat Messages From Server
    useEffect(() => {
        if (chatID) {
            fetch(`https://chattak-alirh.koyeb.app/chats/messages/?chat_id=${chatID}`, {
                headers: {
                    'Authorization': `Bearer ${localStorageData.token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setPrevMessages(data)
                })
        }
    }, [chatID])


    // Chat Scroll Logic
    const chatScroll = (e) => {
        const ScrollChat = document.querySelector('.ScrollChat')
        setChatScrollTop(e.target.scrollTop)
        if (ScrollChat.scrollTop + ScrollChat.clientHeight === ScrollChat.scrollHeight) {
            setChatScrollTarget('end')

        } else {
            setChatScrollTarget('start')
        }
    }
    const scrollToEnd = () => {
        const ScrollChat = document.querySelector('.ScrollChat')
        ScrollChat.scrollTo(0, ScrollChat.scrollHeight)
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
                {/* Start SideBar For Mobile */}
                <div className="side-bar w-0 opacity-0  md:hidden overflow-auto fixed left-0 bottom-0 top-0  z-20 bg-white  transition-all dark:bg-zinc-900" >
                    <div className=" flex justify-between items-center p-2 py-3  bg-blue-600 dark:bg-zinc-950">
                        <div className=" flex items-center">
                            <img src="/images/png/landing-logo.png" class=" w-8 " alt="FlowBite Logo" />
                            <span className='text-white dark:text-blue-600 font-bold'>Let's Chat</span>
                        </div>
                        <IoClose className='text-2xl text-white hover:text-red-700 transition-colors cursor-pointer' onClick={closeSideBar} />
                    </div>
                    <SideBar chats={chats} />
                </div>
                {/* End SideBar For Mobile */}
                <div className={` flex ${contactDatas.id ? 'justify-between' : 'justify-start'} items-start flex-col  w-full   bg-zinc-100 dark:bg-zinc-950 relative`}>
                    {/* Start User Information */}
                    <div className="px-2 w-full ">
                        <div className={` flex ${contactDatas.id ? 'justify-between border-t-2 border-blue-600' : 'justify-end'} items-center rounded-t-2xl z-10 bg-white dark:bg-zinc-900 dark:text-white`}>
                            {
                                contactDatas.id &&
                                <div className=" flex items-center px-3 py-1">
                                    <PiUserCircleFill className='text-5xl text-blue-600 dark:text-zinc-300' />
                                    <div className=" flex flex-col ms-2">
                                        <span className=' font-bold'>{contactDatas.username}</span>
                                        <div className=" flex justify-start items-center">
                                            {
                                                wsUserOnline === "True" &&
                                                <span class="relative flex h-2 w-2 mr-1">
                                                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                                    <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                                                </span>
                                            }
                                            <span className=' text-xs font-semibold '>{wsUserOnline === "True" ? 'online' : 'last seen recently'}</span>
                                        </div>
                                    </div>
                                </div>
                            }
                            <div className="md:hidden p-3" onClick={openSideBar}>
                                <RiMenuUnfoldLine className=' text-2xl text-blue-600 hover:text-blue-500 dark:text-zinc-500 dark:hover:text-zinc-600  transition-colors cursor-pointer' />
                            </div>
                        </div>
                    </div>
                    {/* End User Information */}
                    {
                        contactDatas.id ? (
                            <>
                                {/* Start Chat */}
                                <div className="ScrollChat  flex flex-col  w-full z-0 overflow-y-scroll  scroll-smooth  px-3 " onScroll={(e) => chatScroll(e)}>
                                    {
                                        chatID &&
                                        prevMessages.map(prevMessage => (
                                            prevMessage.sender_id === +userID ? (
                                                <ContactMessage {...prevMessage} />
                                            ) : (
                                                <UserMessage {...prevMessage} />
                                            )
                                        ))
                                    }
                                    {
                                        messages.map(message => (
                                            message.role === "User" ? (
                                                <UserMessage {...message} />
                                            ) : (
                                                <ContactMessage {...message} />
                                            )
                                        ))
                                    }
                                </div>
                                {/* End Chat */}
                                {/* Start Input Chat */}
                                <form className=" relative flex justify-between items-center w-full mb-2 " onSubmit={(event) => sendMessage(event)}>
                                    <div className={` flex justify-center items-center absolute  right-4 bottom-10 bg-zinc-600 shadow-xl dark:bg-zinc-100 h-11 w-11 rounded-full  cursor-pointer ${chatScrollTop > 0 ? (chatScrollTarget === 'end' ? 'opacity-0 invisible translate-y-5' : 'opacity-100 visible -translate-y-5') : ('opacity-0 invisible translate-y-5')} transition-all`} onClick={scrollToEnd}>
                                        <IoIosArrowDown className=' mt-1 text-3xl text-zinc-100 dark:text-blue-600' />
                                    </div>
                                    <input type="text" placeholder='Message' value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} className='  w-full p-4 h-full rounded-full mx-2  outline-none bg-white dark:bg-zinc-900 dark:text-white' />
                                    <button className='absolute right-5 bottom-4.5 z-10 p-1 bg-white dark:bg-zinc-900 '>
                                        <IoMdSend className='  text-blue-600 text-2xl' />
                                    </button>
                                </form>
                                {/* End Input Chat */}

                            </>
                        ) : (
                            <ChatAlert />
                        )
                    }
                </div>
            </div >
        </>
    )
}
