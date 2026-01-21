import React, { useEffect, useState } from 'react';
import './Header.css';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        let ticking = false;
        
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const header = document.getElementById('header');
                    if (window.scrollY > 50) {
                        header.classList.add('header-scroll');
                    } else {
                        header.classList.remove('header-scroll');
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); 

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleNavClick = (e, targetId) => {
        e.preventDefault();
        
        if (targetId === '#') return;
        
        setIsMenuOpen(false);
        
        setTimeout(() => {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: targetPosition - headerHeight,
                    behavior: 'smooth'
                });
            }
        }, 300);
    };

    return (
        <header id="header">
            <div className="container">
                <div className="header-content">
                    <div className="logo">
                        <i className="fas fa-water wave"></i>
                        <span>Primeira Onda</span>
                    </div>
                    <div className="menu-toggle" onClick={handleMenuToggle}>
                        <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                    </div>
                    <nav className={isMenuOpen ? 'active' : ''}>
                        <ul>
                            <li><a href="#home" onClick={(e) => handleNavClick(e, '#home')}>Início</a></li>
                            <li><a href="#videos" onClick={(e) => handleNavClick(e, '#videos')}>Vídeos</a></li>
                            <li><a href="#galeria" onClick={(e) => handleNavClick(e, '#galeria')}>Galeria</a></li>
                            <li><a href="#sobre" onClick={(e) => handleNavClick(e, '#sobre')}>Sobre</a></li>
                            <li><a href="#contato" onClick={(e) => handleNavClick(e, '#contato')}>Contato</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;