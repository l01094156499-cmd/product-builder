// Teachable Machine Model URL
const URL = "https://teachablemachine.withgoogle.com/models/reY-Rmx3X/";

let model, webcam, labelContainer, maxPredictions;

// Load the image model and setup the webcam
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    const loading = document.getElementById('loading');
    const webcamContainer = document.getElementById('webcam-container');
    const resultContainer = document.getElementById('result-container');
    
    // UI Feedback
    webcamContainer.innerHTML = '';
    loading.style.display = 'block';

    try {
        // load the model and metadata
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        // Convenience function to setup a webcam
        const flip = true; // whether to flip the webcam
        const width = 300;
        const height = 300;
        webcam = new tmImage.Webcam(width, height, flip); // width, height, flip
        
        await webcam.setup(); // request access to the webcam
        await webcam.play();
        window.requestAnimationFrame(loop);

        // UI Updates
        loading.style.display = 'none';
        resultContainer.style.display = 'block';
        
        // append elements to the DOM
        const canvas = webcam.canvas;
        canvas.classList.add('webcam-canvas');
        webcamContainer.appendChild(canvas);
        
        labelContainer = document.getElementById("label-container");
        labelContainer.innerHTML = '';
        for (let i = 0; i < maxPredictions; i++) {
            const barContainer = document.createElement('div');
            barContainer.className = 'prediction-bar-container';
            labelContainer.appendChild(barContainer);
        }
        
        console.log("Webcam and Model initialized");
    } catch (error) {
        console.error("Initialization error:", error);
        alert("카메라 권한이 필요합니다.");
        loading.style.display = 'none';
        webcamContainer.innerHTML = '<button type="button" class="start-btn" onclick="init()">다시 시작하기</button>';
    }
}

async function loop() {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
}

// run the webcam image through the image model
async function predict() {
    const prediction = await model.predict(webcam.canvas);
    
    // Sort to show the highest probability first if needed, 
    // but here we keep fixed order for stable UI
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction = prediction[i].className;
        const probability = (prediction[i].probability * 100).toFixed(0);
        
        const barContainer = labelContainer.childNodes[i];
        barContainer.innerHTML = `
            <div class="prediction-label">
                <span>${classPrediction}</span>
                <span>${probability}%</span>
            </div>
            <div class="bar-bg">
                <div class="bar-fill" style="width: ${probability}%"></div>
            </div>
        `;
    }
}

// Theme Toggle Logic
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
