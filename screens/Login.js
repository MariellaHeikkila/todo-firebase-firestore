import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase/Config"
import { useEffect, useState } from "react"
import { logout, login } from "../components/Auth"
import { Alert, Pressable } from "react-native"
import { Button, Text, View, TextInput } from "react-native"
import styles from "../styles/style"
import { MaterialIcons } from '@expo/vector-icons'


export default function Register({ navigation }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false)    

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoggedIn(true)
            }
            else {
                setIsLoggedIn(false)
            }
        })
    }, []) 

    const handlePressLogin = () => {
        if (!email) {
            Alert.alert('Please enter an email')
        } else if (!password) {
            Alert.alert('Please enter a password')
        } else {
            login(email, password)
            onAuthStateChanged(auth, async (user) => {
                if (user) {                    
                    setEmail('')
                    setPassword('')                    
                    navigation.navigate('Todos')
                }
            })
        }
    }

    const handlePressLogout = async () => {
        logout()
    }

        if (isLoggedIn) {
            return(
                <View style={styles.container}>
                    <View style={styles.headerItem}>
                    <Text style={styles.header}>Todos: Login</Text>
                    <Pressable style={styles.logoutIcon} onPress={handlePressLogout}>
                        <MaterialIcons name="logout" size={24} color="black" />
                    </Pressable>
                </View>
                <Text style={styles.infoText}>You are logged in.</Text>
                <Button
                    title='Go to todos'
                    onPress={() => navigation.navigate('Todos')}
                />
            </View>                
            )
        } else {
            return(
                <View style={styles.container}>
                    <Text style={styles.header}>Todos: Login</Text>
                    
                    <View style={styles.newItem}>
                        <Text style={styles.infoText}>Email</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter your email"
                            value={email}
                            onChangeText={(email) => setEmail(email.trim())}
                        />
                    </View>
                    <View style={styles.newItem}>
                        <Text style={styles.infoText}>Password</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter your password"
                            value={password}
                            onChangeText={(password) => setPassword(password)}
                            secureTextEntry={true}
                        />
                    </View>
                    <Button
                        style={styles.buttonStyle}
                        title="Log in"
                        onPress={handlePressLogin}
                    />
                    <Text style={styles.infoText}>Not having account yet?</Text>
                    <Button
                        style={styles.buttonStyle}
                        title="Register"
                        onPress={() => navigation.navigate('Register')}
                    />
                </View>
            )
        }
}