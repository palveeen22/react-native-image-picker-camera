import React, { useState } from "react";
import {
	SafeAreaView,
	StyleSheet,
	View,
	Text,
	StatusBar,
	Image,
	Dimensions,
	TouchableOpacity,
} from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

const App = () => {
	const [fileUri, setFileUri] = useState("");

	const handleImagePicker = (callback) => {
		let options = {
			title: "Select Image",
			storageOptions: {
				skipBackup: true,
				path: "images",
			},
		};
		callback(options, (response) => {
			console.log("Response = ", response);
			if (!response.didCancel) {
				console.log("response", JSON.stringify(response));
				setFileUri(response.assets[0].uri);
			} else {
				console.log("User cancelled image picker");
			}
		});
	};

	const chooseImage = () => {
		handleImagePicker(launchImageLibrary);
	};

	const launchCameraHandler = () => {
		handleImagePicker(launchCamera);
	};

	const renderFileUri = () => {
		return fileUri ? (
			<Image source={{ uri: fileUri }} style={styles.images} />
		) : (
			<Image
				source={{
					uri: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
				}}
				style={styles.images}
			/>
		);
	};

	return (
		<>
			<StatusBar barStyle="dark-content" />
			<SafeAreaView>
				<View style={styles.body}>
					<Text
						style={{ textAlign: "center", fontSize: 20, paddingBottom: 10 }}
					>
						Pick Images from Camera & Gallery
					</Text>
					<View style={styles.ImageSections}>
						<View>{renderFileUri()}</View>
					</View>

					<View style={styles.btnParentSection}>
						<TouchableOpacity onPress={chooseImage} style={styles.btnSection}>
							<Text style={styles.btnText}>Choose File</Text>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={launchCameraHandler}
							style={styles.btnSection}
						>
							<Text style={styles.btnText}>Directly Launch Camera</Text>
						</TouchableOpacity>
					</View>
				</View>
			</SafeAreaView>
		</>
	);
};

const styles = StyleSheet.create({
	body: {
		backgroundColor: "white",
		justifyContent: "center",
		borderColor: "black",
		borderWidth: 1,
		height: Dimensions.get("screen").height - 20,
		width: Dimensions.get("screen").width,
	},
	ImageSections: {
		display: "flex",
		flexDirection: "row",
		paddingHorizontal: 8,
		paddingVertical: 8,
		justifyContent: "center",
	},
	images: {
		width: 250,
		height: 250,
		borderColor: "black",
		borderWidth: 1,
		marginHorizontal: 3,
	},
	btnParentSection: {
		alignItems: "center",
		marginTop: 10,
	},
	btnSection: {
		width: 225,
		height: 50,
		backgroundColor: "#DCDCDC",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 3,
		marginBottom: 10,
	},
	btnText: {
		textAlign: "center",
		color: "gray",
		fontSize: 14,
		fontWeight: "bold",
	},
});

export default App;
