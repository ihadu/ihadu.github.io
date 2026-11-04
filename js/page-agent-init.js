(function() {
  function initPageAgent() {
    // 在首页和简历页面启用
    const isHomePage = window.location.pathname === '/' ||
                       window.location.pathname === '/index.html';
    const isResumePage = window.location.pathname.startsWith('/resume');

    if (!isHomePage && !isResumePage) return;

    // 检查 page-agent 是否加载
    if (typeof PageAgent === 'undefined') {
      setTimeout(initPageAgent, 500);
      return;
    }

    // 创建实例（中文界面）并暴露到全局
    window.pageAgent = new PageAgent({
      language: 'zh-CN',
    });

    const pageType = isHomePage ? '首页' : '简历页面';
    console.log(`[page-agent] 已在${pageType}成功初始化`);
    console.log('[page-agent] 调用方法：');
    console.log('  - window.pageAgent.panel.show()  // 显示面板');
    console.log('  - window.pageAgent.panel.hide()  // 隐藏面板');
    console.log('  - window.pageAgent.panel.expand()  // 展开历史');
    console.log('  - window.pageAgent.panel.collapse()  // 收起历史');
    console.log('  - window.pageAgent.execute("你的任务")  // 执行任务');
  }

  // 首次加载
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPageAgent);
  } else {
    initPageAgent();
  }

  // Pjax 页面切换后重新初始化
  document.addEventListener('pjax:complete', function() {
    setTimeout(initPageAgent, 100);
  });
})();