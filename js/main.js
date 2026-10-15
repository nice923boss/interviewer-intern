// Boot: check that content loaded, then show the home screen.
(function () {
  var TII = globalThis.TII;
  if (!TII || !TII.industries || !TII.industries.length) {
    document.getElementById('app').innerHTML =
      '<div class="panel" style="max-width:560px;margin:60px auto;padding:24px">' +
      '<h2>遊戲資料載入失敗</h2><p>找不到關卡資料，請確認 data 資料夾完整，並重新整理頁面。</p></div>';
    console.error('TII.industries is empty: industry scripts failed to load');
    return;
  }
  TII.app.industryId = TII.industries[0].id;
  TII.app.realMode = !!TII.store.getPref('realMode');
  TII.ui.renderHome();
})();
