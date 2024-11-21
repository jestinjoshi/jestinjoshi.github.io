import Link from 'next/link';

export default function SalaamSaabji() {
  return (
    <div className="flex flex-col items-center justify-center h-svh p-4 text-center">
      <h1 className="text-2xl font-bold mb-2">Welcome to Salaam Saabji!</h1>
      <p className='mb-6 text-xl'>Select your role in the game:</p>
      <div className="flex">
        <Link href="./salaam-saabji/host" className="text-lg text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded mr-6">
          Host
        </Link>
        <Link href="./salaam-saabji/player" className="text-lg text-white bg-green-500 hover:bg-green-700 px-4 py-2 rounded">
          Player
        </Link>
      </div>
    </div>
  );
}
