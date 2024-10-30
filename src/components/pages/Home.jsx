import React from 'react';
import SimpleSlider from "../layouts/SliderHome";
import { Catalog } from "../product/catalogHome/Catalog";
import SliderNew from "../layouts/SliderNew";
import SliderPopular from "../layouts/SliderPopular";
import { Blog } from "../layouts/Blog";
import TelegramBot from "../layouts/TelegramBot";


export function Home() {

  console.log('Home component rendering'); // Проверим рендеры Home


  return (<>
    <SimpleSlider />
    <div className='container'>
      <SliderNew />
      <Catalog />
      <SliderPopular />
      <Blog />
      <TelegramBot />
    </div>

  </>)
}


