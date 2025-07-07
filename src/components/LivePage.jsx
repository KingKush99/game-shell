import React, { useState, useEffect, useRef } from 'react';
import './LivePage.css';
import { translations } from '../translations';

const LivePage = ({ language = 'en', onClose }) => {
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [curseWordFilter, setCurseWordFilter] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [lastMessageTime, setLastMessageTime] = useState(0);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [brickBreakerActive, setBrickBreakerActive] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [emojiHoldTimer, setEmojiHoldTimer] = useState(null);
  const [brickBreakerGame, setBrickBreakerGame] = useState({
    paddle: { x: 150, width: 100 },
    ball: { x: 200, y: 300, dx: 3, dy: -3, radius: 8 },
    bricks: [],
    score: 0,
    gameActive: false
  });
  
  const chatContainerRef = useRef(null);
  const brickBreakerRef = useRef(null);
  const gameLoopRef = useRef(null);

  const t = (key) => translations[language]?.[key] || translations.en[key] || key;

  // Emoji list for picker
  const emojis = [
    '😀', '😂', '🤣', '😊', '😍', '🤔', '😎', '🔥', '💯', '👍',
    '👎', '❤️', '💔', '🎉', '🎊', '🏆', '⚡', '💪', '👏', '🙌',
    '😱', '😭', '🤯', '🥳', '😴', '🤤', '🤮', '💀', '👻', '🤖'
  ];

  // Comprehensive curse word list for multiple languages
  const curseWords = {
    en: ['damn', 'hell', 'shit', 'fuck', 'bitch', 'ass', 'bastard', 'crap', 'piss'],
    es: ['mierda', 'joder', 'puta', 'cabrón', 'coño', 'hostia'],
    fr: ['merde', 'putain', 'connard', 'salope', 'bordel'],
    de: ['scheiße', 'verdammt', 'arschloch', 'hurensohn'],
    it: ['merda', 'cazzo', 'puttana', 'stronzo', 'fottere'],
    pt: ['merda', 'caralho', 'puta', 'filho da puta'],
    ru: ['блядь', 'сука', 'хуй', 'пизда', 'говно'],
    zh: ['操', '妈的', '傻逼', '草泥马'],
    ja: ['くそ', 'ばか', 'あほ', 'ちくしょう'],
    ko: ['씨발', '개새끼', '병신', '좆']
  };

  // Sample chat messages
  const sampleMessages = [
    { id: 1, user: 'ProGamer123', message: 'This tournament is amazing!', timestamp: '14:32', isSubscriber: true },
    { id: 2, user: 'CasualPlayer', message: 'Who do you think will win?', timestamp: '14:33', isSubscriber: false },
    { id: 3, user: 'StreamMod', message: 'Welcome everyone to the finals!', timestamp: '14:34', isSubscriber: true, isMod: true },
    { id: 4, user: 'NewViewer', message: 'First time watching, this is cool!', timestamp: '14:35', isSubscriber: false },
    { id: 5, user: 'VeteranFan', message: 'Been following since season 1', timestamp: '14:36', isSubscriber: true }
  ];

  // Initialize brick breaker game
  const initializeBrickBreaker = () => {
    const bricks = [];
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 8; col++) {
        bricks.push({
          x: col * 50 + 10,
          y: row * 20 + 30,
          width: 45,
          height: 15,
          emoji: emojis[Math.floor(Math.random() * emojis.length)],
          destroyed: false
        });
      }
    }
    
    setBrickBreakerGame(prev => ({
      ...prev,
      bricks,
      ball: { x: 200, y: 300, dx: 3, dy: -3, radius: 8 },
      paddle: { x: 150, width: 100 },
      score: 0,
      gameActive: true
    }));
  };

  // Game loop for brick breaker
  const gameLoop = () => {
    setBrickBreakerGame(prev => {
      if (!prev.gameActive) return prev;
      
      const newGame = { ...prev };
      const { ball, paddle, bricks } = newGame;
      
      // Move ball
      ball.x += ball.dx;
      ball.y += ball.dy;
      
      // Ball collision with walls
      if (ball.x <= ball.radius || ball.x >= 400 - ball.radius) {
        ball.dx = -ball.dx;
      }
      if (ball.y <= ball.radius) {
        ball.dy = -ball.dy;
      }
      
      // Ball collision with paddle
      if (ball.y >= 350 - ball.radius && 
          ball.x >= paddle.x && 
          ball.x <= paddle.x + paddle.width) {
        ball.dy = -ball.dy;
      }
      
      // Ball collision with bricks
      bricks.forEach(brick => {
        if (!brick.destroyed &&
            ball.x >= brick.x && ball.x <= brick.x + brick.width &&
            ball.y >= brick.y && ball.y <= brick.y + brick.height) {
          brick.destroyed = true;
          ball.dy = -ball.dy;
          newGame.score += 10;
        }
      });
      
      // Game over conditions
      if (ball.y > 400) {
        newGame.gameActive = false;
      }
      
      // Win condition
      if (bricks.every(brick => brick.destroyed)) {
        newGame.gameActive = false;
      }
      
      return newGame;
    });
  };

  useEffect(() => {
    setChatMessages(sampleMessages);
  }, []);

  useEffect(() => {
    // Auto-scroll chat to bottom
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Cooldown timer
  useEffect(() => {
    if (cooldownRemaining > 0) {
      const timer = setTimeout(() => {
        setCooldownRemaining(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldownRemaining]);

  // Brick breaker game loop
  useEffect(() => {
    if (brickBreakerActive && brickBreakerGame.gameActive) {
      gameLoopRef.current = setInterval(gameLoop, 16); // ~60 FPS
      return () => clearInterval(gameLoopRef.current);
    }
  }, [brickBreakerActive, brickBreakerGame.gameActive]);

  // Canvas rendering
  useEffect(() => {
    if (brickBreakerActive && brickBreakerRef.current) {
      const canvas = brickBreakerRef.current;
      const ctx = canvas.getContext('2d');
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw bricks
      brickBreakerGame.bricks.forEach(brick => {
        if (!brick.destroyed) {
          ctx.fillStyle = '#4caf50';
          ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
          ctx.fillStyle = '#ffffff';
          ctx.font = '12px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(brick.emoji, brick.x + brick.width / 2, brick.y + brick.height / 2 + 4);
        }
      });
      
      // Draw paddle
      ctx.fillStyle = '#ffd700';
      ctx.fillRect(brickBreakerGame.paddle.x, 350, brickBreakerGame.paddle.width, 10);
      
      // Draw ball
      ctx.beginPath();
      ctx.arc(brickBreakerGame.ball.x, brickBreakerGame.ball.y, brickBreakerGame.ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#ff6b6b';
      ctx.fill();
      ctx.closePath();
    }
  }, [brickBreakerActive, brickBreakerGame]);

  const filterCurseWords = (text) => {
    if (!curseWordFilter) return text;
    
    let filteredText = text;
    Object.values(curseWords).flat().forEach(word => {
      const regex = new RegExp(word, 'gi');
      filteredText = filteredText.replace(regex, '*****');
    });
    return filteredText;
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    if (!isSubscribed) {
      alert(t('mustSubscribeToChat') || 'You must be subscribed to the channel to chat.');
      return;
    }

    // Check cooldown
    const now = Date.now();
    if (now - lastMessageTime < 10000) {
      const remaining = Math.ceil((10000 - (now - lastMessageTime)) / 1000);
      setCooldownRemaining(remaining);
      return;
    }

    const message = {
      id: Date.now(),
      user: 'You',
      message: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSubscriber: true
    };

    setChatMessages(prev => [...prev, message]);
    setNewMessage('');
    setLastMessageTime(now);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleEmojiSelect = (emoji) => {
    setNewMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleEmojiHold = (emoji) => {
    setSelectedEmoji(emoji);
    const timer = setTimeout(() => {
      setBrickBreakerActive(true);
      initializeBrickBreaker();
      setSelectedEmoji(null);
    }, 3000);
    setEmojiHoldTimer(timer);
  };

  const handleEmojiRelease = () => {
    if (emojiHoldTimer) {
      clearTimeout(emojiHoldTimer);
      setEmojiHoldTimer(null);
    }
    setSelectedEmoji(null);
  };

  const handleMouseMove = (e) => {
    if (brickBreakerActive && brickBreakerRef.current) {
      const rect = brickBreakerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      setBrickBreakerGame(prev => ({
        ...prev,
        paddle: { ...prev.paddle, x: Math.max(0, Math.min(300, x - prev.paddle.width / 2)) }
      }));
    }
  };

  return (
    <div className="live-page">
      <div className="live-page-header">
        <button className="back-button" onClick={onClose}>
          ← {t('back') || 'Back'}
        </button>
        <h1>{t('liveStream') || 'Live Stream'}</h1>
      </div>

      <div className="live-content">
        {/* Full Height Video Player Section */}
        <div className="video-section-fullheight">
          <div className="video-player-fullheight">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1"
              title="Live Stream"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Enhanced Chat Section */}
        <div className="chat-section-enhanced">
          <div className="stream-info-compact">
            <h3>{t('tournamentFinals') || 'Tournament Finals'}</h3>
            <p>{t('liveViewers') || 'Viewers'}: 12,543</p>
          </div>

          <div className="chat-header">
            <h3>{t('liveChat') || 'Live Chat'}</h3>
            <div className="chat-controls">
              <label className="filter-toggle">
                <input
                  type="checkbox"
                  checked={curseWordFilter}
                  onChange={(e) => setCurseWordFilter(e.target.checked)}
                />
                {t('filterCurseWords') || 'Filter Curse Words'}
              </label>
            </div>
          </div>

          <div className="chat-messages" ref={chatContainerRef}>
            {chatMessages.map(msg => (
              <div key={msg.id} className={`chat-message ${msg.isMod ? 'mod-message' : ''}`}>
                <span className={`username ${msg.isSubscriber ? 'subscriber' : ''}`}>
                  {msg.isMod && '🛡️'} {msg.user}:
                </span>
                <span className="message-text">
                  {filterCurseWords(msg.message)}
                </span>
                <span className="timestamp">{msg.timestamp}</span>
              </div>
            ))}
          </div>

          <div className="chat-input-section">
            {!isSubscribed && (
              <div className="subscription-notice">
                <p>{t('subscribeToChat') || 'Subscribe to the channel to participate in chat'}</p>
                <button 
                  className="subscribe-button"
                  onClick={() => setIsSubscribed(true)}
                >
                  {t('subscribe') || 'Subscribe'}
                </button>
              </div>
            )}
            
            {isSubscribed && (
              <>
                <div className="emoji-section">
                  <button 
                    className="emoji-button"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  >
                    😀
                  </button>
                  {showEmojiPicker && (
                    <div className="emoji-picker">
                      {emojis.map((emoji, index) => (
                        <button
                          key={index}
                          className="emoji-option"
                          onClick={() => handleEmojiSelect(emoji)}
                          onMouseDown={() => handleEmojiHold(emoji)}
                          onMouseUp={handleEmojiRelease}
                          onMouseLeave={handleEmojiRelease}
                          style={{
                            backgroundColor: selectedEmoji === emoji ? '#ffd700' : 'transparent'
                          }}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="chat-input">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={t('typeMessage') || 'Type a message...'}
                    maxLength={200}
                    disabled={cooldownRemaining > 0}
                  />
                  <button 
                    onClick={handleSendMessage}
                    disabled={cooldownRemaining > 0}
                  >
                    {cooldownRemaining > 0 ? `${cooldownRemaining}s` : (t('send') || 'Send')}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Brick Breaker Mini Game */}
      {brickBreakerActive && (
        <div className="brick-breaker-overlay">
          <div className="brick-breaker-game">
            <div className="game-header">
              <h3>Emoji Brick Breaker</h3>
              <div className="game-score">Score: {brickBreakerGame.score}</div>
              <button 
                className="close-game"
                onClick={() => setBrickBreakerActive(false)}
              >
                ✕
              </button>
            </div>
            <canvas
              ref={brickBreakerRef}
              width="400"
              height="400"
              className="game-canvas"
              onMouseMove={handleMouseMove}
            />
            {!brickBreakerGame.gameActive && (
              <div className="game-over">
                <p>Game Over! Final Score: {brickBreakerGame.score}</p>
                <button onClick={initializeBrickBreaker}>Play Again</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Canvas rendering for brick breaker */}
      {brickBreakerActive && (
        <canvas
          ref={brickBreakerRef}
          width="400"
          height="400"
          style={{ display: 'none' }}
        />
      )}
    </div>
  );
};

export default LivePage;

