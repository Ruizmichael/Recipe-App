import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

function Veggie() {
  /**
   popular below is the variable and we use setPopular to modify it. We pass an empty array to useState so declare what type of data this(popular) is
   */
  const [veggie, setVeggie] = useState([]);

  // Use useEffect so we can getPopularRecipes runs as soon as component is mounted https://beta.reactjs.org/apis/react/useEffect
  useEffect(() => {
    getVeggieRecipes();
  }, []);

  // Use async because we are waiting for data, want to wait before this runs
  const getVeggieRecipes = async () => {
    const recipeCache = localStorage.getItem('veggie');

    if (recipeCache) {
      setVeggie(JSON.parse(recipeCache));
    } else {
      // // need to get an API key for this to work? yes need key, was getting 401 without
      // // can we limit results? don't want all recipes
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.RECIPE_KEY}&number=6&tag=vegetarian`
      );
      // console.log(api); // api is a response object

      // // wait for fetch request to complete, then convert the api response to json
      const data = await api.json();
      // convert to string and store
      localStorage.setItem('veggie', JSON.stringify(data.recipes));
      setVeggie(data.recipes);
      // console.log(data);
      // console.log('async hello');
    }
  };

  const Wrapper = styled.div`
    margin: 4rem 0rem;
  `;

  const Card = styled.div`
    min-height: 25rem;
    border-radius: 2rem;
    overflow: hidden;
    position: relative;

    img {
      border-radius: 2rem;
      position: absolute;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    p {
      position: absolute;
      z-index: 10;
      left: 50%;
      bottom: 0%;
      transform: translate(-50%, 0%);
      color: white;
      width: 100%;
      text-align: center;
      font-weight: 600;
      font-size: 1rem;
      height: 40%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `;

  const Gradient = styled.div`
    z-index: 3;
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
  `;

  return (
    <div>
      <Wrapper>
        <h3>Vegetarian's dishes</h3>
        <Splide
          options={{
            perPage: 3,
            arrows: false,
            pagination: false,
            drag: 'free',
            gap: '5rem',
          }}>
          {veggie.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <Card>
                  <p>{recipe.title}</p>
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                  />
                  <Gradient />
                </Card>
              </SplideSlide>
            );
          })}
        </Splide>
      </Wrapper>
    </div>
  );
}

export default Veggie;
