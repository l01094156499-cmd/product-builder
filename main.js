
class MenuRecommender extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.menus = [
      { name: '치킨', emoji: '🍗', color: '#f9d423' },
      { name: '피자', emoji: '🍕', color: '#ff7675' },
      { name: '삼겹살', emoji: '🥓', color: '#e84393' },
      { name: '초밥', emoji: '🍣', color: '#00a8ff' },
      { name: '파스타', emoji: '🍝', color: '#fab1a0' },
      { name: '국밥', emoji: '🍲', color: '#a29bfe' },
      { name: '떡볶이', emoji: '🍢', color: '#d63031' },
      { name: '마라탕', emoji: '🍜', color: '#fdcb6e' },
      { name: '돈까스', emoji: '🍱', color: '#00b894' },
      { name: '햄버거', emoji: '🍔', color: '#e17055' },
      { name: '냉면', emoji: '🥣', color: '#74b9ff' },
      { name: '짜장면', emoji: '🍜', color: '#2d3436' }
    ];
    this.render();
  }

  getRandomMenu() {
    const randomIndex = Math.floor(Math.random() * this.menus.length);
    return this.menus[randomIndex];
  }

  render(menu = this.getRandomMenu()) {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        .generator-container {
          background: var(--card-bg, rgba(255, 255, 255, 0.1));
          border-radius: 20px;
          padding: 2.5rem 3rem;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid var(--card-border, rgba(255, 255, 255, 0.2));
          box-shadow: var(--card-shadow, 0 8px 32px 0 rgba(0, 0, 0, 0.37));
          text-align: center;
          transition: all 0.3s ease;
          min-width: 320px;
        }
        h2 {
          font-size: 2.2rem;
          font-weight: 700;
          color: var(--title-color, #fff);
          text-shadow: 0 4px 15px rgba(0,0,0,0.1);
          margin-top: 0;
          margin-bottom: 0.5rem;
          transition: color 0.3s ease;
          font-family: 'Noto Sans KR', sans-serif;
        }
        .subtitle {
            margin: 0 0 2.5rem 0;
            font-size: 1.1rem;
            font-weight: 400;
            color: var(--subtitle-color, rgba(255, 255, 255, 0.85));
            text-shadow: 0 2px 5px rgba(0,0,0,0.05);
            transition: color 0.3s ease;
            font-family: 'Noto Sans KR', sans-serif;
        }
        .menu-display {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }
        @keyframes pop-in {
          0% {
            opacity: 0;
            transform: scale(0.5) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .menu-emoji {
          font-size: 5rem;
          animation: pop-in 0.5s ease-out forwards;
        }
        .menu-name {
          font-size: 2.5rem;
          font-weight: 700;
          color: ${menu.color};
          text-shadow: 0 2px 10px rgba(0,0,0,0.1);
          animation: pop-in 0.5s ease-out 0.1s forwards;
          opacity: 0;
          font-family: 'Noto Sans KR', sans-serif;
        }
        button {
          font-family: 'Noto Sans KR', sans-serif;
          font-size: 1.2rem;
          font-weight: 600;
          color: #fff;
          background: linear-gradient(145deg, #0d6efd, #0a58ca);
          border: none;
          border-radius: 50px;
          padding: 1rem 2.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 5px 15px rgba(0, 123, 255, 0.4);
        }
        button:hover, button:focus {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0, 123, 255, 0.6);
        }
        button:active {
          transform: translateY(-1px);
          box-shadow: 0 4px 10px rgba(0, 123, 255, 0.5);
        }
      </style>
      <div class="generator-container">
        <h2>오늘 뭐 먹지?</h2>
        <p class="subtitle">오늘 저녁 메뉴를 추천해드려요!</p>
        <div class="menu-display">
          <div class="menu-emoji">${menu.emoji}</div>
          <div class="menu-name">${menu.name}</div>
        </div>
        <button id="generate-btn">다른 메뉴 추천받기</button>
      </div>
    `;

    this.shadowRoot.getElementById('generate-btn').addEventListener('click', () => {
      this.render();
    });
  }
}

customElements.define('menu-recommender', MenuRecommender);

// Theme Toggle Logic
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    if (isDark) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  });
});
