function showPage(pageId) {
    // すべてのページを非表示にする
    var pages = document.querySelectorAll('.page');
    pages.forEach(function(page) {
        page.style.display = 'none';
    });

    // 指定されたページを表示する
    var activePage = document.getElementById(pageId);
    if (activePage) {
        activePage.style.display = 'block';
    }
}

window.onload = function() {
    // 初回読み込み時に最初のページを表示
    showPage('page1');
}