/* Configurações Globais */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Arial, sans-serif;
    scroll-behavior: smooth;
}

:root {
    --primary: #2e7d32;
    --primary-dark: #1b5e20;
    --accent: #a5d6a7;
    --dark: #212529;
    --light: #f8f9fa;
    --white: #ffffff;
}

body {
    color: var(--dark);
    background-color: var(--white);
    line-height: 1.6;
}

.container {
    width: 90%;
    max-width: 1100px;
    margin: 0 auto;
}

.section {
    padding: 80px 0;
}

.bg-light {
    background-color: var(--light);
}

h2 {
    font-size: 2.2rem;
    color: var(--primary-dark);
    text-align: center;
    margin-bottom: 10px;
}

.subtitle {
    font-size: 1.1rem;
    color: #6c757d;
    text-align: center;
    margin-bottom: 50px;
}

/* Cabeçalho e Menu Hamburguer */
header {
    background-color: var(--white);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    position: sticky;
    top: 0;
    z-index: 1000;
}

.header-flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
}

.logo {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary);
}

.logo span {
    color: var(--dark);
}

.menu-toggle {
    display: none;
    flex-direction: column;
    justify-content: space-between;
    width: 30px;
    height: 21px;
    background: transparent;
    border: none;
    cursor: pointer;
    z-index: 1100;
}

.menu-toggle .bar {
    height: 3px;
    width: 100%;
    background-color: var(--dark);
    border-radius: 10px;
    transition: all 0.3s ease;
}

.nav-menu ul {
    display: flex;
    list-style: none;
    gap: 30px;
}

.nav-menu a {
    text-decoration: none;
    color: var(--dark);
    font-weight: 600;
    font-size: 1rem;
    transition: color 0.2s;
}

.nav-menu a:hover {
    color: var(--primary);
}

/* Banner Principal */
.hero {
    background: linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), 
                url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1200') no-repeat center center/cover;
    height: 75vh;
    display: flex;
    align-items: center;
    color: var(--white);
    text-align: center;
}

.hero-content h1 {
    font-size: 3.5rem;
    margin-bottom: 20px;
    font-weight: 800;
}

.hero-content p {
    font-size: 1.25rem;
    max-width: 700px;
    margin: 0 auto 35px auto;
}

.btn {
    background-color: var(--primary);
    color: var(--white);
    padding: 14px 35px;
    text-decoration: none;
    border-radius: 30px;
    font-weight: 600;
    box-shadow: 0 4px 10px rgba(46, 125, 50, 0.3);
    transition: background 0.2s, transform 0.2s;
}

.btn:hover {
    background-color: var(--primary-dark);
    transform: translateY(-2px);
}

/* Grid de Cards */
.grid-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
}

.card {
    background: var(--white);
    padding: 35px 25px;
    border-radius: 12px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.04);
    border-top: 5px solid var(--primary);
    text-align: center;
    transition: transform 0.3s;
}

.card:hover {
    transform: translateY(-5px);
}

.card-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
}

.card h3 {
    margin-bottom: 15px;
    color: var(--primary-dark);
}

/* Menu de Tópicos (Accordion) */
.menu-topicos-container {
    max-width: 800px;
}

.accordion-item {
    background-color: var(--white);
    margin-bottom: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.03);
    overflow: hidden;
}

.accordion-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background: none;
    border: none;
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--dark);
    text-align: left;
    cursor: pointer;
    transition: background 0.2s;
}

.accordion-header:hover {
    background-color: #f1f3f5;
}

.accordion-header .icon {
    font-size: 1.3rem;
    color: var(--primary);
    transition: transform 0.3s;
}

.accordion-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-
