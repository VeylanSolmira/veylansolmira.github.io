async function loadToolbar() {
    try {
        const response = await fetch('toolbar.html');
        const html = await response.text();
        
        // Create a temporary container to parse the HTML
        const temp = document.createElement('div');
        temp.innerHTML = html;
        
        // Extract and append the styles
        const styles = temp.getElementsByTagName('style');
        for (let style of styles) {
            document.head.appendChild(style.cloneNode(true));
        }
        
        // Extract and append the toolbar
        const toolbar = temp.querySelector('.toolbar');
        if (toolbar) {
            document.body.insertBefore(toolbar, document.body.firstChild);
            
            // Add a class to the body to handle toolbar spacing
            document.body.classList.add('has-toolbar');
            
            // Add margin to the main content to account for fixed toolbar
            const mainContent = document.querySelector('.main-content');
            if (mainContent) {
                mainContent.classList.add('with-toolbar');
            }
        }
    } catch (error) {
        console.error('Error loading toolbar:', error);
    }
}

// Load toolbar when the document is ready
document.addEventListener('DOMContentLoaded', loadToolbar); 