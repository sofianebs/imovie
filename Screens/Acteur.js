import React, { Component } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View, TouchableOpacity, Image, Text, FlatList } from 'react-native';
import { getacteurDetail, getSimilar, getImageFromApi ,getActor} from "../API/TMDB";
import { Body, Container, Content, Header, Title, Left, Right, Badge } from "native-base";
import { FontAwesome } from '@expo/vector-icons';
import moment from 'moment';

import Film from '../components/Film'
export default class acteur extends Component {

    constructor(props) {
        super(props);

        moment.locale('fr');

        this.state = {
            isLoading: true,
            acteur: undefined,
            similar: []
        };

    }

    componentDidMount() {
        this.load();
    }

    displayDetail = (id) => {
        this.props.navigation.push('Movie', { id: id })
    }
    
    load = () => {

        const { id } = this.props.navigation.state.params;

        this.setState({ isLoading: true });

        getActor(id).then(data => {
            this.setState({
                acteur: data,
                isLoading: false
            });
        }).catch(error => {
            console.log(error)
        });
       
    };

    render() {

        const { acteur } = this.state;
        return (
            <Container>
                <Header>
                    <Left>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <FontAwesome name="arrow-left" size={20} color='black' />
                        </TouchableOpacity>
                    </Left>
                         <Body>
                     <Title><Acteur/Title>
                    </Body>
                    <Right />
                </Header>
                <Content style={styles.container}>
                    {(acteur != undefined) ?
                        <ScrollView>
                            <View>
                                <View style={{ alignItems: 'center' }}>
                                    <Image style={{ height: 300, width: '100%' }} source={(acteur.profile_path) ? { uri: getImageFromApi(acteur.profile_path, 780) } : require('../images/default.png')} />
                                    <Text style={{ fontWeight: 'bold', marginVertical: 20, fontSize: 18 }}>   {(acteur.name) ? acteur.name : 'Non renseigné'} </Text>
                                </View>
                                <View>
                                    <Badge
                                        style={{ marginVertical: 5 }}
                                        info>
                                        <Text > Date de naissance {(acteur.birthday) ? moment(acteur.birthday).format('DD/MM/YYYY') : 'Non renseigné'} </Text>
                                    </Badge>
                                    <Badge info>
                                        <Text>
                                            {(acteur.place_of_birth)}
                                        </Text>
                                          </Badge>

                                </View>
                                <Text style={{ marginVertical: 20 }}> {(acteur.biography) ? acteur.overview : 'Pas de description'} </Text>
                                <Text style={{ fontWeight: 'bold', marginVertical: 20, fontSize: 18 }}> Autres Realisations : </Text>
                                <FlatList
                                    horizontal
                                    pagingEnabled={true}
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={(item) => item.id.toString()}
                                    data={this.state.acteur.credits.cast}
                                    renderItem={({ item }) =>
                                    <Film
                                    id={item.id}
                                    title={item.title}
                                    image={item.backdrop_path}
                                    overview={item.overview}
                                    displayDetail={this.displayDetail}
                                >
                                </Film>}
                                />
                              
                                
                            </View>
                        </ScrollView>
                        :
                        <View style={styles.loading_container}>
                            <ActivityIndicator size='large' />
                        </View>
                    }
                </Content>
            </Container>
        )
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

