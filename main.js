// 사용자가 새로 만든 강아지/고양이 모델 URL
const URL = "https://teachablemachine.withgoogle.com/models/reY-Rmx3X/";

let model, maxPredictions;

// 연예인 데이터 (나노바나나 서버 주소 적용으로 이미지 깨짐 방지)
const celebrityData = {
    "강아지": [
        { name: "박보영", img: "https://nanobanana.com/images/dog_female.png" },
        { name: "송중기", img: "https://nanobanana.com/images/dog_male.png" }
    ],
    "고양이": [
        { name: "제니", img: "https://nanobanana.com/images/cat_female.png" },
        { name: "강동원", img: "https://nanobanana.com/images/cat_male.png" }
    ],
    "토끼": [
        { name: "나연", img: "https://nanobanana.com/images/rabbit_female.png" },
        { name: "정국", img: "https://nanobanana.com/images/rabbit_male.png" }
    ],
    "공룡": [
        { name: "김민희", img: "https://nanobanana.com/images/dino_female.png" },
        { name: "김우빈", img: "https://nanobanana.com/images/dino_male.png" }
    ]
};

// Load the model
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    try {
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
        console.log("User's Model loaded successfully");
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

    // Set Result Message
    const topResult = prediction[0].className;
    let message = "";
    let subMessage = "";
    let celebs = [];
    
    // 모델의 클래스 이름에 따른 결과 메시지 설정
    if (topResult === "강아지" || topResult.toLowerCase() === "dog") {
        message = "친근한 매력! 강아지상 🐶";
        subMessage = "다정다감하고 귀여운 당신은 어디서나 사랑받는 스타일이군요!";
        celebs = celebrityData["강아지"];
    } else if (topResult === "고양이" || topResult.toLowerCase() === "cat") {
        message = "시크한 매력! 고양이상 🐱";
        subMessage = "도도하고 신비로운 분위기를 가진 당신은 알수록 빠져드는 매력쟁이!";
        celebs = celebrityData["고양이"];
    } else if (topResult === "토끼" || topResult.toLowerCase() === "rabbit") {
        message = "귀여운 매력! 토끼상 🐰";
        subMessage = "상큼발랄하고 보호본능을 자극하는 당신은 주변에 에너지를 주네요!";
        celebs = celebrityData["토끼"];
    } else if (topResult === "공룡" || topResult.toLowerCase() === "dinosaur") {
        message = "강렬한 매력! 공룡상 🦖";
        subMessage = "시크하면서도 듬직한 매력을 가진 당신은 리더십이 느껴지는 관상이군요!";
        celebs = celebrityData["공룡"];
    } else {
        message = `${topResult}상 입니다!`;
        subMessage = "당신만의 독특한 분위기가 인상적이네요!";
    }
    
    // 연예인 갤러리 HTML 생성
    let celebHtml = "";
    if (celebs && celebs.length > 0) {
        celebHtml = `
            <div class="celebrity-examples">
                <p><strong>내 결과와 닮은꼴 연예인:</strong></p>
                <div class="celebrity-grid">
                    ${celebs.map(c => `
                        <div class="celebrity-item">
                            <img src="${c.img}" alt="${c.name}" class="celebrity-img">
                            <span class="celebrity-name">${c.name}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    resultMessage.innerHTML = `
        <div class="main-result">${message}</div>
        <div class="sub-result">${subMessage}</div>
        ${celebHtml}
    `;

    // Show All Predictions with progress bars
    labelContainerEl.innerHTML = '';
    for (let i = 0; i < maxPredictions; i++) {
        const className = prediction[i].className;
        const probability = (prediction[i].probability * 100).toFixed(0);
        
        const barContainer = document.createElement('div');
        barContainer.className = 'prediction-bar-container';
        barContainer.innerHTML = `
            <div class="prediction-label">
                <span>${className}</span>
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
