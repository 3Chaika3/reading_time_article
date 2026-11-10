function startReadingTimer() {
    let articleBlock = document.querySelector('article') || 
                       document.querySelector('main') || 
                       document.querySelector('.post-content');
    
    if (!articleBlock) return;

    let articleText = articleBlock.innerText;
    let wordsArray = articleText.trim().split(/\s+/);
    let totalWords = wordsArray.length;

    if (totalWords < 100) return;

    let allImages = articleBlock.querySelectorAll('img');
    let totalImages = allImages.length;

    let wordsPerMinute = 180;
    let totalSeconds = (totalWords / wordsPerMinute) * 60 + (totalImages * 10);

    let timerWidget = document.createElement('div');
    timerWidget.className = 'timer-widget';

    let startMinutes = Math.ceil(totalSeconds / 60);
    timerWidget.innerHTML = '⏱️ Осталось: ~' + startMinutes + ' мин';
    document.body.appendChild(timerWidget);

    function recalculateTime() {
        let position = articleBlock.getBoundingClientRect();
        let totalHeight = position.height;
        let scrolledPixels = window.innerHeight - position.top;
        
        let progress = scrolledPixels / totalHeight;
        if (progress < 0) progress = 0;
        if (progress > 1) progress = 1;

        let secondsLeft = totalSeconds * (1 - progress);
        let minutesLeft = Math.ceil(secondsLeft / 60);

        if (progress >= 0.95 || minutesLeft <= 0) {
            timerWidget.innerHTML = 'Прочитано! 🎉';
            setTimeout(function() {
                timerWidget.classList.add('timer-widget-hidden');
            }, 2000);
        } else {
            timerWidget.classList.remove('timer-widget-hidden'); 
            timerWidget.innerHTML = '⏱️ Осталось: ~' + minutesLeft + ' мин';
        }
    }

    window.addEventListener('scroll', recalculateTime);
    recalculateTime();
}

window.addEventListener('load', startReadingTimer);