document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    animateParticles();
    setupNavbarScroll();
    setupMobileMenu();
    setupRadarChart();
    setupModal();
    setupScrollReveal();
    setupTiltEffect();
    startTypingEffect();
    setupProjectDetails();
    setupContactModal();
    setupWechatModal();
});

// --- Canvas & Particles ---
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particlesArray;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

const mouse = { x: null, y: null, radius: 150 }
window.addEventListener('mousemove', (event) => { mouse.x = event.x; mouse.y = event.y; });

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x; this.y = y;
        this.directionX = directionX; this.directionY = directionY;
        this.size = size; this.color = color;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#3B82F6';
        ctx.fill();
    }
    update() {
        if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
        this.x += this.directionX; this.y += this.directionY;
        this.draw();
    }
}

function initParticles() {
    particlesArray = [];
    let numberOfParticles = (canvas.width * canvas.height) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 0.5;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 0.4) - 0.2;
        let directionY = (Math.random() * 0.4) - 0.2;
        particlesArray.push(new Particle(x, y, directionX, directionY, size, '#3B82F6'));
    }
}

function animateParticles() {
    requestAnimationFrame(animateParticles);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < particlesArray.length; i++) { particlesArray[i].update(); }
    connectParticles();
}

function connectParticles() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) ** 2) + ((particlesArray[a].y - particlesArray[b].y) ** 2);
            if (distance < (canvas.width/7) * (canvas.height/7)) {
                opacityValue = 1 - (distance/20000);
                ctx.strokeStyle = 'rgba(6, 182, 212,' + opacityValue * 0.15 + ')';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// --- Effects ---
function setupScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
}

function setupTiltEffect() {
    document.querySelectorAll('.tilt-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateX = ((y - rect.height/2) / (rect.height/2)) * -4;
            const rotateY = ((x - rect.width/2) / (rect.width/2)) * 4;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            card.style.transition = 'none';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            card.style.transition = 'transform 0.5s ease';
        });
    });
}

function startTypingEffect() {
    const texts = ["未来技术学院 | 智慧海洋技术", "跨介质航行器设计", "追求极致的工程美学"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.getElementById('typing-text');
    if(!typingElement) return;

    function type() {
        const currentText = texts[textIndex];
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        let typeSpeed = isDeleting ? 50 : 100;
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false; textIndex = (textIndex + 1) % texts.length; typeSpeed = 500;
        }
        setTimeout(type, typeSpeed);
    }
    type();
}

// --- Navigation ---
function setupNavbarScroll() {
    const navbar = document.getElementById('navbar');
    const navBorder = document.getElementById('navbar-border');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            // 滚动时：深色背景 + 高斯模糊 + 底部光带显示
            navbar.classList.add('bg-dark/80', 'backdrop-blur-xl');
            navbar.classList.remove('bg-transparent');
            navBorder.classList.remove('opacity-0');
        } else {
            // 顶部时：透明背景 + 隐藏底部光带
            navbar.classList.remove('bg-dark/80', 'backdrop-blur-xl');
            navbar.classList.add('bg-transparent');
            navBorder.classList.add('opacity-0');
        }
    });
}

function setupMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    menuToggle.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
    mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => mobileMenu.classList.add('hidden')));
}

// --- Chart & Data ---
function setupRadarChart() {
    const canvas = document.getElementById('radarChart');
    if (!canvas) return; // 防止未找到 Canvas 报错
    
    const ctx = canvas.getContext('2d');
    const radarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['学术', '工程', '表达', '学习', '艺术', '体育'],
            datasets: [{
                label: '能力值',
                data: [70, 80, 60, 80, 70, 70],
                backgroundColor: 'rgba(6, 182, 212, 0.2)',
                borderColor: '#06b6d4',
                borderWidth: 2,
                pointBackgroundColor: '#06b6d4',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#06b6d4',
                pointHoverRadius: 6
            }]
        },
        options: {
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    stepSize: 20,
                    angleLines: { color: 'rgba(255, 255, 255, 0.1)', lineWidth: 1 },
                    grid: { color: 'rgba(255, 255, 255, 0.1)', lineWidth: 1 },
                    pointLabels: { color: 'rgba(255, 255, 255, 0.8)', font: { size: 9, weight: 'bold' } },
                    ticks: { display: false } // 隐藏刻度数字，保持简洁
                }
            },
            plugins: { legend: { display: false } }, // 隐藏图例
            elements: { line: { tension: 0.1 } },
            responsive: true,
            maintainAspectRatio: false,
        }
    });

    ctx.canvas.addEventListener('click', (event) => {
        const activePoints = radarChart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false);
        if (activePoints.length > 0) {
            const index = activePoints[0].index;
            const label = radarChart.data.labels[index];
            const value = radarChart.data.datasets[0].data[index];
            showRadarDetails(label, value);
        }
    });
}

