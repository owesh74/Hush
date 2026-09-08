import React, { useState, useEffect, useRef } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useParams
} from 'react-router-dom';

import axios from 'axios';
import io from 'socket.io-client';

import {
  RiSendPlane2Line,
  RiAttachment2,
  RiHome5Line,
  RiMessage3Line,
  RiInformationLine,
  RiLock2Line,
  RiGroupLine,
  RiShieldCheckLine,
  RiLogoutBoxRLine,
  RiCloseLine,
  RiMenuLine,
  RiUser3Line,
  RiArrowLeftLine
} from 'react-icons/ri';

import './App.css';


const DraggableSticker = ({ src, className, alt = "" }) => {
  const [position, setPosition] = useState(null);
  const dragging = React.useRef(false);
  const offset = React.useRef({ x: 0, y: 0 });

  const handlePointerDown = (e) => {
    e.preventDefault();

    const rect = e.currentTarget.getBoundingClientRect();

    dragging.current = true;

    offset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!dragging.current) return;

    setPosition({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    });
  };

  const handlePointerUp = (e) => {
    dragging.current = false;

    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <img
      src={src}
      alt={alt}
      className={`hush-sticker ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={
        position
          ? {
            left: `${position.x}px`,
            top: `${position.y}px`,
            right: "auto",
            bottom: "auto",
          }
          : undefined
      }
    />
  );
};

/* =========================================================
   CONFIG
   ========================================================= */

const API_URL = import.meta.env.VITE_API_BASE_URL;

const socket = io.connect(API_URL);


/* =========================================================
   HELPERS
   ========================================================= */

const showNotification = (title, body) => {
  if (
    "Notification" in window &&
    Notification.permission === 'granted' &&
    document.hidden
  ) {
    new Notification(title, {
      body,
      icon: '/vite.svg'
    });
  }
};


const formatTime = (isoString) => {
  if (!isoString) return '';

  return new Date(isoString).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });
};


const getDateLabel = (dateString) => {
  const date = new Date(dateString);

  const today = new Date();

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  }

  if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  }

  return date.toLocaleDateString();
};


/* =========================================================
   LANDING
   ========================================================= */

const Landing = () => {
  const navigate = useNavigate();

  const requestNotifs = () => {
    if (
      "Notification" in window &&
      Notification.permission === "default"
    ) {
      Notification.requestPermission();
    }
  };

  const startChat = () => {
    requestNotifs();
    navigate("/join");
  };

  return (
    <div className="hush-home">

      {/* ================= NAVBAR ================= */}

      <nav className="home-navbar">

        <div className="home-logo">

          <div className="home-logo-icon">
            H
          </div>

          <span>
            Hush
          </span>

        </div>


        <div className="home-nav-links">

          <a className="active" href="#home">
            Home
          </a>

        </div>


        <button
          className="home-start-btn"
          onClick={startChat}
        >
          Start Chatting
        </button>

      </nav>


      {/* ================= HERO ================= */}

      <section
        className="home-hero"
        id="home"
      >

        {/* LEFT */}

        <div className="hero-content">

          <div className="hero-eyebrow">
            PRIVATE • REAL-TIME • ANONYMOUS
          </div>


          <h1>

            Chat Freely.

            <span>
              Stay Anonymous.
            </span>

          </h1>


          <p className="hero-description">

            Hush lets you meet and talk to strangers
            from around the world — no sign up,
            no personal info, just real conversations.

          </p>


          <button
            className="hero-cta"
            onClick={startChat}
          >

            <RiMessage3Line />

            <span>
              Start a Random Chat
            </span>

            <span className="cta-arrow">
              →
            </span>

          </button>


          <div className="hero-note">

            No account. No data. Just people.

          </div>

        </div>


        {/* ================= PHONE / CHAT PREVIEW ================= */}

        <div className="hero-visual">

          <div className="hero-phone-glow"></div>

          <img
            src="/hush-phone.png"
            alt="Hush chat application"
            className="hush-phone-image"
          />

          <div className="floating-note note-left">
            Different
            <br />
            people.
            <br />
            New perspectives.
          </div>

          <div className="floating-arrow arrow-left">
            ↙
          </div>

          <div className="floating-note note-right">
            Good
            <br />
            conversations
            <br />
            go further.
          </div>

          <div className="floating-arrow arrow-right">
            ↙
          </div>

        </div>
      </section>


      {/* ================= FEATURES ================= */}

      <section
        className="home-features"
        id="features"
      >


        <div className="feature-item">

          <div className="feature-icon anonymous">
            <RiShieldCheckLine />
          </div>

          <h3>
            100% Anonymous
          </h3>

          <p>
            No sign up, no personal info,
            <br />
            no tracking.
          </p>

        </div>


        <div className="feature-item">

          <div className="feature-icon people">
            <RiGroupLine />
          </div>

          <h3>
            Meet New People
          </h3>

          <p>
            Chat with strangers from
            <br />
            anywhere in the world.
          </p>

        </div>


        <div
          className="feature-item"
          id="safety"
        >

          <div className="feature-icon safe">
            <RiShieldCheckLine />
          </div>

          <h3>
            A Safer Space
          </h3>

          <p>
            Respectful conversations
            <br />
            and reporting tools.
          </p>

        </div>


        <div
          className="feature-item"
          id="about"
        >

          <div className="feature-icon global">
            ◎
          </div>

          <h3>
            Global Community
          </h3>

          <p>
            Different cultures. New ideas.
            <br />
            Bigger perspectives.
          </p>

        </div>

      </section>

    </div>
  );
};

/* =========================================================
   CREATE GROUP
   ========================================================= */

const CreateGroup = () => {
  const [groupName, setGroupName] = useState('');
  const [charName, setCharName] = useState('');
  const [pin, setPin] = useState('');

  const [error, setError] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();

  const handlePreCheck = () => {
    if (!groupName.trim()) {
      setError("Please enter a Room Name.");
      return;
    }

    setError('');
    setShowConfirm(true);
  };

  const handleCreate = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/api/groups`,
        {
          groupName,
          characterName: charName,
          pin
        }
      );

      setShowConfirm(false);

      navigate(`/group/${res.data.groupName}`);

    } catch (err) {

      setShowConfirm(false);

      setError(
        err.response?.data?.error ||
        "Error creating room"
      );
    }
  };

  return (
    <div className="hush-auth-page">

      {/* BACKGROUND */}
      <div className="hush-bg-image"></div>


      {/* FLOATING STICKERS */}
      <DraggableSticker
        src="/sticker-left.png"
        className="sticker-left"
        alt=""
      />

      <DraggableSticker
        src="/sticker-right.png"
        className="sticker-right"
        alt=""
      />

      {/* BACK BUTTON */}
      <button
        className="hush-back-button"
        onClick={() => navigate('/')}
        aria-label="Go back"
      >
        ←
      </button>


      {/* BRAND */}
      <div className="hush-auth-brand">

        <div className="hush-auth-logo">
          H
        </div>

        <h1>
          Hush
        </h1>

        <p>
          Real Conversations. No Identities.
        </p>

      </div>


      {/* CREATE ROOM CARD */}
      <div className="hush-room-card create-room-card">


        {/* TABS */}
        <div className="hush-room-tabs">

          <button
            className="hush-room-tab"
            type="button"
            onClick={() => navigate('/join')}
          >
            Join Room
          </button>


          <button
            className="hush-room-tab active"
            type="button"
          >
            Create Room
          </button>

        </div>


        {/* FORM */}
        <div className="hush-room-form">

          <label>
            Create Your Room
          </label>

          <p className="hush-room-description">
            Start a private conversation without creating an account.
          </p>


          {/* ROOM NAME */}
          <div className="hush-input-wrapper">

            <span className="hush-input-icon">
              #
            </span>

            <input
              className="hush-room-input"
              placeholder="Enter a unique room name"
              value={groupName}
              onChange={(e) => {
                setGroupName(e.target.value);
                setError('');
              }}
            />

          </div>


          <div className="create-input-hint">
            Anyone with the room name can find it.
          </div>


          {/* DIVIDER */}
          <div className="create-divider">
            <span>OPTIONAL</span>
          </div>


          {/* CHARACTER NAME */}
          <label>
            Character Name
          </label>

          <div className="hush-input-wrapper">

            <span className="hush-input-icon">
              👤
            </span>

            <input
              className="hush-room-input"
              placeholder="Choose your anonymous name"
              value={charName}
              onChange={(e) => {
                setCharName(e.target.value);
                setError('');
              }}
            />

          </div>


          {/* PIN */}
          <label>
            4-Digit PIN
          </label>

          <div className="hush-input-wrapper">

            <span className="hush-input-icon">
              🔒
            </span>

            <input
              className="hush-room-input"
              placeholder="Create a PIN"
              type="password"
              inputMode="numeric"
              maxLength={4}
              value={pin}
              onChange={(e) => {
                setPin(
                  e.target.value.replace(/\D/g, '')
                );

                setError('');
              }}
            />

          </div>


          {/* ERROR */}
          {error && (
            <div className="hush-room-error">
              {error}
            </div>
          )}


          {/* CREATE BUTTON */}
          <button
            onClick={handlePreCheck}
            className="hush-join-button create-submit-button"
          >
            Create Room →
          </button>

        </div>

      </div>


      {/* SECURITY NOTE */}
      <div className="hush-security-note">

        <span>🔒</span>

        <span>
          No account. No personal information. Just real people.
        </span>

      </div>


      {/* CONFIRMATION MODAL */}
      {showConfirm && (

        <div className="modal-overlay">

          <div className="modal-content">

            <div className="modal-icon">
              <RiLock2Line />
            </div>

            <h3>
              Ready to create?
            </h3>

            <p>
              Your room will be created as
              <strong className="highlight-text">
                {' '}{groupName}
              </strong>.
            </p>

            <div className="modal-actions">

              <button
                className="btn-cancel"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>

              <button
                className="btn-confirm"
                onClick={handleCreate}
              >
                Create Room
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};


/* =========================================================
   JOIN GROUP
   ========================================================= */
const JoinGroup = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleJoin = async () => {
    if (!name.trim()) {
      setError("Please enter the Room Name.");
      return;
    }

    setLoading(true);
    setError('');

    try {
      await axios.get(`${API_URL}/api/groups/${name}`);
      navigate(`/group/${name}`);
    } catch (err) {
      setLoading(false);
      setError("Room does not exist. Please check the name.");
    }
  };

  return (
    <div className="hush-auth-page">

      {/* BACK BUTTON */}
      <div className="hush-bg-image"></div>

      {/* floating stickers */}
      <DraggableSticker
        src="/sticker-left.png"
        className="sticker-left"
        alt=""
      />
      <DraggableSticker
        src="/sticker-right.png"
        className="sticker-right"
        alt=""
      />


      <button
        className="hush-back-button"
        onClick={() => navigate('/')}
        aria-label="Go back"
      >
        ←
      </button>


      {/* TOP BRAND */}

      <div className="hush-auth-brand">

        <div className="hush-auth-logo">
          H
        </div>

        <h1>
          Hush
        </h1>

        <p>
          Real Conversations. No Identities.
        </p>

      </div>


      {/* JOIN CARD */}

      <div className="hush-room-card">

        {/* TABS */}

        <div className="hush-room-tabs">

          <button
            className="hush-room-tab active"
            type="button"
          >
            Join Room
          </button>

          <button
            className="hush-room-tab"
            type="button"
            onClick={() => navigate('/create')}
          >
            Create Room
          </button>

        </div>


        {/* FORM */}

        <div className="hush-room-form">

          <label>
            Enter Room Name
          </label>

          <p className="hush-room-description">
            Type the room name to join the conversation anonymously.
          </p>


          <div className="hush-input-wrapper">

            <span className="hush-input-icon">
              👥
            </span>

            <input
              className="hush-room-input"
              placeholder="Enter room name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleJoin();
                }
              }}
              autoFocus
            />

          </div>


          {error && (
            <div className="hush-room-error">
              {error}
            </div>
          )}


          <button
            onClick={handleJoin}
            className="hush-join-button"
            disabled={loading}
          >
            {loading ? "Checking..." : "Join Room →"}
          </button>

        </div>

      </div>


      {/* SECURITY NOTE */}

      <div className="hush-security-note">
        <span>🔒</span>
        <span>
          No account. No personal information. Just real people.
        </span>
      </div>

    </div>
  );
};


