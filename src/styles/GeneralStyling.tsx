
import { StyleSheet } from 'react-native';
const commonStyling = StyleSheet.create({
    registrationContainer: {
        flex: 1,
        alignItems: "center",
        paddingTop: 20,
    },
    registrationWhiteSheet: {
        width: "100%",
        backgroundColor: "#fff",
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 10
    },
    centralizedContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    cardContainer: {
        flex: 1,
        width: "90%",
        alignItems: "center",
        marginHorizontal: 40,
        marginTop: 20
    },
    continueButton: { 
        marginTop: 30, 
        width: '100%' 
    }
})

export default commonStyling;