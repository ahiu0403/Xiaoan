// Shared site script for mobile menu and active nav highlighting
(function () {
  const mobileToggleButtons = document.querySelectorAll('#mobile-toggle');
  const mobileMenus = document.querySelectorAll('#mobile-menu');
  mobileToggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      mobileMenus.forEach(m => m.classList.toggle('hidden'));
    });
  });

  // Highlight active nav link based on current page path
  const currentPath = window.location.pathname.split('/').pop() || '';
  document.querySelectorAll('.nav-link').forEach(a => {
    try {
      const linkPath = a.getAttribute('href').split('/').pop() || '';
      if (currentPath === linkPath) {
        a.classList.add('bg-purple-100', 'text-purple-700');
      } else {
        a.classList.remove('bg-purple-100', 'text-purple-700');
        a.classList.add('text-gray-500');
      }
    } catch (e) { }
  });

  // CONTACT: simple form handling
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name').value || '(未填)';
      const contact = document.getElementById('contact').value || '(未填)';
      const message = document.getElementById('message').value || '(未填)';
      alert('感謝您的留言，\n姓名：' + name + '\n聯絡方式：' + contact + '\n內容：' + message + '\n(此表單為示範，尚未連接後端)');
      contactForm.reset();
    });
  }

  // TRACKING: render orders if container exists (sample data)
  const ordersContainer = document.getElementById('orders-container');
  if (ordersContainer) {
    const orders = [
      {
        id: 'XA20241201001',
        customer: '張小姐',
        product: '小紅書推薦面膜套組',
        date: '2024-12-01',
        status: '已完成',
        tracking: [
          { status: '包裹已送達客戶手中', date: '2024-12-01' },
          { status: '包裹已清關，準備配送', date: '2024-11-28' }
        ]
      },
      {
        id: 'XA20241130002',
        customer: '李先生',
        product: '閒魚限定球鞋',
        date: '2024-11-30',
        status: '運送中',
        tracking: [
          { status: '包裹已清關，準備配送', date: '2024-11-30' },
          { status: '包裹已發出，國際運輸中', date: '2024-11-27' }
        ]
      }
    ];

    function getStatusClass(status) {
      switch (status) {
        case '已完成': return 'inline-block px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800';
        case '運送中': return 'inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800';
        case '集運倉': return 'inline-block px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800';
        case '已下單': return 'inline-block px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800';
        case '已確認': return 'inline-block px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800';
        default: return 'inline-block px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800';
      }
    }

    orders.forEach(order => {
      const orderEl = document.createElement('div');
      orderEl.className = 'bg-white p-6 rounded-xl shadow-lg';
      orderEl.innerHTML = `
        <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">訂單編號：${order.id}</h3>
            <div class="flex flex-wrap items-center gap-4 text-sm">
              <span class="${getStatusClass(order.status)}">${order.status}</span>
              <span>客戶：${order.customer}</span>
              <span>商品：${order.product}</span>
              <span>訂單日期：${order.date}</span>
            </div>
          </div>
        </div>
        <div class="border-t pt-6">
          <h4 class="text-lg font-bold mb-4">進度追蹤</h4>
          <div class="space-y-3">
            ${order.tracking.map(t => `<div class="flex items-center"><div class="w-3 h-3 bg-purple-600 rounded-full mr-4"></div><div class="flex-1"><div class="font-medium">${t.status}</div><div class="text-sm text-gray-500">${t.date}</div></div></div>`).join('')}
          </div>
        </div>
      `;
      ordersContainer.appendChild(orderEl);
    });
  }
})();
