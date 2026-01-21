import React from 'react';
import './Footer.css';

function Footer() {
    const handleNavClick = (e, targetId) => {
        e.preventDefault();
        
        if (targetId === '#') return;
        
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
        }, 100);
    };

    return (
        <footer id="contato">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-column">
                        <h3>Primeira Onda</h3>
                        <p>Nosso objetivo é compartilhar a paixão pelo surf e conectar a comunidade surfista ao redor do mundo.</p>
                        <div className="social-links">
                            <a href="#" className="social-link"><i className="fab fa-instagram"></i></a>
                            <a href="#" className="social-link"><i className="fab fa-youtube"></i></a>
                            <a href="#" className="social-link"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="social-link"><i className="fab fa-tiktok"></i></a>
                        </div>
                    </div>
                    <div className="footer-column">
                        <h3>Links Rápidos</h3>
                        <ul>
                            <li><a href="#home" onClick={(e) => handleNavClick(e, '#home')}>Início</a></li>
                            <li><a href="#videos" onClick={(e) => handleNavClick(e, '#videos')}>Vídeos</a></li>
                            <li><a href="#galeria" onClick={(e) => handleNavClick(e, '#galeria')}>Galeria</a></li>
                            <li><a href="#sobre" onClick={(e) => handleNavClick(e, '#sobre')}>Sobre Nós</a></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h3>Contato</h3>
                        <ul>
                            <li><i className="fas fa-envelope"></i> felinharesdomingues@gmail.com</li>
                            <li><i className="fas fa-phone"></i> (48) 98801-2747</li>
                            <li><i className="fas fa-map-marker-alt"></i> Santa Catarina, Brasil</li>
                        </ul>
                    </div>
                </div>
                <div className="copyright">
                    <p>&copy; 2026 Primeira Onda. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;