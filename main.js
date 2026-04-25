
class MenuRecommender extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    
    this.lang = document.documentElement.lang === 'en' ? 'en' : 'ko';
    
    this.data = {
      ko: {
        title: '오늘 뭐 먹지?',
        subtitle: '오늘 저녁 메뉴를 추천해드려요!',
        button: '다른 메뉴 추천받기',
        menus: [
          { name: '치킨', emoji: '🍗', color: '#f9d423', image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80' },
          { name: '피자', emoji: '🍕', color: '#ff7675', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80' },
          { name: '삼겹살', emoji: '🥓', color: '#e84393', image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80' },
          { name: '초밥', emoji: '🍣', color: '#00a8ff', image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=800&q=80' },
          { name: '파스타', emoji: '🍝', color: '#fab1a0', image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=800&q=80' },
          { name: '국밥', emoji: '🍲', color: '#a29bfe', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80' },
          { name: '돈까스', emoji: '🍱', color: '#00b894', image: 'https://images.unsplash.com/photo-1623595110708-76b2f869e0b1?auto=format&fit=crop&w=800&q=80' },
          { name: '햄버거', emoji: '🍔', color: '#e17055', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80' },
          { name: '짜장면', emoji: '🍜', color: '#2d3436', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80' }
        ]
      },
      en: {
        title: "What's for Dinner?",
        subtitle: "Let me recommend a menu for you!",
        button: 'Give me another one',
        menus: [
          { name: 'Fried Chicken', emoji: '🍗', color: '#f9d423', image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80' },
          { name: 'Pizza', emoji: '🍕', color: '#ff7675', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80' },
          { name: 'Steak', emoji: '🥩', color: '#e84393', image: 'https://images.unsplash.com/photo-1546241072-48010ad28c2c?auto=format&fit=crop&w=800&q=80' },
          { name: 'Sushi', emoji: '🍣', color: '#00a8ff', image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=800&q=80' },
          { name: 'Pasta', emoji: '🍝', color: '#fab1a0', image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=800&q=80' },
          { name: 'BBQ Ribs', emoji: '🍖', color: '#a29bfe', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80' },
          { name: 'Burger', emoji: '🍔', color: '#e17055', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80' },
          { name: 'Tacos', emoji: '🌮', color: '#d63031', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80' },
          { name: 'Noodles', emoji: '🍜', color: '#2d3436', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80' }
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
          padding: 0;
          overflow: hidden;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid var(--card-border, rgba(255, 255, 255, 0.2));
          box-shadow: var(--card-shadow, 0 20px 40px rgba(0, 0, 0, 0.2));
          text-align: center;
          transition: all 0.4s ease;
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
        }
        .image-container {
          width: 100%;
          height: 280px;
          position: relative;
          background: #333;
        }
        .menu-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          animation: scale-up 0.8s ease-out;
        }
        @keyframes scale-up {
          from { transform: scale(1.1); opacity: 0.5; }
          to { transform: scale(1); opacity: 1; }
        }
        .emoji-badge {
          position: absolute;
          bottom: -25px;
          right: 30px;
          width: 60px;
          height: 60px;
          background: white;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 2rem;
          box-shadow: 0 10px 20px rgba(0,0,0,0.15);
          z-index: 2;
        }
        .content-area {
          padding: 2.5rem 2rem 2.5rem;
        }
        h2 {
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--title-color, #fff);
          margin-bottom: 0.2rem;
          font-family: 'Noto Sans KR', sans-serif;
        }
        .subtitle {
            margin-bottom: 1.5rem;
            font-size: 1rem;
            color: var(--subtitle-color, rgba(255, 255, 255, 0.8));
            font-family: 'Noto Sans KR', sans-serif;
        }
        .menu-name {
          font-size: 3rem;
          font-weight: 900;
          color: ${menu.color};
          margin-bottom: 2rem;
          letter-spacing: -2px;
          font-family: 'Noto Sans KR', sans-serif;
          text-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }
        button {
          font-family: 'Noto Sans KR', sans-serif;
          font-size: 1.2rem;
          font-weight: 800;
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
          transform: translateY(-3px);
          box-shadow: 0 15px 30px rgba(110, 142, 251, 0.4);
        }
        button:active {
          transform: translateY(0);
        }
      </style>
      <div class="generator-container">
        <div class="image-container">
          <img src="${menu.image}" class="menu-image" alt="${menu.name}">
          <div class="emoji-badge">${menu.emoji}</div>
        </div>
        <div class="content-area">
          <h2>${langText.title}</h2>
          <p class="subtitle">${langText.subtitle}</p>
          <div class="menu-name">${menu.name}</div>
          <button id="generate-btn">${langText.button}</button>
        </div>
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