/* =========================================================
   GROUP ROOM
   ========================================================= */

const GroupRoom = () => {

  const { code } = useParams();

  const navigate = useNavigate();


  /* ---------------- AUTH ---------------- */

  const [step, setStep] = useState('auth');

  const [authView, setAuthView] =
    useState('selection');

  const [characters, setCharacters] =
    useState([]);

  const [onlineCharacters, setOnlineCharacters] =
    useState([]);

  const [messages, setMessages] =
    useState([]);

  const [myChar, setMyChar] =
    useState(null);

  const [groupExists, setGroupExists] =
    useState(true);


  const [selectedChar, setSelectedChar] =
    useState(null);

  const [inputName, setInputName] =
    useState('');

  const [inputPin, setInputPin] =
    useState('');

  const [error, setError] =
    useState('');


  /* ---------------- CHAT ---------------- */

  const [msgText, setMsgText] =
    useState('');

  const [replyTo, setReplyTo] =
    useState(null);

  const [isUploading, setIsUploading] =
    useState(false);


  /* ---------------- UI ---------------- */

  const [mobileInfo, setMobileInfo] =
    useState(false);

  const chatEndRef =
    useRef(null);

  const fileInputRef =
    useRef(null);


  /* =========================================================
     FETCH GROUP
     ========================================================= */

  useEffect(() => {
    fetchGroup();
  }, [code]);


  /* =========================================================
     SOCKET
     ========================================================= */

  /* =========================================================
     SOCKET
     ========================================================= */

  useEffect(() => {

    const handleReceiveMessage = (msg) => {

      setMessages(prev => [
        ...prev,
        msg
      ]);

      if (
        myChar &&
        msg.sender !== myChar.name
      ) {

        showNotification(
          `New Message in ${code}`,
          `${msg.sender}: ${msg.fileUrl
            ? 'Sent a file'
            : msg.text
          }`
        );

      }
    };


    // LIVE ONLINE CHARACTERS
    const handleRoomPresence = (onlineList = []) => {

      setOnlineCharacters(
        Array.from(new Set(onlineList))
      );

    };


    socket.on(
      'receive_message',
      handleReceiveMessage
    );

    socket.on(
      'room_presence',
      handleRoomPresence
    );


    return () => {

      socket.off(
        'receive_message',
        handleReceiveMessage
      );

      socket.off(
        'room_presence',
        handleRoomPresence
      );

    };

  }, [code, myChar]);


  /* =========================================================
     AUTO SCROLL
     ========================================================= */

  useEffect(() => {

    chatEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });

  }, [messages, replyTo]);


  /* =========================================================
     FETCH GROUP
     ========================================================= */

  const fetchGroup = async () => {

    try {

      const res = await axios.get(
        `${API_URL}/api/groups/${code}`
      );

      setCharacters(
        res.data.characters
      );

      setMessages(
        res.data.messages
      );

      setGroupExists(true);

    } catch (err) {

      setGroupExists(false);

      setCharacters([]);
    }
  };


  /* =========================================================
     AUTH
     ========================================================= */

  const attemptAuth = async (
    name,
    pin,
    isNew
  ) => {

    if (!name || !pin) {

      setError(
        "Please fill all fields"
      );

      return;
    }


    try {

      await axios.post(
        `${API_URL}/api/groups/${code}/join`,
        {
          name,
          pin,
          isNew
        }
      );


      setMyChar({
        name,
        pin
      });

      socket.emit('presence_join', {
        groupName: code,
        characterName: name
      });

      setStep('chat');


      if (
        "Notification" in window &&
        Notification.permission === 'default'
      ) {
        Notification.requestPermission();
      }


    } catch (err) {

      const errMsg =
        err.response?.data?.error;


      if (
        err.response?.status === 404 &&
        errMsg === "Group not found"
      ) {

        setError(
          "Group does not exist. Create it first."
        );

      } else {

        setError(
          errMsg ||
          "Authentication Failed"
        );
      }
    }
  };


  /* =========================================================
     FILE UPLOAD
     ========================================================= */

  const handleFileSelect = async (e) => {

    const file = e.target.files[0];

    if (!file) return;


    if (
      file.size >
      30 * 1024 * 1024
    ) {

      alert(
        "File is too large! Max 30MB."
      );

      return;
    }


    setIsUploading(true);


    const formData =
      new FormData();

    formData.append(
      'file',
      file
    );


    try {

      const res = await axios.post(
        `${API_URL}/api/upload`,
        formData,
        {
          headers: {
            'Content-Type':
              'multipart/form-data'
          }
        }
      );


      if (res.data.success) {

        const msgData = {

          groupName: code,

          sender: myChar.name,

          text: "",

          replyTo: replyTo,

          fileUrl:
            res.data.fileUrl,

          fileName:
            res.data.fileName,

          fileType:
            res.data.fileType
        };


        await socket.emit(
          'send_message',
          msgData
        );


        setReplyTo(null);
      }

    } catch (err) {

      alert("Upload failed.");

    } finally {

      setIsUploading(false);

      e.target.value = null;
    }
  };


  /* =========================================================
     SEND MESSAGE
     ========================================================= */

  const sendMessage = async () => {

    if (!msgText.trim()) return;


    const msgData = {

      groupName: code,

      sender: myChar.name,

      text: msgText,

      replyTo: replyTo
    };


    await socket.emit(
      'send_message',
      msgData
    );


    setMsgText('');

    setReplyTo(null);
  };


  /* =========================================================
     REPLY
     ========================================================= */

  const handleDoubleTap = (msg) => {

    setReplyTo(msg);
  };


  /* =========================================================
     AUTH SCREEN
     ========================================================= */

  if (step === 'auth') {

    if (!groupExists) {
      return (
        <div className="hush-auth-page">
          <div className="hush-bg-image"></div>

          <DraggableSticker
            src="/sticker-left.png"
            className="sticker-left"
            alt=""
          />

          <DraggableSticker
            src="/sticker-right.png"
            className="sticker-right"
            alt=""
          />

          <button
            className="hush-back-button"
            onClick={() => navigate('/join')}
            aria-label="Go back"
          >
            ←
          </button>

          <div className="hush-auth-brand">
            <div className="hush-auth-logo">H</div>
            <h1>Hush</h1>
            <p>Real Conversations. No Identities.</p>
          </div>

          <div className="hush-room-card">
            <div className="hush-room-form">
              <label>Room Not Found</label>

              <p className="hush-room-description">
                This room does not exist. Check the room name and try again.
              </p>

              <button
                className="hush-join-button"
                onClick={() => navigate('/join')}
                type="button"
              >
                Back to Join Room →
              </button>
            </div>
          </div>

          <div className="hush-security-note">
            <span>🔒</span>
            <span>No account. No personal information. Just real people.</span>
          </div>
        </div>
      );
    }

    const chooseExisting = () => {
      setAuthView('existing');
      setSelectedChar(null);
      setInputName('');
      setInputPin('');
      setError('');
    };

    const chooseNew = () => {
      setAuthView('new');
      setSelectedChar(null);
      setInputName('');
      setInputPin('');
      setError('');
    };

    const loginExisting = () => {
      if (!selectedChar) {
        setError('Please select a character.');
        return;
      }

      if (inputPin.length !== 4) {
        setError('Please enter a 4-digit PIN.');
        return;
      }

      attemptAuth(selectedChar.name, inputPin, false);
    };

    const createCharacter = () => {
      if (!inputName.trim()) {
        setError('Please enter a character name.');
        return;
      }

      if (inputPin.length !== 4) {
        setError('PIN must be exactly 4 digits.');
        return;
      }

      attemptAuth(inputName.trim(), inputPin, true);
    };

    return (
      <div className="hush-auth-page">

        <div className="hush-bg-image"></div>

        <DraggableSticker
          src="/sticker-left.png"
          className="sticker-left"
          alt=""
        />

        <DraggableSticker
          src="/sticker-right.png"
          className="sticker-right"
          alt=""
        />

        <button
          className="hush-back-button"
          onClick={() => navigate('/join')}
          aria-label="Go back"
          type="button"
        >
          ←
        </button>

        <div className="hush-auth-brand">
          <div className="hush-auth-logo">H</div>
          <h1>Hush</h1>
          <p>Real Conversations. No Identities.</p>
        </div>

        <div className="hush-room-card">

          <div className="hush-room-tabs">

            <button
              className={`hush-room-tab ${authView === 'existing' ? 'active' : ''}`}
              type="button"
              onClick={chooseExisting}
            >
              Existing Character
            </button>

            <button
              className={`hush-room-tab ${authView === 'new' ? 'active' : ''}`}
              type="button"
              onClick={chooseNew}
            >
              New Character
            </button>

          </div>

          <div className="hush-room-form">

            {authView === 'selection' && (
              <>
                <label>Enter the Room</label>

                <p className="hush-room-description">
                  Choose how you want to enter this anonymous conversation.
                </p>

                <button
                  className="hush-join-button"
                  type="button"
                  onClick={chooseExisting}
                >
                  Login as Existing Character →
                </button>

                <button
                  className="hush-join-button"
                  type="button"
                  onClick={chooseNew}
                  style={{ marginTop: '12px' }}
                >
                  Create New Character →
                </button>
              </>
            )}

            {authView === 'existing' && (
              <>
                <label>Select Character</label>

                <p className="hush-room-description">
                  Choose your character and enter its 4-digit PIN.
                </p>

                {characters.length === 0 ? (
                  <p className="hush-room-description">
                    No characters exist yet. Create a new character instead.
                  </p>
                ) : (
                  <div className="character-list">
                    {characters.map((character) => (
                      <button
                        key={character._id || character.name}
                        type="button"
                        className={`info-character ${selectedChar?.name === character.name
                          ? 'selected-character'
                          : ''
                          }`}
                        onClick={() => {
                          setSelectedChar(character);
                          setError('');
                        }}
                      >
                        <div className="info-avatar">
                          {character.name?.charAt(0)?.toUpperCase()}
                        </div>
                        <span>{character.name}</span>
                      </button>
                    ))}
                  </div>
                )}

                <label>4-Digit PIN</label>

                <div className="hush-input-wrapper">
                  <span className="hush-input-icon">🔒</span>

                  <input
                    className="hush-room-input"
                    type="password"
                    inputMode="numeric"
                    maxLength={4}
                    placeholder="Enter your PIN"
                    value={inputPin}
                    onChange={(e) => {
                      setInputPin(e.target.value.replace(/\D/g, ''));
                      setError('');
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        loginExisting();
                      }
                    }}
                  />
                </div>

                {error && (
                  <div className="hush-room-error">{error}</div>
                )}

                <button
                  className="hush-join-button"
                  type="button"
                  onClick={loginExisting}
                >
                  Enter Room →
                </button>
              </>
            )}

            {authView === 'new' && (
              <>
                <label>Create Your Character</label>

                <p className="hush-room-description">
                  Choose an anonymous name and protect it with a 4-digit PIN.
                </p>

                <div className="hush-input-wrapper">
                  <span className="hush-input-icon">👤</span>

                  <input
                    className="hush-room-input"
                    placeholder="Choose your anonymous name"
                    value={inputName}
                    onChange={(e) => {
                      setInputName(e.target.value);
                      setError('');
                    }}
                  />
                </div>

                <label>4-Digit PIN</label>

                <div className="hush-input-wrapper">
                  <span className="hush-input-icon">🔒</span>

                  <input
                    className="hush-room-input"
                    type="password"
                    inputMode="numeric"
                    maxLength={4}
                    placeholder="Create a PIN"
                    value={inputPin}
                    onChange={(e) => {
                      setInputPin(e.target.value.replace(/\D/g, ''));
                      setError('');
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        createCharacter();
                      }
                    }}
                  />
                </div>

                {error && (
                  <div className="hush-room-error">{error}</div>
                )}

                <button
                  className="hush-join-button"
                  type="button"
                  onClick={createCharacter}
                >
                  Create & Enter Room →
                </button>
              </>
            )}

          </div>
        </div>

        <div className="hush-security-note">
          <span>🔒</span>
          <span>
            No account. No personal information. Just real people.
          </span>
        </div>

      </div>
    );
  }


  /* =========================================================
     CHAT
     ========================================================= */

  return (

    <div className="chat-layout">


      {/* =====================================================
         SIDEBAR
         ===================================================== */}

      <aside className="chat-sidebar">

        <div className="sidebar-brand">

          <div className="brand-logo">
            H
          </div>

          <span>
            Hush
          </span>

        </div>


        <div className="sidebar-section">

          <span className="sidebar-label">
            NAVIGATION
          </span>


          <button
            className="sidebar-item active"
          >
            <RiMessage3Line />
            <span>Chat</span>
          </button>


          <button
            className="sidebar-item"
            onClick={() =>
              setMobileInfo(true)
            }
          >
            <RiInformationLine />
            <span>Room Info</span>
          </button>

        </div>


        <div className="sidebar-room">

          <span className="sidebar-label">
            CURRENT ROOM
          </span>

          <div className="sidebar-room-card">

            <div className="room-mini-icon">
              #
            </div>

            <div>

              <strong>
                {code}
              </strong>

              <span>
                Private room
              </span>

            </div>

          </div>

        </div>


        <div className="sidebar-bottom">

          <div className="sidebar-anonymous">

            <div className="anonymous-dot"></div>

            <div>

              <strong>
                {myChar.name}
              </strong>

              <span>
                Anonymous
              </span>

            </div>

          </div>


          <button
            className="sidebar-exit"
            onClick={() => {
              socket.emit('presence_leave', {
                groupName: code
              });

              setMyChar(null);
              setOnlineCharacters([]);
              setStep('auth');
              setAuthView('selection');
              setSelectedChar(null);
              setInputName('');
              setInputPin('');
              setError('');
            }}
          >
            <RiLogoutBoxRLine />
            Leave room
          </button>

        </div>

      </aside>


      {/* =====================================================
         MAIN CHAT
         ===================================================== */}

      <main className="chat-main">


        {/* HEADER */}

        <header className="chat-header">

          <div className="mobile-brand">
            <div className="brand-logo">
              H
            </div>
            <span>Hush</span>
          </div>


          <div className="chat-room-title">

            <div className="room-hash">
              #
            </div>

            <div>

              <h3 className="room-name">
                {code}
              </h3>

              <div className="connection-status">

                <span className="status-dot"></span>

                Connected

              </div>

            </div>

          </div>


          <button
            className="mobile-info-button"
            onClick={() =>
              setMobileInfo(true)
            }
          >
            <RiInformationLine />
          </button>

        </header>


        {/* MESSAGES */}

        <div className="chat-area">

          {messages.length === 0 && (

            <div className="empty-chat">

              <div className="empty-chat-icon">
                <RiMessage3Line />
              </div>

              <h3>
                Start the conversation
              </h3>

              <p>
                Say something. You're anonymous here.
              </p>

            </div>

          )}


          {messages.map((m, i) => {

            const showDateSeparator =
              i === 0 ||
              new Date(m.timestamp)
                .toDateString() !==
              new Date(
                messages[i - 1].timestamp
              ).toDateString();


            return (

              <React.Fragment key={i}>

                {showDateSeparator && (

                  <div className="date-separator">
                    {getDateLabel(m.timestamp)}
                  </div>

                )}


                <div
                  className={`msg-row ${m.sender === myChar.name
                    ? 'mine'
                    : ''
                    }`}
                >


                  {m.sender !== myChar.name && (

                    <div className="message-header">

                      <div className="message-avatar">
                        {m.sender
                          ?.charAt(0)
                          ?.toUpperCase()}
                      </div>

                      <span className="msg-meta">
                        {m.sender}
                      </span>

                    </div>

                  )}


                  <div
                    className="msg-bubble"
                    onDoubleClick={() =>
                      handleDoubleTap(m)
                    }
                    title="Double tap to reply"
                  >


                    {m.replyTo && (

                      <div className="reply-context">

                        <strong className="reply-sender">
                          {m.replyTo.sender}
                        </strong>

                        <span>
                          {m.replyTo.text ||
                            '[File]'}
                        </span>

                      </div>

                    )}


                    {m.fileUrl ? (

                      <div className="attachment-box">

                        {m.fileType === 'image' && (

                          <>
                            <img
                              src={m.fileUrl}
                              alt="uploaded"
                              className="chat-image"
                              onClick={() =>
                                window.open(
                                  m.fileUrl,
                                  '_blank'
                                )
                              }
                            />

                            <a
                              href={m.fileUrl}
                              download
                              target="_blank"
                              rel="noopener noreferrer"
                              className="download-btn"
                            >
                              ↓ Download
                            </a>
                          </>

                        )}


                        {m.fileType !== 'image' && (

                          <a
                            href={m.fileUrl}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="file-link"
                          >

                            <span className="file-icon">
                              📄
                            </span>

                            <div>

                              <div>
                                {m.fileName}
                              </div>

                              <small>
                                Click to download
                              </small>

                            </div>

                          </a>

                        )}

                      </div>

                    ) : (

                      <span className="message-text">
                        {m.text}
                      </span>

                    )}


                    <span className="msg-time">
                      {formatTime(m.timestamp)}
                    </span>

                  </div>

                </div>

              </React.Fragment>

            );
          })}


          {isUploading && (

            <div className="uploading-text">
              Uploading file...
            </div>

          )}


          <div ref={chatEndRef} />

        </div>


        {/* INPUT */}

        <div className="input-area">


          {replyTo && (

            <div className="reply-preview-bar">

              <div>

                <span>
                  Replying to
                </span>

                <strong>
                  {replyTo.sender}
                </strong>

              </div>

              <button
                onClick={() =>
                  setReplyTo(null)
                }
              >
                <RiCloseLine />
              </button>

            </div>

          )}


          <div className="input-wrapper">

            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileSelect}
            />


            <button
              className="btn-icon"
              onClick={() =>
                fileInputRef.current.click()
              }
              title="Attach file"
            >
              <RiAttachment2 />
            </button>


            <input
              className="msg-input"
              value={msgText}
              onChange={e =>
                setMsgText(e.target.value)
              }
              placeholder="Message anonymously..."
              onKeyDown={e =>
                e.key === 'Enter' &&
                sendMessage()
              }
            />


            <button
              className="btn-icon send-icon"
              onClick={sendMessage}
              title="Send message"
            >
              <RiSendPlane2Line />
            </button>

          </div>


          <div className="input-hint">
            <span>Double-click a message to reply</span>
            <span>•</span>
            <span>Files up to 30MB</span>
          </div>

        </div>

      </main>


      {/* =====================================================
         RIGHT INFO PANEL
         ===================================================== */}

      <aside
        className={`chat-info-panel ${mobileInfo ? 'mobile-open' : ''
          }`}
      >

        <div className="info-header">

          <div>

            <span className="sidebar-label">
              ROOM
            </span>

            <h3>
              {code}
            </h3>

          </div>


          <button
            className="info-close"
            onClick={() =>
              setMobileInfo(false)
            }
          >
            <RiCloseLine />
          </button>

        </div>


        <div className="info-status">

          <span className="status-dot"></span>

          <div>

            <strong>
              Connected
            </strong>

            <span>
              You're securely connected
            </span>

          </div>

        </div>


        <div className="info-section">

          <span className="sidebar-label">
            CHARACTERS
          </span>


          <div className="member-count">

            <div className="member-icon">
              <RiGroupLine />
            </div>

            <div>
              <strong>
                {onlineCharacters.length}
              </strong>

              <span>
                {onlineCharacters.length === 1
                  ? 'character online'
                  : 'characters online'}
              </span>

            </div>

          </div>


          <div className="character-list">

            {characters.map(c => (

              <div
                className="info-character"
                key={c._id}
              >

                <div className="info-avatar">
                  {c.name
                    ?.charAt(0)
                    ?.toUpperCase()}
                </div>

                <span>
                  {c.name}
                </span>

                {c.name === myChar.name && (
                  <small>
                    You
                  </small>
                )}

              </div>

            ))}

          </div>

        </div>


        <div className="info-section">

          <span className="sidebar-label">
            PRIVACY
          </span>


          <div className="privacy-card">

            <div className="privacy-icon">
              <RiShieldCheckLine />
            </div>

            <div>

              <strong>
                Anonymous by design
              </strong>

              <p>
                No email, phone number or
                account is required.
              </p>

            </div>

          </div>


          <div className="privacy-card">

            <div className="privacy-icon">
              <RiLock2Line />
            </div>

            <div>

              <strong>
                Protected character
              </strong>

              <p>
                Your character is protected
                with a private PIN.
              </p>

            </div>

          </div>

        </div>


        <div className="info-quote">

          <span>
            “Good conversations don't
            need names.”
          </span>

          <small>
            — Hush
          </small>

        </div>

      </aside>


      {/* MOBILE OVERLAY */}

      {mobileInfo && (

        <div
          className="mobile-info-overlay"
          onClick={() =>
            setMobileInfo(false)
          }
        />

      )}

    </div>
  );
};


