import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './style.scss';
import { Radio} from 'antd';

const MenuPage = () =>  {
    const location = useLocation();
    const selectedMeal = location.state.meal;
    const [quality, setQuality] = useState();
    const [price, setPrice] = useState([]);
    const [selectedOpts, setSelectedOpts] = useState([]);
    const [value, setValue] = useState();
    const [parentName, setParentName] = useState('');

    const onChange = (e, pName) => {
        setParentName(pName);
        setValue(e.target.value);
    };

    const handleSelections = (q, p, n, elemName) => {
        const arr = selectedOpts;
        const checkExists = selectedOpts.find((o) => o.parent === elemName);
        if(elemName !== parentName && !checkExists){
            arr.push({name: n, price: p, quality:q, parent: elemName});
            setSelectedOpts(arr); 
        } else if(elemName === parentName || checkExists){
            const target = selectedOpts.find((obj) => obj.parent === elemName);
            Object.assign(target, {name: n, price: p, quality:q, parent: elemName});
        }
        handleQuality();
        handlePrice();
    };

    const handleQuality = () => {
        const qualValues = selectedOpts.map((i) => i.quality === 'low' ? 10 : (i.quality === 'medium' ? 20 : 30));
        const sumOfAll = qualValues.reduce((partialSum, a) => partialSum + a, 0);
        setQuality((sumOfAll / selectedOpts.length).toFixed(2));
    };

    const handlePrice = () => {
        const priceValues = selectedOpts.map((p) => p.price);
        const additions = selectedOpts.map((i) => i.quality === 'low' ? 0.10 : (i.quality === 'medium' ? 0.15 : 0));
        const priceValAdditions = priceValues.concat(additions);
        const sumOfAll = priceValAdditions.reduce((partialSum, a) => partialSum + a, 0).toFixed(2);
        setPrice(sumOfAll);
    };

  return (
    <div className='meal-desc'>
        <div className='header-card'>
            <span className='name-of-meal'>{selectedMeal.name}</span>
            <span>Quality Score: {quality}</span>
            <span>Price:{price}$</span>
        </div>
        <div className='ingredients-title'>
            <span className='title'>Ingredients</span>
            <span>high</span>
            <span>medium</span>
            <span>low</span>
        </div>
        <div className='ingredients-list'>
            {selectedMeal.ingredients.map((elem, i) =>
                <div className='quality-opt'>
                <span className='opt-name'>{elem.name}</span>
                    <div className='opt-list'>
                        <Radio.Group value={value} onChange={(e) => onChange(e,elem.name)}>
                            {elem.options.map((opt,i) =>
                                <Radio onChange={() => handleSelections(opt.quality, opt.price, opt.name, elem.name)} key={opt.name} value={opt.name}>
                                    <span className='opt'>{opt.name}</span>
                                </Radio> 
                            )}
                        </Radio.Group> 
                    </div>
                </div>
            )}
        </div>
    </div>
  );
}

export default MenuPage;
