export async function navbar() {
    const nav = document.createElement("nav");
    nav.className = "navbar navbar-expand-lg navbar-light bg-light";

    // 버튼 + collapse div 세팅
    nav.innerHTML = `
    <a class="navbar-brand" href="/"> </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto" id="navbar-menu">

        </ul>
    </div>
    `;

    // 화면(body) 제일 위에 추가
    document.body.insertBefore(nav, document.body.firstChild);

    try {
        const response = await fetch('/check-login');
        const result = await response.json();
    
        const loggedInMenu = [
            { name: "Home", link: "/" },
            { name: "Profile", link: "/Profile" },
            { name: "Tweet", link: "/Tweet" },
            { name: "Logout", link: "/Logout" }
        ];
    
        const guestMenu = [
            { name: "Home", link: "/" },
            { name: "Login", link: "/Login" },
            { name: "Register", link: "/Register" }
        ];
    
        const menuItems = result.loggedIn ? loggedInMenu : guestMenu;
        const navbarMenu = document.getElementById('navbar-menu');
    
        navbarMenu.innerHTML = menuItems.map(item => `
            <li class="nav-item">
                <a class="nav-link" href="${item.link}">${item.name}</a>
            </li>
        `).join('');
    } catch (error) {
    console.error(error);
    }
}