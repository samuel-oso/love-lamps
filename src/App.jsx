import React, { useState } from "react";
import { Lightbulb, Moon, Sun, Copyright } from "lucide-react";

const products = [
  { id: 1, name: "The Couch Lamp", price: 1200.0, slug: "couch" },
  { id: 2, name: "The Dining Lamp", price: 3800.0, slug: "dining" },
  { id: 3, name: "The Desk Lamp", price: 800.0, slug: "desk" },
  { id: 4, name: "The Lounge Lamp", price: 2350.0, slug: "lounge" },
];

const getLampImage = (slug, isDarkMode, specificLightState) => {
  const theme = isDarkMode ? "dark" : "light";
  const state = specificLightState ? "on" : "off";
  return `https://assets.codepen.io/605876/lamp-${slug}-${theme}-${state}_1.png?width=460&height=460&format=auto&quality=75`;
};

const ToggleSwitch = ({ isOn, onToggle, iconLeft, iconRight, isDarkMode }) => (
  <div
    className="flex items-center gap-3 cursor-pointer select-none group"
    onClick={onToggle}
  >
    <div
      className={`transition-opacity duration-300 ${
        !isOn ? "opacity-100" : "opacity-30"
      }`}
    >
      {iconLeft}
    </div>

    <div
      className={`relative w-14 h-7 rounded-full border transition-colors duration-300 ${
        isDarkMode ? "bg-black border-white" : "bg-white border-black"
      }`}
    >
      <span
        className={`absolute top-0.75 left-0.75 w-6 h-5 rounded-full shadow-sm transform transition-transform duration-300 ${
          isDarkMode ? "bg-white" : "bg-black"
        } ${isOn ? "translate-x-6" : "translate-x-0"}`}
      />
    </div>

    <div
      className={`transition-opacity duration-300 ${
        isOn ? "opacity-100" : "opacity-30"
      }`}
    >
      {iconRight}
    </div>
  </div>
);

function App() {
  const [isLightOn, setIsLightOn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <div
      className={`min-h-screen transition-colors duration-700 ease-in-out ${
        isDarkMode
          ? "dark bg-[#121212] text-gray-100"
          : "bg-white text-gray-900"
      }`}
    >
      <header
        className={`sticky top-0 z-50 px-6 py-6 transition-colors duration-700 ease-in-out ${
          isDarkMode ? "bg-[#121212]/95" : "bg-white/95"
        } backdrop-blur-sm`}
      >
        <div className="max-w-2xl mx-auto flex flex-wrap gap-3 justify-between items-end md:px-6">
          <h1 className="text-3xl font-black tracking-tighter flex items-center gap-1">
            you love lamp <Copyright size={16} strokeWidth={3} />
          </h1>
          <nav className="text-sm font-bold text-gray-400 space-x-6 uppercase tracking-widest relative -top-1">
            <a
              href="https://www.linkedin.com/in/samuel-oso/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-500 transition-colors duration-300"
            >
              follow
            </a>
          </nav>
        </div>
      </header>

      <div className="px-6 py-8 max-w-2xl mx-auto">
        <p className="text-lg leading-relaxed">
          lamps for all occasions and every day use.
        </p>
      </div>

      <div
        className={`sticky top-18 z-40 border-b transition-colors duration-700 ease-in-out ${
          isDarkMode
            ? "bg-[#121212]/95 border-gray-800"
            : "bg-white/95 border-gray-200"
        } backdrop-blur-sm`}
      >
        <div className="px-6 py-4 max-w-2xl mx-auto flex flex-row justify-between items-center gap-6">
          <ToggleSwitch
            isOn={isLightOn}
            onToggle={() => setIsLightOn(!isLightOn)}
            iconLeft={<Lightbulb size={20} strokeWidth={2} />}
            iconRight={
              <Lightbulb
                size={20}
                strokeWidth={2}
                className={isLightOn ? "fill-yellow-400 text-yellow-400" : ""}
              />
            }
            isDarkMode={isDarkMode}
          />

          <ToggleSwitch
            isOn={isDarkMode}
            onToggle={() => setIsDarkMode(!isDarkMode)}
            iconLeft={<Sun size={20} strokeWidth={2} />}
            iconRight={
              <Moon
                size={20}
                strokeWidth={2}
                className={isDarkMode ? "fill-current" : ""}
              />
            }
            isDarkMode={isDarkMode}
          />
        </div>
      </div>

      <main className="px-6 max-w-2xl mx-auto pt-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
          {products.map((product) => {
            const imgOff = getLampImage(product.slug, isDarkMode, false);
            const imgOn = getLampImage(product.slug, isDarkMode, true);

            return (
              <div key={product.id} className="group cursor-pointer">
                <div className="relative aspect-4/5 mb-6 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img
                    src={imgOff}
                    alt={`${product.name} Off state`}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                  />
                  <img
                    src={imgOn}
                    alt={`${product.name} On state`}
                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 ${
                      isLightOn ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </div>

                <div className="flex flex-col space-y-1 px-2">
                  <h3 className="text-lg font-medium tracking-tight group-hover:underline underline-offset-4 decoration-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 font-medium">
                    From {formatPrice(product.price)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <footer className="py-12 border-t dark:border-gray-800 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
        <div className="flex items-center justify-center gap-2 tracking-wider">
          <span>Samuel Oso</span>
          <Copyright size={14} />
          <span>2025</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
