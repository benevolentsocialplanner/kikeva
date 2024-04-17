import axios from 'axios';
import React from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity} from 'react-native';
import {APIROUTES} from '../constants/apiRoutes';
import {SelectList} from 'react-native-dropdown-select-list';
import {AppContext} from '../App';
type Mode = 'add' | 'edit';

interface UserFormProps {
  mode?: Mode;
  editFormData?: any;
}

const UserForm: React.FC<UserFormProps> = ({ editFormData, mode = 'add' }) => {
  
  const [selected, setSelected] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [info, setInfo] = React.useState('');

  const roleData = [
    {key:'2', value:'admin'},
    {key:'3', value:'user'},
  ];
  
  const {user} = React.useContext(AppContext);
  
  const headers = {
    Authorization: `Bearer ${user}`
  };

  const [formData, setFormData] = React.useState(
    editFormData
      ? editFormData
      : {
    name: '',
    phone_number: '',
    password: '',
    role: selected,
    age: 0,
    gender: '',
    email: '',
    working_at: '',
    sector: '',
    job: '',
    status: '',
  });

  const handleSubmitUser = () => {
    setIsLoading(true);
    setInfo('');
    if (editFormData) {
      console.log(`${APIROUTES.getUsers}${editFormData.id}/`)
      console.log('editliyoruz')
      axios
      .put(`${APIROUTES.getUsers}${editFormData.id}`, formData, {headers})
      .then((res) => {
        console.log(res.data, "guncellendi")
        setInfo('Kullanıcı başarıyla güncellendi')
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err.message)
        setInfo('Kullanıcı güncellenirken bir hata oluştu.')
      })
      .finally(() => {
        setIsLoading(false);
      })
    } else {
      axios
      .post(APIROUTES.getUsers, formData, {headers})
      .then((res) => {
        setInfo('Kullanıcı başarıyla eklendi')
      })
      .catch((err) => {
        console.log(err.message)
        setInfo('Kullanıcı eklenirken bir hata oluştu')
        err.message.includes(400) && setInfo('Kullanıcı zaten var.')

      })
      .finally(() => {
        setIsLoading(false);
      })
    }
    
  };

  return (
    <ScrollView>
        {formData?.id && <Text style={styles.text}>ID: {formData.id}</Text>}
        <TextInput
          style={styles.textInput}
          placeholder="Name..."
          value={formData.name}
          onChangeText={(value) => setFormData({ ...formData, name: value })}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Phone Number..."
          value={formData.phone_number}
          onChangeText={(value) => setFormData({ ...formData, phone_number: value })}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password..."
          value={formData.password}
          onChangeText={(value) => setFormData({ ...formData, password: value })}
          secureTextEntry={true}
        />
        <View style={styles.selectWrapper}>
          <SelectList 
            setSelected={(val) => setSelected(val)} 
            data={roleData} 
            save="value"
            placeholder="Rol seçiniz"
          />
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="Age..."
          value={formData.age}
          onChangeText={(value) => setFormData({ ...formData, age: value })}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.textInput}
          placeholder="Gender..."
          value={formData.gender}
          onChangeText={(value) => setFormData({ ...formData, gender: value })}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Email..."
          value={formData.email}
          onChangeText={(value) => setFormData({ ...formData, email: value })}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Working At..."
          value={formData.working_at}
          onChangeText={(value) => setFormData({ ...formData, working_at: value })}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Sector..."
          value={formData.sector}
          onChangeText={(value) => setFormData({ ...formData, sector: value })}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Job..."
          value={formData.job}
          onChangeText={(value) => setFormData({ ...formData, job: value })}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Status..."
          value={formData.status}
          onChangeText={(value) => setFormData({ ...formData, status: value })}
        />
        <TouchableOpacity onPress={handleSubmitUser} style={styles.button} disabled={isLoading}>
            <Text style={styles.buttonText}>Kaydet</Text>
        </TouchableOpacity>
        {info && info.length > 0 && <Text style={{fontSize: 18, textAlign: 'center', margin: 10, color: 'black'}}>{info}</Text>}
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    marginHorizontal: 20,
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    paddingHorizontal: 20,
    color: 'black',
  },
  text: {
    height: 40,
    color: 'black',
    marginHorizontal: 20,
    padding: 10,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#2196f3',
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    alignSelf: 'center',
    borderRadius: 30,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  selectWrapper: {
    marginHorizontal: 20,
    marginBottom: 10,
  },
})

export default UserForm;