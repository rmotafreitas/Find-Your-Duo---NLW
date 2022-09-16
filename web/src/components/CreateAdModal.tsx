import { useState, useEffect, FormEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import { Input } from "./Form";
import { Check, GameController } from "phosphor-react";
import { SelectGame } from "../@types/game";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

export function CreateAdModal() {
  const [games, setGames] = useState<SelectGame[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:3333/games").then((res) => {
      res.json().then((data) => {
        setGames(data);
      });
    });
  }, []);

  const [days, setDays] = useState<string[]>([]);
  const [voiceChannel, setVoiceChannel] = useState<boolean>(false);

  async function handleCreateAd(e: FormEvent) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    try {
      const res = await fetch(`http://127.0.0.1:3333/games/${data.game}/ads`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          yearsOfExperience: +data.yearsOfExperience,
          discord: data.discord,
          days: days.map(Number),
          hoursStart: data.hourStart,
          hoursEnd: data.hourEnd,
          useVoiceChannel: voiceChannel,
        }),
      });

      alert("Ad created successfully!");
    } catch (err) {
      console.error(err);
      alert("Error creating ad!");
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
        <Dialog.Title className="text-3xl font-black">
          Publish an Ad
        </Dialog.Title>

        <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">
              What game?
            </label>
            <select
              required
              className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
              name="game"
              id="game"
              defaultValue=""
            >
              <option disabled value="">
                Select the game
              </option>
              {games.map((game) => {
                return (
                  <option key={game.id} value={game.id}>
                    {game.title}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Your nickname?</label>
            <Input
              required
              name="name"
              id="name"
              placeholder="How you are called inside the game"
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsOfExperience">Years of experience?</label>
              <Input
                required
                name="yearsOfExperience"
                type="number"
                id="yearsOfExperience"
                placeholder="It's okay if it's ZERO"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="discord">What's your Discord?</label>
              <Input
                name="discord"
                required
                id="discord"
                placeholder="User#0000"
              />
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="days">When do you usually play?</label>

              <ToggleGroup.Root
                className="grid grid-cols-4 gap-2"
                type="multiple"
                value={days}
                onValueChange={setDays}
              >
                <ToggleGroup.Item
                  value="0"
                  className={`w-8 h-8 rounded  ${
                    days.includes("0") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                  title="Sunday"
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="1"
                  className={`w-8 h-8 rounded ${
                    days.includes("1") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                  title="Monday"
                >
                  M
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="2"
                  className={`w-8 h-8 rounded ${
                    days.includes("2") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                  title="Tuesday"
                >
                  T
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="3"
                  className={`w-8 h-8 rounded ${
                    days.includes("3") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                  title="Wednesday"
                >
                  W
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="4"
                  className={`w-8 h-8 rounded ${
                    days.includes("4") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                  title="Thursday"
                >
                  T
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="5"
                  className={`w-8 h-8 rounded ${
                    days.includes("5") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                  title="Friday"
                >
                  F
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="6"
                  className={`w-8 h-8 rounded ${
                    days.includes("6") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                  title="Saturday"
                >
                  S
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hourStart">What time do you play?</label>
              <div className="grid grid-cols-2 gap-1">
                <Input
                  required
                  name="hourStart"
                  type="time"
                  id="hourStart"
                  placeholder="Start"
                />
                <Input
                  required
                  name="hourEnd"
                  type="time"
                  id="hourEnd"
                  placeholder="End"
                />
              </div>
            </div>
          </div>
          <label className="mt-2 flex items-center gap-2 text-sm">
            <Checkbox.Root
              checked={voiceChannel}
              onCheckedChange={(checked) => {
                setVoiceChannel(Boolean(checked));
              }}
              className="w-6 h-6 p-1 rounded bg-zinc-900"
            >
              <Checkbox.Indicator>
                <Check className="w-4 h-4 text-emerald-400" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            I use VoiceChat
          </label>
          <footer className="mt-4 flex justify-end gap-4">
            <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">
              Cancel
            </Dialog.Close>
            <button
              type="submit"
              className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
            >
              <GameController className="w-6 h-6" />
              Find Duo!
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
