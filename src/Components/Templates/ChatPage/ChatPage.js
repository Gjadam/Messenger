import { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

// Icons
import { PiUserCircleFill } from "react-icons/pi";
import { IoMdSend } from "react-icons/io";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { MdKeyboard } from "react-icons/md";
import { RiMessage3Fill } from "react-icons/ri";
import { VscDebugDisconnect } from "react-icons/vsc";
import { FaUser } from "react-icons/fa";
import { MdEmojiEmotions } from "react-icons/md";

// Web socket
import { host, webSocketProtocol } from '../../../WebSockekConfig/WebSockekConfig';

// Emoji picker
import Picker from 'emoji-picker-react';

// Components
import NotificationBtn from '../../../Components/Modules/NotificationBtn/NotificationBtn';
import ChatAlert from '../../../Components/Modules/ChatAlert/ChatAlert';
import UserMessage from '../../../Components/Modules/UserMessage/UserMessage';
import ContactMessage from '../../../Components/Modules/ContactMessage/ContactMessage';

// User info
import AuthContext from '../../../context/authContext';

export default function ChatPage({ chatType }) {

    const authContext = useContext(AuthContext)
    const navigate = useNavigate()
    const scrollRef = useRef(null);
    const { targetUserID, chatID } = useParams()
    const [chatScrollTarget, setChatScrollTarget] = useState('')
    const [chatScrollTop, setChatScrollTop] = useState('')
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [isSocketDisconnect, setIsSocketDisconnect] = useState(false);
    const [notificationData, setNotificationData] = useState([])
    const [contactDatas, setContactDatas] = useState([])
    const [messages, setMessages] = useState([])
    const [inputMessage, setInputMessage] = useState('');

    const [ws, setWs] = useState({})
    const [wsUserOnline, setWsUserOnline] = useState(false)

    const localStorageData = JSON.parse(localStorage.getItem("user"))
    // Get time
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();

    // Create Web Socket
    const createNewWebSocket = () => {
        window.location.reload();
    }

    useEffect(() => {
        if (authContext.userInfos.id) {
            if (targetUserID) {
                const newWs = new WebSocket(`${webSocketProtocol}://${host}/chats/server/connect/${authContext.userInfos.id}/${targetUserID}`);
                newWs.onmessage = (event) => {
                    const contactMessage = JSON.parse(JSON.parse(event.data))
                    setMessages(prevState => [...prevState, { role: "Contact", sender_id: contactMessage.sender_id, text: contactMessage.message, date_send: `${hours}:${minutes}` }]);
                }
                newWs.onopen = () => {
                    setWs(newWs);
                };

            }
        }
        ws.onclose = () => {
            setIsSocketDisconnect(true)
        };
    }, [targetUserID])


    const sendMessage = (event) => {
        event.preventDefault()
        if (ws.readyState === WebSocket.OPEN) {
            if (inputMessage.length > 0) {
                const jsonMessage = JSON.stringify({
                    message: inputMessage,
                    sender_id: authContext.userInfos.id,
                    receiver_id: targetUserID
                })
                ws.send(jsonMessage)
                setMessages(prevState => [...prevState, { role: 'User', sender_id: authContext.userInfos.id, text: inputMessage, date_send: `${hours}:${minutes}` }]);
                setShowEmojiPicker(false)
                setInputMessage('')
                if (scrollRef.current) {
                    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
                }
            }
        }
    }

    // User is Online or Offline
    useEffect(() => {
        if (authContext.userInfos.id) {
            if (targetUserID) {
                const newUserOnlineWs = new WebSocket(`${webSocketProtocol}://${host}/chats/server/check_connection/${authContext.userInfos.id}/${targetUserID}`);
                newUserOnlineWs.onmessage = (event) => {
                    setWsUserOnline(event.data);
                }
            }
        }
    }, [wsUserOnline])



    // Notification
    useEffect(() => {
        if (authContext.userInfos.id) {
            const newNotificationWs = new WebSocket(`${webSocketProtocol}://${host}/chats/server/notification/${authContext.userInfos.id}`);
            newNotificationWs.onmessage = (event) => {
                showNotificationHandler(JSON.parse(JSON.parse(event.data)))
            }
        }
    }, [])

    const showNotificationHandler = (notification) => {
        setTimeout(() => {
            setNotificationData('')
        }, 8000);
        setNotificationData(notification)
    }

    const closeNotification = () => {
        setNotificationData('')
    }

    const navigateFromNotificationToChat = (senderID, chatID) => {
        navigate(`/chat/${senderID}/${chatID}`)
        setNotificationData('')
    }


    const closeChat = () => {
        const chatSideBar = document.querySelector(".chatSideBar")
        const chatPage = document.querySelector(".chatPage")
        chatSideBar.classList.add("right-0")
        chatSideBar.classList.remove('right-[50rem]')
        chatPage.classList.add('left-[50rem]')
        chatPage.classList.remove("left-0")
    }



    // Get Contact information from server
    useEffect(() => {
        if (targetUserID) {
            fetch(`https://chattak-alirh.koyeb.app/users/get-by-id/${targetUserID}/`, {
                headers: {
                    'Authorization': `Bearer ${localStorageData.token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setContactDatas(data)
                })
        }
    }, [targetUserID])




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
                    setMessages(data)
                })
        }
    }, [chatID])


    // Chat Scroll Logic
    const chatScroll = (e) => {
        setChatScrollTop(e.target.scrollTop)
        if (scrollRef.current) {
            if (scrollRef.current.scrollTop + scrollRef.current.clientHeight === scrollRef.current.scrollHeight) {
                setChatScrollTarget('end')

            } else {
                setChatScrollTarget('start')
            }
        }
    }

    const scrollToEnd = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }

    useEffect(() => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [targetUserID, chatID]);


    // Emoji Logic
    const handleEmojiClick = (emoji) => {
        setInputMessage(prevState => [prevState + emoji.emoji])
    };


    return (
        <>
            <div className={` h-full w-full ${chatType === 'mobile' ? ' flex md:hidden' : ' hidden md:flex '} ${targetUserID ? 'justify-between' : 'justify-start'} items-start flex-col  w-full   bg-zinc-100 dark:bg-zinc-950 relative`}>
                {/* Start User Information */}
                <div className="px-2 w-full  ">
                    <div className={` flex ${targetUserID ? 'justify-between border-t-2 shadow-sm border-blue-600' : 'justify-end'} items-center rounded-t-2xl z-10 bg-white dark:bg-zinc-900 dark:text-white`}>
                        {
                            targetUserID &&
                            <div className=" flex items-center px-3 py-1">
                                <PiUserCircleFill className='text-5xl text-blue-700 dark:text-gray-300' />
                                <div className=" flex flex-col ms-2">
                                    <span className=' font-bold'>{contactDatas.username}</span>
                                    <div className=" flex justify-start items-center">
                                        {
                                            contactDatas.username === authContext.userInfos.username ? (
                                                null
                                            ) : (
                                                <>
                                                    {
                                                        wsUserOnline === "True" &&
                                                        <span class="relative flex h-2 w-2 mr-1">
                                                            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                                            <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                                                        </span>
                                                    }
                                                    <span className=' text-xs font-semibold '>{wsUserOnline === "True" ? 'online' : 'last seen recently'}</span>
                                                </>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        }
                        <div className="md:hidden p-3" onClick={closeChat}>
                            <AiOutlineMenuUnfold className=' text-2xl hover:-translate-x-0.5 transition-all cursor-pointer text-blue-600  dark:text-zinc-500 dark:hover:text-zinc-600' />
                        </div>
                    </div>
                </div>
                {/* End User Information */}
                {
                    targetUserID ? (
                        <>
                            {/* Start Chat */}
                            <div className=" flex flex-col  w-full z-0 overflow-y-scroll scroll-smooth  px-3 " ref={scrollRef} onScroll={(e) => chatScroll(e)}>
                                {
                                    messages.map(message => (
                                        message.sender_id === +targetUserID ? (
                                            <ContactMessage  {...message} />
                                        ) : (
                                            <UserMessage  {...message} />
                                        )
                                    ))
                                }
                            </div>
                            {/* End Chat */}
                            {/* Start Input Chat */}
                            <form className=" relative flex justify-between items-center w-full mb-2 " onSubmit={(event) => sendMessage(event)}>
                                <div className='ml-2 relative cursor-pointer ' >
                                    <div className={`${showEmojiPicker && ' bg-white dark:bg-zinc-900'} hover:bg-white dark:hover:bg-zinc-900  rounded-full p-2 transition-colors`}>

                                        {
                                            showEmojiPicker ? (
                                                <MdKeyboard className=' text-blue-600 text-3xl md:text-4xl' onClick={() => setShowEmojiPicker(false)} />
                                            ) : (
                                                <MdEmojiEmotions className=' text-blue-600  text-3xl md:text-4xl ' onClick={() => setShowEmojiPicker(true)} />
                                            )
                                        }
                                    </div>
                                    <div className={`${showEmojiPicker ? (' opacity-100') : (" opacity-0")} bg-white rounded-full absolute left-0 bottom-14 z-10 transition-opacity select-none  ease-out`}>
                                        {showEmojiPicker && (
                                            <Picker reactionsDefaultOpen={true} onEmojiClick={handleEmojiClick} />
                                        )}
                                    </div>
                                </div>
                                <div className={` flex justify-center items-center absolute  right-4 bottom-10 bg-zinc-600 shadow-xl dark:bg-zinc-100 h-11 w-11 rounded-full  cursor-pointer ${chatScrollTop > 0 ? (chatScrollTarget === 'end' ? 'opacity-0 invisible translate-y-5' : 'opacity-100 visible -translate-y-5') : ('opacity-0 invisible translate-y-5')} transition-all`} onClick={scrollToEnd}>
                                    <IoIosArrowDown className=' mt-1 text-3xl text-zinc-100 dark:text-blue-600' />
                                </div>
                                <input type="text" placeholder='Message' value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} className='  w-full p-4 h-full rounded-full mx-2  outline-none bg-white dark:bg-zinc-900 dark:text-white' />
                                <button className={` flex justify-center items-center absolute right-3 bottom-4.5 z-10 ${inputMessage.length > 0 && 'bg-blue-600 text-white'} text-blue-600  rounded-full p-2   transition-colors`}>
                                    <IoMdSend className='   pl-1 text-2xl' />
                                </button>
                            </form>
                            {/* End Input Chat */}

                        </>
                    ) : (
                        <ChatAlert />
                    )
                }
                {
                    // Start Notification message
                    <div className={`fixed ${notificationData.sender_id ? ' right-0' : ' -right-[50rem]'} bottom-5 z-50 md:w-96 w-full px-5 transition-all ease-in-out`}>
                        <div className={` flex justify-center items-start flex-col gap-1  p-3 rounded-2xl border-t-2 shadow-md border-blue-600 bg-white dark:bg-zinc-900 `}>
                            <div className=" flex justify-between items-center w-full border-b-1 dark:text-white dark:border-zinc-950 mb-1 pb-2">
                                <span className=' flex items-center  text-sm font-bold'><RiMessage3Fill className=' mr-1  text-xl text-blue-600' /> New Message</span>
                                <span className=' text-sm  font-bold flex items-center'>{notificationData.sender_username}<FaUser className=' text-blue-600 ml-1' /></span>
                            </div>
                            <p className=' text-break text-sm  text-zinc-700 dark:text-zinc-200 mt-1 p-1'>{notificationData.message}</p>
                            <div className=" flex justify-around items-center w-full pt-2 mt-2 border-t-1 dark:border-zinc-950">
                                <div onClick={closeNotification}>
                                    <NotificationBtn text={'Ok'} />
                                </div>
                                <div onClick={() => navigateFromNotificationToChat(notificationData.sender_id, notificationData.chat_id)}>
                                    <NotificationBtn text={'Go to chat'} />
                                </div>
                            </div>
                        </div>
                    </div>
                    // End Notification message
                }
                {
                    // Socket Disconnect Alert
                    isSocketDisconnect &&
                    <div className="fixed inset-0 bg-zinc-950 bg-opacity-90 z-50">
                        <div className=' flex justify-center items-center text-zinc-100  text-center  flex-col h-full'>
                            <VscDebugDisconnect className=' text-9xl   animate-pulse ' />
                            <span className=' text-xl  '>Oops! Chat is disconnected</span>
                            <span className=' mt-1 max-w-48 text-zinc-300 text-sm'>Please refresh the chat to reconnect.</span>
                            <div className=" mt-2" onClick={createNewWebSocket}>
                                <NotificationBtn text={'Refresh chat'} />
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}