function createModal() {
  if (!document.getElementById('radar-modal')) {
    const modal = document.createElement('div');
    modal.id = 'radar-modal';
    modal.className = 'fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 hidden animate-fade-in';
    modal.innerHTML = `
      <div class="glass-panel rounded-lg border border-white/5 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold text-light">能力详情</h2>
            <button id="radar-modal-close" class="text-gray-400 hover:text-white transition-colors"><i class="fa fa-times text-xl"></i></button>
          </div>
          <div id="radar-modal-content"></div>
        </div>
      </div>`;
    document.body.appendChild(modal);
    document.getElementById('radar-modal-close').addEventListener('click', () => document.getElementById('radar-modal').classList.add('hidden'));
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.add('hidden'); });
  }
}

function showRadarDetails(label, value) {
  createModal();
  const modal = document.getElementById('radar-modal');
  const content = document.getElementById('radar-modal-content');
  let details = '';
  switch(label) {
    case '学术':
      details = `<h3 class="text-xl font-bold text-accent mb-2">学术能力 (${value})</h3><div class="space-y-4"><div><h4 class="text-lg font-bold text-light mb-1">论文发表</h4><ul class="list-disc list-inside text-gray-400 space-y-1"><li>可变构潜空跨域探测航行器的可靠性设计与分析（中文期刊待投稿）</li></ul></div><div><h4 class="text-lg font-bold text-light mb-1">专利申请</h4><ul class="list-disc list-inside text-gray-400 space-y-1"><li>基于菱形盒式翼构型的潜空跨域垂直起降航行器（修改中）</li><li>一体式可翻折机翼舱门复合结构（修改中）</li><li>基于X型翼变构设计的高效能设备复用跨介质飞行平台（修改中）</li></ul></div></div>`;
      break;
    case '工程':
      details = `<h3 class="text-xl font-bold text-accent mb-2">工程能力 (${value})</h3><div class="mt-4 h-48"><canvas id="engineeringChart"></canvas></div>`;
      break;
    case '学习':
      details = `<h3 class="text-xl font-bold text-accent mb-2">学习能力 (${value})</h3><div class="grid grid-cols-1 sm:grid-cols-3 gap-4"><div><img src="img/成绩单1.png" class="w-full h-64 object-cover rounded opacity-80 border border-white/10"><p class="text-center text-xs mt-1 text-gray-400">成绩单1</p></div><div><img src="img/成绩单2.png" class="w-full h-64 object-cover rounded opacity-80 border border-white/10"><p class="text-center text-xs mt-1 text-gray-400">成绩单2</p></div><div><img src="img/排名证明.png" class="w-full h-64 object-cover rounded opacity-80 border border-white/10"><p class="text-center text-xs mt-1 text-gray-400">排名证明</p></div></div>`;
      break;
      break;
    case '艺术':
      details = `<h3 class="text-xl font-bold text-accent mb-2">艺术能力 (${value})</h3><div class="grid grid-cols-1 gap-4"><img src="img/艺术.jpg" class="w-full h-auto rounded border border-white/10"></div>`;
      break;
    case '体育':
      details = `<h3 class="text-xl font-bold text-accent mb-2">体育能力 (${value})</h3><div class="bg-white/5 rounded-lg p-4 border border-white/10"><div class="flex items-center mb-3"><i class="fa fa-bullseye text-accent mr-3"></i><div><h4 class="font-bold text-light">羽毛球</h4><p class="text-gray-400 text-sm">中羽3级</p></div></div><div class="flex items-center"><i class="fa fa-circle text-accent mr-3"></i><div><h4 class="font-bold text-light">乒乓球</h4><p class="text-gray-400 text-sm">入门水平</p></div></div></div>`;
      break;
    default:
      details = `<h3 class="text-xl font-bold text-accent mb-2">${label} (${value})</h3><p class="text-gray-400">暂无详细展示数据。</p>`;
  }
  content.innerHTML = details;
  modal.classList.remove('hidden');
  if (label === '工程') { setTimeout(createEngineeringChart, 100); }
}

