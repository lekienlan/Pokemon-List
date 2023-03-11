export default function PokemonItem({
  image,
  name,
}: {
  image: string;
  name: string;
}) {
  return (
    <div className='flex flex-col justify-center items-center '>
      <img src={image} alt={name} className='h-[100px]' />
      <h3>{name}</h3>
    </div>
  );
}
