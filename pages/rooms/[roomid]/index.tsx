import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { logInUser, createUser } from "../../api/firebase";
import { useUserContext, useUserUpdateContext } from "../../ContextProvider";
import { useRouter } from "next/router";
import { sendMessage, database } from "../../api/firebase";
import {
  collection,
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { updateCurrentUser } from "firebase/auth";
import {
  useCollection,
  useCollectionData,
} from "react-firebase-hooks/firestore";

const Home = () => {
  const [message, setMessage] = useState("");
  const user = useUserContext();
  const router = useRouter();
  const { roomid } = router.query;

  return (
    <>
      <InputText id={roomid} />
      <MessageBoard id={roomid} />
      <div>UWU {roomid}</div>
    </>
  );
};

const MessageBoard = (id: any) => {
  const [data, setData] = useState<any[]>([]);
  const [mapState, setMap] = useState<any>(false);

  const query = useMemo(() => {
    const query = collection(database, "chat-rooms/1/messages");
    return query;
  }, [id]);

  onSnapshot(query, (snapshot) =>
    setData(snapshot.docs.map((doc) => doc.data()))
  );

  useEffect(() => {
    setMap(
      data.map((msg) => {
        return (
          <Message
            key={1}
            text={msg.text}
            createdat={msg.timestamp}
            userid={msg.userID}
          />
        );
      })
    );
    console.log(data);
  }, []);

  useEffect(() => {
    console.log("getting data");
    onSnapshot(query, (snapshot) =>
      setData(snapshot.docs.map((doc) => doc.data()))
    );
  }, []);

  return <div>{mapState}</div>;
};

interface MessageProps {
  text: string;
  createdat: number;
  userid: string;
}

const Message = ({ text, createdat, userid }: MessageProps) => {
  const [textx, setText] = useState<string>();
  const [uidx, setUid] = useState<string>();
  const [createdatx, setcreatedat] = useState<string>();
  useEffect(() => {
    setText(text);
    setUid(userid);
  }, [text, userid, createdat]);
  return (
    <div>
      <div></div>
      <div></div>
      <div>{textx}</div>
    </div>
  );
};

const InputText = (id: any) => {
  const [message, setMessage] = useState("");
  const user = useUserContext();

  return (
    <>
      <input
        type="text"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />

      <div
        onClick={() => {
          sendMessage(message, user.uid, id.id);
          console.log(id.id);
        }}
      >
        XDD
      </div>
    </>
  );
};

export default Home;
