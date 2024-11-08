const settingeria = document.getElementById('settingButton');
settingeria.addEventListener("click", function btnClick() {
    const settingArea = document.getElementById('settingScene');
    const titleArea = document.getElementById('titleScene');
    settingArea.style.display = 'block'; // 要素を表示
    titleArea.style.display = 'none'; 
});

