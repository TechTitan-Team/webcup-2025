import React from 'react';
import { motion } from 'framer-motion';
import image from "../../../assets/images/advantage.jpg";

const Advantage = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-4 py-20">
      
      {/* Left Section - Text Content with Animation */}
      <motion.div
        className="md:w-1/2 mb-10 md:mb-0 md:pr-8"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          🎉 Pourquoi <span className="text-red-500">TheEnd.page</span>, c’est (vraiment) une bonne idée ?
        </h2>
        <p className="text-gray-600 text-lg mb-8 max-w-xl">
          Fini les adieux gênants sur Slack, les mails de départ fades ou les discussions trop sérieuses. 
          Avec TheEnd.page, vous reprenez le pouvoir sur votre sortie.
          Créez une page unique, sincère, stylée (ou totalement barrée) pour dire ce que vous avez à dire, comme vous voulez le dire.
        </p>
        <p className="text-gray-600 text-lg">
          C’est rapide, fun, libérateur, et surtout… ça vous ressemble.
          Qu’on parte en héros, en rageur, en lover ou en troll : il y a toujours une bonne raison de bien soigner la fin.
        </p>
      </motion.div>

      {/* Right Section - Image */}
      <motion.div
        className="md:w-1/2 bg-gray-100 rounded-3xl p-8 flex items-center justify-center"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <img src={image} className="w-full rounded-xl shadow-xl" alt="TheEnd Page Illustration" />
      </motion.div>
    </div>
  );
};

export default Advantage;
