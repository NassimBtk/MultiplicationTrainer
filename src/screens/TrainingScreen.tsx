import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	TextInput,
	Button,
	StyleSheet,
	KeyboardAvoidingView,
	Platform,
	TouchableWithoutFeedback,
	Keyboard,
	ImageBackground,
	TouchableOpacity,
} from "react-native";

const backgroundImage = require("../../assets/fun-bg.webp");
type Question = {
	num1: number;
	num2: number;
	userAnswer: string;
	correctAnswer: number;
};

const generateQuestions = (): Question[] => {
	return Array.from({ length: 10 }, () => {
		const num1 = Math.floor(Math.random() * 10) + 1;
		const num2 = Math.floor(Math.random() * 10) + 1;
		return { num1, num2, userAnswer: "", correctAnswer: num1 * num2 };
	});
};

const TrainingScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
	const [questions, setQuestions] = useState<Question[]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [score, setScore] = useState<number | null>(null);
	const [userInput, setUserInput] = useState("");

	useEffect(() => {
		setQuestions(generateQuestions());
	}, []);

	if (questions.length === 0) return null;

	const currentQuestion = questions[currentIndex];

	const handleNext = () => {
		if (userInput.trim() === "") return;

		questions[currentIndex].userAnswer = userInput;

		if (currentIndex === 9) {
			const correctAnswers = questions.filter(
				(q) => parseInt(q.userAnswer) === q.correctAnswer
			).length;
			setScore(correctAnswers);
		} else {
			setCurrentIndex(currentIndex + 1);
		}

		setUserInput("");
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={{ flex: 1 }}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<ImageBackground source={backgroundImage} style={styles.background}>
					<View style={styles.container}>
						{score === null ? (
							<>
								<Text style={styles.counter}>{currentIndex + 1} / 10</Text>
								<View style={styles.questionContainer}>
									<View style={styles.box}>
										<Text style={styles.number}>{currentQuestion.num1}</Text>
									</View>
									<Text style={styles.operator}>×</Text>
									<View style={styles.box}>
										<Text style={styles.number}>{currentQuestion.num2}</Text>
									</View>
									<Text style={styles.operator}>=</Text>
									<TextInput
										style={styles.input}
										keyboardType="numeric"
										value={userInput}
										onChangeText={setUserInput}
									/>
								</View>
								<TouchableOpacity
									style={[
										styles.button,
										userInput.trim() === ""
											? { backgroundColor: "#b5b3b3" }
											: {},
									]}
									onPress={handleNext}
									disabled={userInput.trim() === ""}
								>
									<Text style={styles.buttonText}>Suivant</Text>
								</TouchableOpacity>
							</>
						) : (
							<>
								<Text style={styles.score}>
									Score : {score} / 10 {score == 10 ? "🎉" : ""}
								</Text>
								{questions.map((q, index) => {
									const isCorrect = parseInt(q.userAnswer) === q.correctAnswer;
									return (
										<View
											key={index}
											style={[styles.row, styles.correctionRow]}
										>
											<Text style={styles.correctionText}>
												{q.num1} × {q.num2} = {q.correctAnswer}
											</Text>
											<Text
												style={[
													styles.correctionText,
													isCorrect ? styles.correctText : styles.wrongText,
													styles.largeIcon,
												]}
											>
												({q.userAnswer || "vide"}) {isCorrect ? "✅" : "❌"}
											</Text>
										</View>
									);
								})}
								<TouchableOpacity
									style={styles.button}
									onPress={() => {
										setQuestions(generateQuestions());
										setCurrentIndex(0);
										setScore(null);
										setUserInput("");
									}}
								>
									<Text style={styles.buttonText}>Recommencer</Text>
								</TouchableOpacity>
							</>
						)}
					</View>
				</ImageBackground>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	background: { flex: 1, resizeMode: "cover", justifyContent: "center" },
	container: {
		flexGrow: 1,
		padding: 20,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "rgba(255, 255, 255, 0.8)",
	},
	counter: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 10,
		color: "#ff6347",
	},
	questionContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 20,
	},
	box: {
		width: 60,
		height: 60,
		backgroundColor: "#ffdd57",
		borderRadius: 12,
		justifyContent: "center",
		alignItems: "center",
	},
	number: { fontSize: 24, fontWeight: "bold", color: "#222" },
	operator: { fontSize: 28, marginHorizontal: 5, color: "#ff6347" },
	input: {
		width: 80,
		height: 50,
		borderWidth: 2,
		borderColor: "#3498db",
		borderRadius: 10,
		textAlign: "center",
		fontSize: 22,
		backgroundColor: "white",
	},
	score: {
		fontSize: 24,
		fontWeight: "bold",
		color: "black",
	},
	correctionTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginTop: 10,
		color: "#222",
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "80%",
		marginVertical: 5,
	},
	correctionRow: {
		backgroundColor: "#fff",
		padding: 10,
		borderRadius: 10,
	},
	largeIcon: {
		fontSize: 26,
	},
	correctionText: { fontSize: 20, fontWeight: "bold" },
	correctText: { fontSize: 20, color: "green" },
	wrongText: { fontSize: 20, color: "red" },
	button: {
		backgroundColor: "#ff6347",
		paddingVertical: 12,
		paddingHorizontal: 25,
		borderRadius: 15,
		marginTop: 15,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
		elevation: 5,
	},
	buttonText: {
		color: "white",
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
	},
});

export default TrainingScreen;
