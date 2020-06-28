import React, { Component } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View, TouchableOpacity, Image, Text, FlatList } from 'react-native';
import { getMovieDetail, getSimilar, getImageFromApi } from "../API/TMDB";
import { Body, Container, Content, Header, Title, Left, Right, Badge } from "native-base";
import { FontAwesome } from '@expo/vector-icons';
import moment from 'moment';
import Actor from '../components/Actor';
import Film from '../components/Film'
export default class Movie extends Component {

    constructor(props) {
        super(props);

        moment.locale('fr');

        this.state = {
            isLoading: true,
            movie: undefined,
            similar: []
        };

    }

    componentDidMount() {
        this.load();
    }

    displayDetail = (id) => {
        this.props.navigation.push('Movie', { id: id })
    }
    displayActorDetail = (id) => {
        this.props.navigation.push('Acteur', { id: id })
    }
    load = () => {

        const { id } = this.props.navigation.state.params;

        this.setState({ isLoading: true });

        getMovieDetail(id).then(data => {
            this.setState({
                movie: data,
                isLoading: false
            });
        }).catch(error => {
            console.log(error)
        });
        getSimilar(id).then(data => {
            console.log(data);
            this.setState({
                similar: data.results,
                isLoading: false,
            })
        }).catch(error => {
            console.log(error)
        });
    };

    render() {

        const { movie } = this.state;
        return (
            <Container>
                <Header>
                    <Left>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <FontAwesome name="arrow-left" size={20} color='black' />
                        </TouchableOpacity>
                    </Left>
                    <Body>
                        <Title>Detail du film</Title>
                    </Body>
                    <Right />
                </Header>
                <Content style={styles.container}>
                    {(movie != undefined) ?
                        <ScrollView>
                            <View>
                                <View style={{ alignItems: 'center' }}>
                                    <Image style={{ height: 300, width: '100%' }} source={(movie.backdrop_path) ? { uri: getImageFromApi(movie.backdrop_path, 780) } : require('../images/default.png')} />
                                    <Text style={{ fontWeight: 'bold', marginVertical: 20, fontSize: 18 }}> Titre : {(movie.title) ? movie.title : 'Non renseigné'} </Text>
                                </View>
                                <View>
                                    <Badge
                                        style={{ marginVertical: 5 }}
                                        info>
                                        <Text > Date de sortie : {(movie.release_date) ? moment(movie.release_date).format('YYYY') : 'Non renseigné'} </Text>
                                    </Badge>
                                    <Badge info>
                                        <Text> Duree: {(movie.runtime) ? moment().startOf('day').add(moment.duration({ m: movie.runtime })).format('H [h] mm [mn]') : 'Non renseigné'} </Text>
                                    </Badge>

                                </View>
                                <Text style={{ marginVertical: 20 }}> {(movie.overview) ? movie.overview : 'Pas de description'} </Text>
                                <Text style={{ fontWeight: 'bold', marginVertical: 20, fontSize: 18 }}> Acteurs </Text>
                                <FlatList
                                    horizontal
                                    pagingEnabled={true}
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={(item) => item.id.toString()}
                                    data={this.state.movie.credits.cast}
                                    renderItem={({ item }) =>
                                        <Actor
                                            id={item.id}
                                            name={item.name}
                                            image={item.profile_path}

                                            displayActorDetail={this.displayActorDetail}
                                        >
                                        </Actor>}
                                />
                                <Text style={{ fontWeight: 'bold', fontSize: 40 }}>  Films Similaires a  </Text>

                                <Text style={{ fontWeight: 'bold', fontSize: 30 }}>  "{(movie.title)} " </Text>
                                <FlatList
                                    horizontal
                                    pagingEnabled={true}
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={(item) => item.id.toString()}
                                    data={this.state.similar}
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