/* =========================================================
   ADMIN
   ========================================================= */

const Admin = () => {

  const [auth, setAuth] =
    useState(false);

  const [password, setPassword] =
    useState('');

  const [groups, setGroups] =
    useState([]);

  const [search, setSearch] =
    useState('');

  const [expandedGroup, setExpandedGroup] =
    useState(null);


  const login = async () => {

    try {

      await axios.post(
        `${API_URL}/api/admin/login`,
        { password }
      );

      setAuth(true);

      fetchData();

    } catch (e) {

      alert("Invalid Password");
    }
  };


  const fetchData = async () => {

    try {

      const res = await axios.get(
        `${API_URL}/api/admin/groups`,
        {
          headers: {
            'x-admin-password':
              password
          }
        }
      );

      setGroups(res.data);

    } catch (e) {

      console.error(e);
    }
  };


  const deleteGroup = async (id) => {

    if (
      !confirm(
        "Delete this group and ALL its files?"
      )
    ) {
      return;
    }


    await axios.delete(
      `${API_URL}/api/admin/groups/${id}`,
      {
        headers: {
          'x-admin-password':
            password
        }
      }
    );


    fetchData();
  };


  const filteredGroups =
    groups.filter(g =>
      g.groupName
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );


  const toggleDetails = (id) => {

    setExpandedGroup(
      expandedGroup === id
        ? null
        : id
    );
  };


  if (!auth) {

    return (

      <div className="container auth-page">

        <div className="auth-brand admin-brand">

          <div className="small-logo">
            H
          </div>

          <span>
            Hush
          </span>

        </div>


        <div className="card auth-card">

          <span className="eyebrow">
            ADMIN
          </span>

          <h3>
            Admin Panel
          </h3>

          <p className="admin-login-description">
            Manage rooms and monitor
            activity.
          </p>


          <input
            className="auth-input"
            type="password"
            value={password}
            onChange={e =>
              setPassword(e.target.value)
            }
            placeholder="Enter admin password"
            onKeyDown={e =>
              e.key === 'Enter' &&
              login()
            }
          />


          <button
            className="btn-primary"
            onClick={login}
          >
            Login
          </button>

        </div>

      </div>

    );
  }


  return (

    <div className="container admin-container">

      <div className="admin-header">

        <div>

          <div className="eyebrow">
            HUSH ADMIN
          </div>

          <h3>
            Dashboard
          </h3>

        </div>


        <div className="admin-controls">

          <button
            className="btn-secondary"
            onClick={() =>
              setAuth(false)
            }
          >
            Logout
          </button>

          <button
            className="btn-primary"
            onClick={fetchData}
          >
            Refresh
          </button>

        </div>

      </div>


      <div className="card admin-list">

        <input
          className="search-bar"
          placeholder="Search rooms..."
          value={search}
          onChange={e =>
            setSearch(e.target.value)
          }
        />


        {filteredGroups.map(g => (

          <div
            key={g._id}
            className="admin-row"
          >

            <div className="admin-info">

              <div>

                <strong>
                  {g.groupName}
                </strong>

                <small>
                  {g.characters.length} users
                  {' • '}
                  {g.messages.length} messages
                </small>

              </div>


              <div className="admin-actions">

                <button
                  className="btn-secondary small"
                  onClick={() =>
                    toggleDetails(g._id)
                  }
                >
                  {expandedGroup === g._id
                    ? 'Hide'
                    : 'View'}
                </button>


                <button
                  className="btn-danger small"
                  onClick={() =>
                    deleteGroup(g._id)
                  }
                >
                  Delete
                </button>

              </div>

            </div>


            {expandedGroup === g._id && (

              <div className="admin-details">

                <h4>
                  Users & PINs
                </h4>

                <ul className="user-list">

                  {g.characters.map(c => (

                    <li key={c._id}>

                      <span className="highlight-text">
                        {c.name}
                      </span>

                      {' — '}

                      {c.pin}

                    </li>

                  ))}

                </ul>


                <h4>
                  Recent Messages
                </h4>


                <div className="msg-log">

                  {g.messages.length === 0 ? (

                    <p>
                      No messages.
                    </p>

                  ) : (

                    g.messages.map(
                      (m, i) => (

                        <div
                          key={i}
                          className="log-item"
                        >

                          <strong className="highlight-text">
                            {m.sender}:
                          </strong>{' '}

                          {m.fileUrl

                            ? (
                              m.fileType === 'image'
                                ? '[Image]'
                                : `[File: ${m.fileName}]`
                            )

                            : m.text}

                        </div>

                      )
                    )

                  )}

                </div>

              </div>

            )}

          </div>

        ))}

      </div>

    </div>

  );
};


/* =========================================================
   APP ROUTES
   ========================================================= */

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Landing />}
        />

        <Route
          path="/create"
          element={<CreateGroup />}
        />

        <Route
          path="/join"
          element={<JoinGroup />}
        />

        <Route
          path="/group/:code"
          element={<GroupRoom />}
        />

        <Route
          path="/admin"
          element={<Admin />}
        />

      </Routes>

    </BrowserRouter>
  );
}


export default App;