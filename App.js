import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableHighlight } from 'react-native';
import Item from './src/Item'

export default class App extends Component {

  constructor(props){
    super(props)

    this.state={
      lista:[],
      input:''
    }


    this.URL= 'https://b7web.com.br/todo/93961'//baseURL

    this.loadItens = this.loadItens.bind(this)

    this.addTarefa = this.addTarefa.bind(this)

    this.loadItens()
  }


          loadItens(){
            fetch(this.URL)
            .then((r)=> r.json())
            .then((json)=>{
              let s = this.state
              s.lista = json.todo
              this.setState(s)
            })
          }



          addTarefa(texto){
            alert('Tafera adicionada:  '+this.state.input)

            texto = this.state.input
            this.state.input = ''

            fetch(this.URL, {
              method:'POST',
              headers:{
                'Accept':'application/json',
                'Content': 'Application/json'
              },
              body:JSON.stringify({
                item:texto
              })
            })

            .then((r)=> r.json())
            .then((json)=>{
              this.loadItens()
            })

          }

  
  render(){
      return (
        <View style={styles.container}>

          <View style={styles.areaAdd}>
             <Text style={styles.texto}>Adicionar uma Tarefa</Text>
             <TextInput style={styles.input} onChangeText={(texto)=>{
                let s = this.state
                s.input = texto
                this.setState(s)

             }}  value={this.state.input}/>
             <TouchableHighlight style={styles.botaoArea} onPress={this.addTarefa}>
               <Text style={styles.btnTexto}>Adicionar</Text>
             </TouchableHighlight> 
          </View>
        

          <FlatList 
            data={this.state.lista}
            renderItem={({item})=> <Item data={item} url={this.URL} loadFunction={this.loadItens}/>}
            keyExtractor={(item,inedex)=> item.id}
          
          />

               
        </View>
     );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cf30f7',
    justifyContent: 'center',
    textAlign:"left"
  },
  areaAdd:{
    justifyContent:"center",
    alignItems:"center",
 
    marginBottom:20,
    marginTop:30
  },
  texto:{
    fontSize:25,
    textAlign:"center",
    color:'#ffffff'
  },
  input:{
    height:40,
    width:300,
    marginLeft:10,
    marginRight:10,
    marginTop:20,
    paddingLeft:10,
    paddingRight:10,
    borderWidth:1,
    borderRadius:15,
    fontSize:16,
    color:'#cf30f7',
    backgroundColor:'#ffffff',
    fontWeight:"bold"
  },
  botaoArea:{
    width:100,
    height:40,
    borderRadius:10,
    borderWidth:1,
    justifyContent:"center",
    alignItems:"center",
    marginTop:20,
    borderColor:'#ffffff'
  },
  btnTexto:{
    color:'#ffffff'
    
  }
});
