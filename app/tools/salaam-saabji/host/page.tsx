'use client';
import { useState, useEffect, useMemo, FormEventHandler } from "react";
import { database } from "../firebase";
import { ref, set, onValue, remove, get } from "firebase/database";

type Player = {
    id: string;
    name: string;
    word: string;
};

const CreateGame = () => {
    const [gameId, setGameId] = useState<string | null>(null);
    const [playerList, setPlayerList] = useState<Player[]>([]);
    const [categoryName, setCategoryName] = useState<string>("");
    const [step, setStep] = useState(1);
    const [gameRoomId, setGameRoomId] = useState("");

    const playersRef = useMemo(() => ref(database, "games/" + gameId + "/players"), [gameId]);

    const generateGameId = async (): Promise<string> => {
        let newGameId = "";
        let exists = true;

        while (exists) {
            newGameId = Math.floor(100000 + Math.random() * 900000).toString();
            const gameRef = ref(database, "games/" + newGameId);
            const snapshot = await get(gameRef);
            exists = snapshot.exists();
        }

        return newGameId;
    };

    const handleChoice = (choice: string) => {
        setStep(choice === "create" ? 2 : 3);
    };

    useEffect(() => {
        if (!gameId) return;
        const unsubscribe = onValue(playersRef, (snapshot) => {
            const players = snapshot.val();
            setPlayerList(players ? Object.values(players) : []);
        });
        return () => unsubscribe();
    }, [playersRef, gameId]);

    const handleCreateGame: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        if (!categoryName) {
            alert("Please enter a category name to create a game.");
            return;
        }

        const newGameId = await generateGameId();

        try {
            await set(ref(database, "games/" + newGameId), {
                theme: categoryName,
                players: {}
            });
            setGameId(newGameId);
            setStep(4);
        } catch (error) {
            console.error("Error creating game: ", error);
        }
    };

    const handleJoinGame: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        try {
            const gameRoomRef = ref(database, "games/" + gameRoomId);
            const snapshot = await get(gameRoomRef);

            if (snapshot.exists()) {
                setGameId(gameRoomId);
                const players = snapshot.val().players || {};
                setPlayerList(Object.values(players));
                setStep(4);
            } else {
                alert("Invalid Game Room ID.");
            }
        } catch (error) {
            console.error("Error joining game: ", error);
        }
    };

    const handleDeletePlayer = async (playerId: string) => {
        if (!gameId) return;

        try {
            const playerRef = ref(database, `games/${gameId}/players/${playerId}`);
            await remove(playerRef);
            console.log(`Player ${playerId} removed successfully.`);
            setPlayerList((prevPlayerList) =>
                prevPlayerList.filter(player => player.id !== playerId)
            );
        } catch (error) {
            console.error("Error removing player: ", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-svh py-10 px-4 overflow-auto">
            {step === 1 && (
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Choose an Option</h1>
                    <div className="flex gap-6">
                        <button
                            onClick={() => handleChoice("create")}
                            className="bg-blue-500 text-white px-3 py-2 rounded"
                        >
                            Create New Game
                        </button>
                        <button
                            onClick={() => handleChoice("join")}
                            className="bg-green-500 text-white px-3 py-2 rounded"
                        >
                            Join Existing Game
                        </button>
                    </div>
                </div>
            )}
            {step === 2 && (
                <form onSubmit={handleCreateGame} className="mb-4 flex-col flex text-center">
                    <h1 className="text-2xl font-bold mb-4">Create a New Game</h1>
                    <input
                        type="text"
                        placeholder="Enter category name"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        className="border p-2 mb-4 text-black"
                        required
                    />
                    <div className="flex justify-between">
                        <button
                            onClick={() => setStep(1)}
                            type="button"
                            className="bg-gray-500 text-white px-4 py-2 rounded mr-6"
                        >
                            Go Back
                        </button>
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-4 py-2 rounded"
                        >
                            Start Game
                        </button>
                    </div>
                </form>
            )}
            {step === 3 && (
                <form onSubmit={handleJoinGame} className="mb-4 flex-col flex">
                    <h1 className="text-2xl font-bold mb-4">Join an Existing Game</h1>
                    <input
                        type="number"
                        max={999999}
                        min={1}
                        maxLength={6}
                        minLength={6}
                        placeholder="Enter Game Room ID"
                        value={gameRoomId}
                        onChange={(e) => setGameRoomId(e.target.value)}
                        className="border p-2 mb-4 text-black"
                        required
                    />
                    <div className="flex justify-between">
                        <button
                            onClick={() => setStep(1)}
                            type="button"
                            className="bg-gray-500 text-white px-4 py-2 rounded mr-6"
                        >
                            Go Back
                        </button>
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-4 py-2 rounded"
                        >
                            Join Game
                        </button>
                    </div>
                </form>
            )}
            {step === 4 && gameId && (
                <div className="text-center">
                    <h1 className="text-xl mb-2">Theme of the game is:</h1>
                    <p className="text-2xl font-bold mb-6 text-yellow-400">{categoryName}</p>
                    <p className="mb-2">Game Room ID:</p>
                    <p><strong className="text-5xl">{gameId}</strong></p>
                    {!!playerList.length &&
                        <table className="table-auto mt-4">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">Player Name</th>
                                    <th className="px-4 py-2">Word</th>
                                    <th className="px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {playerList.map((player, index) => (
                                    <tr key={index}>
                                        <td className="border px-4 py-2">{player.name}</td>
                                        <td className="border px-4 py-2">{player.word}</td>
                                        <td className="border px-4 py-2">
                                            <button
                                                onClick={() => handleDeletePlayer(player.id)}
                                                className="bg-red-500 text-white px-2 py-1 rounded"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    }
                </div>
            )}
        </div>
    );
};

export default CreateGame;
