import React, { useState, useEffect } from 'react';
import { Dropdown, Menu } from 'antd';
import './style.scss';
import { useNavigate } from "react-router-dom";

const MenuPage = () =>  {
  const [meals, setMeals] = useState();
  const [filteredMeals, setFilteredMeals] = useState();
  const [ingredients, setIngredients] = useState();
  const navigate = useNavigate();

    useEffect(() => {
        const dataFetch = async () => {
            const urls = Array.from( { length: 9 }, (v,i) => `https://apis.career.otsimo.xyz/api/restaurant/get/${i + 1}` );
            const promises = urls.map(url => fetch(url).then(res => res.json()).then(data => data));
            const allData = (await Promise.all(promises)).flat();
             setMeals(allData);
            setFilteredMeals(allData);
        };
        dataFetch();
    }, []);

    useEffect(() => {
      const dataFetch = async () => {
          const data = await (
            await fetch('https://apis.career.otsimo.xyz/api/restaurant/listIngredients')
          ).json();
          setIngredients(data);
        };
        dataFetch();
  }, []);

    const sortByName = () => {
      const sortedMeals = [...filteredMeals].sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
      setFilteredMeals(sortedMeals);
    };

    const sortByDiet = (diet) => {
      const copyArray = [...meals];
      const vegetarianOpt = ingredients.filter((ing) => ing.groups?.filter((el) => el === 'vegetarian' || el === 'vegan'));
      const veganOpt = ingredients.filter((elem) => elem.groups?.length === 1 && elem.groups?.find((gr) => gr === 'vegan'));
      if(diet === 'all'){
        setFilteredMeals(meals);
      }
      if(diet === 'veg'){
        const names = vegetarianOpt.map((e) => e.name);
        const vegeMeals = copyArray.map((meal) => {
          const selected = meal.ingredients.filter(x => names.includes(x.name));
          if(selected) return meal;
        });
        setFilteredMeals(vegeMeals);
      }
      if(diet === 'vegan'){
        const veganIng = veganOpt.map((e) => e.name);
        const veganMeals = veganIng?.length > 1 && copyArray.map((meal) => {
          const selected = meal.ingredients.filter(x => veganIng.includes(x.name));
          if(selected) return meal;
        });
        setFilteredMeals(veganMeals);
      }
  };

  const changeRoute = (meal) =>{ 
    navigate(`/meal/${meal.id}`, { state: {meal} });
  };

  const randomMeals = () => {
    const len = Math.floor(Math.random() * meals.length);
    changeRoute(meals[len]);
  };

const menu = (
  <Menu>
    <Menu.Item onClick={() => sortByDiet('all')} key="all">All</Menu.Item>
    <Menu.Item onClick={() => sortByDiet('vegan')} key="vegan">Vegan</Menu.Item>
    <Menu.Item onClick={() => sortByDiet('veg')} key="vegetarian">Vegetarian</Menu.Item>
  </Menu>
);

  return (
    <div className='meals-container'>
      <div className='filter-container'>
        <span onClick={sortByName}>Name ↓</span>
        <Dropdown overlay={menu} trigger={["click"]}>
          <span>Filter By</span>
        </Dropdown>
      </div>
        {filteredMeals?.length > 1 && filteredMeals?.map((meal) => (
            <>
            <div onClick={() => changeRoute(meal)} className='meals-card'>
              <span>{meal.name}</span>
              <div className='ingredients'>
                {meal.ingredients.map((ing, index) => (
                  <span>{(index ? ', ' : '') + ing.name}</span>
                ))}
              </div>
            </div>
           
          </>
        ))}
        <button className='feel-lucky-btn' onClick={randomMeals}>Choose my meal for me😋</button>
    </div>
  );
}

export default MenuPage;
