
class MenuRecommender extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    
    this.lang = document.documentElement.lang === 'en' ? 'en' : 'ko';
    
    // 그림(SVG) 데이터 정의
    const drawings = {
      chicken: `<svg viewBox="0 0 100 100"><path d="M70,30 C85,30 90,45 80,55 L60,80 C55,85 45,85 40,80 L20,60 C15,55 15,45 20,40 C30,20 50,20 70,30" fill="#FFB74D"/><path d="M40,80 L30,90 C25,95 15,90 15,80 L25,70" stroke="#795548" stroke-width="5" fill="none" stroke-linecap="round"/></svg>`,
      pizza: `<svg viewBox="0 0 100 100"><path d="M50,10 L90,80 L10,80 Z" fill="#FFD54F"/><path d="M10,80 C10,85 90,85 90,80" stroke="#FFA726" stroke-width="8" fill="none"/><circle cx="50" cy="45" r="5" fill="#E53935"/><circle cx="35" cy="65" r="5" fill="#E53935"/><circle cx="65" cy="65" r="5" fill="#E53935"/></svg>`,
      meat: `<svg viewBox="0 0 100 100"><rect x="20" y="30" width="60" height="40" rx="10" fill="#EF5350"/><path d="M25,40 H75 M25,50 H75 M25,60 H75" stroke="rgba(255,255,255,0.3)" stroke-width="3"/><path d="M10,50 H20 M80,50 H90" stroke="#795548" stroke-width="8" stroke-linecap="round"/></svg>`,
      sushi: `<svg viewBox="0 0 100 100"><rect x="20" y="50" width="60" height="30" rx="5" fill="#EEEEEE"/><path d="M20,50 Q50,30 80,50 Z" fill="#FF7043"/><path d="M40,50 V80 M60,50 V80" stroke="rgba(0,0,0,0.1)" stroke-width="2"/></svg>`,
      pasta: `<svg viewBox="0 0 100 100"><path d="M10,50 Q50,100 90,50" stroke="#FFD54F" stroke-width="20" fill="none"/><path d="M20,40 Q50,90 80,40" stroke="#FFD54F" stroke-width="15" fill="none"/><path d="M15,60 Q50,100 85,60" fill="none" stroke="#E53935" stroke-width="10" opacity="0.6"/></svg>`,
      soup: `<svg viewBox="0 0 100 100"><path d="M10,40 Q50,100 90,40 Z" fill="#B0BEC5"/><path d="M30,30 Q30,10 40,30 T50,10 T60,30" stroke="#90A4AE" stroke-width="3" fill="none"/></svg>`,
      burger: `<svg viewBox="0 0 100 100"><path d="M20,40 Q50,10 80,40 Z" fill="#FFA726"/><rect x="20" y="45" width="60" height="10" fill="#66BB6A"/><rect x="20" y="55" width="60" height="15" fill="#8D6E63"/><path d="M20,70 Q50,90 80,70 Z" fill="#FFA726"/></svg>`,
      noodle: `<svg viewBox="0 0 100 100"><path d="M10,40 H90 V50 Q50,90 10,50 Z" fill="#90A4AE"/><path d="M20,40 V30 M40,40 V25 M60,40 V30 M80,40 V25" stroke="#FFD54F" stroke-width="4" stroke-linecap="round"/></svg>`,
      salad: `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="35" fill="#66BB6A"/><circle cx="40" cy="40" r="10" fill="#AED581"/><circle cx="60" cy="55" r="8" fill="#FF8A65"/><circle cx="45" cy="65" r="7" fill="#FFD54F"/></svg>`
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
          { name: '냉면', emoji: '🥣', color: '#74b9ff', drawing: drawings.noodle },
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
          { name: 'Noodles', emoji: '🍜', color: '#74b9ff', drawing: drawings.noodle },
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
          border-radius: 30px;
          padding: 3rem;
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border: 1px solid var(--card-border, rgba(255, 255, 255, 0.2));
          box-shadow: var(--card-shadow, 0 15px 35px rgba(0, 0, 0, 0.2));
          text-align: center;
          transition: all 0.3s ease;
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
        }
        h2 {
          font-size: 2.2rem;
          font-weight: 800;
          color: var(--title-color, #fff);
          margin-bottom: 0.5rem;
          font-family: 'Noto Sans KR', 'Poppins', sans-serif;
        }
        .subtitle {
            margin-bottom: 2.5rem;
            font-size: 1.1rem;
            color: var(--subtitle-color, rgba(255, 255, 255, 0.8));
        }
        .drawing-container {
          width: 200px;
          height: 200px;
          margin: 0 auto 2rem;
          background: white;
          border-radius: 50%;
          padding: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: inset 0 2px 10px rgba(0,0,0,0.1), 0 10px 20px rgba(0,0,0,0.1);
          animation: float 3s ease-in-out infinite;
        }
        .drawing-container svg {
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 5px 5px rgba(0,0,0,0.1));
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .menu-name {
          font-size: 2.8rem;
          font-weight: 900;
          color: ${menu.color};
          margin-bottom: 2.5rem;
          letter-spacing: -1px;
          font-family: 'Noto Sans KR', sans-serif;
        }
        button {
          font-family: 'Noto Sans KR', sans-serif;
          font-size: 1.2rem;
          font-weight: 700;
          color: #fff;
          background: linear-gradient(135deg, #6e8efb, #a777e3);
          border: none;
          border-radius: 50px;
          padding: 1.2rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 20px rgba(110, 142, 251, 0.3);
          width: 100%;
        }
        button:hover {
          transform: scale(1.02);
          box-shadow: 0 15px 30px rgba(110, 142, 251, 0.4);
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
