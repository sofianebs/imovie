import React from 'react';
import { StyleSheet, Text, View, Linking, Platform } from 'react-native';
import { Container, Header, Title, Content, Body, Icon, Right, Button, Left, List, ListItem, Separator} from 'native-base';
import * as WebBrowser from 'expo-web-browser';
import { FontAwesome } from '@expo/vector-icons';


export default function About() {
    return (
        <Container>
            <Header>
                <Body>
                    <Title>About</Title>
                </Body>
                <Right />
            </Header>
            <Content>
                <Separator bordered>
                    <Text style={{fontSize:12, color:'black'}}>GENERAL</Text>
                </Separator>
                <ListItem icon onPress={() => Linking.openURL('mailto:benslimenesofien@gmail.com?subject=' +  Platform.OS)}>
                    <Left>
                        <Button style={{ backgroundColor: "#FF9500" }}>
                            <FontAwesome active name="star" color={'white'} />
                        </Button>
                    </Left>
                    <Body>
                        <Text>Evaluer cette application</Text>
                    </Body>
                    <Right>
                        <Icon name="arrow-forward" />
                    </Right>
                </ListItem>
            </Content>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
