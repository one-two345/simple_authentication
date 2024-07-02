import { View, Text, Image, Pressable, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useReducer, useCallback,  } from 'react'
import {useDispatch} from 'react-redux'

import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from '../constants/colors';
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox"
import Button from '../components/Button';
import { validateInput } from '../utils/actions/formActions';
import {reducer} from '../utils/reducers/formReducers'
import { signUp } from '../utils/actions/authActions';



const Signup = ({ navigation }) => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
        
    const isTestMode = true;
    const initialState = {
        inputValues: {
            fullName: isTestMode ? "John Smith" : "",
            email: isTestMode? "example@example.com": "",
            password: isTestMode? "**********" : "",        
        },
        inputValidities: {
            fullName: false,
            email: false,
            password: false,
        },
        formIsValid: false,
    }
    const [formState, dispatchFormState] = useReducer(reducer, initialState)
    const dispatch = useDispatch();
    const [error, setError] = useState();

    const inputChangedHandler = useCallback((inputId, inputValue)=>{
        const result = validateInput(inputId, inputValue);
        dispatchFormState({ inputId, validationResult: result, inputValue: inputValue})
        // console.log('hhkjh')

    },[dispatchFormState])
 
    const authHandler = async () => {
        try {
            setIsLoading(true);
            const action = signUp(
                formState.inputValues.fullName,
                formState.inputValues.email,
                formState.inputValues.password,
            );
            Alert.alert("Account successfully created", "Account created", [
             
                {text: 'OK', 
                 onPress: () => {
                     navigation.navigate("Login");                     
                     setIsLoading(false);
                  }
                },
              ]);
            console.log("Account successfully created");
            setIsLoading(false);
            setError(null)
            navigation.navigate("Login"); 
            
           
              
                      
            await dispatch(action);                       
        } catch(error) {
            console.log(error);
            Alert.alert("An error occurred", error.message);
        } 
    };
    
    

    useEffect(  ()=>{
        if(error){
            Alert.alert("An error occured", error)
        }
    },[error]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={{ flex: 1, marginHorizontal: 22 }}>

            {isLoading && <ActivityIndicator style={{ marginBottom: 20 }} size="large" color={COLORS.primary} />}

                <View style={{ marginVertical: 22 }}>
                    <Text style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        marginVertical: 12,
                        color: COLORS.black
                    }}>
                        Create Account
                    </Text>

                 
                </View>

                <View>
                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Full Name*</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>  
                        <TextInput
                            value={formState.inputValues.fullName}
                            onChangeText={(text) => inputChangedHandler("fullName", text)}
                            placeholder='Full name'
                            placeholderTextColor={COLORS.black}
                            keyboardType='text'
                            style={{
                                width: "100%"
                            }}
                        />

                    </View>
                    {   formState.inputValidities["fullName"] &&(
                            <View   style={{marginVertical: 4 }}>
                                <Text style={{color: 'red', fontSize: 12}}>
                                    {formState.inputValidities["fullName"]}
                                </Text>
                            </View>
                        )
                         
                    }
                </View>
                </View>
                 
                <View>
                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Email address</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>  
                        <TextInput
                            value={formState.inputValues.email}
                            onChangeText={(text) => inputChangedHandler("email", text)}
                            placeholder='Email Address'
                            placeholderTextColor={COLORS.black}
                            keyboardType='email-address'
                            style={{
                                width: "100%"
                            }}
                        />

                    </View>
                    {   formState.inputValidities["email"] &&(
                            <View   style={{marginVertical: 4 }}>
                                <Text style={{color: 'red', fontSize: 12}}>
                                    {formState.inputValidities["email"]}
                                </Text>
                            </View>
                        )
                         
                    }
                </View>
                </View>
                
                <View>
                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Password</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            value={formState.inputValues.password}
                            onChangeText={(text) => inputChangedHandler("password", text)}
                            placeholder='Enter your password'
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={isPasswordShown}
                            style={{
                                width: "100%"
                            }}
                        />

                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={{
                                position: "absolute",
                                right: 12
                            }}
                        >
                            {
                                isPasswordShown == true ? (
                                    <Ionicons name="eye-off" size={24} color={COLORS.black} />
                                ) : (
                                    <Ionicons name="eye" size={24} color={COLORS.black} />
                                )
                            }

                        </TouchableOpacity>
                    </View>
                  
                </View>
                {   formState.inputValidities["password"] &&(
                            <View   style={{marginVertical: 4 }}>
                                <Text style={{color: 'red', fontSize: 12}}>
                                    {formState.inputValidities["password"]}
                                </Text>
                            </View>
                        )
                         
                    }
                </View>

               

                <Button
                    title="SIGNUP"
                    
                    onPress={authHandler}
                    filled
                    style={{
                        marginTop: 18,
                        marginBottom: 4,
                    }}
                />

                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: COLORS.grey,
                            marginHorizontal: 10
                        }}
                    />
                    <Text style={{ fontSize: 14 }}>Or Sign up with</Text>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: COLORS.grey,
                            marginHorizontal: 10
                        }}
                    />
                </View>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                    <TouchableOpacity
                        onPress={() => console.log("Pressed")}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            height: 52,
                            borderWidth: 1,
                            borderColor: COLORS.grey,
                            marginRight: 4,
                            borderRadius: 10
                        }}
                    >
                        <Image
                            source={require("../assets/facebook.png")}
                            style={{
                                height: 36,
                                width: 36,
                                marginRight: 8
                            }}
                            resizeMode='contain'
                        />

                        <Text>Facebook</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => console.log("Pressed")}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            height: 52,
                            borderWidth: 1,
                            borderColor: COLORS.grey,
                            marginRight: 4,
                            borderRadius: 10
                        }}
                    >
                        <Image
                            source={require("../assets/google.png")}
                            style={{
                                height: 36,
                                width: 36,
                                marginRight: 8
                            }}
                            resizeMode='contain'
                        />

                        <Text>Google</Text>
                    </TouchableOpacity>
                </View>

                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginVertical: 22
                }}>
                    <Text style={{ fontSize: 16, color: COLORS.black }}>Already have an account?</Text>
                    <Pressable
                        onPress={() => navigation.navigate("Login")}
                    >
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.primary,
                            fontWeight: "bold",
                            marginLeft: 6
                        }}>Login</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Signup