import React, { useEffect, useState } from 'react';

function Popular() {
  /**
   popular below is the variable and we use setPopular to modify it. We pass an empty array to useState so declare what type of data this(popular) is
   */
  const [popular, setPopular] = useState([]);

  // Use useEffect so we can getPopularRecipes runs as soon as component is mounted https://beta.reactjs.org/apis/react/useEffect
  useEffect(() => {
    getPopularRecipes();
  }, []);

  // Use async because we are waiting for data, want to wait before this runs
  const getPopularRecipes = async () => {
    // // need to get an API key for this to work? yes need key, was getting 401 without
    // // can we limit results? don't want all recipes
    const api = await fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${process.env.RECIPE_KEY}&number=2`
    );
    // console.log(api); // api is a response object

    // // wait for fetch request to complete, then convert the api response to json
    const data = await api.json();
    setPopular(data.recipes);
    // console.log(data);
    // console.log('async hello');
  };

  return (
    <div>
      {popular.map((recipe) => {
        return <div key={recipe.id}>{recipe.title}</div>;
      })}
    </div>
  );
}

export default Popular;
