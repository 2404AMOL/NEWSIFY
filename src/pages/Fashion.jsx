import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Fashion.css'
const Fashion = () => {
    const [results, setResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 8; // Number of articles per page

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
                const options = {
                    method: 'GET',
                    url: 'https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list',
                    params: {
                      country: 'us',
                      lang: 'en',
                      currentpage: '0',
                      pagesize: '30',
                      categories: 'men_all',
                      concepts: 'H&M MAN'
                    },
                    headers: {
                      'x-rapidapi-key': '6bc606a3e6mshec90eb659f28f3dp1b16d7jsn4c640723fcae',
                      'x-rapidapi-host': 'apidojo-hm-hennes-mauritz-v1.p.rapidapi.com'
                    }
                  };
                  
                const response = await axios.request(options);
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
        <div className='Fashion'>
            <h1>News Articles</h1>
            <div className='Fashion-Inner' style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                {currentArticles.map((result, index) => (
                    <div key={index} style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '10px', textAlign: 'center' }}>
                        {result.images ? (
                            <img
                                src={result.images[0].baseUrl}
                                alt={result.name}
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
                        <h3>{result.name}</h3>
                        <p>{result.price.formattedValue}</p>
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

export default Fashion;
