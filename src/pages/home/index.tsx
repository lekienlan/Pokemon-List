import { createContext, useState, useContext } from 'react';
import useFetchPokemonTypes from '../../hooks/useFetchPokemonTypes';
import useFetchPokemons from '../../hooks/useFetchPokemons';
import PokemonTypeButton from '../../components/PokemonTypeButton';
import PokemonItem from '../../components/PokemonItem';

const HomeContext = createContext<{
  selectedTypes: string[];
  setSelectedTypes: React.Dispatch<React.SetStateAction<string[]>>;
}>({
  selectedTypes: [],
  setSelectedTypes: () => {},
});

export default function Home() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  return (
    <div className='px-6'>
      <HomeContext.Provider
        value={{
          selectedTypes,
          setSelectedTypes,
        }}
      >
        <div className='sticky top-0 p-6 bg-white'>
          <div className='pb-2 font-semibold'>Types</div>
          <PokemonTypes />
        </div>
        <PokemonList />
      </HomeContext.Provider>
    </div>
  );
}

function PokemonTypes() {
  const { data, loading } = useFetchPokemonTypes();
  const { selectedTypes, setSelectedTypes } = useContext(HomeContext);

  if (loading) return <div>loading...</div>;

  return (
    <div className='bg-white grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-4'>
      {data?.results.map((item, index) => {
        return (
          <PokemonTypeButton
            name={item.name}
            url={item.url}
            key={index}
            isSelected={selectedTypes.includes(item.name)}
            onClick={(type) => {
              if (selectedTypes.includes(item.name)) {
                setSelectedTypes(selectedTypes.filter((item) => item !== type));
              } else {
                setSelectedTypes([...selectedTypes, type]);
              }
            }}
          />
        );
      })}
    </div>
  );
}

function PokemonList() {
  const { selectedTypes } = useContext(HomeContext);
  const { data, onNext, onPrev, loading, error } = useFetchPokemons({
    selectedTypes,
  });

  const renderList = () => {
    if (loading)
      return (
        <div className='flex justify-center items-center h-[200px]'>
          loading...
        </div>
      );
    if (error) return <div>{error}</div>;
    return (
      <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-[100px] pt-10'>
        {data?.results.map((item) => {
          return (
            <PokemonItem
              key={item.name}
              image={item.sprites.front_default}
              name={item.name}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <h3 className='px-6 font-semibold'>Total: {data?.count}</h3>
      {renderList()}
      <div className='flex fixed bottom-0 left-0 bg-white justify-between w-full p-6'>
        <button
          className='bg-black text-white px-4 py-2 rounded-full font-semibold'
          onClick={() => {
            onPrev();
          }}
        >
          {'<'} previous
        </button>
        <button
          className='bg-black text-white px-4 py-2 rounded-full font-semibold'
          onClick={() => {
            onNext();
          }}
        >
          next {'>'}
        </button>
      </div>
    </div>
  );
}
