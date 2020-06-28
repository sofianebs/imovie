import React, {Component} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, View, TouchableOpacity, Image, Text,FlatList} from 'react-native';
import {GetActor,getImageFromApi,getMovieDetail} from "../API/TMDB";
import {Body, Container, Content, Header, Title, Left, Right, Badge} from "native-base";
import { FontAwesome } from '@expo/vector-icons';
import moment from 'moment';
import { color } from 'react-native-reanimated';
import Film from '../components/Film';
export default class Acteur extends Component {
   
    constructor (props) {
        super(props);
        moment.locale('fr');
        this.state = {
            
            isLoading : true , 
            acteur : undefined
        };

    }

    componentDidMount() {
        this.load();
    }
    load = () => {

        const { id } = this.props.navigation.state.params;

        this.setState({ isLoading: true});

        GetActor(id).then(data => {
            this.setState({
                acteur: data,
                isLoading: false
            });
        }).catch(error => {
            console.log(error)
        });
        
        
    };
    
    render () {
       
      
       if (this.state == undefined ){
        GetActor(id).then(data => {
            this.setState({
                acteur: data,
                isLoading: false
            });
            const{ acteur} = this.state.acteur;
        }).catch(error => {
            console.log(error)
        });
       }
        return(
            <Container>e
                <Header>
                    <Left>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <FontAwesome name="arrow-left" size={20} color='black' />
                        </TouchableOpacity>
                    </Left>
                    <Body>
                    <Title>Acteur</Title>
                    </Body>
                    <Right />
                </Header>
                <Content style={styles.container}>
                <ScrollView>
                            <View>
                                <View style={{alignItems: 'center'}}>
                                 <Text >
                                 {(acteur.id)} 
                                 </Text>


                                    </View>
                                </View>
                                </ScrollView>
                </Content>
            </Container>
            
           
                
            );
    }

}
    

 

const styles = StyleSheet.create({
    loading_container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: '#F6F6F6',
        padding: 10,
        marginTop: 15
    },
});

