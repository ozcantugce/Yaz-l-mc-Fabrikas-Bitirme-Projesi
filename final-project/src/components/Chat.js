import { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import '../stiller/Chat.css';

export const Chat = (props) => {
    const { room } = props
    const [newMessage, setNewMessage] = useState("");
    const [mesajlar, setMesajlar] = useState([])
    const mesajlasmaRef = collection(db, "mesajlasma");



    useEffect(() => {
        const queryMessages = query(mesajlasmaRef, 
            where("room", "==", room), 
            orderBy("createdAt")
            );
        const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
            let mesajlar = [];
            snapshot.forEach((doc) => {
                mesajlar.push({ ...doc.data(), id: doc.id });

            });
            setMesajlar(mesajlar);

        });
        return () => unsuscribe();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newMessage === "") return;

        await addDoc(mesajlasmaRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room,
        });
        setNewMessage("")


    };


    return <div className="sohbet-uyg shadow p-3 mb-5 bg-body-tertiary rounded" style={{marginTop:"35px"}}>
        <div className="baslik">
            <h1>
                {room.toUpperCase()} Odasına Hoşgeldiniz!
            </h1>
        </div>
        <div className="mesajlar">
            {mesajlar.map((message) => (
                <div className="mesaj" key={message.id}>
                    <span className="kullanici"> {message.user}</span>
                    : {message.text}
                </div>
            ))}</div>
        <form onSubmit={handleSubmit}
            className="yeni-mesaj-formu">
            <input className="yeni-mesaj-yeri border-dark-subtle"
                placeholder="Mesajınızı buraya yazınız..."
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}>
            </input>
            <button type="submit" className="btn btn-primary" style={{width: "150px", textAlign: "center", marginLeft: "290px"}}>
                Gönder
            </button>
        </form>
    </div>
};

