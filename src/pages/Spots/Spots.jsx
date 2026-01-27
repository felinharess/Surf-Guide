import { useState } from "react";
import axios from "axios";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./SurfSpots.css";

function SurfSpots() {
    const [coords, setCoords] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState("buscar");
    const [searchResults, setSearchResults] = useState([]);

    const getLocalizacao = () => {
        setIsLoading(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCoords({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                });
                setIsLoading(false);
                setActiveTab("localizacao");
            },
            (error) => {
                setIsLoading(false);
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        alert("Você negou o acesso à localização");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        alert("Localização indisponível");
                        break;
                    case error.TIMEOUT:
                        alert("Tempo de espera excedido");
                        break;
                    default:
                        alert("Erro ao obter localização");
                }
            }
        );
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) {
            alert("Por favor, digite uma cidade, estado ou região");
            return;
        }
        searchResponse(searchTerm);
    };

    const searchResponse = async (term) => {
        const response = await axios.get(`http://localhost:3000/praias/search?query=${term}`);
        console.log(response);
        setSearchResults(response.data.Praias);
    };

    return (
        <>
            <Header />

            <main className="surf-spots-container">
                <div className="surf-spots-hero">
                    <h1 className="surf-spots-title">
                        <i className="fas fa-water wave"></i> Encontre os Melhores Surf-Spots
                    </h1>
                    <p className="surf-spots-subtitle">
                        Descubra as melhores ondas perto de você. Busque por cidade ou use sua localização atual.
                    </p>
                </div>

                <div className="surf-spots-content">
                    <div className="tabs-container">
                        <div className="tabs">
                            <button
                                className={`tab ${activeTab === "buscar" ? "active" : ""}`}
                                onClick={() => setActiveTab("buscar")}
                            >
                                <i className="fas fa-search"></i> Buscar por Local
                            </button>
                            <button
                                className={`tab ${activeTab === "localizacao" ? "active" : ""}`}
                                onClick={() => setActiveTab("localizacao")}
                            >
                                <i className="fas fa-location-arrow"></i> Usar Minha Localização
                            </button>
                        </div>

                        {activeTab === "buscar" && (
                            <div className="tab-content animate-fade-in">
                                <div className="search-card">
                                    <div className="search-header">
                                        <h2>
                                            <i className="fas fa-search-location"></i> Buscar Surf-Spots
                                        </h2>
                                        <p>Encontre os melhores spots por cidade, estado ou região</p>
                                    </div>

                                    <form onSubmit={handleSearch} className="search-form">
                                        <div className="search-input-group">
                                            <div className="input-with-icon">
                                                <i className="fas fa-map-marker-alt"></i>
                                                <input
                                                    type="text"
                                                    placeholder="Ex: Florianópolis, SC ou Costa Leste"
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                    className="search-input"
                                                />
                                            </div>
                                            <button type="submit" className="search-button">
                                                <i className="fas fa-search"></i> Buscar
                                            </button>
                                        </div>

                                        <div className="search-suggestions">
                                            <p className="suggestions-title">
                                                <i className="fas fa-lightbulb"></i> Sugestões:
                                            </p>
                                            <div className="suggestion-tags">
                                                <button
                                                    type="button"
                                                    className="suggestion-tag"
                                                    onClick={() => setSearchTerm("Florianópolis")}
                                                >
                                                    Florianópolis
                                                </button>
                                                <button
                                                    type="button"
                                                    className="suggestion-tag"
                                                    onClick={() => setSearchTerm("Ubatuba")}
                                                >
                                                    Ubatuba
                                                </button>
                                                <button
                                                    type="button"
                                                    className="suggestion-tag"
                                                    onClick={() => setSearchTerm("Rio de Janeiro")}
                                                >
                                                    Rio de Janeiro
                                                </button>
                                                <button
                                                    type="button"
                                                    className="suggestion-tag"
                                                    onClick={() => setSearchTerm("Bahia")}
                                                >
                                                    Bahia
                                                </button>
                                            </div>
                                        </div>
                                    </form>

                                    {searchResults.length > 0 && (
                                        <div className="search-results">
                                            <h3 className="results-title">
                                                <i className="fas fa-map-marked-alt"></i> Resultados Encontrados
                                                <span className="results-count">{searchResults.length} spots</span>
                                            </h3>

                                            <div className="results-grid">
                                                {searchResults.map((spot) => (
                                                    <div key={spot.id} className="spot-card">
                                                        <div className="spot-image">
                                                            {spot.image ? (
                                                                <img src={spot.image} alt={spot.name} className="spot-image-content" />
                                                            ) : (
                                                                <div className="spot-image-placeholder">
                                                                    <i className="fas fa-water wave"></i>
                                                                </div>
                                                            )}
                                                            
                                                            <div className="spot-overlay">
                                                                <button className="spot-view-button">
                                                                    <i className="fas fa-eye"></i> Ver detalhes
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="spot-info">
                                                            <h4 className="spot-name">{spot.name}</h4>
                                                            <div className="spot-location">
                                                                <i className="fas fa-map-pin"></i>
                                                                <span>{spot.city}, {spot.state}</span>
                                                            </div>
                                                            
                                                            <div className="spot-conditions">
                                                                <span className="condition-tag">
                                                                    <i className="fas fa-water"></i> {spot.dificult || "Intermediária"}
                                                                </span>
                                                                <span className="condition-tag">
                                                                    <i className="fas fa-wind"></i> {spot.wind_direction || "NE"}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Estado Inicial - Sem resultados ainda */}
                                    {searchResults.length === 0 && (
                                        <div className="empty-state">
                                            <div className="empty-state-icon">
                                                <i className="fas fa-search"></i>
                                            </div>
                                            <h3>Encontre seu próximo spot</h3>
                                            <p>
                                                Digite uma cidade, estado ou região para buscar os melhores
                                                surf-spots da área. Você também pode clicar nas sugestões acima.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === "localizacao" && (
                            <div className="tab-content animate-fade-in">
                                <div className="location-card">
                                    <div className="location-icon">
                                        <i className="fas fa-location-arrow"></i>
                                    </div>

                                    <h2 className="location-title">Usar minha localização atual</h2>

                                    <p className="location-description">
                                        Permita o acesso à sua localização para encontrar os melhores
                                        surf-spots próximos a você. Descubra ondas incríveis ao seu redor!
                                    </p>

                                    <button
                                        className="location-button hover-effect"
                                        onClick={getLocalizacao}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <i className="fas fa-spinner fa-spin"></i> Obtendo localização...
                                            </>
                                        ) : (
                                            <>
                                                <i className="fas fa-compass"></i> Usar Localização Atual
                                            </>
                                        )}
                                    </button>

                                    <p className="location-note">
                                        <i className="fas fa-lock"></i> Sua localização é usada apenas para buscar
                                        spots próximos e não é armazenada.
                                    </p>
                                </div>

                                {coords && (
                                    <div className="coordinates-card">
                                        <div className="coordinates-header">
                                            <h3>
                                                <i className="fas fa-check-circle"></i> Localização Obtida!
                                            </h3>
                                            <p className="coordinates-subtitle">
                                                Encontramos surf-spots próximos à sua localização
                                            </p>
                                        </div>

                                        <div className="coordinates-data">
                                            <div className="coordinate-item">
                                                <div className="coordinate-label">
                                                    <i className="fas fa-globe-americas"></i> Suas Coordenadas
                                                </div>
                                                <div className="coordinate-values">
                                                    <div className="coordinate-pair">
                                                        <span className="coordinate-type">Latitude:</span>
                                                        <span className="coordinate-value">{coords.lat.toFixed(6)}</span>
                                                    </div>
                                                    <div className="coordinate-pair">
                                                        <span className="coordinate-type">Longitude:</span>
                                                        <span className="coordinate-value">{coords.lon.toFixed(6)}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="nearby-spots">
                                                <h4>
                                                    <i className="fas fa-map-marker-alt"></i> Spots Próximos
                                                </h4>
                                                <div className="spots-list">
                                                    <div className="nearby-spot">
                                                        <div className="spot-details">
                                                            <h5>Praia da Joaquina</h5>
                                                            <p>Florianópolis, SC • ~8 km de você</p>
                                                        </div>
                                                        <div className="spot-rating-badge">
                                                            <i className="fas fa-star"></i> 4.8
                                                        </div>
                                                    </div>
                                                    <div className="nearby-spot">
                                                        <div className="spot-details">
                                                            <h5>Praia Mole</h5>
                                                            <p>Florianópolis, SC • ~10 km de você</p>
                                                        </div>
                                                        <div className="spot-rating-badge">
                                                            <i className="fas fa-star"></i> 4.5
                                                        </div>
                                                    </div>
                                                    <div className="nearby-spot">
                                                        <div className="spot-details">
                                                            <h5>Praia do Matadeiro</h5>
                                                            <p>Florianópolis, SC • ~12 km de você</p>
                                                        </div>
                                                        <div className="spot-rating-badge">
                                                            <i className="fas fa-star"></i> 4.3
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="coordinates-actions">
                                            <button className="action-button primary">
                                                <i className="fas fa-directions"></i> Ver Todos os Spots Próximos
                                            </button>
                                            <button
                                                className="action-button secondary"
                                                onClick={() => {
                                                    setCoords(null);
                                                    setActiveTab("buscar");
                                                }}
                                            >
                                                <i className="fas fa-redo"></i> Buscar Outro Local
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="surf-info">
                        <h3 className="info-title">
                            <i className="fas fa-info-circle"></i> Como Encontrar o Spot Perfeito
                        </h3>
                        <div className="info-steps">
                            <div className="step">
                                <div className="step-icon">
                                    <i className="fas fa-search"></i>
                                </div>
                                <h4>1. Busque ou Permita Localização</h4>
                                <p>Digite uma cidade ou região específica, ou use sua localização atual para encontrar spots próximos.</p>
                            </div>
                            <div className="step">
                                <div className="step-icon">
                                    <i className="fas fa-filter"></i>
                                </div>
                                <h4>2. Filtre por Preferências</h4>
                                <p>Encontre spots por tipo de onda, dificuldade, vento ideal e outras condições.</p>
                            </div>
                            <div className="step">
                                <div className="step-icon">
                                    <i className="fas fa-wave-square"></i>
                                </div>
                                <h4>3. Veja Condições em Tempo Real</h4>
                                <p>Acesse informações atualizadas sobre ondulação, vento, maré e lotação.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}

export default SurfSpots;