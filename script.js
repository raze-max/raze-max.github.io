document.addEventListener('DOMContentLoaded', () => {
    // Получаем элементы
    const preloader = document.getElementById('preloader');
    const windowElement = document.getElementById('app-window');
    const headerElement = document.getElementById('window-header');
    const socialIcon = document.getElementById('social-icon');
    const taskbarItem = document.getElementById('taskbar-social-item');
    const closeButton = document.querySelector('.close-btn');
    const minimizeButton = document.querySelector('.minimize-btn');

    // Переменные для перетаскивания
    let isDragging = false;
    let offsetX, offsetY;
    let isMinimized = false;

    // 🌟 1. ЛОГИКА ЗАГРУЗКИ (PRELOADER) 🌟
    // Скрываем загрузчик через 3 секунды
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 3000); // Показываем загрузку 3 секунды

    // ----------------------------------------------------
    // 2. ЛОГИКА УПРАВЛЕНИЯ ОКНОМ (Открыть/Закрыть/Свернуть)
    // ----------------------------------------------------

    const toggleWindow = () => {
        const isHidden = windowElement.classList.contains('hidden');
        if (isHidden) {
            // Открыть/Восстановить
            windowElement.classList.remove('hidden');
            windowElement.classList.add('active');
            taskbarItem.classList.add('active');
            isMinimized = false;
        } else {
            // Закрыть
            windowElement.classList.add('hidden');
            windowElement.classList.remove('active');
            taskbarItem.classList.remove('active');
            isMinimized = true;
        }
    };

    const minimizeWindow = () => {
        windowElement.classList.add('hidden');
        taskbarItem.classList.remove('active');
        isMinimized = true;
    };
    
    // Привязываем события
    socialIcon.addEventListener('click', toggleWindow);
    taskbarItem.addEventListener('click', toggleWindow);
    closeButton.addEventListener('click', toggleWindow);
    minimizeButton.addEventListener('click', minimizeWindow);


    // ----------------------------------------------------
    // 3. ЛОГИКА ПЕРЕТАСКИВАНИЯ ОКНА
    // ----------------------------------------------------

    // Устанавливаем начальное положение окна
    windowElement.style.position = 'absolute'; 
    windowElement.style.top = '50%';
    windowElement.style.left = '50%';
    windowElement.style.transform = 'translate(-50%, -50%)';

    // НАЧАЛО ПЕРЕТАСКИВАНИЯ
    headerElement.addEventListener('mousedown', (e) => {
        if (window.innerWidth > 650) { 
            isDragging = true;
            
            offsetX = e.clientX - windowElement.offsetLeft;
            offsetY = e.clientY - windowElement.offsetTop;

            // Сбрасываем центрирующий transform, чтобы управлять через top/left
            if (windowElement.style.transform) {
                 windowElement.style.transform = 'none';
            }
        }
    });

    // ПЕРЕТАСКИВАНИЕ
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        e.preventDefault(); 

        let newX = e.clientX - offsetX;
        let newY = e.clientY - offsetY;

        // Ограничение движения, чтобы окно не выходило за края экрана
        const maxX = window.innerWidth - windowElement.offsetWidth;
        const maxY = window.innerHeight - windowElement.offsetHeight - 48; // -48px на Taskbar
        
        newX = Math.min(Math.max(0, newX), maxX);
        newY = Math.min(Math.max(0, newY), maxY);

        windowElement.style.left = newX + 'px';
        windowElement.style.top = newY + 'px';
    });

    // КОНЕЦ ПЕРЕТАСКИВАНИЯ
    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

});


