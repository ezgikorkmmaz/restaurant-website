import React, { useState, useEffect } from 'react';
import './style.scss';

const MenuPage = () =>  {
  const [meals, setMeals] = useState();
  const [filteredMeals, setFilteredMeals] = useState();
//   const [searchParam] = useState(["name"]);

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
  
// useEffect(() => {
//   const filteredData = products?.filter((item) => {
//     return searchParam.some((newItem) => {
//         return (
//             item[newItem]
//                 .toString()
//                 .toLowerCase()
//                 .indexOf(searchInput.toLowerCase()) > -1
//         );
//     });
// });
//   setFilteredProducts(filteredData);
// }, [searchInput, searchParam, products]);

console.log(meals);

  return (
    <div className='meals-page'>
        <span>Meals</span>
        {meals?.map((meal) => (
            <div className='meals-card'>
            <span>{meal.name}</span>
            {meal.ingredients.map((ing, index) => (
                 <span className='ingredients'>{ (index ? ', ' : '') + ing.name }</span>
            ))}
            </div>
        ))}
    </div>
  );
}

export default MenuPage;
