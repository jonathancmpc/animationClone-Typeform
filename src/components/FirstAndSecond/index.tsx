import React from 'react';
import { motion, useTransform, useViewportScroll } from 'framer-motion';

import { Sticky } from '../../styles';

const FirstAndSecond: React.FC = () => {
  const { scrollYProgress } = useViewportScroll(); // Pegando o progresso do scroll no site com o hook do framer-motion

  const frameOpacity = useTransform(scrollYProgress, [0.196, 0.198], [0, 1]); // Função para animar a opacidade do elemento de acordo com o scroll Y do site. Quando estiver em 19.6% do site a opacidade do elemento é 0, mas quando chegar em 19.8% a opacidade é 1.
  const frameScale = useTransform(scrollYProgress, [0.558, 0.627], [0.511, 0.8]) // Mesma teoria da função de cima, porém utilizando a escala do elemento ao invés da opacidade.

  return (
    <Sticky className="second">
      <First />

      <motion.div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '100vh',
        borderRadius: '4px',
        border: '4px solid #fff',
        opacity: frameOpacity,
        scale: frameScale
      }}/>
    </Sticky>
  );
};

const First: React.FC = () => {
  const { scrollYProgress } = useViewportScroll(); // Pegando o progresso do scroll no site com o hook do framer-motion

  const firstScale = useTransform(
    scrollYProgress, 
    [0.198, 0.264, 0.558, 0.627], // Criando a animação utilizando a posição do scroll em 4 momentos diferentes
    [1, 0.511, 0.511, 1] // Tamanho da escala tem que corresponder as 4 posições do scroll/array de cima
  );

  const firstRadius = useTransform(
    scrollYProgress, 
    [0.198, 0.264, 0.558, 0.627],
    [0, 4, 4, 0]
  );

  const leftSideHeight = useTransform(
    scrollYProgress, 
    [0, 0.058],
    ['20vh', '100vh']
  );

  const rightSideScale = useTransform(
    scrollYProgress, 
    [0.047, 0.093],
    [0, 0.511]
  );

  const rightSideY = useTransform(
    scrollYProgress, 
    [0.047, 0.093],
    ['58vh', '0vh']
  );

  const offsetY = useTransform(
    scrollYProgress,
    [0.328, 0.397, 0.461, 0.53],
    ['0%', '-100%', '-100%', '-200%']
  );

  return <Sticky className="first"
    style={{
      scale: firstScale,
      borderRadius: firstRadius
    }}
  >
    <motion.div className="offset" style={{
      y: offsetY
    }}>
      <div className="a">
        <motion.div
          className="left-side"
          style={{
            height: leftSideHeight
          }}
        />

        <div className="right-side">
          <motion.div 
            className="right-image"
            style={{
              y: rightSideY,
              scale: rightSideScale,
            }}
          />
        </div>
      </div>
      <div className="b"></div>
      <div className="c"></div>
    </motion.div>
  </Sticky>
};

export default FirstAndSecond;