function createEngineeringChart() {
    const ctx = document.getElementById('engineeringChart').getContext('2d');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['机械', '电路', '单片机', '前端', 'CV', '仿真', '总体'],
            datasets: [{
                label: '工程细分',
                data: [90, 60, 60, 75, 70, 60, 75],
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                borderColor: '#3B82F6',
                pointBackgroundColor: '#3B82F6',
                pointBorderColor: '#fff',
            }]
        },
        options: {
            maintainAspectRatio: false,
            scales: { 
                r: { 
                    beginAtZero: true,
                    max: 100,
                    ticks: { display: false }, 
                    grid: { color: 'rgba(255,255,255,0.1)' }, 
                    pointLabels: { font: { size: 11 }, color: '#94a3b8' } 
                } 
            },
            plugins: { legend: { display: false } }
        }
    });
}

function setupModal() {
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('close-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    
    closeModal.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('active'); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') modal.classList.remove('active'); });

    document.addEventListener('click', (e) => {
        if(e.target.tagName === 'IMG' && e.target.closest('#radar-expand-content')) {
            modalTitle.textContent = '详情预览';
            modalContent.innerHTML = `<img src="${e.target.src}" class="w-full h-auto rounded-lg shadow-2xl">`;
            modal.classList.add('active');
        }
    });
}

// --- 微信模态框 ---
function setupWechatModal() {
    const wechatModal = document.getElementById('wechat-modal');
    if (!wechatModal) return;
    
    wechatModal.addEventListener('click', (e) => {
        if (e.target === wechatModal) {
            hideWechatModal();
        }
    });
    document.addEventListener('keydown', (e) => { 
        if (e.key === 'Escape') hideWechatModal(); 
    });
}

function showWechatModal() {
    const wechatModal = document.getElementById('wechat-modal');
    if (wechatModal) {
        wechatModal.classList.remove('opacity-0', 'pointer-events-none');
        wechatModal.querySelector('.glass-panel').classList.remove('scale-95');
        wechatModal.querySelector('.glass-panel').classList.add('scale-100');
    }
}

function hideWechatModal() {
    const wechatModal = document.getElementById('wechat-modal');
    if (wechatModal) {
        wechatModal.classList.add('opacity-0', 'pointer-events-none');
        wechatModal.querySelector('.glass-panel').classList.add('scale-95');
        wechatModal.querySelector('.glass-panel').classList.remove('scale-100');
    }
}

// ==========================================
// 项目详情页逻辑 (新增功能)
// ==========================================

const projectsData = {
    "1": {
        title: "多模态高速跨介质飞行器",
        date: "2025.07",
        role: "独立作者",
        desc: "本项目旨在突破传统单一介质航行器的局限性，设计并制造了一种具备仿生鱼、潜航器、四旋翼三种模态的高速跨介质飞行器。该设备能够在空中高速飞行，并无缝切换至水下潜航模式，模仿鱼类游动以减少水下阻力。项目重点解决了跨介质过程中的姿态稳定控制问题，以及轻量化结构与防水密封的矛盾。",
        tags: ["总体设计", "轻量化", "飞控固件", "空气动力学", "仿生学"],
        cover: "img/先锋幽灵封面.png",
        images: ["img/先锋幽灵封面.png"],
        video: "",
        presentation: "https://docs.qq.com/slide/DWm1yb2dVUFViRmVp?electronTabTitle=%E5%89%AF%E6%9C%AC-%E6%82%9F%E7%A9%BA%E5%8F%B7%E5%85%A8%E6%B5%B7%E6%B7%B1AUV%E6%A8%A1%E5%9E%8B&nlc=1"
    },
    "2": {
        title: "简易矢量推进跨介质飞行器",
        date: "2025.07",
        role: "朋辈指导",
        desc: "在12天的极限开发周期内，指导团队设计并制造了一款具有尾部矢量推进器的飞行器。项目核心在于自制的矢量推进机构，通过舵机控制尾喷口方向，显著提升了飞行器的机动性和跨介质出水时的姿态调整能力。我还负责了整体电控方案的设计与调试。",
        tags: ["矢量推进", "防水舱", "团队协作", "快速成型", "舵机控制"],
        cover: "img/简易跨介质封面.png",
        images: ["img/简易跨介质封面.png"],
        video: "",
        presentation: "https://docs.qq.com/slide/DWmlMWnZVYVBaQmxI?electronTabTitle=%E5%89%AF%E6%9C%AC-%E5%A4%9A%E6%A8%A1%E6%80%81%E9%AB%98%E9%80%9F%E8%B7%A8%E4%BB%8B%E8%B4%A8%E9%A3%9E%E8%A1%8C%E5%99%A8&nlc=1"
    },
    "3": {
        title: "可变构潜空跨域探测航行器",
        date: "2024.07",
        role: "项目负责人",
        desc: "省级大创项目。该航行器创新性地采用了菱形盒式翼结构，具备潜航器、四旋翼、固定翼三种形态。在水下以潜航器模式高效巡航，出水后展开为四旋翼起飞，并在空中转换为固定翼模式进行长距离飞行。作为负责人，我主导了总体结构设计与多模态切换机制的联调。",
        tags: ["复杂结构", "材料工艺", "总体设计", "变构机构", "系统联调"],
        cover: "img/菱形盒式翼封面.png",
        images: ["img/菱形盒式翼封面.png"],
        video: "",
        presentation: "https://docs.qq.com/slide/DWnR5dk9zTm5adndN?_bid=1&client=drive_file&electronTabTitle=%E7%9C%81%E5%88%9B%E7%BB%93%E9%A2%98%E7%AD%94%E8%BE%A9"
    },
    "4": {
        title: "X型翼跨介质飞行平台",
        date: "2025.05 - 至今",
        role: "独立负责人",
        desc: "目前正在进行的衍生方案。基于X型翼构型，旨在打造一个高设备复用率的多模态跨介质飞行平台。通过独特的X型机翼设计，兼顾了结构强度与气动效率，同时优化了内部空间布局，使其能够搭载更多类型的探测载荷。项目涉及INAV飞控的深度定制与电路系统的全新设计。",
        tags: ["INAV飞控", "电路设计", "独立开发", "结构优化", "载荷集成"],
        cover: "img/X型翼封面.png",
        images: ["img/X型翼封面.png"],
        video: "",
        presentation: "https://docs.qq.com/slide/DWm1FWnlueU1NdGZz?electronTabTitle=X%E5%9E%8B%E7%BF%BC%E8%B7%A8%E4%BB%8B%E8%B4%A8%E9%A3%9E%E8%A1%8C%E5%B9%B3%E5%8F%B0&isOfflineNewFileFlag=true"
    },
    "5": {
        title: "仿生蝴蝶",
        date: "2023.11 - 2024.05",
        role: "项目负责人",
        desc: "机械创新大赛参赛作品。这是一款翼展30cm、整机重量仅12g的超轻量化仿生扑翼飞行器。为了模拟真实蝴蝶的低频振翅飞行，我们对传动结构进行了极致的减重设计，并精选了微型电机与电池。项目难点在于微型机械结构的精密加工与动力系统的匹配。",
        tags: ["微型机械", "传动结构", "极致减重", "仿生扑翼", "精密装配"],
        cover: "img/仿生蝴蝶封面.png",
        images: ["img/仿生蝴蝶封面.png"],
        video: "",
        presentation: "https://docs.qq.com/slide/DWkt2RW1LQ1ZLVkVJ?select=ZKvEmKCVKVEI&_bid=1&client=drive_file&electronTabTitle=%E6%98%9F%E6%B2%B3%E8%9D%B6%E8%88%9E&isOfflineNewFileFlag=true"
    },
    "6": {
        title: "凌云号 - 竞赛级ROV",
        date: "2024.03 - 2024.07",
        role: "机械负责人",
        desc: "世界大学生水下机器人大赛参赛作品。凌云号采用了全新的5自由度推进器布局，具备卓越的水下机动性。作为机械负责人，我设计了流线型的外壳结构、高强度的框架以及一款能够执行多任务的机械夹爪。此外，通过CNC加工技术确保了核心部件的精度。",
        tags: ["机械设计", "推力矩阵", "CNC加工", "水下机器人", "多任务夹爪"],
        cover: "img/凌云号封面.png",
        images: ["img/凌云号封面.png"],
        video: "",
        presentation: "https://docs.qq.com/slide/DWkt4aFhMREdETGp6?electronTabTitle=%E5%87%8C%E4%BA%91%E5%8F%B7ROV&isOfflineNewFileFlag=true"
    },
    "7": {
        title: "可变布局水下机器人",
        date: "2024.07",
        role: "机械负责人",
        desc: "课程设计项目。针对不同水下作业需求，设计并制造了一种推进器布局可快速变换的小型ROV。用户可以根据任务场景（如定点观测、灵活作业等）调整推进器的位置与角度。项目注重低成本实现与结构的模块化设计。",
        tags: ["布局设计", "机械设计", "团队合作", "模块化", "低成本"],
        cover: "img/雷霆嘎巴封面.png",
        images: ["img/雷霆嘎巴封面.png"],
        video: "",
        presentation: "https://docs.qq.com/slide/DWnZvWXpXRGNESVhO?electronTabTitle=%E5%8F%AF%E5%8F%98%E5%B8%83%E5%B1%80ROV&isOfflineNewFileFlag=true"
    },
    "8": {
        title: "暗海潜鲨 - 竞赛级ROV",
        date: "2024.03 - 2024.07",
        role: "机械负责人",
        desc: "这是一款拥有6自由度的竞赛级水下作业机器人，特别注重操控手感的优化。在设计中，我们重点攻克了深水密封与电子舱防腐难题，确保了机器人在复杂水环境下的可靠运行。机械结构坚固且易于维护。",
        tags: ["密封与防腐", "机械设计", "团队合作", "6自由度", "可靠性设计"],
        cover: "img/暗海潜鲨封面.png",
        images: ["img/暗海潜鲨封面.png"],
        video: "",
        presentation: "https://docs.qq.com/slide/DWnNOQUdwQ25MRXBN?electronTabTitle=%E6%9A%97%E6%B5%B7%E6%BD%9C%E9%B2%A8ROV&isOfflineNewFileFlag=true"
    },
    "9": {
        title: "水下图像处理与识别",
        date: "2024.08 - 2024.11",
        role: "独立完成",
        desc: "针对水下光照不足、浑浊等导致图像质量下降的问题，基于OpenCV编写了专门的水下去雾与色彩还原算法。在此基础上，应用YOLO模型训练了特定的水下目标（如海参、扇贝等）数据集，实现了高精度的实时目标识别。",
        tags: ["YOLO", "OpenCV", "Python", "深度学习", "图像增强"],
        cover: "img/图像处理封面.png",
        images: ["img/图像处理封面.png"],
        video: "",
        presentation: "https://docs.qq.com/slide/DWmpGUWJaYVp4SU5X?electronTabTitle=%E6%B0%B4%E4%B8%8B%E5%9B%BE%E5%83%8F%E5%A4%84%E7%90%86%E4%B8%8E%E7%9B%AE%E6%A0%87%E8%AF%86%E5%88%AB&isOfflineNewFileFlag=true"
    },
    "10": {
        title: "交互式网页简历",
        date: "2025.06",
        role: "独立完成",
        desc: "结合现代前端技术与AI辅助工具，开发了本个人展示网站。网站采用了Tailwind CSS进行响应式布局，利用Canvas绘制了动态粒子背景，并集成了Chart.js雷达图与Tilt.js 3D卡片效果，旨在提供流畅且富有科技感的浏览体验。",
        tags: ["HTML/CSS", "JS", "Tailwind", "响应式设计", "前端交互"],
        cover: "img/前端开发封面.png",
        images: ["img/前端开发封面.png"],
        video: "",
        presentation: "https://docs.qq.com/slide/DWmVoY2hQUXhVVGJO?_bid=1&client=drive_file&electronTabTitle=%E7%9C%81%E5%88%9B%E7%BB%93%E9%A2%98%E7%AD%94%E8%BE%A9&isOfflineNewFileFlag=true"
    },
    "11": {
        title: "红外追踪小船",
        date: "2023.06 - 2023.08",
        role: "机械负责人",
        desc: "设计并制作一艘能够自主识别红外信号并快速穿过光电门的小船。船体采用了双体船设计以提高稳定性，动力系统经过精心匹配以确保高速行驶。机械部分使用SolidWorks建模并进行3D打印制造。",
        tags: ["船舶设计", "SolidWorks", "团队协作", "3D打印", "自动控制"],
        cover: "img/红外追踪小船封面.png",
        images: ["img/红外追踪小船封面.png"],
        video: "",
        presentation: "https://docs.qq.com/slide/DWmpDc2t3RWJ2enNq?electronTabTitle=%E7%BA%A2%E5%A4%96%E8%BF%BD%E8%B8%AA%E5%B0%8F%E8%88%B9&isOfflineNewFileFlag=true"
    },
    "12": {
        title: "悟空号全海深AUV1:2模型",
        date: "2023.06 - 2023.08",
        role: "项目负责人",
        desc: "以我国著名的“悟空号”全海深AUV为原型，通过三维建模获取精确数据，并以纸板为主要原材料，手工制作了一个1:2的高精度模型。项目极大地锻炼了空间想象力与动手制作能力。",
        tags: ["三维建模", "模型制作", "动手能力", "逆向工程", "手工工艺"],
        cover: "img/悟空号封面.png",
        images: ["img/悟空号封面.png"],
        video: "",
        presentation: "https://docs.qq.com/slide/DWnhFVmxKdkpyYUV3?electronTabTitle=%E6%82%9F%E7%A9%BA%E5%8F%B7%E5%85%A8%E6%B5%B7%E6%B7%B1AUV%E6%A8%A1%E5%9E%8B&isOfflineNewFileFlag=true"
    },
    "13": {
        title: "遥控物流小车",
        date: "2023.11 - 2023.12",
        role: "项目负责人",
        desc: "设计并制作一种高效灵活的物流小车，用于模拟仓库内的货物搬运。我负责了整体的机械结构设计，以及控制电路板（PCB）的绘制与元件焊接。小车具备良好的操控响应速度和载重能力。",
        tags: ["PCB绘制", "机械设计", "电路设计", "嵌入式开发", "焊接技术"],
        cover: "img/物流小车封面.png",
        images: ["img/物流小车封面.png"],
        video: "",
        presentation: "https://docs.qq.com/pdf/DWmRzUEhGdm5wdnBB?electronTabTitle=%E8%AE%BE%E8%AE%A1%E8%B0%83%E7%A0%94%E6%8A%A5%E5%91%8A"
    },
    "14": {
        title: "智能物流机器人",
        date: "2023.01 - 2023.04",
        role: "项目负责人",
        desc: "设计并制作一种具备循迹导航功能的智能物流机器人。机器人能够沿着预设的轨道自动行驶，并完成定点停靠与货物抓取动作。项目中重点优化了作业流程算法与机械臂的抓取稳定性。",
        tags: ["机械设计", "作业流程", "团队协作", "循迹算法", "自动化"],
        cover: "img/物流机器人封面.png",
        images: ["img/物流机器人封面.png"],
        video: "",
        presentation: "https://docs.qq.com/slide/DWmFmRkZ3R1RPd0dw?electronTabTitle=%E6%99%BA%E8%83%BD%E7%89%A9%E6%B5%81%E6%9C%BA%E5%99%A8%E4%BA%BA&isOfflineNewFileFlag=true"
    }
};

function setupProjectDetails() {
    const detailView = document.getElementById('project-detail-view');
    const backBtn = document.getElementById('project-back-btn');
    const projectCards = document.querySelectorAll('.project-card');

    // 获取详情页元素
    const dTitle = document.getElementById('detail-title');
    const dDate = document.getElementById('detail-date');
    const dRole = document.getElementById('detail-role');
    const dDesc = document.getElementById('detail-desc');
    const dTags = document.getElementById('detail-tags');
    const dImages = document.getElementById('detail-images');
    const dVideoContainer = document.getElementById('detail-video-container');
    const dPresentation = document.getElementById('detail-presentation');

    // 打开详情页
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const id = card.getAttribute('data-id');
            const data = projectsData[id];

            if (data) {
                // 填充数据
                dTitle.textContent = data.title;
                dDate.textContent = data.date;
                dRole.textContent = data.role;
                dDesc.textContent = data.desc;

                // 填充标签
                dTags.innerHTML = data.tags.map(tag => 
                    `<span class="px-3 py-1 bg-white/10 rounded-full text-xs text-accent border border-accent/20">${tag}</span>`
                ).join('');

                // 填充图片 (如果没有图片，使用封面作为第一张)
                const imageList = data.images && data.images.length > 0 ? data.images : [data.cover];
                dImages.innerHTML = imageList.map(imgSrc => 
                    `<img src="${imgSrc}" alt="Detail Image" class="cursor-pointer hover:opacity-80 transition-opacity">`
                ).join('');

                // 视频处理
                if (data.video) {
                    dVideoContainer.innerHTML = `
                        <video controls class="w-full h-full object-contain">
                            <source src="${data.video}" type="video/mp4">
                            您的浏览器不支持视频播放。
                        </video>
                    `;
                } else {
                    dVideoContainer.innerHTML = `
                        <div class="video-placeholder-text">
                            <i class="fa fa-film text-4xl mb-2 opacity-50"></i>
                            <span>暂无展示视频</span>
                            <span class="text-xs opacity-50">(${data.title})</span>
                        </div>
                    `;
                }

                // 演示文稿按钮
                if (data.presentation) {
                    dPresentation.innerHTML = `
                        <a href="${data.presentation}" target="_blank" class="inline-flex items-center px-6 py-3 bg-accent/20 border border-accent/50 rounded-lg text-accent hover:bg-accent/30 hover:border-accent transition-all duration-300 font-medium">
                            <i class="fa fa-file-powerpoint-o mr-2 text-xl"></i>
                            查看演示文稿
                            <i class="fa fa-external-link ml-2 text-sm"></i>
                        </a>
                    `;
                } else {
                    dPresentation.innerHTML = '';
                }

                // 显示视图
                detailView.classList.add('active');
                document.body.classList.add('modal-open');
            }
        });
    });

    // 关闭详情页
    backBtn.addEventListener('click', () => {
        detailView.classList.remove('active');
        document.body.classList.remove('modal-open');
        
        // 稍微延迟清空视频，避免关闭动画时视频突然消失
        setTimeout(() => {
            dVideoContainer.innerHTML = ''; 
        }, 400);
    });
}

