import React, { useState, useEffect } from 'react';
import axios from 'axios';
import'../css/Sports.css'
const Sports = () => {
    const [results, setResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 7; // Number of articles per page

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get('https://gnews.io/api/v4/search?q=example&lang=en&country=us&max=10&apikey=71a62cff9a62df6d15c611ec5c2d2822 ');
                setResults(response.data.articles);
            } catch (err) {
                console.error("Error fetching articles:", err);
            }
        };
        fetchArticles();
    }, []);

    // Calculate the articles for the current page
    const startIndex = (currentPage - 1) * articlesPerPage;
    const currentArticles = results.slice(startIndex, startIndex + articlesPerPage);

    // Calculate total pages
    const totalPages = Math.ceil(results.length / articlesPerPage);

    return (
        <div className='Sports'>
            <h1>News Articles</h1>
            <div className='Sports-Inner' style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                {currentArticles.map((results, index) => (
                    <div key={index} style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '10px', textAlign: 'center' }}>
                        {results.image ? (
                            <img
                                src={results.image}
                                alt={results.title}
                                style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px' }}
                            />
                        ) : (
                            <div
                                style={{
                                    width: '100%',
                                    height: '200px',
                                    backgroundColor: '#f0f0f0',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: '10px'
                                }}
                            >
                                <p style={{ color: '#aaa' }}>No Image Available</p>
                            </div>
                        )}
                        <h3>{results.title}</h3>
                        <p>{results.description}</p>
                        <h4>{results.country}</h4>
                        <a href={results.url} target="_blank" rel="noopener noreferrer" style={{ color: '#007BFF' }}>
                            Read More
                        </a>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    style={{
                        marginRight: '10px',
                        padding: '10px 20px',
                        backgroundColor: currentPage === 1 ? '#ccc' : '#007BFF',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                    }}
                >
                    Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    style={{
                        marginLeft: '10px',
                        padding: '10px 20px',
                        backgroundColor: currentPage === totalPages ? '#ccc' : '#007BFF',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                    }}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Sports;
