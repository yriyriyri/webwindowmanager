document.addEventListener('DOMContentLoaded', () => {
    const openTerminalBtn = document.getElementById('open-terminal-btn');
    const openImageViewerBtn = document.getElementById('open-imageviewer-btn'); // NEW
    const openFriendsListBtn = document.getElementById('open-friendslist-btn');

    const container = document.getElementById('container');
    let username = "amelie"
    
    let activeTerminal = null;
  
    let zIndexCounter = 10;
    let windowCount = 0;
    let terminalCount = 0;
    let imageViewerCount = 0;

    let friendsData = [
        { username: "fobabsgg90", profilePic: "profilepics/fobabsgg90.webp" },
        { username: "77vwid", profilePic: "profilepics/img9.jpg" },
        { username: "uujordan", profilePic: "profilepics/5.jpg" },
    ];
  
    function createTerminal() {
        terminalCount++; 
        windowCount++;
      
        const terminalWindow = document.createElement('div');
        terminalWindow.classList.add('window', 'terminal');
        terminalWindow.style.zIndex = ++zIndexCounter;
        terminalWindow.style.width = '70vw';
        terminalWindow.style.height = '65vh';
        terminalWindow.style.left = '70px';
        terminalWindow.style.top = '70px';
        terminalWindow.dataset.maximized = 'false';
      
        const terminalBar = document.createElement('section');
        terminalBar.classList.add('terminal__bar');
        terminalBar.style.cursor = 'move';
      
        const barButtons = document.createElement('div');
        barButtons.classList.add('bar__buttons');
      
        const closeButton = document.createElement('button');
        closeButton.classList.add('bar__button', 'bar__button--exit');
        closeButton.innerHTML = '&#10005;';
        closeButton.addEventListener('click', () => {
          terminalWindow.remove();
          if (activeTerminal === terminalWindow) {
            activeTerminal = null;
          }
        });
      
        const minimizeButton = document.createElement('button');
        minimizeButton.classList.add('bar__button');
        minimizeButton.innerHTML = '&#9472;'; // —
        minimizeButton.addEventListener('click', () => {
          const bodySection = terminalWindow.querySelector('.terminal__body');
          if (bodySection.style.display === 'none') {
            bodySection.style.display = 'block';
            terminalWindow.style.height = '65vh';
          } else {
            bodySection.style.display = 'none';
            terminalWindow.style.height = '30px';
          }
        });
      
        const maximizeButton = document.createElement('button');
        maximizeButton.classList.add('bar__button');
        maximizeButton.innerHTML = '&#9723;'; // □
        maximizeButton.addEventListener('click', () => {
          if (terminalWindow.dataset.maximized === 'true') {
            terminalWindow.style.width = '70vw';
            terminalWindow.style.height = '65vh';
            terminalWindow.style.top = '70px';
            terminalWindow.style.left = '70px';
            terminalWindow.dataset.maximized = 'false';
          } else {
            terminalWindow.style.top = '0px';
            terminalWindow.style.left = '0px';
            terminalWindow.style.width = container.offsetWidth + 'px';
            terminalWindow.style.height = container.offsetHeight + 'px';
            terminalWindow.dataset.maximized = 'true';
          }
        });
      
        barButtons.appendChild(closeButton);
        barButtons.appendChild(minimizeButton);
        barButtons.appendChild(maximizeButton);
      
        const barUser = document.createElement('p');
        barUser.id = 'bar__user';
        barUser.textContent = `${username}@terminal-${terminalCount}: ~`;
      
        terminalBar.appendChild(barButtons);
        terminalBar.appendChild(barUser);
      
        const terminalBody = document.createElement('section');
        terminalBody.classList.add('terminal__body');
      
        const terminalPrompt = document.createElement('div');
        terminalPrompt.classList.add('terminal__prompt');
      
        const promptUser = document.createElement('span');
        promptUser.classList.add('terminal__prompt--user');
        promptUser.textContent = `${username}@ubuntu:`;

        const promptLocation = document.createElement('span');
        promptLocation.classList.add('terminal__prompt--location');
        promptLocation.textContent = '~';
      
        const promptBling = document.createElement('span');
        promptBling.classList.add('terminal__prompt--bling');
        promptBling.textContent = '$';

        const promptInput = document.createElement('span');
        promptInput.classList.add('terminal__prompt--input');
      
        const promptCursor = document.createElement('span');
        promptCursor.id = 'terminal__prompt--cursor';
      
        terminalPrompt.appendChild(promptUser);
        terminalPrompt.appendChild(promptLocation);
        terminalPrompt.appendChild(promptBling);
        terminalPrompt.appendChild(promptInput);
        terminalPrompt.appendChild(promptCursor);
      
        terminalBody.appendChild(terminalPrompt);
      
        const resizeCorner = document.createElement('div');
        resizeCorner.classList.add('window__resize-corner');
      
        terminalWindow.appendChild(terminalBar);
        terminalWindow.appendChild(terminalBody);
        terminalWindow.appendChild(resizeCorner);
        container.appendChild(terminalWindow);
      
        makeWindowDraggable(terminalWindow, terminalBar);
        makeWindowResizable(terminalWindow, resizeCorner);
      
        terminalWindow.addEventListener('mousedown', () => {
          terminalWindow.style.zIndex = ++zIndexCounter;
          activeTerminal = terminalWindow;
        });
      
        terminalWindow.promptInputEl = promptInput;
        terminalWindow.promptBodyEl = terminalBody;
    }
    
    function createImageViewer(filePath) {
        imageViewerCount++; 
        windowCount++; 
    
        const fileName = filePath.split('/').pop(); 
    
        const imageViewerWindow = document.createElement('div');
        imageViewerWindow.classList.add('window', 'imageviewer');
        imageViewerWindow.style.zIndex = ++zIndexCounter;
        imageViewerWindow.style.left = '50px'; 
        imageViewerWindow.style.top = '50px';
        imageViewerWindow.dataset.maximized = 'false';
    
        const viewerBar = document.createElement('section');
        viewerBar.classList.add('terminal__bar');
        viewerBar.style.cursor = 'move';
    
        const barButtons = document.createElement('div');
        barButtons.classList.add('bar__buttons');

        const closeButton = document.createElement('button');
        closeButton.classList.add('bar__button', 'bar__button--exit');
        closeButton.innerHTML = '&#10005;';
        closeButton.addEventListener('click', () => {
            imageViewerWindow.remove();
        });
    
        const minimizeButton = document.createElement('button');
        minimizeButton.classList.add('bar__button');
        minimizeButton.innerHTML = '&#9472;'; // —
        minimizeButton.addEventListener('click', () => {
            const viewerBody = imageViewerWindow.querySelector('.imageviewer__body');
            if (viewerBody.style.display === 'none') {
                viewerBody.style.display = 'block';
                const titleBarHeight = 30; 
                const imgHeight = parseInt(viewerBody.firstChild.naturalHeight, 10) + 10;
                imageViewerWindow.style.height = `${imgHeight + titleBarHeight}px`;
            } else {
                viewerBody.style.display = 'none';
                imageViewerWindow.style.height = '30px'; 
            }
        });

        const maximizeButton = document.createElement('button');
        maximizeButton.classList.add('bar__button');
        maximizeButton.innerHTML = '&#9723;'; // □
        maximizeButton.addEventListener('click', () => {
            console.log("Maximize button is not functional for the image viewer.");
        });
    
        barButtons.appendChild(closeButton);
        barButtons.appendChild(minimizeButton);
        barButtons.appendChild(maximizeButton);
    
        const barUser = document.createElement('p');
        barUser.id = 'bar__user';
        barUser.textContent = `${username}@${fileName}: ~`; 
    
        viewerBar.appendChild(barButtons);
        viewerBar.appendChild(barUser);
    
        const viewerBody = document.createElement('section');
        viewerBody.classList.add('imageviewer__body');
    
        const imgEl = document.createElement('img');
        imgEl.src = filePath; 
        imgEl.alt = fileName; 
    
        imgEl.onload = () => {
            let naturalWidth = imgEl.naturalWidth;
            let naturalHeight = imgEl.naturalHeight;
    
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
    
            if (naturalWidth > viewportWidth || naturalHeight > viewportHeight) {
                const aspectRatio = naturalWidth / naturalHeight;
                if (naturalWidth / viewportWidth > naturalHeight / viewportHeight) {
                    naturalWidth = viewportWidth * 0.3; 
                    naturalHeight = naturalWidth / aspectRatio;
                } else {
                    naturalHeight = viewportHeight * 0.3; 
                    naturalWidth = naturalHeight * aspectRatio;
                }
            }
    
            const windowWidth = naturalWidth + 10; 
            const windowHeight = naturalHeight + 35; 
    
            imageViewerWindow.style.width = `${windowWidth}px`;
            imageViewerWindow.style.height = `${windowHeight}px`;
    
            imgEl.style.width = '100%';
            imgEl.style.height = '100%';
        };
    
        viewerBody.appendChild(imgEl);
    
        const resizeCorner = document.createElement('div');
        resizeCorner.classList.add('window__resize-corner');
    
        imageViewerWindow.appendChild(viewerBar);
        imageViewerWindow.appendChild(viewerBody);
        imageViewerWindow.appendChild(resizeCorner);
        container.appendChild(imageViewerWindow);
    
        makeWindowDraggable(imageViewerWindow, viewerBar);
    
        makeWindowResizableWithAspect(imageViewerWindow, resizeCorner, imgEl);
    
        imageViewerWindow.addEventListener('mousedown', () => {
            imageViewerWindow.style.zIndex = ++zIndexCounter;
        });
    }

    function createFriendsList() {
        windowCount++; 
    
        const friendsListWindow = document.createElement('div');
        friendsListWindow.classList.add('window', 'friendslist');
        friendsListWindow.style.zIndex = ++zIndexCounter;
        friendsListWindow.style.width = '300px';
        friendsListWindow.style.height = '400px';
        friendsListWindow.style.left = '100px';
        friendsListWindow.style.top = '100px';
        friendsListWindow.dataset.maximized = 'false';
    
        const friendsBar = document.createElement('section');
        friendsBar.classList.add('terminal__bar'); 
        friendsBar.style.cursor = 'move';
    
        const barButtons = document.createElement('div');
        barButtons.classList.add('bar__buttons');
    
        const closeButton = document.createElement('button');
        closeButton.classList.add('bar__button', 'bar__button--exit');
        closeButton.innerHTML = '&#10005;';
        closeButton.addEventListener('click', () => {
            friendsListWindow.remove();
        });
    
        const minimizeButton = document.createElement('button');
        minimizeButton.classList.add('bar__button');
        minimizeButton.innerHTML = '&#9472;';
        minimizeButton.addEventListener('click', () => {
            const friendsBody = friendsListWindow.querySelector('.friendslist__body');
            if (friendsBody.style.display === 'none') {
                friendsBody.style.display = 'block';
                friendsListWindow.style.height = '400px';
            } else {
                friendsBody.style.display = 'none';
                friendsListWindow.style.height = '30px'; 
            }
        });
    
        barButtons.appendChild(closeButton);
        barButtons.appendChild(minimizeButton);
    
        const barTitle = document.createElement('p');
        barTitle.id = 'bar__user';
        barTitle.textContent = `${username}@friendslist: ~`;
    
        friendsBar.appendChild(barButtons);
        friendsBar.appendChild(barTitle);
    
        const friendsBody = document.createElement('section');
        friendsBody.classList.add('friendslist__body'); 
        friendsBody.style.overflowY = 'auto'; 
    
        friendsData.forEach((friend) => {
            const friendItem = document.createElement('div');
            friendItem.classList.add('friend-item');

            const profilePic = document.createElement('img');
            profilePic.classList.add('friend-item__profile-pic');
            profilePic.src = friend.profilePic;
            profilePic.alt = `${friend.username}'s profile picture`;
   
            const username = document.createElement('p');
            username.classList.add('friend-item__username');
            username.textContent = friend.username;
    
            friendItem.appendChild(profilePic);
            friendItem.appendChild(username);
    
            friendsBody.appendChild(friendItem);
        });
    
        const resizeCorner = document.createElement('div');
        resizeCorner.classList.add('window__resize-corner');
    
        friendsListWindow.appendChild(friendsBar);
        friendsListWindow.appendChild(friendsBody);
        friendsListWindow.appendChild(resizeCorner);
        container.appendChild(friendsListWindow);
    
        makeWindowDraggable(friendsListWindow, friendsBar);
        makeWindowResizable(friendsListWindow, resizeCorner);
    
        friendsListWindow.addEventListener('mousedown', () => {
            friendsListWindow.style.zIndex = ++zIndexCounter;
        });
    }

    function makeWindowDraggable(windowEl, handleEl) {
        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;
      
        handleEl.addEventListener('mousedown', (e) => {
          windowEl.style.zIndex = ++zIndexCounter;
          isDragging = true;
      
          const rect = windowEl.getBoundingClientRect();
          offsetX = e.pageX - (rect.left + window.scrollX);
          offsetY = e.pageY - (rect.top + window.scrollY);
      
          document.body.style.userSelect = 'none';
        });
      
        document.addEventListener('mousemove', (e) => {
          if (!isDragging) return;
      
          windowEl.style.left = (e.pageX - offsetX) + 'px';
          windowEl.style.top = (e.pageY - offsetY) + 'px';
        });
      
        document.addEventListener('mouseup', () => {
          isDragging = false;
          document.body.style.userSelect = 'auto';
        });
    }
  
    function makeWindowResizable(windowEl, cornerEl) {
      let isResizing = false;
      let startX, startY, startWidth, startHeight;
  
      cornerEl.addEventListener('mousedown', (e) => {
        e.stopPropagation();
        windowEl.style.zIndex = ++zIndexCounter;
  
        isResizing = true;
        startX = e.clientX;
        startY = e.clientY;
        startWidth = parseFloat(
          window.getComputedStyle(windowEl).getPropertyValue('width')
        );
        startHeight = parseFloat(
          window.getComputedStyle(windowEl).getPropertyValue('height')
        );
  
        document.body.style.userSelect = 'none';
      });
  
      document.addEventListener('mousemove', (e) => {
        if (!isResizing) return;
  
        const width = startWidth + (e.clientX - startX);
        const height = startHeight + (e.clientY - startY);
  
        windowEl.style.width = Math.max(150, width) + 'px';
        windowEl.style.height = Math.max(50, height) + 'px';
      });
  
      document.addEventListener('mouseup', () => {
        isResizing = false;
        document.body.style.userSelect = 'auto';
      });
    }

    function makeWindowResizableWithAspect(windowEl, cornerEl, imgEl) {
        let isResizing = false;
        let startX, startY, startWidth, startHeight, aspectRatio;
      
        cornerEl.addEventListener('mousedown', (e) => {
          e.stopPropagation();
          windowEl.style.zIndex = ++zIndexCounter;
      
          isResizing = true;
          startX = e.clientX;
          startY = e.clientY;
      
          startWidth = parseFloat(window.getComputedStyle(windowEl).getPropertyValue('width'));
          startHeight = parseFloat(window.getComputedStyle(windowEl).getPropertyValue('height'));
      
          const naturalWidth = imgEl.naturalWidth;
          const naturalHeight = imgEl.naturalHeight;
          aspectRatio = naturalWidth / naturalHeight;
      
          document.body.style.userSelect = 'none';
        });
      
        document.addEventListener('mousemove', (e) => {
          if (!isResizing) return;
      
          const newWidth = startWidth + (e.clientX - startX);
          const newHeight = newWidth / aspectRatio;
      
          if (newWidth < 100 || newHeight < 100) return;
      
          windowEl.style.width = `${newWidth}px`;
          windowEl.style.height = `${newHeight + 30}px`; 
        });
      
        document.addEventListener('mouseup', () => {
          isResizing = false;
          document.body.style.userSelect = 'auto';
        });
    }
    
    document.addEventListener('keydown', (e) => {
        if (!activeTerminal) return;
    
        const promptInput = activeTerminal.promptInputEl;
        if (!promptInput) return;
    
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
            promptInput.textContent += e.key;
        }
        else if (e.key === 'Backspace') {
            
            e.preventDefault();
            promptInput.textContent = promptInput.textContent.slice(0, -1);
        }
        else if (e.key === 'Enter') {
            e.preventDefault();
    
            const typedLine = promptInput.textContent.trim();
            const terminalBody = activeTerminal.promptBodyEl;
    
            const historyLine = document.createElement('div');
            historyLine.classList.add('terminal__prompt');
            historyLine.innerHTML = `
                <span class="terminal__prompt--user">${username}@ubuntu:</span>
                <span class="terminal__prompt--location">~</span>
                <span class="terminal__prompt--bling">$</span>
                <span class="terminal__prompt--input">${escapeHtml(typedLine)}</span>
            `;
    
            terminalBody.insertBefore(historyLine, terminalBody.lastElementChild);
    
            promptInput.textContent = '';
        }
    });
    
    function escapeHtml(str) {
        return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    }
  
    openTerminalBtn.addEventListener('click', createTerminal);
    openImageViewerBtn.addEventListener('click', () => createImageViewer('lifelover.png'));
    openFriendsListBtn.addEventListener('click', createFriendsList);
  
    createTerminal();
  });