// ==========================================
// 联系人卡片逻辑 (新增)
// ==========================================

function setupContactModal() {
    const contactBtns = document.querySelectorAll('.contact-trigger');
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');

    contactBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); // 阻止链接跳转
            
            // 设置标题
            modalTitle.innerHTML = '<i class="fa fa-address-card-o mr-2 text-accent"></i> 联系方式';
            
            // 设置内容 (HTML结构)
            modalContent.innerHTML = `
                <div class="space-y-4">
                    <!-- 电话 -->
                    <div class="group relative bg-white/5 border border-white/10 rounded-xl p-4 hover:border-accent/50 transition-all cursor-pointer" onclick="copyToClipboard('19373985780', '电话')">
                        <div class="flex items-center gap-4">
                            <div class="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                                <i class="fa fa-phone text-lg"></i>
                            </div>
                            <div class="flex-1">
                                <p class="text-xs text-gray-500 font-mono mb-1">PHONE NUMBER</p>
                                <p class="text-lg font-bold text-light tracking-wide">193 7398 5780</p>
                            </div>
                            <i class="fa fa-clone text-gray-600 group-hover:text-accent transition-colors"></i>
                        </div>
                        <div class="absolute inset-0 border border-accent/0 group-hover:border-accent/30 rounded-xl transition-all pointer-events-none"></div>
                    </div>

                    <!-- 邮箱 -->
                    <div class="group relative bg-white/5 border border-white/10 rounded-xl p-4 hover:border-accent/50 transition-all cursor-pointer" onclick="copyToClipboard('shenchengtai@hrbeu.edu.cn', '邮箱')">
                        <div class="flex items-center gap-4">
                            <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <i class="fa fa-envelope text-lg"></i>
                            </div>
                            <div class="flex-1 overflow-hidden">
                                <p class="text-xs text-gray-500 font-mono mb-1">EMAIL ADDRESS</p>
                                <p class="text-base font-bold text-light break-all">shenchengtai@hrbeu.edu.cn</p>
                            </div>
                            <i class="fa fa-clone text-gray-600 group-hover:text-primary transition-colors"></i>
                        </div>
                    </div>
                </div>
                
                <div id="copy-toast" class="mt-4 text-center text-xs text-green-400 opacity-0 transition-opacity">
                    <i class="fa fa-check-circle mr-1"></i> 已复制到剪贴板
                </div>
            `;

            // 打开模态框
            modal.classList.add('active');
        });
    });
}

// 辅助功能：复制到剪贴板
window.copyToClipboard = function(text, label) {
    navigator.clipboard.writeText(text).then(() => {
        const toast = document.getElementById('copy-toast');
        if(toast) {
            toast.innerHTML = `<i class="fa fa-check-circle mr-1"></i> ${label}已复制`;
            toast.classList.remove('opacity-0');
            setTimeout(() => toast.classList.add('opacity-0'), 2000);
        }
    }).catch(err => {
        console.error('复制失败:', err);
    });
}
