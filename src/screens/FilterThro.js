import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { TitleBarHeader } from "../components/TitleBarHeader"
import { black, grey, primaryColor, white } from '../theme/Colors';
import { Filter } from 'react-native-svg';
import BackIcon from '../assets/svgs/BackIcon';
import FilterIcon from '../assets/svgs/FilterIcon';
import { useNavigation } from '@react-navigation/native';
import { appStyle } from '../theme/AppStyle';
import LocationIcon from '../assets/svgs/LocationIcon';
import { InputField } from '../components/InputField';
import Slider from '@react-native-community/slider';
import { SeekSlider } from '../components/SeekSlider';
import { useEffect, useState } from 'react';
import { DropDown } from '../components/DropDown';
import { FilledButton } from '../components/FilledButton';
import { BorderedButton } from '../components/BorderedButton';
import LocationDropIcon from '../assets/svgs/LocationDropIcon';
import CalendarPickerIcon from '../assets/svgs/CalendarPickerIcon';


export default FilterThro = () =>{

    const navigation = useNavigation();
    const [kms, setKms] = useState(10);
    const [selectedActvity, setSelectedActvity] = useState('');
    const [selectedSortValue, setSelectedSortValue] = useState('');
    const categories = [
        {name:'All'},
        {name:'Sports'},
        {name:'Entertainment'},
        {name:"Meet Up"},
        {name:"Outdoor"},
      ]; 

      const sortBy = [
        {name:'Newest'},
        {name:'Oldest'},
        {name:'Expiring Soon'},
        {name:"Nearest"},
      ];

    useEffect(()=>{
        console.log("kms",kms);
        setKms(kms)
    },kms)
    
    return(<SafeAreaView style={{flex:1}}>
       <TitleBarHeader 
                leftIcon={<BackIcon/>} 
                titleBarText={"Filter"} 
                //rightIcon={<FilterIcon/>}
                onLeftPressed={()=>{navigation.goBack()}}
                //onRightPressed={()=>{}}
                elevation={10}
                />
        
        <InputField 
            style={{marginHorizontal:35,marginTop:'10%'}}
            heading={"Location"}
            isEditable={false}
            value={'New Delhi, India'}
            inputMode={'numeric'}
            rightIcon={<LocationDropIcon/>}/>

        <InputField 
            style={{marginHorizontal:35,marginTop:20}}
            heading={"Start Date"}
            isEditable={false}
            value={new Date().toLocaleDateString()}
            inputMode={'numeric'}
            rightIcon={<CalendarPickerIcon/>}/>
        
        <InputField 
            style={{marginHorizontal:35,marginTop:20}}
            heading={"End Date"}
            isEditable={false}
            value={new Date().toLocaleDateString()}
            inputMode={'numeric'}
            rightIcon={<CalendarPickerIcon/>}/>

        <SeekSlider       
           heading={'Radius'}
           value={kms}
           onValueChange={(value)=>{setKms(value)}}
           minimumValue={2}
           maximumValue={20}
           subheading={'People with in ' + kms +' kms can catch'}
           style={{marginHorizontal:35,marginTop:20}}/>


        <DropDown
            style={{marginHorizontal:35,marginTop:5}}
            heading={'Activity'}
            data={categories}
            value={selectedActvity}
            selectedValue={(value)=>{setSelectedActvity(value)}}
            />

        <DropDown
            style={{marginHorizontal:35,marginTop:20}}
            heading={'Sort By'}
            data={sortBy}
            value={selectedSortValue}
            selectedValue={(value)=>{setSelectedSortValue(value)}}
            />
        
        <FilledButton
            style={{width:'60%',alignSelf:'center',marginTop:30}}
            lable={'Apply'}/>

        <BorderedButton
            style={{width:'60%',alignSelf:'center',marginTop:20}}
            lable={'Reset'}/>
            

    </SafeAreaView>)
}