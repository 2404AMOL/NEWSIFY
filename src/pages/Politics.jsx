import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Politics.css'
const Politics = () => {
    const [results, setResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 4; // Number of articles per page

    const fetchArticles = async (url) => {
        let retries = 3;
        let delay = 1000; // initial delay (ms)

        while (retries > 0) {
            try {
                const response = await axios.get(url);
                return response.data.results;
            } catch (error) {
                if (error.response && error.response.status === 429) {
                    // Rate-limited, retry after the delay
                    console.log(`Rate limited. Retrying in ${delay} ms...`);
                    await new Promise(resolve => setTimeout(resolve, delay));
                    retries--;
                    delay *= 2; // Exponential backoff
                } else {
                    console.error("Error fetching articles:", error);
                    throw error;
                }
            }
        }
        throw new Error('Max retries reached');
    };
    useEffect(() => {
        const fetchAllArticles = async () => {
            try {
                const response = await fetchArticles('https://newsdata.io/api/1/news?apikey=pub_628482833c8e95e962cb60f348db2ff7eb34e&q=politics');
                setResults(response.data.results);
            } catch (err) {
                console.error("Error fetching articles:", err);
            }
        };
        fetchAllArticles();
    }, []);

    // Calculate the articles for the current page
    const startIndex = (currentPage - 1) * articlesPerPage;
    const currentArticles = results.slice(startIndex, startIndex + articlesPerPage);

    // Calculate total pages
    const totalPages = Math.ceil(results.length / articlesPerPage);

    return (
        <div className='Politics'>
            <h1>News Articles</h1>
            <div className='Politics-Inner' style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                {currentArticles.map((result, index) => (
                    <div key={index} style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '10px', textAlign: 'center' }}>
                        {result.image_url ? (
                            <img
                                src={result.image_url}
                                alt={result.title}
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
                        <h3>{result.title}</h3>
                        <p>{result.country}</p>
                        <h4>{result.author}</h4>
                        <a href={result.source_url} target="_blank" rel="noopener noreferrer" style={{ color: '#007BFF' }}>
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

export default Politics;
