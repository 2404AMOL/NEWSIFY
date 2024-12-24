import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Food = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    
    const articlesPerPage = 8; // Number of articles per page

    useEffect(() => {
        const fetchRecipes = async () => {
            const options = {
                method: 'GET',
                url: 'https://tasty.p.rapidapi.com/recipes/list',
                params: {
                    from: '0',
                    size: '20',
                    tags: 'under_30_minutes',
                },
                headers: {
                    'x-rapidapi-key': '6bc606a3e6mshec90eb659f28f3dp1b16d7jsn4c640723fcae',
                    'x-rapidapi-host': 'tasty.p.rapidapi.com',
                },
            };

            try {
                const response = await axios.request(options);
                setRecipes(response.data.results || []);
                console.log(response.data.results);
                 // Handle cases where results might be undefined
            } catch (error) {
                console.error("Error fetching recipes:", error);
                setError(error.message || 'Something went wrong');
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []); // Empty dependency array ensures this runs only once when the component mounts

      // Calculate the articles for the current page
      const startIndex = (currentPage - 1) * articlesPerPage;
      const currentArticles = recipes.slice(startIndex, startIndex + articlesPerPage);
  
      // Calculate total pages
      const totalPages = Math.ceil(recipes.length / articlesPerPage);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Recipes Under 30 Minutes</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                {recipes.length > 0 ? (
                    currentArticles.map((recipe, index) => (
                        <div
                            key={index}
                            style={{
                                border: '1px solid #ddd',
                                borderRadius: '10px',
                                padding: '10px',
                                textAlign: 'center',
                            }}
                        >
                            <h3>{recipe.name}</h3>
                            {recipe.thumbnail_url ? (
                                <img
                                    src={recipe.thumbnail_url}
                                    alt={recipe.name}
                                    style={{
                                        width: '100%',
                                        height: '200px',
                                        objectFit: 'cover',
                                        borderRadius: '10px',
                                    }}
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
                                        borderRadius: '10px',
                                    }}
                                >
                                    <p style={{ color: '#aaa' }}>No Image Available</p>
                                </div>
                            )}
                            <p>{recipe.description || 'No description available'}</p>
                            <h5>Rs.{recipe.price.portion}</h5>
                        </div>
                    ))
                ) : (
                    <p>No recipes found.</p>
                )}
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

export default Food;
