import React, { useEffect } from 'react'
import Banner from '../components/banner'
import Doctors from '../components/doctors'
import Testimonials from '../components/testimonials'
import Footer from '../components/footer'
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 80 });
  }, []);
  return (
    <div>
      <div data-aos="fade-down">
        <Banner/>
      </div>
      <div data-aos="fade-up" data-aos-delay="200">
        <Doctors/>
      </div>
      <div data-aos="zoom-in" data-aos-delay="400">
        <Testimonials/>
      </div>
      <Footer/>
    </div>
  )
}
export default Home
