
class LottoGenerator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  generateNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
      numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    return Array.from(numbers).sort((a, b) => a - b);
  }

  getColorForNumber(number) {
    if (number <= 10) return '#f9d423'; // Yellow
    if (number <= 20) return '#00a8ff'; // Blue
    if (number <= 30) return '#e84393'; // Pink
    if (number <= 40) return '#00b894'; // Green
    return '#d63031'; // Red
  }

  render(numbers = this.generateNumbers()) {
    const numberColors = numbers.map(num => this.getColorForNumber(num));

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        .generator-container {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 2.5rem 3rem;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
          text-align: center;
        }
        h2 {
          font-size: 2.8rem;
          font-weight: 700;
          color: var(--white, #fff);
          text-shadow: 0 4px 15px rgba(0,0,0,0.2);
          margin-top: 0;
          margin-bottom: 0.5rem;
        }
        .subtitle {
            margin: 0 0 2.5rem 0;
            font-size: 1.1rem;
            font-weight: 400;
            color: rgba(255, 255, 255, 0.85);
            text-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .numbers-display {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
        }
        @keyframes pop-in {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .number-ball {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.75rem;
          font-weight: 600;
          color: #fff;
          box-shadow: 0 4px 10px rgba(0,0,0,0.3), inset 0 -3px 5px rgba(0,0,0,0.2);
          text-shadow: 0 2px 3px rgba(0,0,0,0.4);
          animation: pop-in 0.5s ease-out forwards;
        }
        button {
          font-family: inherit;
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
        <h2>오늘의 행운 번호</h2>
        <p class="subtitle">대박을 기원합니다!</p>
        <div class="numbers-display">
          ${numbers.map((num, index) => `
            <div class="number-ball" style="background-color: ${numberColors[index]}; animation-delay: ${index * 0.1}s;">
              ${num}
            </div>
          `).join('')}
        </div>
        <button id="generate-btn">새 번호 받기</button>
      </div>
    `;

    this.shadowRoot.getElementById('generate-btn').addEventListener('click', () => {
      this.render();
    });
  }
}

customElements.define('lotto-generator', LottoGenerator);
