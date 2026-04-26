// Teachable Machine Model URL
const URL = "https://teachablemachine.withgoogle.com/models/reY-Rmx3X/";

let model, labelContainer, maxPredictions;

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

// Handle Image Upload
const imageUpload = document.getElementById('image-upload');
const faceImage = document.getElementById('face-image');
const uploadContainer = document.getElementById('upload-container');
const loading = document.getElementById('loading');
const resultContainer = document.getElementById('result-container');
const labelContainerEl = document.getElementById('label-container');
const resultMessage = document.getElementById('result-message');

imageUpload.addEventListener('change', async (e) => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = async (event) => {
            faceImage.src = event.target.result;
            uploadContainer.style.display = 'none';
            loading.style.display = 'block';
            
            // Give the image time to load before predicting
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
    
    switch(topResult) {
        case "강아지":
            message = "귀염뽀짝! 당신은 강아지상입니다 🐶";
            break;
        case "고양이":
            message = "츤데레 매력! 당신은 고양이상입니다 🐱";
            break;
        default:
            message = `당신은 ${topResult}상입니다!`;
    }
    
    resultMessage.innerText = message;

    // Show All Predictions with progress bars
    labelContainerEl.innerHTML = '';
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction = prediction[i].className;
        const probability = (prediction[i].probability * 100).toFixed(0);
        
        const barContainer = document.createElement('div');
        barContainer.className = 'prediction-bar-container';
        
        barContainer.innerHTML = `
            <div class="prediction-label">
                <span>${classPrediction}</span>
                <span>${probability}%</span>
            </div>
            <div class="bar-bg">
                <div class="bar-fill" style="width: ${probability}%"></div>
            </div>
        `;
        labelContainerEl.appendChild(barContainer);
    }
}

// Theme Toggle Logic
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

// Initialize on load
init();
