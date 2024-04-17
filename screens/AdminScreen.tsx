import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {APIROUTES} from '../constants/apiRoutes';
import axios from 'axios';
import {AppContext} from '../App';
import {VideoForm} from '../components/VideoForm';
import UserForm from '../components/UserForm';
import {useNavigation} from '@react-navigation/native';

type UserData = {
  age: number | null;
  email: string | null;
  gender: string | null;
  id: number;
  job: string | null;
  name: string;
  phone_number: string;
  role: 'admin' | 'user';
  sector: string | null;
  status: string | null;
  working_at: string | null;
};

export const AdminScreen = () => {
  const [users, setUsers] = React.useState<UserData[]>([]);
  const [activeStyles, setActiveStyles] = React.useState({});
  const [isOpenUserForm, setIsOpenUserForm] = React.useState(false);
  const [isOpenVideoForm, setIsOpenVideoForm] = React.useState(false);
  const [userToUpdate, setUserToUpdate] = React.useState<UserData | null>(null);

  const {user} = React.useContext(AppContext);
  const navigation = useNavigation();

  const headers = {
    Authorization: `Bearer ${user}`,
  };

  const handleNavigation = (user) => {
    console.log('hadnleNavigation', user);
  };

  const handleDelete = (item) => {
    console.log('handleDelete', item);
    axios.delete(`${APIROUTES.getUsers}${item.id}`, {headers})
    .then(res => {
      console.log(res.data, "silindi")
      setUsers(users.filter(user => user.id !== item.id))
    })
    .catch(err => {
      console.log(err.message, "silinemedi")
    })
  }

  const handleEdit = (item) => {
    setUserToUpdate(item);
    setIsOpenUserForm(true);
  }

  React.useEffect(() => {
    const fetchUsers = () => {
      axios
        .get(APIROUTES.getUsers, {headers})
        .then(res => {
          setUsers(res.data);
        })
        .catch(err => {
          console.log(err.message);
        });
    };

    fetchUsers();
  }, []);



  return (
    <SafeAreaView>
      <ScrollView >
        <Text style={styles.headText}>Kullanıcı Listesi</Text>
        <View style={styles.chip}>
          <TouchableOpacity
            style={styles.chipWrapper}
            onPress={() => {
              setIsOpenVideoForm(false);
              setUserToUpdate(null);
              setIsOpenUserForm(!isOpenUserForm);
            }}>
            <Image
              style={styles.image}
              source={require('../assets/plus.png')}
            />
            <Text style={{color:'black'}}>Kullanici Ekle</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.chipWrapper}
            onPress={() => {
              setIsOpenVideoForm(!isOpenVideoForm);
              setIsOpenUserForm(false);
            }}>
            <Image
              style={styles.image}
              source={require('../assets/plus.png')}
            />
            <Text style={{color:'black'}}>Video Ekle</Text>
          </TouchableOpacity>
        </View>

        {isOpenUserForm && <UserForm editFormData={userToUpdate}/>}
        {isOpenVideoForm && <VideoForm />}

        {users.length > 0 &&
          users.map(user => (
            <View
              key={user.id}
              style={
                activeStyles?.id === user.id
                  ? [styles.card, activeStyles.styles]
                  : styles.card
              }
              >
                
                  <TouchableOpacity onPress={() => setActiveStyles({styles: {height: 'auto'}, id: user.id})}>
                    <View style={[styles.row, {justifyContent: 'space-between',}]}>
                      <View style={{width: 60, padding: 5}}></View>
                      <Text style={styles.pContent}>{user.name}</Text>
                      <View style={styles.row}>
                        <TouchableOpacity style={{padding: 5}} onPress={() => handleEdit(user)}>
                          <Image source={require('../assets/edit.png')} style={{width: 30, height: 30}} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{padding: 5}} onPress={() => handleDelete(user)}>
                          <Image source={require('../assets/trash.png')} style={{width: 30, height: 30}} />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={[styles.row, {justifyContent: 'center'}]}>
                      <Text style={styles.p}>Rol: </Text>
                      <Text style={styles.pContent}>{user.role}</Text>
                    </View>
                    <View  style={[styles.row, {justifyContent: 'center'}]}>
                      <Text style={styles.p}>Email: </Text>
                      <Text style={styles.pContent}>{user.email}</Text>
                    </View>
                    <View  style={[styles.row, {justifyContent: 'center'}]}>
                    <Text style={styles.p}>Telefon: </Text>
                    <Text style={styles.pContent}>{user.phone_number}</Text>
                    </View>
                    <View  style={[styles.row, {justifyContent: 'center'}]}>
                    <Text style={styles.p}>Durum: </Text>
                    <Text style={styles.pContent}>{user.status}</Text>
                    </View>
                    <View  style={[styles.row, {justifyContent: 'center'}]}>
                      <Text style={styles.p}>Sektör: </Text>
                      <Text style={styles.pContent}>{user.sector}</Text>
                    </View>
                    <View  style={[styles.row, {justifyContent: 'center'}]}>
                      <Text style={styles.p}>Çalıştığı Yer: </Text>
                      <Text style={styles.pContent}>{user.working_at}</Text>
                    </View>
                    <View  style={[styles.row, {justifyContent: 'center'}]}>
                      <Text style={styles.p}>Meslek: </Text>
                      <Text style={styles.pContent}>{user.job}</Text>
                    </View>

                    <TouchableOpacity style={styles.navigation} onPress={() => navigation.navigate('UserDetailScreen',  {user})}><Text style={styles.navText}>Detayları gör...</Text></TouchableOpacity>
                  </TouchableOpacity>
            </View>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'lightgray',
    marginBottom: 10,
    marginHorizontal: 5,
    borderRadius: 2,
    height: 40,
    overflow: 'hidden',
    zIndex: 9999,
  },
  navigation: {
    alignSelf: 'center',
    padding: 10,
    backgroundColor: '#2196f3',
    borderRadius: 30,
    marginTop: 10,
  },
  navText: {
    color: 'white',
    fontWeight: 'bold',
  },
  p: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: 'black',
  },
  pContent: {
    fontSize: 20,
    color: 'black',
    alignSelf: 'center',
  },
  activeCard: {
    height: 'auto',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
  },
  headText: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingHorizontal: 30,
    paddingTop: 20,
    color: 'black',
    paddingBottom: 10,
  },
  chipWrapper: {
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#2196f3',
    padding: 10,
    width: 150,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
  },
  image: {
    width: 20,
    height: 20,
  },
  chip: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    marginBottom: 15,
  },
});
