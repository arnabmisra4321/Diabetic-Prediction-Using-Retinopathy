// Dark Mode Toggle
const toggleBtn = document.getElementById("darkModeToggle");
toggleBtn.addEventListener("click", ()=>{
  document.body.classList.toggle("dark-mode");
  toggleBtn.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

// Health Risk Prediction
const predictBtn = document.getElementById("predictBtn");
const resultBox = document.getElementById("resultBox");
const riskChart = document.getElementById("riskChart");
let chart = null;

predictBtn.addEventListener("click", () => {
  const inputs = Array.from(document.querySelectorAll("#riskForm input")).map(i=>parseFloat(i.value));
  const [preg, glu, bp, skin, ins, bmi, dpf, age] = inputs;

  let score = 0;
  if(glu>120) score+=3; if(bp>80) score+=2; if(bmi>30) score+=3;
  if(age>45) score+=2; if(ins>200) score+=1; if(skin>20) score+=1; if(dpf>0.5) score+=2;

  let level="Low", color="#28a745", advice="Maintain healthy habits.";
  if(score>=6 && score<10){ level="Moderate"; color="#ffc107"; advice="Consider lifestyle improvements and regular monitoring."; }
  else if(score>=10){ level="High"; color="#dc3545"; advice="Consult a healthcare professional soon."; }

  resultBox.style.display="block"; resultBox.style.opacity=0;
  resultBox.innerHTML=`<strong>Prediction:</strong> Your risk level is <span style="color:${color};">${level}</span><br><em>${advice}</em>`;
  resultBox.classList.add("show");

  const data={ labels:['Low','Moderate','High'], datasets:[{ data:[10,20,70], backgroundColor:['#28a745','#ffc107','#dc3545'] }] };
  const config={ type:'doughnut', data:data, options:{ responsive:true, animation:{ animateRotate:true, duration:1500 }, plugins:{ legend:{ position:'bottom' } } } };
  riskChart.style.display="block"; if(chart) chart.destroy(); chart=new Chart(riskChart.getContext('2d'), config);
});

// Retina Screening
const analyzeBtn = document.getElementById("analyzeBtn");
const imageResult = document.getElementById("imageResult");
const retinaUpload = document.getElementById("retinaUpload");
const imagePreview = document.getElementById("imagePreview");
const progressBar = document.getElementById("progressBar");
const progressFill = document.getElementById("progressFill");

retinaUpload.addEventListener("change", () => {
  const file = retinaUpload.files[0];
  if(file){
    const reader = new FileReader();
    reader.onload = () => { imagePreview.innerHTML = `<img src="${reader.result}" alt="Retina Image">`; }
    reader.readAsDataURL(file);
  }
});

analyzeBtn.addEventListener("click", () => {
  progressBar.style.display="block"; progressFill.style.width="0%"; imageResult.style.display="none";
  let width=0;
  const interval=setInterval(()=>{
    if(width>=100){
      clearInterval(interval); progressBar.style.display="none";
      const outcomes = [
        "No diabetic retinopathy detected – maintain checkups.",
        "Mild signs detected – consult a specialist.",
        "Moderate signs detected – consult your doctor urgently."
      ];
      const random = outcomes[Math.floor(Math.random()*outcomes.length)];
      imageResult.innerHTML=`<strong>Analysis Result:</strong> ${random}`;
      imageResult.style.display="block"; imageResult.style.opacity=0;
      imageResult.classList.add("show");
    } else { width+=2; progressFill.style.width=width+"%"; }
  },30);
});

// Tooltip for About Section
const tooltip = document.getElementById("tooltip");
document.querySelectorAll(".feature-card").forEach(card=>{
  card.addEventListener("mousemove", e=>{
    tooltip.style.left = e.pageX + 15 + "px";
    tooltip.style.top = e.pageY + 15 + "px";
    tooltip.innerHTML = card.getAttribute("data-tip");
    tooltip.style.opacity = 1;
  });
  card.addEventListener("mouseleave", ()=>{ tooltip.style.opacity = 0; });
});

// Scroll animations
const animateElements = document.querySelectorAll("[data-animate]");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if(entry.isIntersecting){ entry.target.classList.add("in-view"); } });
},{ threshold:0.2 });
animateElements.forEach(el => observer.observe(el));
