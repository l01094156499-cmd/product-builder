
class MenuRecommender extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    
    this.lang = document.documentElement.lang === 'en' ? 'en' : 'ko';
    
    // 초정교 SVG 일러스트 데이터 정의
    const drawings = {
      chicken: `
        <svg viewBox="0 0 100 100">
          <defs>
            <linearGradient id="g-chick" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#FFB74D"/>
              <stop offset="100%" style="stop-color:#E65100"/>
            </linearGradient>
          </defs>
          <path d="M85,45 C95,55 95,75 80,85 C65,95 40,95 25,85 C15,75 15,55 25,45 C40,30 70,30 85,45" fill="url(#g-chick)"/>
          <path d="M25,85 L10,95 C5,98 0,92 5,85 L15,75" stroke="#795548" stroke-width="6" fill="none" stroke-linecap="round"/>
          <path d="M30,55 Q50,45 70,55" stroke="rgba(255,255,255,0.2)" stroke-width="3" fill="none"/>
          <circle cx="65" cy="50" r="2" fill="rgba(0,0,0,0.1)"/><circle cx="50" cy="70" r="2" fill="rgba(0,0,0,0.1)"/><circle cx="40" cy="60" r="2" fill="rgba(0,0,0,0.1)"/>
        </svg>`,
      pizza: `
        <svg viewBox="0 0 100 100">
          <path d="M50,5 L95,85 Q50,95 5,85 Z" fill="#FFCA28"/>
          <path d="M5,85 Q50,100 95,85" stroke="#E65100" stroke-width="8" fill="none"/>
          <circle cx="50" cy="45" r="7" fill="#D32F2F"/>
          <circle cx="35" cy="65" r="6" fill="#D32F2F"/>
          <circle cx="65" cy="70" r="5" fill="#D32F2F"/>
          <path d="M45,25 L55,30 M30,50 L40,55" stroke="#2E7D32" stroke-width="3" stroke-linecap="round"/>
        </svg>`,
      meat: `
        <svg viewBox="0 0 100 100">
          <rect x="15" y="30" width="70" height="40" rx="10" fill="#EF5350"/>
          <path d="M15,40 Q50,40 85,40 M15,50 Q50,50 85,50 M15,60 Q50,60 85,60" stroke="white" stroke-opacity="0.3" stroke-width="5"/>
          <rect x="5" y="45" width="12" height="10" rx="3" fill="#D7CCC8"/>
          <rect x="83" y="45" width="12" height="10" rx="3" fill="#D7CCC8"/>
        </svg>`,
      sushi: `
        <svg viewBox="0 0 100 100">
          <rect x="20" y="55" width="60" height="30" rx="5" fill="#F5F5F5"/>
          <path d="M20,55 Q50,25 80,55 Z" fill="#FF7043"/>
          <path d="M25,50 L75,50" stroke="white" stroke-opacity="0.4" stroke-width="2"/>
          <circle cx="40" cy="70" r="3" fill="#4CAF50" fill-opacity="0.3"/>
        </svg>`,
      pasta: `
        <svg viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="#EEEEEE"/>
          <path d="M30,50 C30,80 70,80 70,50 C70,20 30,20 30,50" stroke="#FFD54F" stroke-width="10" fill="none"/>
          <path d="M40,40 C40,60 60,60 60,40" stroke="#FFD54F" stroke-width="8" fill="none"/>
          <circle cx="50" cy="50" r="10" fill="#D32F2F"/>
        </svg>`,
      soup: `
        <svg viewBox="0 0 100 100">
          <path d="M10,40 C10,80 30,95 50,95 C70,95 90,80 90,40 Z" fill="#546E7A"/>
          <path d="M10,40 Q50,50 90,40" fill="#CFD8DC"/>
          <path d="M35,30 Q35,10 45,20 T55,5" stroke="rgba(0,0,0,0.1)" stroke-width="3" fill="none"/>
        </svg>`,
      burger: `
        <svg viewBox="0 0 100 100">
          <path d="M15,45 Q50,10 85,45 Z" fill="#FFA726"/>
          <rect x="15" y="45" width="70" height="10" fill="#66BB6A"/>
          <rect x="15" y="55" width="70" height="15" fill="#795548"/>
          <path d="M15,70 Q50,90 85,70 Z" fill="#FFA726"/>
          <circle cx="40" cy="25" r="1.5" fill="white" fill-opacity="0.5"/>
          <circle cx="60" cy="30" r="1.5" fill="white" fill-opacity="0.5"/>
        </svg>`,
      noodle: `
        <svg viewBox="0 0 100 100">
          <path d="M10,40 Q50,90 90,40 Z" fill="#EF5350"/>
          <path d="M10,40 Q50,55 90,40" fill="#424242"/>
          <path d="M25,35 L25,20 M40,35 L40,15 M55,35 L55,20 M70,35 L70,15" stroke="#FFD54F" stroke-width="4" stroke-linecap="round"/>
          <circle cx="50" cy="45" r="8" fill="white"/><circle cx="50" cy="45" r="5" fill="#FFD54F"/>
        </svg>`,
      salad: `
        <svg viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="#E8F5E9"/>
          <path d="M30,40 Q50,20 70,40 T90,60" fill="#66BB6A" fill-opacity="0.7"/>
          <circle cx="40" cy="40" r="8" fill="#FF5252"/>
          <circle cx="60" cy="60" r="6" fill="#FFD740"/>
        </svg>`
    };

    this.data = {
      ko: {
        title: '오늘 뭐 먹지?',
        subtitle: '오늘 저녁 메뉴를 추천해드려요!',
        button: '다른 메뉴 추천받기',
        menus: [
          { name: '치킨', emoji: '🍗', color: '#f9d423', drawing: drawings.chicken },
          { name: '피자', emoji: '🍕', color: '#ff7675', drawing: drawings.pizza },
          { name: '삼겹살', emoji: '🥓', color: '#e84393', drawing: drawings.meat },
          { name: '초밥', emoji: '🍣', color: '#00a8ff', drawing: drawings.sushi },
          { name: '파스타', emoji: '🍝', color: '#fab1a0', drawing: drawings.pasta },
          { name: '국밥', emoji: '🍲', color: '#a29bfe', drawing: drawings.soup },
          { name: '햄버거', emoji: '🍔', color: '#e17055', drawing: drawings.burger },
          { name: '짜장면', emoji: '🍜', color: '#2d3436', drawing: drawings.noodle },
          { name: '샐러드', emoji: '🥗', color: '#00b894', drawing: drawings.salad }
        ]
      },
      en: {
        title: "What's for Dinner?",
        subtitle: "Let me recommend a menu for you!",
        button: 'Give me another one',
        menus: [
          { name: 'Chicken', emoji: '🍗', color: '#f9d423', drawing: drawings.chicken },
          { name: 'Pizza', emoji: '🍕', color: '#ff7675', drawing: drawings.pizza },
          { name: 'Steak', emoji: '🥩', color: '#e84393', drawing: drawings.meat },
          { name: 'Sushi', emoji: '🍣', color: '#00a8ff', drawing: drawings.sushi },
          { name: 'Pasta', emoji: '🍝', color: '#fab1a0', drawing: drawings.pasta },
          { name: 'Soup', emoji: '🍲', color: '#a29bfe', drawing: drawings.soup },
          { name: 'Burger', emoji: '🍔', color: '#e17055', drawing: drawings.burger },
          { name: 'Noodles', emoji: '🍜', color: '#2d3436', drawing: drawings.noodle },
          { name: 'Salad', emoji: '🥗', color: '#00b894', drawing: drawings.salad }
        ]
      }
    };
    
    this.render();
  }

  getRandomMenu() {
    const langData = this.data[this.lang];
    const randomIndex = Math.floor(Math.random() * langData.menus.length);
    return langData.menus[randomIndex];
  }

  render(menu = this.getRandomMenu()) {
    const langText = this.data[this.lang];
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        .generator-container {
          background: var(--card-bg, rgba(255, 255, 255, 0.1));
          border-radius: 40px;
          padding: 3rem;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid var(--card-border, rgba(255, 255, 255, 0.2));
          box-shadow: var(--card-shadow, 0 20px 50px rgba(0, 0, 0, 0.2));
          text-align: center;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
        }
        h2 {
          font-size: 2.2rem;
          font-weight: 800;
          color: var(--title-color, #fff);
          margin-bottom: 0.5rem;
          font-family: 'Noto Sans KR', sans-serif;
        }
        .subtitle {
            margin-bottom: 2.5rem;
            font-size: 1.1rem;
            color: var(--subtitle-color, rgba(255, 255, 255, 0.8));
        }
        .drawing-container {
          width: 220px;
          height: 220px;
          margin: 0 auto 2.5rem;
          background: white;
          border-radius: 50%;
          padding: 35px;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: inset 0 5px 15px rgba(0,0,0,0.05), 0 15px 35px rgba(0,0,0,0.1);
          animation: float 4s ease-in-out infinite;
          position: relative;
        }
        .drawing-container svg {
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 10px 10px rgba(0,0,0,0.1));
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(3deg); }
        }
        .menu-name {
          font-size: 3.2rem;
          font-weight: 900;
          color: ${menu.color};
          margin-bottom: 2.5rem;
          letter-spacing: -2px;
          font-family: 'Noto Sans KR', sans-serif;
          text-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }
        button {
          font-family: 'Noto Sans KR', sans-serif;
          font-size: 1.3rem;
          font-weight: 800;
          color: #fff;
          background: linear-gradient(135deg, #6e8efb, #a777e3);
          border: none;
          border-radius: 50px;
          padding: 1.3rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 12px 25px rgba(110, 142, 251, 0.4);
          width: 100%;
        }
        button:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 18px 40px rgba(110, 142, 251, 0.5);
        }
        button:active {
          transform: scale(0.98);
        }
      </style>
      <div class="generator-container">
        <h2>${langText.title}</h2>
        <p class="subtitle">${langText.subtitle}</p>
        <div class="drawing-container">
          ${menu.drawing}
        </div>
        <div class="menu-name">${menu.name}</div>
        <button id="generate-btn">${langText.button}</button>
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
  if (themeToggle) {
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
  }
});
