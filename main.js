
class MenuRecommender extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    
    this.lang = document.documentElement.lang === 'en' ? 'en' : 'ko';
    
    // 정교한 SVG 일러스트 데이터 정의
    const drawings = {
      chicken: `
        <svg viewBox="0 0 100 100">
          <defs>
            <linearGradient id="grad-chicken" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#FFB74D;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#F57C00;stop-opacity:1" />
            </linearGradient>
          </defs>
          <path d="M75,35 C88,35 95,50 85,65 L65,85 C55,95 40,95 30,85 L20,75 C10,65 10,50 20,40 C35,20 60,20 75,35" fill="url(#grad-chicken)"/>
          <path d="M70,45 C75,45 78,48 78,52 C78,56 75,59 70,59" fill="rgba(255,255,255,0.2)"/>
          <path d="M35,85 L20,95 C15,98 8,95 10,88 L18,75" stroke="#8D6E63" stroke-width="6" fill="none" stroke-linecap="round"/>
          <circle cx="65" cy="45" r="2" fill="rgba(0,0,0,0.1)"/>
          <circle cx="55" cy="65" r="2" fill="rgba(0,0,0,0.1)"/>
          <circle cx="45" cy="55" r="2" fill="rgba(0,0,0,0.1)"/>
        </svg>`,
      pizza: `
        <svg viewBox="0 0 100 100">
          <path d="M50,5 L95,85 C95,88 92,90 85,90 L15,90 C8,90 5,88 5,85 Z" fill="#FFCA28"/>
          <path d="M5,85 Q50,95 95,85 L95,90 Q50,100 5,90 Z" fill="#F57C00"/>
          <path d="M15,80 Q50,88 85,80" stroke="#FF8F00" stroke-width="4" fill="none"/>
          <circle cx="50" cy="45" r="6" fill="#E53935"/>
          <circle cx="35" cy="65" r="5" fill="#E53935"/>
          <circle cx="65" cy="68" r="7" fill="#E53935"/>
          <path d="M45,25 L55,30 M30,50 L40,55 M60,50 L70,45" stroke="#43A047" stroke-width="3" stroke-linecap="round"/>
          <circle cx="52" cy="42" r="2" fill="rgba(255,255,255,0.3)"/>
        </svg>`,
      meat: `
        <svg viewBox="0 0 100 100">
          <rect x="15" y="35" width="70" height="40" rx="12" fill="#EF5350"/>
          <path d="M15,45 Q50,45 85,45 M15,55 Q50,55 85,55 M15,65 Q50,65 85,65" stroke="white" stroke-opacity="0.2" stroke-width="4"/>
          <path d="M15,35 V75" stroke="#D32F2F" stroke-width="4" stroke-linecap="round"/>
          <rect x="5" y="50" width="12" height="10" rx="4" fill="#D7CCC8"/>
          <rect x="83" y="50" width="12" height="10" rx="4" fill="#D7CCC8"/>
          <circle cx="30" cy="45" r="3" fill="rgba(255,255,255,0.4)"/>
        </svg>`,
      sushi: `
        <svg viewBox="0 0 100 100">
          <rect x="20" y="55" width="60" height="30" rx="8" fill="#F5F5F5"/>
          <path d="M20,55 Q50,25 80,55 Z" fill="#FF7043"/>
          <path d="M25,52 L75,52" stroke="white" stroke-opacity="0.3" stroke-width="2"/>
          <rect x="35" y="70" width="30" height="4" rx="2" fill="rgba(0,0,0,0.05)"/>
          <path d="M40,55 Q50,45 60,55" stroke="rgba(0,0,0,0.1)" stroke-width="1" fill="none"/>
        </svg>`,
      pasta: `
        <svg viewBox="0 0 100 100">
          <circle cx="50" cy="60" r="35" fill="#EEEEEE" stroke="#E0E0E0" stroke-width="2"/>
          <path d="M30,50 C30,70 70,70 70,50 C70,30 30,30 30,50" stroke="#FFD54F" stroke-width="8" fill="none"/>
          <path d="M35,45 C35,60 65,60 65,45 C65,30 35,30 35,45" stroke="#FFD54F" stroke-width="6" fill="none"/>
          <circle cx="50" cy="50" r="15" fill="#E53935" fill-opacity="0.8"/>
          <path d="M45,45 L55,55 M55,45 L45,55" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>`,
      soup: `
        <svg viewBox="0 0 100 100">
          <path d="M10,40 C10,80 30,95 50,95 C70,95 90,80 90,40" fill="#78909C"/>
          <path d="M10,40 Q50,50 90,40" stroke="#546E7A" stroke-width="4" fill="#CFD8DC"/>
          <path d="M30,30 Q30,10 40,25 T50,5 T60,25" stroke="rgba(0,0,0,0.1)" stroke-width="3" fill="none" stroke-linecap="round"/>
          <circle cx="40" cy="60" r="5" fill="#4CAF50" fill-opacity="0.6"/>
          <circle cx="60" cy="65" r="4" fill="#FF9800" fill-opacity="0.6"/>
        </svg>`,
      burger: `
        <svg viewBox="0 0 100 100">
          <path d="M15,45 Q50,15 85,45 Z" fill="#FFA726"/>
          <rect x="15" y="45" width="70" height="8" fill="#66BB6A"/>
          <rect x="15" y="53" width="70" height="12" rx="2" fill="#795548"/>
          <path d="M15,65 Q50,85 85,65 Z" fill="#FFA726"/>
          <circle cx="35" cy="30" r="1.5" fill="white" fill-opacity="0.6"/>
          <circle cx="50" cy="25" r="1.5" fill="white" fill-opacity="0.6"/>
          <circle cx="65" cy="30" r="1.5" fill="white" fill-opacity="0.6"/>
        </svg>`,
      noodle: `
        <svg viewBox="0 0 100 100">
          <path d="M10,45 Q50,95 90,45 Z" fill="#EF5350"/>
          <path d="M10,45 Q50,55 90,45" fill="#FFEB3B" fill-opacity="0.3"/>
          <path d="M20,45 L20,25 M35,45 L35,20 M50,45 L50,25 M65,45 L65,20 M80,45 L80,25" stroke="#FFF176" stroke-width="3" stroke-linecap="round"/>
          <circle cx="50" cy="50" r="10" fill="white"/>
          <circle cx="50" cy="50" r="6" fill="#FFD54F"/>
        </svg>`,
      salad: `
        <svg viewBox="0 0 100 100">
          <circle cx="50" cy="55" r="40" fill="#E8F5E9" stroke="#C8E6C9" stroke-width="2"/>
          <path d="M30,45 Q40,30 55,40 T80,55" fill="#81C784" fill-opacity="0.8"/>
          <path d="M25,60 Q45,75 70,60" fill="#66BB6A" fill-opacity="0.8"/>
          <circle cx="45" cy="45" r="8" fill="#FF5252" fill-opacity="0.9"/>
          <circle cx="65" cy="55" r="6" fill="#FFD740" fill-opacity="0.9"/>
          <circle cx="55" cy="65" r="5" fill="#FF8A65" fill-opacity="0.9"/>
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
          border-radius: 35px;
          padding: 3rem;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid var(--card-border, rgba(255, 255, 255, 0.2));
          box-shadow: var(--card-shadow, 0 20px 40px rgba(0, 0, 0, 0.2));
          text-align: center;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
        }
        h2 {
          font-size: 2.3rem;
          font-weight: 800;
          color: var(--title-color, #fff);
          margin-bottom: 0.5rem;
          font-family: 'Noto Sans KR', 'Poppins', sans-serif;
          letter-spacing: -1px;
        }
        .subtitle {
            margin-bottom: 2.5rem;
            font-size: 1.1rem;
            color: var(--subtitle-color, rgba(255, 255, 255, 0.8));
            font-family: 'Noto Sans KR', sans-serif;
        }
        .drawing-container {
          width: 220px;
          height: 220px;
          margin: 0 auto 2.5rem;
          background: linear-gradient(135deg, #ffffff, #f0f0f0);
          border-radius: 50%;
          padding: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: inset 0 5px 15px rgba(0,0,0,0.05), 0 15px 30px rgba(0,0,0,0.1);
          animation: float 4s ease-in-out infinite;
          position: relative;
        }
        .drawing-container::after {
          content: '';
          position: absolute;
          bottom: -20px;
          width: 60%;
          height: 10px;
          background: rgba(0,0,0,0.1);
          filter: blur(5px);
          border-radius: 50%;
          animation: shadow 4s ease-in-out infinite;
        }
        .drawing-container svg {
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 8px 10px rgba(0,0,0,0.15));
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
        }
        @keyframes shadow {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(0.8); opacity: 0.2; }
        }
        .menu-name {
          font-size: 3rem;
          font-weight: 900;
          color: ${menu.color};
          margin-bottom: 2.5rem;
          letter-spacing: -2px;
          font-family: 'Noto Sans KR', sans-serif;
          text-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }
        button {
          font-family: 'Noto Sans KR', sans-serif;
          font-size: 1.25rem;
          font-weight: 800;
          color: #fff;
          background: linear-gradient(135deg, #6e8efb, #a777e3);
          border: none;
          border-radius: 50px;
          padding: 1.3rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 12px 24px rgba(110, 142, 251, 0.3);
          width: 100%;
        }
        button:hover {
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 18px 36px rgba(110, 142, 251, 0.4);
        }
        button:active {
          transform: translateY(0) scale(0.98);
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
