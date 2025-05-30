import { Flex, Blockquote, Strong, Link } from "@radix-ui/themes";
import mainImage from '@/assets/PortFolio.png'
// https://www.befunky.com/create/cartoonizer/
// Small Icons from - Flaticon
import cartoonImage from '@/assets/PortFolio - cartoon.png'
import { useState } from 'react';
import './scss/home.scss'
import PropTypes from 'prop-types';

function Home({isMobile}) {
  const [mainWidth, setMainWidth] = useState(50);
  const [isMainImage, setIsMainImage] = useState(true);
  
  const handleMouseMove = (e) => {
      const containerWidth = e.currentTarget.offsetWidth;
      const mouseX = e.clientX - e.currentTarget.getBoundingClientRect().left;

      const newMainWidth = Math.min(Math.max((mouseX / containerWidth) * 100, 0), 100);
      // setMainWidth(100 - newMainWidth); // For reverse direction of image
      setMainWidth(newMainWidth);
  };

  const handleMouseLeave = () => {
    setMainWidth(50);
  };

  const handleImageClick = () => {
    setIsMainImage(!isMainImage);
  };

  const opacity = mainWidth>50 ? (150 - mainWidth) : 100;
  return (
    <Flex direction="column" gap="2" style={{ position: 'relative'}} className={isMobile ? 'mwebHome': ''}>
      {isMobile && (
        <>
          <div className="imageContainer" onClick={handleImageClick}>
            <img src={isMainImage ? mainImage : cartoonImage} alt="Main and Cartoon Image" className={`imageContainer-main`} style={{borderRadius: '15px'}} />
          </div>
          <Blockquote size="5">
            Hi, I’m <Strong>Adarsh Gella!</Strong>
            <br />
            I’m a student at <Link href="https://www.utdallas.edu/fact-sheets/ecs/ms-computer-science/" underline="hover" target="blank">UTD</Link>, currently pursuing a master’s in Computer Science.
            <br />
            <br />
            I’m really passionate about front-end development, especially when it comes to creating intuitive and engaging user interfaces.  <br />
            Right now, I’m working on some new <Link href="https://github.com/gadarsh043?tab=repositories" underline="hover" target="blank">UI projects</Link> and also developing content for my <Link href="https://www.youtube.com/@g_adarsh_sonu" underline="hover" target="blank">YouTube channel</Link>.
            <br />
            <br />
            I love exploring new tech, coding, and user experience. When I’m not coding,
            you’ll probably catch me watching a ton of movies or series, capturing moments for
            my YouTube channel, or just dancing around with my friends.

            <br />
            <br />
            I enjoy sharing insights about coding practices, discussing new ideas, recommending my 
            <Link href="https://www.imdb.com/user/ur129777024/lists/" underline="hover" target="blank"> latest movie finds</Link>, or talking about my <Link href="https://www.youtube.com/@g_adarsh_sonu" underline="hover" target="blank">YouTube channel</Link>. I’m all in! Hit me up on <Link href="https://www.linkedin.com/in/g-adarsh-sonu/" underline="hover" target="blank">LinkedIn</Link>, <Link href="mailto:g.adarsh043@gmail.com" target="blank" underline="hover">Gmail</Link>, or
            <Link href="https://www.instagram.com/g_adarsh_sonu/" underline="hover" target="blank"> Instagram</Link>—let’s connect and chat about what we’re into!
          </Blockquote>
        </>
      )}
    {!isMobile && (
      <>
      <div className="imageContainer" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        <img src={mainImage} alt="Main Image" className="imageContainer-main" style={{clipPath: `polygon(0 0, ${mainWidth}% 0, ${mainWidth}% 100%, 0 100%)`, opacity: `${mainWidth + 80}%`, borderRadius: '15px'}} />
        <img src={cartoonImage} alt="Cartoon Image" className="imageContainer-cartoon" style={{opacity: `${opacity}%`, borderRadius: '15px'}} />
      </div>
      <br />
      <br />
      <Blockquote size="5">
        Hi, I’m <Strong>Adarsh Gella!</Strong>
        <br />
        I’m a student at <Link href="https://www.utdallas.edu/fact-sheets/ecs/ms-computer-science/" underline="hover" target="blank">UTD</Link>, currently pursuing a master’s in Computer Science. <br />
        I’m really passionate about front-end development, especially when it comes to <br />
        creating intuitive and engaging user interfaces. Right now, I’m working on some new <br />
        <Link href="https://github.com/gadarsh043?tab=repositories" underline="hover" target="blank">UI projects</Link> and also developing content for my <Link href="https://www.youtube.com/@g_adarsh_sonu" underline="hover" target="blank">YouTube channel</Link>.

        <br />
        <br />
        I love exploring new tech, coding, and user experience. When I’m not coding, <br />
        you’ll probably catch me watching a ton of movies or series, capturing moments for <br />
         my YouTube channel, or just dancing around with my friends.

        <br />
        <br />
        I enjoy sharing insights about coding practices, discussing new ideas, recommending my <br />
        <Link href="https://www.imdb.com/user/ur129777024/lists/" underline="hover" target="blank">latest movie finds</Link>, or talking about my <Link href="https://www.youtube.com/@g_adarsh_sonu" underline="hover" target="blank">YouTube channel</Link>. I’m all in! Hit me up on <Link href="https://www.linkedin.com/in/g-adarsh-sonu/" underline="hover" target="blank">LinkedIn</Link>, <Link href="mailto:g.adarsh043@gmail.com" target="blank" underline="hover">Gmail</Link>, or <br />
        <Link href="https://www.instagram.com/g_adarsh_sonu/" underline="hover" target="blank">Instagram</Link>—let’s connect and chat about what we’re into!
      </Blockquote>
      <br />
      <br />
       </>
    )}
    </Flex>
  )
}

Home.propTypes = {
    isMobile: PropTypes.bool
};

export default Home