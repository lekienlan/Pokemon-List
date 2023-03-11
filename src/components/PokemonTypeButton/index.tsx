export default function PokemonTypeButton({
  name,
  url,
  isSelected,
  onClick,
}: {
  name: string;
  url: string;
  isSelected: boolean;
  onClick: (name: string) => void;
}) {
  return (
    <button
      onClick={() => onClick(name)}
      className={`px-3 py-2 text-center bg-gray-100 rounded-full cursor-pointer transition ${
        isSelected && 'bg-blue-400 text-white font-semibold'
      }`}
    >
      {name}
    </button>
  );
}
