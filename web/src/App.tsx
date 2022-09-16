import "./styles/main.css";
import { useEffect, useState } from "react";
import logoImg from "./assets/logo-nlw-esports.svg";
import { GameBanner } from "./components/GameBanner";
import { NewAdBar } from "./components/NewAdBar";
import * as Dialog from "@radix-ui/react-dialog";
import { CreateAdModal } from "./components/CreateAdModal";
import { Game } from "./@types/game";

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:3333/games").then((res) => {
      res.json().then((data) => {
        setGames(data);
      });
    });
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} />

      <h1 className="text-6xl text-white font-black mt-20">
        Your{" "}
        <span className="text-transparent bg-clip-text bg-nlw-gradient">
          duo{" "}
        </span>{" "}
        is here!
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map((game) => {
          return (
            <GameBanner
              key={game.id}
              title={game.title}
              bannerURL={game.bannerURL}
              adsCount={game._count.ads}
            />
          );
        })}
      </div>

      <Dialog.Root>
        <NewAdBar />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}

export default App;
