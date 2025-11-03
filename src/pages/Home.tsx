import React from 'react';
import HeroBanner from '../components/home/HeroBanner';
import CategoriesGrid from '../components/home/CategoriesGrid';
import Bestsellers from '../components/home/Bestsellers';
import Testimonials from '../components/home/Testimonials';
import Newsletter from '../components/home/Newsletter';

const Home: React.FC = () => {
  return (
    <div>
      <HeroBanner />
      <CategoriesGrid />
      <Bestsellers />
      <Testimonials />
      <Newsletter />
    </div>
  );
};

export default Home;
