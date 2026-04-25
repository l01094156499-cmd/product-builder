
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
          { name: '삼겹살', emoji: '🥓', color: '#e84393', image: 'https://images.unsplash.com/photo-1533219057257-4bb9ed5d2cc6?auto=format&fit=crop&w=800&q=80' },
          { name: '초밥', emoji: '🍣', color: '#00a8ff', image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=800&q=80' },
          { name: '파스타', emoji: '🍝', color: '#fab1a0', image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=800&q=80' },
          { name: '국밥', emoji: '🍲', color: '#a29bfe', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80' },
          { name: '떡볶이', emoji: '🍢', color: '#d63031', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80' },
          { name: '마라탕', emoji: '🍜', color: '#fdcb6e', image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=800&q=80' },
          { name: '돈까스', emoji: '🍱', color: '#00b894', image: 'https://images.unsplash.com/photo-1591814468924-cafb5d1232e1?auto=format&fit=crop&w=800&q=80' },
          { name: '햄버거', emoji: '🍔', color: '#e17055', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80' },
          { name: '냉면', emoji: '🥣', color: '#74b9ff', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80' },
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
          { name: 'Tacos', emoji: '🌮', color: '#d63031', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80' },
          { name: 'Ramen', emoji: '🍜', color: '#fdcb6e', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80' },
          { name: 'Burger', emoji: '🍔', color: '#e17055', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80' },
          { name: 'Salad', emoji: '🥗', color: '#00b894', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80' },
          { name: 'Sandwich', emoji: '🥪', color: '#74b9ff', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80' },
          { name: 'Dim Sum', emoji: '🥟', color: '#2d3436', image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80' }
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
          border-radius: 24px;
          padding: 2.5rem 3rem;
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border: 1px solid var(--card-border, rgba(255, 255, 255, 0.2));
          box-shadow: var(--card-shadow, 0 8px 32px 0 rgba(0, 0, 0, 0.37));
          text-align: center;
          transition: all 0.3s ease;
          width: 100%;
          max-width: 450px;
          margin: 0 auto;
        }
        h2 {
          font-size: 2rem;
          font-weight: 700;
          color: var(--title-color, #fff);
          margin-top: 0;
          margin-bottom: 0.5rem;
          font-family: 'Noto Sans KR', 'Poppins', sans-serif;
        }
        .subtitle {
            margin: 0 0 2rem 0;
            font-size: 1rem;
            font-weight: 400;
            color: var(--subtitle-color, rgba(255, 255, 255, 0.85));
            font-family: 'Noto Sans KR', 'Poppins', sans-serif;
        }
        .menu-display {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        .image-container {
          width: 100%;
          height: 250px;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
          position: relative;
          background: rgba(0,0,0,0.05);
        }
        .menu-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          animation: fade-in 0.8s ease-out forwards;
        }
        .menu-emoji-badge {
          position: absolute;
          bottom: 10px;
          right: 10px;
          background: white;
          width: 45px;
          height: 45px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.5rem;
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        }
        @keyframes fade-in {
          from { opacity: 0; transform: scale(1.05); }
          to { opacity: 1; transform: scale(1); }
        }
        .menu-name {
          font-size: 2.5rem;
          font-weight: 800;
          color: ${menu.color};
          text-shadow: 0 2px 10px rgba(0,0,0,0.1);
          font-family: 'Noto Sans KR', 'Poppins', sans-serif;
          margin: 0.5rem 0;
        }
        button {
          font-family: 'Noto Sans KR', 'Poppins', sans-serif;
          font-size: 1.1rem;
          font-weight: 600;
          color: #fff;
          background: linear-gradient(145deg, #0d6efd, #0a58ca);
          border: none;
          border-radius: 50px;
          padding: 1rem 2.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 5px 15px rgba(0, 123, 255, 0.4);
          width: 100%;
        }
        button:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0, 123, 255, 0.6);
        }
        button:active {
          transform: translateY(-1px);
        }
      </style>
      <div class="generator-container">
        <h2>${langText.title}</h2>
        <p class="subtitle">${langText.subtitle}</p>
        <div class="menu-display">
          <div class="image-container">
            <img class="menu-image" src="${menu.image}" alt="${menu.name}">
            <div class="menu-emoji-badge">${menu.emoji}</div>
          </div>
          <div class="menu-name">${menu.name}</div>
        </div>
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
