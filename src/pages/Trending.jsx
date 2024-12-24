import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Trending.css';

const Trending = () => {
    const [trendings, setTrendings] = useState([]);
    const [virals, setVirals] = useState([]);
    

    // Fetch Articles (both trending and viral videos) with exponential backoff for retry logic


    useEffect(() => {
        // Fetch trending news and viral videos
        const fetchAllArticles = async () => {
            try {
                const trendingData = await axios.get('https://gnews.io/api/v4/search?q=example&lang=en&country=us&max=10&apikey=71a62cff9a62df6d15c611ec5c2d2822');
                setTrendings(trendingData.data.articles);

                const viralData = await axios.get('https://newsapi.org/v2/everything?q=apple&from=2024-12-18&to=2024-12-18&sortBy=popularity&apiKey=f79141b2be7f493c855af2f4ea7ea02f');
                setVirals(viralData.data.articles);
            } catch (err) {
                console.error("Error fetching articles:", err);
            }
        };

        fetchAllArticles();
    }, []);

    useEffect(() => {
        // Log state when updated (for debugging purposes)
        console.log("Trending articles:", trendings);
        console.log("Viral articles:", virals);
    }, [trendings, virals]);

    return (
        <>
            <main>
                <div className="Trending">
                    <h1>Trending News</h1>
                    <div id="trendingCarousel" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            {trendings.map((trend, index) => (
                                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                    <div style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '10px', textAlign: 'center' }}>
                                        {trend.image ? (
                                            <img src={trend.image} alt={trend.title} style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '10px' }} />
                                        ) : (
                                            <div style={{ width: '100%', height: '400px', backgroundColor: '#f0f0f0', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '10px' }}>
                                                <p style={{ color: '#aaa' }}>No Image Available</p>
                                            </div>
                                        )}
                                        <h3>{trend.title}</h3>
                                        <p>{trend.country}</p>
                                        <h4>{trend.author}</h4>
                                        <a href={trend.source_url} target="_blank" rel="noopener noreferrer" style={{ color: '#007BFF' }}>
                                            Read More
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#trendingCarousel" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#trendingCarousel" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>

                <div className="ViralVideos">
                    <h1>Viral News</h1>
                    <div id="newsCarousel" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            {virals.map((viral, index) => (
                                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                    <div style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '10px', textAlign: 'center' }}>
                                        {viral.urlToImage ? (
                                            <img src={viral.urlToImage} alt={viral.title} style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '10px' }} />
                                        ) : (
                                            <div style={{ width: '100%', height: '400px', backgroundColor: '#f0f0f0', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '10px' }}>
                                                <p style={{ color: '#aaa' }}>No Image Available</p>
                                            </div>
                                        )}
                                        <h3>{viral.title}</h3>
                                        <p>{viral.country}</p>
                                        <h4>{viral.description}</h4>
                                        <a href={viral.source_url} target="_blank" rel="noopener noreferrer" style={{ color: '#007BFF' }}>
                                            Read More
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#newsCarousel" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#newsCarousel" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Trending;
