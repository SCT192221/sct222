// 点云背景效果
function createParticles() {
  const container = document.getElementById('particles-container');
  const particleCount = 200;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // 随机大小和位置
    const size = Math.random() * 4 + 1; // 生成1-4px的随机大小
    const x = Math.random() * 100; // 水平位置百分比（0-100%）
    const y = Math.random() * 100; // 垂直位置百分比
    
    // 随机透明度和动画延迟
    const opacity = Math.random() * 0.5 + 0.2; // 透明度范围0.2-0.7
    const delay = Math.random() * 10; // 动画延迟0-10秒
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${x}%`; 
    particle.style.top = `${y}%`;
    particle.style.opacity = opacity;
    particle.style.animation = `float ${Math.random() * 20 + 10}s ease-in-out ${delay}s infinite`;
    
    container.appendChild(particle);
  }
}

// 鼠标移动效果
function setupMouseEffect() {
  const container = document.getElementById('particles-container');
  let mouseX = 0;
  let mouseY = 0;
  const particles = document.querySelectorAll('.particle');
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX / window.innerWidth - 0.5;
    mouseY = e.clientY / window.innerHeight - 0.5;
  });
  
  function updateParticles() {
    particles.forEach((particle, index) => {
      const x = parseFloat(particle.style.left);
      const y = parseFloat(particle.style.top);
      
      // 鼠标影响
      const dx = mouseX * (index % 5 + 1);
      const dy = mouseY * (index % 5 + 1);
      
      // 边界检查
      let newX = x + dx;
      let newY = y + dy;
      
      if (newX > 100) newX = 0;
      if (newX < 0) newX = 100;
      if (newY > 100) newY = 0;
      if (newY < 0) newY = 100;
      
      particle.style.left = `${newX}%`;
      particle.style.top = `${newY}%`;
    });
    
    requestAnimationFrame(updateParticles);
  }
  
  updateParticles();
}

// 导航栏滚动效果
function setupNavbarScroll() {
  const navbar = document.getElementById('navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// 移动端菜单
function setupMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = mobileMenu.querySelectorAll('a');
  
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
  
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

// 雷达图
function setupRadarChart() {
  const ctx = document.getElementById('radarChart').getContext('2d');
  // 通过 document.getElementById 方法获取 ID 为 'radarChart' 的 HTML 元素，
  // 并调用 getContext('2d') 方法获取该元素的 2D 绘图上下文，存储在变量 ctx 中

  const radarChart = new Chart(ctx, {
    // 使用 Chart.js 库创建一个新的图表实例，传入绘图上下文 ctx 和配置对象
    type: 'radar',
    // 指定图表类型为雷达图
    data: {
      labels: ['学术', '工程', '表达', '学习', '艺术', '体育'],
      // 定义雷达图每个轴的标签
      datasets: [{
        // 定义数据集数组，这里只有一个数据集
        label: '个人能力',
        // 数据集的标签，用于标识该数据集
        data: [70, 80, 60, 80, 70, 70],
        // 数据集的具体数值，与 labels 数组中的标签一一对应
        backgroundColor: 'rgba(22, 93, 255, 0.2)',
        // 数据集区域的背景颜色，使用 RGBA 格式，透明度为 0.2
        borderColor: 'rgba(22, 93, 255, 1)',
        // 数据集边框的颜色，不透明
        pointBackgroundColor: 'rgba(22, 93, 255, 1)',
        // 数据点的背景颜色，不透明
        pointBorderColor: '#fff',
        // 数据点边框的颜色，白色
        pointHoverBackgroundColor: '#fff',
        // 鼠标悬停在数据点上时的背景颜色，白色
        pointHoverBorderColor: 'rgba(22, 93, 255, 1)',
        // 鼠标悬停在数据点上时的边框颜色
      }]
    },
    options: {
      // 定义图表的配置选项
      scales: {
        // 定义图表的坐标轴
        r: {
          // 新增或修改 stepSize 属性，设置径向间隔为 25
          beginAtZero: true,
          stepSize: 25,
          // 雷达图的径向坐标轴
          angleLines: {
            color: 'rgba(255, 255, 255, 0.1)'
            // 雷达图的角度线颜色，透明度为 0.1 的白色
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
            // 雷达图网格线的颜色，透明度为 0.1 的白色
          },
          pointLabels: {
            // 坐标轴标签的配置
            color: 'rgba(255, 255, 255, 0.7)',
            // 标签的颜色，透明度为 0.7 的白色
            font: {
              size: 12
              // 标签字体的大小为 12
            }
          },
          ticks: {
            // 坐标轴刻度的配置
            backdropColor: 'transparent',
            // 刻度背景颜色为透明
            color: 'rgba(255, 255, 255, 0.5)'
            // 刻度文字的颜色，透明度为 0.5 的白色
          }
        }
      },
      plugins: {
        // 定义图表插件的配置
        legend: {
          display: false
          // 不显示图表的图例
        }
      },
      elements: {
        // 定义图表元素的配置
        line: {
          borderWidth: 1
          // 雷达图线条的边框宽度为 2
        }
      }
    }
  });

  // // 定义 closeRadarDetails 函数
  // function closeRadarDetails() {
  //   const detailsElement = document.getElementById('radar-expand-container');
  //     detailsElement.style.display = 'none';
  // }
  // 雷达图点击事件
  ctx.canvas.addEventListener('click', (event) => {
    // 为雷达图的画布添加点击事件监听器
    const activePoints = radarChart.getElementsAtEventForMode(
      event,
      // 点击事件对象
      'nearest',
      // 模式为查找最近的数据点
      { intersect: true },
      // 要求点击位置与数据点相交
      false
    );

    if (activePoints.length > 0) {
      // 如果找到了点击的数据点
      const clickedIndex = activePoints[0].index;
      // 获取被点击数据点的索引
      const label = radarChart.data.labels[clickedIndex];
      // 根据索引获取对应的标签
      const value = radarChart.data.datasets[0].data[clickedIndex];
      // 根据索引获取对应的数据值

      showRadarDetails(label, value);
      // 调用 showRadarDetails 函数，传入标签和数据值
    }
  });
  // // 添加按ESC键关闭详情的功能
  // document.addEventListener('keydown', (event) => { 
  //   if (event.key === 'Escape') { 
  //     closeRadarDetails(); 
  //   } 
  // }); 
}

// 显示雷达图详情
function showRadarDetails(label, value) {
  const container = document.getElementById('radar-expand-container');
  const content = document.getElementById('radar-expand-content');
  
  let details = '';
  
  switch(label) {
    case '学术':
      details = `
        <h3 class="text-xl font-bold text-light mb-2">学术能力 (${value})</h3>
        <div class="space-y-4">
          <div>
            <h4 class="text-lg font-bold text-primary mb-1">论文发表</h4>
            <ul class="list-disc list-inside text-gray-300 space-y-1">
              <li>可变构潜空跨域探测航行器的可靠性设计与分析（中文期刊待投稿）</li>
            </ul>
          </div>
          <div>
            <h4 class="text-lg font-bold text-primary mb-1">专利申请</h4>
            <ul class="list-disc list-inside text-gray-300 space-y-1">
              <li>基于菱形盒式翼构型的潜空跨域垂直起降航行器（修改中）</li>
              <li>一体式可翻折机翼舱门复合结构（修改中）</li>
              <li>基于X型翼变构设计的高效能设备复用跨介质飞行平台（修改中）</li>
            </ul>
          </div>
        </div>
      `;
      break;
    case '工程':
      details = `
        <h3 class="text-xl font-bold text-light mb-2">工程能力 (${value})</h3>
        <div class="mt-4">
          <canvas id="engineeringChart" width="400" height="200"></canvas>
        </div>
      `;
      break;
    case '学习':
      details = `
        <h3 class="text-xl font-bold text-light mb-2">学习能力 (${value})</h3>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <div class="bg-dark/80 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
              <img src="img/成绩单1.png" alt="成绩单1" class="w-full h-full object-cover">
            </div>
            <p class="text-center p-2 text-sm text-gray-300">成绩单1</p>
          </div>
          <div>
            <div class="bg-dark/80 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
              <img src="img/成绩单2.png" alt="成绩单2" class="w-full h-full object-cover">
            </div>
            <p class="text-center p-2 text-sm text-gray-300">成绩单2</p>
          </div>
          <div>
            <div class="bg-dark/80 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
              <img src="img/排名证明.png" alt="排名证明" class="w-full h-full object-cover">
            </div>
            <p class="text-center p-2 text-sm text-gray-300">排名证明</p>
          </div>
        </div>
      `;
      break;
    case '艺术':
      details = `
        <h3 class="text-xl font-bold text-light mb-2">艺术能力 (${value})</h3>
        <div class="grid grid-cols-1 sm:grid-cols-1 gap-4">
          <div class="bg-dark/80 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
            <img src="img/艺术.jpg" alt="绘画" class="w-full h-full object-cover">
          </div>
        </div>
      `;
      break;
    case '体育':
      details = `
        <h3 class="text-xl font-bold text-light mb-2">体育能力 (${value})</h3>
        <div class="bg-dark/80 rounded-lg p-4">
          <div class="flex items-center mb-3">
            <div class="bg-primary/20 rounded-full p-2 mr-3 w-8 h-8 flex items-center justify-center">
              <i class="fa fa-bullseye text-primary"></i>
            </div>
            <div>
              <h4 class="font-bold text-light">羽毛球</h4>
              <p class="text-gray-300">中羽3级</p>
            </div>
          </div>
          <div class="flex items-center">
            <div class="bg-primary/20 rounded-full p-2 mr-3 w-8 h-8 flex items-center justify-center">
              <i class="fa fa-bullseye text-primary"></i>
            </div>
            <div>
              <h4 class="font-bold text-light">乒乓球</h4>
              <p class="text-gray-300">入门水平</p>
            </div>
          </div>
        </div>
      `;
      break;
    default:
      details = `
        <h3 class="text-xl font-bold text-light mb-2">${label}能力 (${value})</h3>
        <p class="text-gray-300">详细内容正在整理中...</p>
      `;
  }
  
  content.innerHTML = details;
  container.classList.remove('hidden');
  
  // 如果是工程能力，创建详细雷达图
  if (label === '工程') {
    setTimeout(() => {
      createEngineeringChart();
    }, 100);
  }
}

// 工程能力详细雷达图
function createEngineeringChart() {
  const ctx = document.getElementById('engineeringChart').getContext('2d');
  
  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['机械设计', '电路设计', '单片机编程', '前端设计', 'OpenCV', '流场仿真', '总体设计'],
      datasets: [{
        label: '工程细分能力',
        data: [90, 70, 60, 70, 70, 60, 70],
        backgroundColor: 'rgba(22, 93, 255, 0.2)',
        borderColor: 'rgba(22, 93, 255, 1)',
        pointBackgroundColor: 'rgba(22, 93, 255, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(22, 93, 255, 1)'
      }]
    },
    options: {
      scales: {
        r: {
          beginAtZero: true, // 添加这一行，将坐标起始值设为 0
          angleLines: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          pointLabels: {
            color: 'rgba(255, 255, 255, 0.7)',
            font: {
              size: 10
            }
          },
          ticks: {
            backdropColor: 'transparent',
            color: 'rgba(255, 255, 255, 0.5)'
          }
        }
      },
      plugins: {
        legend: {
          display: false
        }
      },
      elements: {
        line: {
          borderWidth: 2
        }
      }
    }
  });
}

// 模态框
function setupModal() {
  const modal = document.getElementById('modal');
  const closeModal = document.getElementById('close-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalContent = document.getElementById('modal-content');
  
  // 关闭模态框
  closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
  });
  
  // 点击模态框外部关闭
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
  
  // ESC键关闭模态框
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
    }
  });
  
  // 成绩单图片点击事件
  const transcriptImages = document.querySelectorAll('#radar-expand-content img');
  transcriptImages.forEach(img => {
    img.addEventListener('click', () => {
      modalTitle.textContent = '成绩单详情';
      modalContent.innerHTML = `<img src="${img.src}" alt="${img.alt}" class="w-full max-h-[70vh] object-contain">`;
      modal.classList.add('active');
    });
  });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  setupMouseEffect();
  setupNavbarScroll();
  setupMobileMenu();
  setupRadarChart();
  setupResearchCards();
  setupAwardCards();
  setupModal();
});
    