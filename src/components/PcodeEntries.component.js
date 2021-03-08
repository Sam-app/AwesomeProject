import React, { useState} from 'react'
import { View, 
        Text, 
        TextInput, 
        StyleSheet
        ,Keyboard,
         ActivityIndicator,
         Alert} from 'react-native'

import { Detail } from './Detail.components';

 export const  PcodeEntries = () => {

    //COMPONENT STATES
    const [postcode , setPostcode] = useState("");
    const [isLoading, SetIsLoading] = useState(false);
    const [parish_ward, setParishWard]= useState({});
    const [error , setError] = useState({isActive:false, message: ""});
 
    //API REQUEST HANDLER
    const onSubmitEditing = (postcode_inpt) => {

        //IF POSTCODE VALUE IS EMTPY
        // EMPTY THE PARISH WARD STATE & RETURN
        if (postcode === "") {
            setParishWard({});
            return
        }
        let url = `https://api.postcodes.io/postcodes/${postcode_inpt}`;
        console.log(url)
        //ON REQUESTING API DISPLAY
        // ACTIVITY INDICATOR
        SetIsLoading(true);
        //MAKE API REQUEST
        fetch(url)
            .then(respObj => {
                SetIsLoading(false)
                return respObj.json();
            })         
            .then(response =>{
                const {status, result } = response
                if(status === 200){
                    setError({isActive:false, message: ""});
                    const { parish, admin_ward } = result;
                    setParishWard({...parish_ward, parish,ward : admin_ward})
                }else if(status == 404){
                    setParishWard({})
                    setError({ isActive:true, message : response.error}); 
                }
                console.log(response);
            })
            .catch(err => {
                //HANDLE ERROR
                console.log(err)
               // SetIsLoading(false)

            })
    }

    return (
        <View style={[styles.container]}>
            <View style={styles.inputBox}>
                <Text style={styles.title}> Please enter a postcode:</Text>
                <TextInput 
                    style={styles.postcodeInp}
                    value ={postcode} 
                    autoCompleteType ='postal-code'
                    placeholder = 'eg. LE11 3UE'
                    autoCapitalize='characters'
                    onChangeText = {(val)=>{
                        setPostcode(val)
                    }}
                    onSubmitEditing={() => {
                        onSubmitEditing(postcode);
                        Keyboard.dismiss();
                    }}    
                    returnKeyType='search'             
                />
            </View>

            <View style={styles.content}>
                {/* DISPLAY ERROR MSG IF THERE IS ANY ERROR  */}
                {(error.isActive)&&               
                    (Alert.alert(
                        error.message.toString(),
                        "Please enter a valid postcode",
                        [{
                            text: "OK", onPress: ()=> setError({...error, isActive:false})
                        }]))
                }
                
                {/* DISPLAY ACTIVITY INDICATOR WHILE HANDLING API REQUEST */}
                {isLoading ? (<ActivityIndicator size="large" color="#344966" />):
                (<View style={styles.display_result}>
                      <Detail title="Ward" detail={parish_ward.ward}/>
                      <Detail title="Parish" detail={parish_ward.parish}/>
                </View>      
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex :1,
        padding: 7,
        paddingTop: 20,
        backgroundColor:'#f5f3f6'
          
    },
    inputBox:{
        height:150,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#dee7f5',  
        borderRadius:20  
    },
    title:{
        fontSize: 28,
        color:'#000',
        marginTop: -6,
        marginBottom: 4,
        fontWeight:'bold'
    },
    postcodeInp :{
        height : 40,
        fontSize:18,
        width : '70%',
        alignSelf:'center',
        backgroundColor : '#fff',
        marginTop: 8
    },
    content:{
        flex:1,
        backgroundColor: '#fff',
        justifyContent:'center'
    },
    display_result : {
        marginTop:20,
        flex:1,
        backgroundColor: '#fff'
    }
});

