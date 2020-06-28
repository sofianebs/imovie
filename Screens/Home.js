import React, {Component} from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import { Container, Text,Header, Title, Content, Body, Icon, Right, Button, Left } from 'native-base';
import {getMovies} from '../API/TMDB'
import Film from '../components/Film'

export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            now_playing : [],
            top_rated : [] ,
            popular : [] ,
            upcoming : [] ,
            isLoading : true
        }
    }

    componentDidMount() {
        this.load();
    }

    load = () =>  {
        getMovies('now_playing').then(data =>  {
            this.setState({
                now_playing: data.results,
                isLoading: false,
            })
        }).catch(error => {
            console.log(error)
        });
        getMovies('top_rated').then(data =>  {
            this.setState({
                top_rated: data.results,
                isLoading: false,
            })
        }).catch(error => {
            console.log(error)
        });
        getMovies('popular').then(data =>  {
            this.setState({
                popular: data.results,
                isLoading: false,
            })
        }).catch(error => {
            console.log(error)
        });
        getMovies('upcoming').then(data =>  {
            this.setState({
                upcoming: data.results,
                isLoading: false,
            })
        }).catch(error => {
            console.log(error)
        });
    }

    displayDetail = (id) => {
        this.props.navigation.push('Movie', {id:id})
    }

    render () {
        return (
            <Container style={styles.container}>
                <Header>
                    <Body>
                        <Title>Home</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    {
                        (this.state.isLoading) ?
                            <View style={{alignItems: 'center', justifyContent:'center'}}>
                                <ActivityIndicator size={'large'}/>
                            </View>
                           :
                            
                            <View>
                                <Text style={styles.txt} >A la une</Text>
                               
                            <FlatList
                            horizontal
                            pagingEnabled={true}
                            showsHorizontalScrollIndicator={false}
                                keyExtractor={(item) => item.id.toString()}
                                data={this.state.now_playing}
                                renderItem={({item}) =>
                                    <Film
                                        id={item.id}
                                        title={item.title}
                                        image={item.backdrop_path}
                                        overview={item.overview}
                                        displayDetail={this.displayDetail}
                                    >
                                    </Film>}
                            />
                               <Text style={styles.txt} > Top rated</Text>
                                <FlatList
                            horizontal
                            pagingEnabled={true}
                            showsHorizontalScrollIndicator={false}
                                keyExtractor={(item) => item.id.toString()}
                                data={this.state.top_rated}
                                renderItem={({item}) =>
                                    <Film
                                        id={item.id}
                                        title={item.title}
                                        image={item.backdrop_path}
                                        overview={item.overview}
                                        displayDetail={this.displayDetail}
                                    >
                                    </Film>}
                            />
                            <Text style={styles.txt} >Populaire</Text>
                                <FlatList
                            horizontal
                            pagingEnabled={true}
                            showsHorizontalScrollIndicator={false}
                                keyExtractor={(item) => item.id.toString()}
                                data={this.state.popular}
                                renderItem={({item}) =>
                                    <Film
                                        id={item.id}
                                        title={item.title}
                                        image={item.backdrop_path}
                                        overview={item.overview}
                                        displayDetail={this.displayDetail}
                                    >
                                    </Film>}
                                    />
                                      <Text style={styles.txt} >Bientot Au ciné</Text>
                                <FlatList
                            horizontal
                            pagingEnabled={true}
                            showsHorizontalScrollIndicator={false}
                                keyExtractor={(item) => item.id.toString()}
                                data={this.state.upcoming}
                                renderItem={({item}) =>
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
                            
                            
                    }

                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F6F6',
        padding: 10,
        marginTop: 15
    },
    txt :{
        fontSize : 35 ,
        fontWeight: "bold" ,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { height: 1},
        textShadowRadius: 2
    }
});
