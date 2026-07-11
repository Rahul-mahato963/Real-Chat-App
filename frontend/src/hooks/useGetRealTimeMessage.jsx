import { useEffect } from "react";
import {useSelector, useDispatch} from "react-redux";
import { setMessages } from "../redux/messageSlice";

const getId = (value) => {
    if (!value) return "";
    if (typeof value === "object") return String(value._id || value.id || "");
    return String(value);
};

const useGetRealTimeMessage = () => {
    const {socket} = useSelector(store=>store.socket);
    const {messages} = useSelector(store=>store.message);
    const {authUser, selectedUser} = useSelector(store=>store.user);
    const dispatch = useDispatch();

    useEffect(()=>{
        socket?.on("newMessage", (newMessage)=>{
            const senderId = getId(newMessage?.senderId);
            const receiverId = getId(newMessage?.receiverId);
            const authUserId = getId(authUser?._id);
            const selectedUserId = getId(selectedUser?._id);
            const isCurrentConversation =
                (senderId === authUserId && receiverId === selectedUserId) ||
                (senderId === selectedUserId && receiverId === authUserId);

            if (!isCurrentConversation) return;

            dispatch(setMessages([...(messages || []), newMessage]));
        });
        return () => socket?.off("newMessage");
    },[socket, messages, authUser, selectedUser, dispatch]);
};
export default useGetRealTimeMessage;
