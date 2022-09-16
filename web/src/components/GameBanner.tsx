interface GameBannerProps {
  title: string;
  bannerURL: string;
  adsCount: number;
}

export function GameBanner(props: GameBannerProps) {
  return (
    <a href="#" className="relative rounded-lg overflow-hidden">
      <img src={props.bannerURL} />
      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
        <strong className="font-bold text-white block">{props.title}</strong>
        <span className="text-sm text-zinc-300 block mt-1">
          {props.adsCount} Ad(s)
        </span>
      </div>
    </a>
  );
}
