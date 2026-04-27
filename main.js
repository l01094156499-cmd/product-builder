// 사용자가 새로 만든 강아지/고양이 모델 URL
const URL = "https://teachablemachine.withgoogle.com/models/reY-Rmx3X/";

let model, maxPredictions;

// 분석 결과 상세 텍스트 데이터
const analysisData = {
    "강아지": {
        reason: "당신의 얼굴은 전체적으로 부드러운 곡선 위주이며, 눈매가 선하고 처진 느낌을 줍니다. 이러한 특징은 상대방에게 신뢰감과 편안함을 주며, 웃을 때 입꼬리가 시원하게 올라가는 모습이 전형적인 강아지상의 특징입니다.",
        celebs: "박보영, 송중기, 아이유, 백현, 한지민"
    },
    "고양이": {
        reason: "날렵한 턱선과 위로 살짝 올라간 눈매가 지적이면서도 신비로운 분위기를 자아냅니다. 첫인상은 도도해 보일 수 있으나, 볼수록 빠져드는 매혹적인 눈빛이 고양이상의 가장 큰 특징으로 분석되었습니다.",
        celebs: "제니, 강동원, 한소희, 이준기, 예지"
    },
    "토끼": {
        reason: "크고 동그란 눈과 밝고 명랑한 에너지가 얼굴 전체에서 느껴집니다. 상큼하고 발랄한 분위기가 보호 본능을 자극하며, 긍정적인 인상이 주변 사람들에게 기분 좋은 에너지를 전달하는 타입입니다.",
        celebs: "나연, 수지, 정국, 조보아, 최유진"
    },
    "공룡": {
        reason: "강렬한 눈빛과 뚜렷하고 입체적인 이목구비가 카리스마를 뿜어냅니다. 무심한 듯 시크한 매력이 느껴지며, 듬직하고 신뢰감 있는 하관의 구조가 공룡상 특유의 남성적/여성적 매력을 극대화합니다.",
        celebs: "공유, 김우빈, 류준열, 김민희, 탑"
    }
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
    let analysis = { reason: "특징을 분석 중입니다.", celebs: "연예인 정보를 불러오고 있습니다." };
    
    // 모델의 클래스 이름에 따른 결과 메시지 및 분석 근거 설정
    if (topResult === "강아지" || topResult.toLowerCase() === "dog") {
        message = "친근한 매력! 강아지상 🐶";
        subMessage = "다정다감하고 귀여운 당신은 어디서나 사랑받는 스타일이군요!";
        analysis = analysisData["강아지"];
    } else if (topResult === "고양이" || topResult.toLowerCase() === "cat") {
        message = "시크한 매력! 고양이상 🐱";
        subMessage = "도도하고 신비로운 분위기를 가진 당신은 알수록 빠져드는 매력쟁이!";
        analysis = analysisData["고양이"];
    } else if (topResult === "토끼" || topResult.toLowerCase() === "rabbit") {
        message = "귀여운 매력! 토끼상 🐰";
        subMessage = "상큼발랄하고 보호본능을 자극하는 당신은 주변에 에너지를 주네요!";
        analysis = analysisData["토끼"];
    } else if (topResult === "공룡" || topResult.toLowerCase() === "dinosaur") {
        message = "강렬한 매력! 공룡상 🦖";
        subMessage = "시크하면서도 듬직한 매력을 가진 당신은 리더십이 느껴지는 관상이군요!";
        analysis = analysisData["공룡"];
    } else {
        message = `${topResult}상 입니다!`;
        subMessage = "당신만의 독특한 분위기가 인상적이네요!";
    }
    
    // 상세 분석 텍스트 생성
    const reasoningHtml = `
        <div class="analysis-reason-box">
            <h4>🔍 AI 분석 근거</h4>
            <p class="reason-text">${analysis.reason}</p>
            <div class="similar-celebs">
                <strong>✨ 비슷한 분위기의 연예인:</strong>
                <span class="celeb-names">${analysis.celebs}</span>
            </div>
        </div>
    `;

    resultMessage.innerHTML = `
        <div class="main-result">${message}</div>
        <div class="sub-result">${subMessage}</div>
        ${reasoningHtml}
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
