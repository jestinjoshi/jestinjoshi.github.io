'use client';
import { FormEventHandler, useState, useEffect, useCallback } from "react";
import { database } from "../firebase";
import { ref, push, set, get, onChildRemoved } from "firebase/database";

let errorAudio: HTMLAudioElement | null = null;

if (typeof window !== "undefined") {
	errorAudio = new Audio('/sound/error.mp3');
}

const JoinGame = () => {
	const [state, setState] = useState({
		gameRoomId: "",
		playerName: "",
		playerWord: "",
		submissionMessage: "",
		step: 1,
		categoryName: "",
		playerRefKey: "",
		shouldRetry: false
	});
	
	const handleGameRoomIdSubmit: FormEventHandler<HTMLFormElement> = useCallback(async (e) => {
		e.preventDefault();
		const gameRoomRef = ref(database, "games/" + state.gameRoomId);
		const snapshot = await get(gameRoomRef);

		if (snapshot.exists()) {
			setState(prevState => ({
				...prevState,
				categoryName: snapshot.val().host || "Unknown Category",
				step: 2
			}));
		} else {
			alert("Invalid Game Room ID.");
		}
	}, [state.gameRoomId]);

	const handlePlayerSubmit: FormEventHandler<HTMLFormElement> = useCallback(async (e) => {
		e.preventDefault();
		const playersRef = ref(database, "games/" + state.gameRoomId + "/players");
		const newPlayerRef = push(playersRef);
		await set(newPlayerRef, {
			name: state.playerName,
			word: state.playerWord,
			id: newPlayerRef.key
		});
		setState(prevState => ({
			...prevState,
			playerRefKey: newPlayerRef.key || "",
			submissionMessage: "Your entry has been submitted to the host. If the host determines your entry is invalid, you will need to submit a new word.",
			step: 3
		}));
	}, [state.gameRoomId, state.playerName, state.playerWord]);

	useEffect(() => {
		if (state.playerRefKey) {
			const playerRef = ref(database, "games/" + state.gameRoomId + "/players/" + state.playerRefKey);
			const unsubscribe = onChildRemoved(playerRef, () => {
				setState(prevState => ({
					...prevState,
					submissionMessage: "Your entry was deleted by the host. Please try again.",
					shouldRetry: true
				}));
				errorAudio?.play();
				if (navigator.vibrate) {
					navigator.vibrate(500);
				}
			});
			return () => unsubscribe();
		}
	}, [state.playerRefKey, state.gameRoomId]);

	const resetForm = useCallback(() => {
		setState(prevState => ({
			...prevState,
			playerWord: "",
			submissionMessage: "",
			step: 1,
			categoryName: "",
			shouldRetry: false
		}));
	}, []);

	return (
		<div className="flex flex-col items-center justify-center h-screen p-10">
			{state.step === 1 && (
				<form onSubmit={handleGameRoomIdSubmit} className="flex flex-col text-center">
					<h1 className="text-3xl font-bold mb-2">Enter Game Room ID</h1>
					<p className="mb-4">Please ask the host for the game ID to proceed</p>
					<input
						type="number"
						min={1}
						max={999999}
						minLength={6}
						maxLength={6}
						placeholder="Enter Game Room ID"
						value={state.gameRoomId}
						onChange={(e) => setState(prevState => ({ ...prevState, gameRoomId: e.target.value }))}
						className="mb-4 p-2 border border-gray-300 rounded text-black"
						required
					/>
					<button
						type="submit"
						className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
					>
						Next
					</button>
				</form>
			)}
			{state.step === 2 && (
				<form onSubmit={handlePlayerSubmit} className="flex flex-col text-center">
					<h1 className="text-xl mb-2">The theme of the game is:</h1>
					<p className="mb-4 text-3xl text-yellow-500 font-bold">{state.categoryName}</p>
					<input
						type="text"
						placeholder="Enter your name"
						value={state.playerName}
						onChange={(e) => setState(prevState => ({ ...prevState, playerName: e.target.value }))}
						className="mb-4 p-2 border border-gray-300 rounded text-black"
						required
					/>
					<input
						type="text"
						placeholder="Enter a word"
						value={state.playerWord}
						onChange={(e) => setState(prevState => ({ ...prevState, playerWord: e.target.value }))}
						className="mb-4 p-2 border border-gray-300 rounded text-black"
						required
					/>
					<button
						type="submit"
						className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
					>
						Submit
					</button>
				</form>
			)}
			{state.step === 3 && (
				<>
					<p className={`mt-4 text-center ${state.shouldRetry ? 'text-red-400' : 'text-green-500'}`}>{state.submissionMessage}</p>
					{state.shouldRetry &&
						<button onClick={resetForm} className="bg-yellow-500 text-white font-bold py-2 px-4 rounded hover:bg-yellow-700 mt-4">Retry</button>
					}
				</>
			)}
		</div>
	);
};

export default JoinGame;
