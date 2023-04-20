const Card: React.FC<{
  id: string;
  launch_date_local: string;
  links: {
    mission_patch_small: string;
    article_link: string;
    video_link: string;
  };
  mission_name: string;
  rocket: {
    rocket_name: string;
  };
}> = ({
  id,
  launch_date_local,
  links: { mission_patch_small, article_link, video_link },
  mission_name,
  rocket: { rocket_name },
}) => {
  const launchDate = new Date(launch_date_local);
  return (
    <li key={id} className="flex justify-between py-5 gap-x-6">
      <div className="flex gap-x-4">
        <img
          className="flex-none w-12 h-12 rounded-full bg-gray-50"
          src={mission_patch_small}
          alt=""
        />
        <div className="flex-auto min-w-0">
          <p className="text-sm font-semibold leading-6 text-gray-300">
            {mission_name}
          </p>
          <p className="mt-1 text-xs leading-5 text-gray-500 truncate">
            <a href="article_link" target="_blank" rel="noopener noreferrer">
              {article_link}
            </a>
          </p>
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-col sm:items-end">
        <p className="text-sm leading-6 text-violet-300">{rocket_name}</p>
        <p className="mt-1 text-xs leading-5 text-teal-500">
          <time dateTime={launch_date_local}>
            {launchDate.toLocaleDateString("en-US")}
          </time>
        </p>
      </div>
    </li>
  );
};

export default Card;
