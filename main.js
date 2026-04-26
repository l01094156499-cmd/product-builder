// 다양한 동물상을 지원하는 모델 URL (강아지, 고양이, 토끼, 공룡, 곰 등)
const URL = "https://teachablemachine.withgoogle.com/models/bjU766-O5/";

let model, maxPredictions;

// Load the model
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    try {
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
        console.log("Model loaded successfully");
    } catch (error) {
        console.error("Error loading model:", error);
    }
}

// UI Elements
const imageUpload = document.getElementById('image-upload');
const faceImage = document.getElementById('face-image');
const uploadContainer = document.getElementById('upload-container');
const loading = document.getElementById('loading');
const resultContainer = document.getElementById('result-container');
const labelContainerEl = document.getElementById('label-container');
const resultMessage = document.getElementById('result-message');

// Handle Image Upload
imageUpload.addEventListener('change', async (e) => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = async (event) => {
            faceImage.src = event.target.result;
            uploadContainer.style.display = 'none';
            loading.style.display = 'block';
            
            faceImage.onload = async () => {
                await predict();
            };
        };
        reader.readAsDataURL(file);
    }
});

async function predict() {
    if (!model) await init();

    const prediction = await model.predict(faceImage, false);
    prediction.sort((a, b) => b.probability - a.probability);

    loading.style.display = 'none';
    resultContainer.style.display = 'block';

    // Set Result Message and Emojis
    const topResult = prediction[0].className;
    let message = "";
    let subMessage = "";
    
    switch(topResult) {
        case "dog":
            message = "귀염뽀짝 강아지상 🐶";
            subMessage = "다정다감하고 귀여운 당신은 모든 사람에게 호감을 주는 스타일!";
            break;
        case "cat":
            message = "츤데레 매력 고양이상 🐱";
            subMessage = "신비롭고 도도한 매력을 가진 당신은 알면 알수록 빠져드는 스타일!";
            break;
        case "rabbit":
            message = "상큼발랄 토끼상 🐰";
            subMessage = "항상 밝고 긍정적인 에너지를 뿜어내는 당신은 주변을 즐겁게 만드는 스타일!";
            break;
        case "dinosaur":
            message = "듬직한 공룡상 🦖";
            subMessage = "무심한 듯 따뜻한 '겉바속촉' 매력을 가진 당신은 신뢰감을 주는 스타일!";
            break;
        case "bear":
            message = "포근한 곰상 🐻";
            subMessage = "푸근하고 편안한 인상의 당신은 보는 사람까지 마음이 놓이게 하는 스타일!";
            break;
        default:
            message = `${topResult}상 입니다!`;
            subMessage = "독특하고 개성 넘치는 매력을 가지셨네요!";
    }
    
    resultMessage.innerHTML = `
        <div class="main-result">${message}</div>
        <div class="sub-result">${subMessage}</div>
    `;

    // Show All Predictions with progress bars
    labelContainerEl.innerHTML = '';
    for (let i = 0; i < 5; i++) { // 상위 5개만 표시
        if (!prediction[i]) break;
        
        const className = prediction[i].className;
        const probability = (prediction[i].probability * 100).toFixed(0);
        
        // 클래스 이름 한글화
        const krNames = {
            'dog': '강아지', 'cat': '고양이', 'rabbit': '토끼', 
            'dinosaur': '공룡', 'bear': '곰', 'fox': '여우'
        };
        const displayLabel = krNames[className] || className;

        const barContainer = document.createElement('div');
        barContainer.className = 'prediction-bar-container';
        barContainer.innerHTML = `
            <div class="prediction-label">
                <span>${displayLabel}</span>
                <span>${probability}%</span>
            </div>
            <div class="bar-bg">
                <div class="bar-fill" style="width: ${probability}%"></div>
            </div>
        `;
        labelContainerEl.appendChild(barContainer);
    }
}

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark-mode', isDark);
    });
}

// Initialize
init();
